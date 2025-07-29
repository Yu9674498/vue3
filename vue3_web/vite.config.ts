import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import Inspect from 'vite-plugin-inspect'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import SvgComponent from 'unplugin-svg-component/vite'
import svgLoader from 'vite-svg-loader'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const url = {
    // 代理服务器URL
    development: 'http://localhost:3000', //测试环境
    production: 'http://localhost:3000' //生产环境
  }[env.VITE_ENV]

  return {
    base: env.VITE_PUBLIC_PATH,
    resolve: {
      // ↓路径别名
      alias: {
        '@': resolve(__dirname, 'src')
      },
      extensions: ['.vue', '.ts', '.js', '.d.ts'] // 补充 .js 扩展名
    },
    // 开发环境服务器配置
    server: {
      // 是否监听所有地址
      host: true,
      // 端口号
      port: 5173,
      // 端口被占用时，是否直接退出
      strictPort: false,
      // 是否自动打开浏览器
      open: true,
      // 反向代理
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: url,
          // 是否为 WebSocket
          ws: false,
          // 是否允许跨域
          changeOrigin: true,
          rewrite: path => {
            const regex = new RegExp(`^/${env.VITE_APP_BASE_API}`)
            const newPath = path.replace(regex, '')
            return newPath
          }
        }
      },
      // 是否允许跨域
      cors: true,
      // 预热常用文件，提高初始页面加载速度
      warmup: {
        clientFiles: ['./src/store/**/*.*', './src/router/**/*.*']
      }
    },
    // 构建配置
    build: {
      // 自定义底层的 Rollup 打包配置
      rollupOptions: {
        output: {
          /**
           * @name 分块策略
           * @description 1. 注意这些包名必须存在，否则打包会报错
           * @description 2. 如果你不想自定义 chunk 分割策略，可以直接移除这段配置
           */
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia'],
            element: ['element-plus', '@element-plus/icons-vue'],
            vxe: ['vxe-table']
          }
        }
      },
      // 是否开启 gzip 压缩大小报告，禁用时能略微提高构建性能
      reportCompressedSize: false,
      // 单个 chunk 文件的大小超过 2048kB 时发出警告
      chunkSizeWarningLimit: 2048
    },
    // 混淆器
    esbuild:
      mode === 'development'
        ? undefined
        : {
            // 打包构建时移除 console.log
            pure: ['console.log'],
            // 打包构建时移除 debugger
            drop: ['debugger'],
            // 打包构建时移除所有注释
            legalComments: 'none'
          },
    // 依赖预构建
    optimizeDeps: {
      include: ['element-plus/es/components/*/style/css']
    },
    // CSS 相关配置
    css: {
      // 线程中运行 CSS 预处理器
      preprocessorMaxWorkers: true
    },
    plugins: [
      vue(),
      svgLoader({
        defaultImport: 'url',
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeViewBox: false
                }
              }
            }
          ]
        }
      }),
      // 自动生成 SvgIcon 组件和 SVG 雪碧图
      SvgComponent({
        iconDir: [resolve(__dirname, 'src/assets/icons')],
        preserveColor: resolve(__dirname, 'src/assets/icons/preserve-color'),
        dts: true,
        dtsDir: resolve(__dirname, 'types/auto')
      }),
      AutoImport({
        //安装两行后你会发现在组件中不用再导入ref，reactive等
        imports: ['vue', 'vue-router', 'pinia'],
        //存放的位置
        dts: 'types/auto/auto-imports.d.ts',
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({ prefix: 'Icon' }) // 图标组件前缀（可选）
        ]
      }),
      Components({
        // 引入组件的,包括自定义组件
        // 存放的位置
        dts: 'types/auto/components.d.ts',
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({ enabledCollections: ['ep'] }) // 启用 Element Plus 图标集
        ]
      }),
      Icons({ autoInstall: true }), // 自动安装图标集
      // vite转换监测插件
      Inspect()
    ]
  }
})

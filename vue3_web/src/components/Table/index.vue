<template>
  <div class="dynamic-table-container">
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%"
      v-bind="$attrs"
    >
      <template v-for="col in columns" :key="col.prop">
        <!-- 自动检测是否有对应插槽 -->
        <el-table-column v-if="hasSlot(col.prop)" v-bind="col">
          <template #default="scope">
            <slot :name="col.prop" :scope="scope"></slot>
          </template>
        </el-table-column>

        <el-table-column v-else-if="col.tooltip" v-bind="col">
          <template #default="scope">
            <el-tooltip
              :content="scope.row[col.prop]"
              placement="top"
              :show-after="500"
            >
              <span class="ellipsis-text">{{ scope.row[col.prop] }}</span>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column v-else v-bind="col" />
      </template>
    </el-table>

    <div v-if="pagination" class="pagination-wrapper">
      <el-pagination
        :current-page="pagination.pageNum"
        :page-size="pagination.pageSize"
        :total="total"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue'

// 定义列配置的接口（移除了 slotName）
interface TableColumn {
  prop: string
  label: string
  width?: string | number
  tooltip?: boolean // 快捷开启 tooltip
  [key: string]: any // 允许其他 el-table-column 的任意属性
}

// 定义分页配置的接口
interface PaginationConfig {
  pageNum: number
  pageSize: number
}

// 获取插槽信息
const slots = useSlots()

// 判断是否存在对应名称的插槽
const hasSlot = (name: string) => {
  return !!slots[name]
}

// 定义 props
const props = defineProps({
  columns: {
    type: Array as PropType<TableColumn[]>,
    required: true
  },
  tableData: {
    type: Array as PropType<any[]>,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  /**
   * 分页配置对象，如果不需要分页，则不传入此 prop
   */
  pagination: {
    type: Object as PropType<PaginationConfig>,
    default: null
  },
  total: {
    type: Number,
    default: 0
  }
})

// 定义 emit 事件
const emit = defineEmits(['pagination-change'])

// 每页显示条数变化
const handleSizeChange = (pageSize: number) => {
  emit('pagination-change', { pageNum: 1, pageSize }) // 通常改变 size 会回到第一页
}

// 当前页码变化
const handleCurrentChange = (pageNum: number) => {
  emit('pagination-change', { pageNum, pageSize: props.pagination?.pageSize })
}
</script>

<style scoped>
.dynamic-table-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.pagination-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
.ellipsis-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}
</style>

<template>
  <el-form ref="formRef" :model="formData" v-bind="$attrs">
    <el-row :gutter="20">
      <el-col
        v-for="item in formConfig"
        :key="item.prop"
        :span="item.span || 24"
      >
        <el-form-item :label="item.label" :prop="item.prop" :rules="item.rules">
          <template v-if="item.type === 'slot'">
            <slot :name="item.slotName" :form-data="formData" :config="item" />
          </template>

          <component
            v-else
            :is="getComponentType(item.type)"
            v-model="formData[item.prop]"
            :placeholder="item.placeholder || `请选择${item.label}`"
            v-bind="item.attrs"
            style="width: 100%"
          >
            <template
              v-if="
                ['select', 'radio-group', 'checkbox-group'].includes(item.type)
              "
            >
              <component
                :is="getOptionType(item.type as OptionType)"
                v-for="opt in item.options"
                :key="opt.value"
                :label="opt.label"
                :value="opt.value"
              />
            </template>
          </component>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import type { FormInstance, FormItemRule } from 'element-plus'
import {
  ElInput,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElTreeSelect,
  ElRadioGroup,
  ElRadioButton,
  ElCheckboxGroup,
  ElCheckboxButton
} from 'element-plus'

// 定义表单项的配置接口
interface FormItem {
  type:
    | 'input'
    | 'select'
    | 'date-picker'
    | 'tree-select'
    | 'radio-group'
    | 'checkbox-group'
    | 'slot'
  prop: string
  label: string
  span?: number // 栅格布局
  placeholder?: string
  options?: { label: string; value: any }[]
  rules?: FormItemRule[]
  slotName?: string
  attrs?: Record<string, any> // 其他组件属性
}

// 定义允许的组件类型
type ComponentType =
  | 'input'
  | 'select'
  | 'date-picker'
  | 'tree-select'
  | 'radio-group'
  | 'checkbox-group'

type OptionType = 'select' | 'radio-group' | 'checkbox-group'

// 组件映射表，使用 shallowRef 避免不必要的深度响应
const componentMap = shallowRef({
  input: ElInput,
  select: ElSelect,
  'date-picker': ElDatePicker,
  'tree-select': ElTreeSelect,
  'radio-group': ElRadioGroup,
  'checkbox-group': ElCheckboxGroup
})

const optionMap = shallowRef({
  select: ElOption,
  'radio-group': ElRadioButton, // 或 ElRadio
  'checkbox-group': ElCheckboxButton // 或 ElCheckbox
})

const getComponentType = (type: ComponentType) =>
  componentMap.value[type] || ElInput
const getOptionType = (type: OptionType) => optionMap.value[type]

// v-model 宏，用于父子组件数据双向绑定
const formData = defineModel<Record<string, any>>('formData', {
  required: true
})

defineProps({
  formConfig: {
    type: Array as PropType<FormItem[]>,
    required: true
  }
})

const formRef = ref<FormInstance>()

// 暴露 el-form 实例给父组件
defineExpose({
  validate: () => formRef.value?.validate(),
  resetFields: () => formRef.value?.resetFields(),
  getFormRef: () => formRef.value
})
</script>

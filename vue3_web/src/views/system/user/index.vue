<template>
  <div>
    <Table
      :columns="tableColumns"
      :table-data="tableData"
      :loading="loading"
      :pagination="paginationState"
      :total="total"
      @pagination-change="handlePageChange"
      :border="true"
    >
      <template #index="{ scope }">
        <span>
          {{
            (paginationState.pageNum - 1) * paginationState.pageSize +
            scope.$index +
            1
          }}
        </span>
      </template>
      <template #operation="{ scope }">
        <el-button type="warning" size="small">禁用</el-button>
        <el-button type="danger" size="small">删除</el-button>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { Table } from '@/components'
import { getUserList } from './api/index'
import type { responseContent } from './api/type.ts'
import { userColumns } from './columns.ts'

const tableColumns = ref(userColumns) // 表格列配置

const loading = ref(false)
const tableData = ref<responseContent['data']>([])
const total = ref(0)
// 分页状态
const paginationState = reactive({
  pageNum: 1,
  pageSize: 20
})

// 处理分页变化事件
const handlePageChange = (params: { pageNum: number; pageSize: number }) => {
  paginationState.pageNum = params.pageNum
  paginationState.pageSize = params.pageSize
  getUser()
}

const getUser = async () => {
  try {
    loading.value = true
    const res = await getUserList(paginationState)
    tableData.value = res.data.data
    total.value = res.data.total
  } finally {
    loading.value = false
  }
}

getUser()
</script>

<style lang="scss" scoped></style>

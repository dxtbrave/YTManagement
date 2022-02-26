<template>
  <div class="user">
    <page-search :search-form-config="searchFormConfig"></page-search>
    <div class="content">
      <hy-table :list-data="userList"
                :prop-list="propList"
                :title="title"
                :show-index-column="showIndexColumn"
                :show-select-column="showSelectColumn">
        <!-- 1.header中的插槽 -->
        <template #header-handler>
          <el-button type="primary" size="medium">新建用户</el-button>
        </template>
        <!--    2.列中的插槽    -->
        <template #status="scope">
          <el-button size="mini"
                     plain
                     :type="scope.row.enable ? 'success' : 'danger'">{{ scope.row.enable ? '启用' : '禁用' }}
          </el-button>
        </template>
        <template #createAt="scope">
          <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
        </template>
        <template #updateAt="scope">
          <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
        </template>
        <template #handler>
          <div class="handle-btns">
            <el-button class="el-icon-edit" size="mini" type="text">编辑</el-button>
            <el-button class="el-icon-delete" size="mini" type="text">删除</el-button>
          </div>
        </template>
      </hy-table>

    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue'
import {useStore} from "@/store";

import PageSearch from '@/components/page-search'
import HyTable from '@/base-ui/table'

import {searchFormConfig} from './config/search.config'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    HyTable
  },
  setup() {
    const store = useStore()
    store.dispatch('system/getPageListAction', {
      pageUrl: '/users/list',
      queryInfo: {
        offset: 0,
        size: 10
      }
    })

    const userList = computed(() => store.state.system.userList)
    const userCount = computed(() => store.state.system.userCount)

    const title = '用户列表'


    const propList = [
      {prop: 'name', label: '用户名', minWidth: '100'},
      {prop: 'realname', label: '真实姓名', minWidth: '100'},
      {prop: 'cellphone', label: '手机号码', minWidth: '120'},
      {prop: 'enable', label: '状态', minWidth: '100', slotName: 'status'},
      {prop: 'createAt', label: '创建时间', minWidth: '250', slotName: 'createAt'},
      {prop: 'updateAt', label: '更新时间', minWidth: '250', slotName: 'updateAt'},
      {label: '操作', minWidth: '120', slotName: 'handler'}
    ]

    const showIndexColumn: boolean = true
    const showSelectColumn: boolean = true


    return {
      searchFormConfig,
      title,
      userList,
      userCount,
      propList,
      showIndexColumn,
      showSelectColumn
    }
  }
})
</script>

<style scoped>
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>

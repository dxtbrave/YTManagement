<template>
  <div class="page-content">
    <hy-table :list-data="dataList"
              v-bind="contentTableConfig">
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
</template>

<script lang="ts">
import { defineComponent,computed } from "vue";
import {useStore} from "@/store";

import HyTable from '@/base-ui/table'

export default defineComponent({
  components:{
    HyTable
  },
  props:{
    contentTableConfig:{
      type:Object,
      required:true
    },
    pageName:{
      type:String,
      required: true
    }
  },
  setup(props,{emit}) {
    const store = useStore()
    store.dispatch('system/getPageListAction', {
      pageName:props.pageName,
      queryInfo: {
        offset: 0,
        size: 10
      }
    })
    const dataList = computed(() => store.getters[`system/pageListData`](props.pageName))
    // const userCount = computed(() => store.state.system.userCount)
    return {
      dataList
    };
  },
});
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>

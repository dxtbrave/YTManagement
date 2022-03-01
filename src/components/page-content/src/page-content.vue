<template>
  <div class="page-content">
    <hy-table :list-data="dataList"
              :list-count="dataCount"
              v-bind="contentTableConfig"
              v-model:page="pageInfo"
    >
      <!-- 1.header中的插槽 -->
      <template #header-handler>
        <el-button v-if="isCreate" type="primary" size="small" plain @click="handleNewClick">新建数据</el-button>
      </template>
      <!--    2.列中的插槽    -->
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <div class="handle-btns">
          <el-button v-if="isUpdate" class="el-icon-edit" size="mini" type="text" @click="handleEditClick(scope.row)">编辑</el-button>
          <el-button v-if="isDelete" class="el-icon-delete" size="mini" type="text" @click="handleDeleteClick(scope.row)">删除</el-button>
        </div>
      </template>

      <!--   在page-content中动态插入剩余的插槽   -->
      <template v-for="item in otherPropSlots" :key="item.prop" #[item.slotName]="scope">
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </hy-table>
  </div>
</template>

<script lang="ts">
import {defineComponent, computed, ref, watch} from "vue";
import {useStore} from "@/store";

import {usePermission} from '@/hooks/use-permission'

import HyTable from '@/base-ui/table'

export default defineComponent({
  components: {
    HyTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  emits:['newBtnClick','editBtnClick'],
  setup(props, {emit}) {
    const store = useStore()

    // 0.获取操作的权限
    const isCreate = usePermission(props.pageName,'create')
    const isUpdate = usePermission(props.pageName,'update')
    const isDelete = usePermission(props.pageName,'delete')
    const isQuery = usePermission(props.pageName,'query')

    // 1.双向绑定pageInfo
    const pageInfo = ref({currentPage: 1, pageSize: 10})
    watch(pageInfo, () => getPageData())

    // 2.发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()


    // 3.从vuex中获取数据
    const dataList = computed(() => store.getters[`system/pageListData`](props.pageName))
    const dataCount = computed(() => store.getters[`system/pageListCount`](props.pageName))

    // 4.获取其他的动态插槽名称
    const otherPropSlots = props.contentTableConfig?.propList.filter(
        (item: any) => {
          if (item.slotName === 'createAt' ||
              item.slotName === 'updateAt' ||
              item.slotName === 'handler') {
            return false
          }
          return true
        })

    // 5.删除/编辑/新建操作
    const handleDeleteClick = (item:any) => {
      store.dispatch('system/deletePageDataAction',{
        pageName:props.pageName,
        id:item.id
      })
    }
    const handleNewClick = () => {
      emit('newBtnClick')
    }

    const handleEditClick = (item:any) => {
      emit('editBtnClick',item)
    }

    return {
      dataList,
      dataCount,
      getPageData,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleDeleteClick,
      handleNewClick,
      handleEditClick
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

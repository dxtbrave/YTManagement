<template>
  <div class="page-modal">
    <el-dialog
        title="新建用户"
        v-model="dialogVisible"
        width="30%"
        destroy-on-close
    >
      <hy-form v-bind="modalConfig" v-model="formData"></hy-form>
      <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleConfirmClick">确 定</el-button>
    </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, watch} from "vue";
import {useStore} from "@/store";

import HyForm from '@/base-ui/form'

export default defineComponent({
  components: {
    HyForm
  },
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const dialogVisible = ref(false)
    const formData = ref<any>({})

    watch(() => props.defaultInfo,
        (newValue) => {
          for (const item of props.modalConfig.formItems) {
            formData.value[`${item.field}`] = newValue[`${item.field}`]
          }
        }
    )

    // 点击确定按钮
    const store = useStore()
    const handleConfirmClick = () => {

      if (Object.keys(props.defaultInfo).length){
        // 编辑操作
        store.dispatch('system/editPageDataAction',{
          pageName:props.pageName,
          editData:{...formData.value},
          id:props.defaultInfo.id
        })
      }else{
        // 新建操作
        store.dispatch('system/createPageDataAction',{
          pageName:props.pageName,
          newData:{...formData.value}
        })
      }
      dialogVisible.value = false
    }


    return {
      dialogVisible,
      formData,
      handleConfirmClick
    };
  },
});
</script>

<style scoped></style>

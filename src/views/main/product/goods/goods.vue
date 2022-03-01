<template>
  <div class="goods">
    <page-content :content-table-config="contentTableConfig" page-name="goods">
      <template #image="scope">
        <el-image
            style="width: 80px; height: 80px"
            :src="scope.row.imgUrl"
            :preview-src-list="[scope.row.imgUrl]"
        >
        </el-image>
      </template>
      <template #status="scope">
        <el-button size="mini"
                   plain
                   :type="scope.row.status ? 'success' : 'danger'">{{ scope.row.status ? '启用' : '禁用' }}
        </el-button>
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/page-content'
import {contentTableConfig} from './config/content.config'

export default defineComponent({
  name: 'goods',
  components:{
    PageContent
  },
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>

<template>
  <div class="role">
    <page-search :search-form-config="searchFormConfig"></page-search>
    <page-content :content-table-config="contentTableConfig" page-name="role"></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/page-content'
import {contentTableConfig} from './config/content.config'
import PageSearch from '@/components/page-search'
import {searchFormConfig} from './config/search.config'


export default defineComponent({
  name: 'role',
  components:{
    PageContent,
    PageSearch
  },
  setup() {
    return {
      contentTableConfig,
      searchFormConfig
    }
  }
})
</script>

<style scoped></style>

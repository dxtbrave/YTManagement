<template>
  <div class="user">
    <page-search :search-form-config="searchFormConfig"
                 @resetBtnClick="handleResetClick"
                 @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content ref="pageContentRef"
                  :content-table-config="contentTableConfig"
                  page-name="users"
    ></page-content>
  </div>
</template>

<script lang="ts">
import {defineComponent,ref} from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

import {searchFormConfig} from './config/search.config'
import {contentTableConfig} from './config/content.config'

import {usePageSearch} from '@/hooks/use-page-search'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    const [pageContentRef,handleResetClick,handleQueryClick] = usePageSearch()

    return {
      searchFormConfig,
      contentTableConfig,
      handleResetClick,
      handleQueryClick,
      pageContentRef

    }
  }
})
</script>

<style scoped>

</style>

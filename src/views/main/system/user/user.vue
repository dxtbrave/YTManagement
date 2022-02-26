<template>
  <div class="user">
    <page-search :search-form-config="searchFormConfig"></page-search>
    <page-content :content-table-config="contentTableConfig" page-name="users"></page-content>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

import {searchFormConfig} from './config/search.config'
import {contentTableConfig} from './config/content.config'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    return {
      searchFormConfig,
      contentTableConfig,
    }
  }
})
</script>

<style scoped>

</style>

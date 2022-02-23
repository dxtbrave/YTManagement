<template>
  <div class="nav-header">
    <i class="fold-menu " :class="isFold ? 'el-icon-s-unfold' :'el-icon-s-fold'" @click="handleFoldClick" ></i>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";

export default defineComponent({
  emits:['foldChange'],
  setup(props,{emit}) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange',isFold.value)
    }

    return {
      isFold,
      handleFoldClick
    };
  },
});
</script>

<style scoped lang="less">
.nav-header{
  user-select:none;

  .fold-menu{
    font-size:26px;
    cursor: pointer;

  }
}
</style>

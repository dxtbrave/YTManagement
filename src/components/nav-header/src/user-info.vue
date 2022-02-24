<template>
    <div class="user-info">
      <el-dropdown>
          <span class="el-dropdown-link">
            <el-avatar>
              <img src="~@/assets/img/lixiaoyao.jpg" alt="">
            </el-avatar>
            <span>{{}}</span>
          </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="el-icon-circle-close">退出登录</el-dropdown-item>
            <el-dropdown-item divided icon="el-icon-user">用户信息</el-dropdown-item>
            <el-dropdown-item icon="el-icon-setting">系统管理</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {useStore} from "vuex";

export default defineComponent({
  setup() {
    const store = useStore()
    return {};
  },
});
</script>

<style scoped lang="less"></style>

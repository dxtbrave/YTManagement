<template>
    <div class="user-info">
      <el-avatar>
        <img src="~@/assets/img/lixiaoyao.jpg" alt="">
      </el-avatar>
      <el-dropdown>
          <span class="el-dropdown-link">
            <span class="user-name">{{userName}}</span>
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
    const userName = store.state.login.userInfo.name
    return {
      userName
    };
  },
});
</script>

<style scoped lang="less">
.user-info{
  display: flex;
  justify-content: center;
  align-items: center;

  .user-name{
    margin-left: 10px;
    margin-right: 10px;
    font-size: 15px;
    font-weight: 600;
  }
}
</style>

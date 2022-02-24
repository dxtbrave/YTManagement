<template>
  <div class="nav-menu">
    <div class="logo">
<!--      <img class="img" src="~@/assets/img/logo.svg" alt="logo">-->
      <img class="img" src="~@/assets/img/vuelogo.png" alt="logo">
      <span class="title" v-if="!collapse">云天后台</span>
    </div>
    <el-menu :default-active="defaultValue"
             class="el-menu-vertical"
             :collapse="collapse"
             background-color="#0c2135"
             text-color="#b7bdc3"
             active-text-color="#0a60bd"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!--    二级菜单    -->
        <template v-if="item.type === 1">
          <!--    二级菜单可以展开的标题      -->
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <i v-if="item.icon" :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <!--    遍历里面的item      -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id + ''" @click="handleMenuItemClick(subitem)">
                <i v-if="subitem.icon" :class="subitem.icon"></i>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>

        </template>
        <!--   一级菜单     -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <!--   若icon有值则展示   -->
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import {defineComponent, computed, ref} from "vue";
import {useStore} from "@/store";
import {useRouter,useRoute} from "vue-router";

import { pathMapToMenu } from '@/utils/map-menus'

export default defineComponent({
  props:{
    collapse:{
      type:Boolean,
      default() {
        return false
      }
    }
  },
  setup() {
    // store
    const store = useStore()
    const userMenus = computed(() => store.state.login.userMenus)


    // router
    const router = useRouter()
    const route = useRoute()
    const currentPath = route.path

    // data
    const menu = pathMapToMenu(userMenus.value,currentPath)
    const defaultValue = ref(menu.id + '')

    // event handle
    const handleMenuItemClick = (item:any) => {
      router.push({
        path:item.url ?? '/not-found'
      })
    }




    return {
      userMenus,
      handleMenuItemClick,
      defaultValue
    };
  },
});
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;
  user-select:none;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 8px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>

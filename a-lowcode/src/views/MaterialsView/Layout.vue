<template>
  <!-- 组件市场除了左侧的导航条选择，剩余的部分分为三栏 -->
  <div class="layout-container flex">
    <!-- 选择具体的业务组件 -->
    <div class="left flex wrap space-between">
      <slot />
    </div>
    <!-- 显示对应的业务组件 -->
    <div class="center">
      <!-- 对应的组件的路由出口 -->
      <RouterView v-slot="{ Component }">
        <!-- 配合展示动态组件 -->
        <component 
          :is="Component"
          :status="currentCom.status"
          :serialNum="1"
        />
      </RouterView>
    </div>
    <!-- 编辑面板 -->
    <div class="right">编辑面板</div>
  </div>
</template>

<script setup lang="ts">
import { useMaterialStore } from "@/stores/useMaterial";
import { computed } from "vue";

//! 数据仓库
const store = useMaterialStore()
//! 获取当前选中的组件状态数据，用计算属性，当store那边改了当前组件，这边触发
const currentCom = computed(() => store.coms[store.currentMaterialCom as keyof typeof store.coms])
</script>

<style scoped lang="scss">
.layout-container {
  width: 100%;
  // Header组件高度50px，h1高度50px，上下margin 20px，最后20px是额外多减去一部分，避免贴底
  height: calc(100vh - 100px - 40px - 20px);
  align-items: flex-start;
  border: 1px solid var(--border-color);
  border-top-right-radius: var(--border-radius-lg);
  border-bottom-left-radius: var(--border-radius-lg);
  border-bottom-right-radius: var(--border-radius-lg);
}
.left {
  width: 180px;
  text-align: center;
  align-items: flex-start;
  padding: 20px;
}
.center {
  width: 550px;
  // 多减去的60px是上下的padding，，最后20px是额外多减去一部分，避免贴底
  height: calc(100vh - 100px - 40px - 60px - 20px);
  overflow-y: scroll;
  padding: 30px;
  border-left: 1px solid var(--border-color);
}
.right {
  width: 350px;
  height: calc(100vh - 100px - 40px - 20px);
  overflow-y: scroll;
  border-left: 1px solid var(--border-color);
}
</style>

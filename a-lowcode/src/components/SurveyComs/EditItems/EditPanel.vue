<script setup lang="ts">
import type { IComStatus } from '@/types';

defineProps<{
  //! 完全体对象
  com: IComStatus;
}>()
</script>

<template>
  <div class="editPanelContainer">
    
    <div v-for="(item, key) in com.status" :key="item.id" class="mb-20">
      <component
        v-if="item.isShow" 
        :is="item.editCom"
        :configKey="key"
        v-bind="item"
      />
    </div>
    
  </div>
</template>
<style scoped lang="scss">
.editPanelContainer {
  padding: 30px;
  background-color: var(--bg-color);
}
</style>
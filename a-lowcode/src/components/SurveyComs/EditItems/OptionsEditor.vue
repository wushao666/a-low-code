<script setup lang="ts">
import type { StatusStringArr, VueComType } from '@/types';
import { inject } from 'vue';
import { ref } from 'vue';
import { Plus, Minus } from '@element-plus/icons-vue';

const props = defineProps<{
  configKey: string;
  status: string[];
  currentStatus: number; // Added currentStatus with proper type
  isShow: boolean;
  editCom: VueComType;
  id: string;
}>();
const updateStatus = inject('updateStatus') as (key: string, payload?: number | string | boolean | object) => void;
const handleAddOption = () => {
  console.log('添加选项');
  updateStatus(props.configKey);
};
const handleRemoveOption = (index: number) => {
  console.log('移除选项');
  updateStatus(props.configKey, index);
};

</script>

<template>
  <div>
    <div>
      <div class="flex align-items-center mb-10">
        <div class="mr-10">选项</div>
        <!-- <el-icon><CirclePlus /></el-icon> -->
        <el-button 
          :icon="Plus" 
          circle size="small" 
          @click="handleAddOption" 
        />
      </div>
    </div>
    <div v-for="(item, index) in status" :key="index" class="flex align-items-center">
      <el-input
        class="mt-5 mb-5"
        v-model="status[index]"
        :placeholder="`选项${index + 1}`"
      />
      <el-button 
        type="danger"
        class="ml-10"
        size="small"
        :icon="Minus"
        circle
        @click="handleRemoveOption(index)" 
      />
    </div>
  </div>
</template>

<style scoped></style>
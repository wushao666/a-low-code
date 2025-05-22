<script setup lang="ts">
import type { OptionsProps, VueComType } from '@/types';
import { inject } from 'vue';
import { ref } from 'vue';
import { Plus, Minus } from '@element-plus/icons-vue';
import ButtonGroup from './ButtonGroup.vue'

const props = defineProps<{
  configKey: string;
  //! 这里的 status 是一个数组，表示当前组件的状态
  status: string[];
  //! 这里的 currentStatus 是一个数字，表示当前选中的状态
  currentStatus: number; // Added currentStatus with proper type
  isShow: boolean;
  editCom: VueComType;
  id: string;
}>();
const updateStatus = inject('updateStatus') as (key: string, payload?: number | string | boolean | object) => void;

const handlePosition = (newValue: number) => {
  updateStatus(props.configKey, newValue);
};

</script>

<template>
  <ButtonGroup 
    title="居中设置"
    :status="status[currentStatus]">
    <el-button-group>
      <el-button
        :class="{
          select: currentStatus === 0,
        }"
        @click="handlePosition(0)">
        <font-awesome-icon icon="align-left" />
      </el-button>
    <el-button 
        :class="{
          select: currentStatus === 1,
        }"
        @click="handlePosition(1)" 
      >
      <font-awesome-icon icon="align-center" />
    </el-button>
    </el-button-group>
  </ButtonGroup>
</template>

<style scoped></style>


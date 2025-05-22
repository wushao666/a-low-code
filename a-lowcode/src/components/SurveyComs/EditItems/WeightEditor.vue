<script setup lang="ts">
import type { VueComType } from '@/types';
import { inject } from 'vue';
import ButtonGroup from './ButtonGroup.vue'

const props = defineProps<{
  configKey: string;
  status: string[];
  currentStatus: number; // Added currentStatus with proper type
  isShow: boolean;
  editCom: VueComType;
  id: string;
}>();
const updateStatus = inject('updateStatus') as (key: string, payload?: number | string | boolean | object) => void;
const title = props.configKey === 'titleWeight' ? '标题' : '描述';
const handleChangeWeight = (newValue: number) => {
  updateStatus(props.configKey, newValue);
};

</script>

<template>
  <ButtonGroup :title="`${title}粗细`" :status="`${status[currentStatus]}`">
    <el-button-group>
      <el-button :class="{
        select: currentStatus === 0,
      }" @click="handleChangeWeight(0)">
        <font-awesome-icon icon="bold" size="lg" />
      </el-button>
      <el-button :class="{
        select: currentStatus === 1,
      }" @click="handleChangeWeight(1)">
        <font-awesome-icon icon="font" size="lg" />
      </el-button>
    </el-button-group>
  </ButtonGroup>
</template>

<style scoped></style>

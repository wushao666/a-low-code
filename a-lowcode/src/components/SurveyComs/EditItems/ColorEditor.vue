<template>
  <div class="flex align-items-center space-between">
    <div>{{ title }}</div>
    <el-color-picker 
      v-model="color"
      color-format="hex"
      show-alpha 
      :predefine="predefineColors"
      @change="handleColorChange"
    />
  </div>
</template>

<script lang="ts" setup>
import type { VueComType } from '@/types/common';
import { inject } from 'vue';
import { ref } from 'vue'

const props = defineProps<{
  configKey: string;
  status: string;
  isShow: boolean;
  editCom: VueComType;
  id: string;
}>();

const updateStatus = inject('updateStatus') as (key: string, payload?: number | string | boolean | object) => void;
const color = ref(props.status)
const title = props.configKey === 'titleColor' ? '标题颜色' : '描述颜色'
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
const handleColorChange = (newColor: string) => {
  console.log('newColor', newColor);
  
  updateStatus(props.configKey, newColor)
}
</script>

<style scoped></style>

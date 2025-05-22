<script setup lang="ts">
import type { VueComType } from '@/types';
import { inject } from 'vue';
import { ref } from 'vue';

const props = defineProps<{
  configKey: string;
  status: string;
  isShow: boolean;
  editCom: VueComType;
  id: string;
}>();
const updateStatus = inject('updateStatus') as (key: string, value: string) => void;

const text = ref(props.status);
const handleInput = (newValue: string) => {
  updateStatus(props.configKey, newValue)
};

</script>

<template>
  <div>
    <div class="mb-10">描述内容</div>
    <el-input
      v-model="text"
      :autosize="{ minRows: 2, maxRows: 6 }"
      type="textarea"
      @update:model-value="handleInput"
      placeholder="请输入描述内容"
    />
  </div>
</template>

<style scoped></style>
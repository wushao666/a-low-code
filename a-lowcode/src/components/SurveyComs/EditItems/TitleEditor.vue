<script setup lang="ts">
import type { VueComType } from '@/types';
import type { TextProps } from '@/types/configStatus';
import { inject } from 'vue';
import { ref } from 'vue';

// 父组件直接用 v-bind="item" 传递过来所有的数据
const props = defineProps<{
  configKey: string;
  status: string;
  isShow: boolean;
  editCom: VueComType;
  id: string;
}>();
const updateStatus = inject('updateStatus') as (key: string, value: string) => void;

// 不要直接用 v-model 绑定 status，因为这样会导致数据双向绑定，破坏单向数据流
// 使用ref变量副本来存储，保证单向数据流
const text = ref(props.status);
const handleInput = (newValue: string) => {
  // 如果就两级组件，可以用 emit 来通知父组件更新数据
  // 多级嵌套使用provide inject 来共享数据
  updateStatus(props.configKey, newValue)
};

</script>

<template>
  <div>
    <div class="mb-10">标题内容</div>
    <el-input
      v-model="text"
      @update:model-value="handleInput"
      placeholder="请输入标题内容"
    />
  </div>
</template>

<style scoped></style>

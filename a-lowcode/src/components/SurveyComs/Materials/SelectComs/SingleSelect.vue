<template>
  <div>
    <MaterialsHeader 
      :serial-num="statusComputed.serialNum" 
      :title="statusComputed.title" 
      :desc="statusComputed.desc"
      :title-italic="statusComputed.titleItalic"
      :descSize="statusComputed.descSize"
      :titleSize="statusComputed.titleSize"
      :title-weight="statusComputed.titleWeight"
      :desc-weight="statusComputed.descWeight"
      :desc-italic="statusComputed.descItalic"
      :titleColor="statusComputed.titleColor"
      :descColor="statusComputed.descColor"
    />
    <div class="radio-group">
      <el-radio-group>
        <el-radio 
          :value="item" 
          v-for="(item, index) in statusComputed.options">
          {{ item }}
        </el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import MaterialsHeader from '@/components/SurveyComs/Common/MaterialsHeader.vue';
import { getPropsCurrentStatus, getPropsTextStatus, getPropsOptionStatus, getPropsStatus } from '@/utils';
import { computed } from 'vue';
import type { OptionsStatus } from "@/types";

const props = defineProps<{
  serialNum: number;
  status: OptionsStatus;
}>()
const statusComputed = computed(() => {
  return {
    serialNum: props.serialNum ? props.serialNum : 1,
    //！ 这里的status是从父组件传过来的
    title: getPropsTextStatus(props.status.title),
    desc: getPropsTextStatus(props.status.desc),
    options: getPropsStatus(props.status.options),
    titleItalic: getPropsCurrentStatus(props.status.titleItalic),
    descItalic: getPropsCurrentStatus(props.status.descItalic),
    descSize: getPropsOptionStatus(props.status.descSize),
    titleSize: getPropsOptionStatus(props.status.titleSize),
    titleWeight: getPropsCurrentStatus(props.status.titleWeight),
    descWeight: getPropsCurrentStatus(props.status.descWeight),
    titleColor: getPropsTextStatus(props.status.titleColor),
    descColor: getPropsTextStatus(props.status.descColor),
  }
})
</script>

<style scoped></style>

<template>
  <div>
    <div 
      class="container mb-15" 
      >
      <!-- 标题 -->
      <h2 
        class="title font-weight-100" 
        :style="{
          'color': titleColor,
          'font-size': `${titleSize}px`,
        }"
        >
        <span>{{ serialNum }}. </span>
        <span :class="{
          'font-italic': !titleItalic,
          'font-bold': !titleWeight,
        }">
          {{ title }}
        </span>
      </h2>
      <!-- 描述 -->
      <div 
        class="desc" 
        :style="{
          'font-size': `${descSize}px`,
          'color': descColor,
        }"
        :class="{
          'font-bold': !descWeight,
          'font-italic': !descItalic,
        }">
        {{ desc }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  serialNum: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    default: '这是一个标题'
  },
  desc: {
    type: String,
    default: () => {
      return '这是一个描述'
    }
  },
  titleItalic: {
    type: Number,
    // 0是斜体，1是正常
    default: 1
  },
  descItalic: {
    type: Number,
    // 0是斜体，1是正常
    default: 1
  },
  descSize: {
    type: String,
    default: '16'
  },
  titleSize: {
    type: String,
    default: () => {
      return '16'
    }
  },
  titleWeight: {
    type: Number,
    // 0是加粗，1是正常
    default: 1
  },
  descWeight: {
    type: Number,
    // 0是加粗，1是正常
    default: 1
  },
  descColor: {
    type: String,
    default: () => {
      return '#000'
    }
  },
  titleColor: {
    type: String,
    default: () => {
      return '#000'
    }
  },
})
</script>

<style scoped lang="scss">
.container {
  > h2 {
    font-size: 20px;
    > span {
      margin: 0 5px;
    }
  }
}
.desc {
  font-size: var(--font-size-base);
  color: var(--font-color-light);
  text-indent: 5px;
}
</style>

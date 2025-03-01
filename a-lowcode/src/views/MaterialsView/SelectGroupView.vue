<template>
  <Layout>
    <router-link
      class="link-item mb-15"
      exact-active-class="link-item-active"
      to="/materials/select-group/single-select"
      >单选题</router-link
    >
    <router-link
      class="link-item mb-15"
      exact-active-class="link-item-active"
      to="/materials/select-group/multi-select"
      >多选题</router-link
    >
    <router-link
      class="link-item mb-15"
      exact-active-class="link-item-active"
      to="/materials/select-group/option-select"
      >下拉选择</router-link
    >
    <router-link
      class="link-item mb-15"
      exact-active-class="link-item-active"
      to="/materials/select-group/single-pic-select"
      >图片单选题</router-link
    >
    <router-link
      class="link-item mb-15"
      exact-active-class="link-item-active"
      to="/materials/select-group/multi-pic-select"
      >图片多选题</router-link
    >
  </Layout>
</template>

<script setup lang="ts">
import Layout from './Layout.vue'
</script>

<style scoped></style>

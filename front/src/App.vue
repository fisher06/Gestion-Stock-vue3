<script setup lang="ts">
import HeaderLayout from './layout/HeaderLayout.vue'
import BodyLayout from './layout/BodyLayout.vue'
import FooterLayout from './layout/FooterLayout.vue'
</script>

<template>
  <div id="app">
    <HeaderLayout label="Gestion Stock"></HeaderLayout>
    <BodyLayout></BodyLayout>
    <FooterLayout></FooterLayout>
  </div>
</template>

<style scoped lang="scss">
#app {
  font-family: sans-serif;

  min-height: 100vh;

  display: flex;
  flex-flow: column;
  justify-content: space-between;
}
</style>

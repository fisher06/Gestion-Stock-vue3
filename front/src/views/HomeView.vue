<script setup lang="ts">
import MainTitle from '@/components/MainTitle.vue'
</script>

<template>
  <main>
    <MainTitle>
      <template v-slot:title>Gérer efficacement votre stock !</template>
    </MainTitle>
    <router-link to="/stock" class="button primary">
      <span>Voir le stock</span>
      <fa-icon icon="fa-solid fa-angle-right" />
    </router-link>
  </main>
</template>

<style scoped lang="scss">
main {
  flex: 0;
}
</style>

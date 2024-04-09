<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({
  label: {
    type: String,
    required: true
  }
})
</script>

<template>
  <header>
    <RouterLink to="/">
      <img src="/assets/logo.svg" alt="Logo" />
      <span>{{ props.label }}</span>
    </RouterLink>
  </header>
</template>

<style scoped lang="scss">
header {
  background: #eee;
  height: 3em;
  padding: 0 0.5em;
  display: flex;
  align-items: center;

  a {
    display: flex;
    align-items: center;
    gap: 0.5em;

    color: inherit;
    text-decoration: inherit;

    &:hover {
      text-decoration: underline;
    }

    img {
      height: 2.5em;
    }

    span {
      font-size: 1.3em;
      font-weight: bold;
    }
  }
}
</style>

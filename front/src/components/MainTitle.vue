<script lang="ts" setup>
import { onUnmounted } from 'vue'
import { onMounted, useSlots } from 'vue'

const slots = useSlots()

onMounted(() => {
  const slotContent = slots.default?.()[0].children
  window.document.title = `Gestion Stock - ${slotContent}`
})

onUnmounted(() => {
  window.document.title = 'Gestion Stock'
})
</script>

<template>
  <h1>
    <slot></slot>
  </h1>
</template>

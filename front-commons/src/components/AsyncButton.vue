<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  icon: string
  action: () => Promise<void>
}>()

const isDoing = ref(false)

const emits = defineEmits<{
  error: [errorMsg: string]
  start: []
}>()

const doAction = async () => {
  try {
    isDoing.value = true
    emits('start')
    await props.action()
  } catch (err) {
    console.log('err: ', err)
    if (err instanceof Error) {
      emits('error', err.message)
    } else {
      emits('error', 'Erreur technique')
    }
  } finally {
    isDoing.value = false
  }
}
</script>

<template>
  <button @click="doAction" :disabled="isDoing">
    <fa-icon :icon="isDoing ? 'fa-solid fa-circle-notch' : props.icon" :spin="isDoing" />
  </button>
</template>

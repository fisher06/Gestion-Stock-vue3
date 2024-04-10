<script setup lang="ts">
import { ref, computed } from 'vue'
import { FontAwesomeIcon as FaIcon } from '@fortawesome/vue-fontawesome'
import { faCircleNotch, type IconDefinition } from '@fortawesome/free-solid-svg-icons'

const props = defineProps<{
  icon: object | string[] | string | IconDefinition
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

const iconComputed = computed(() => (isDoing.value ? faCircleNotch : props.icon))
</script>

<template>
  <button @click="doAction" :disabled="isDoing">
    <fa-icon :icon="iconComputed" :spin="isDoing" />
  </button>
</template>

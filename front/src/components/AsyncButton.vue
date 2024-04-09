<script lang="ts">
export default {
  name: 'AsyncButton',
  props: {
    icon: {
      type: String,
      required: true
    },
    action: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      isDoing: false
    }
  },
  methods: {
    async doAction() {
      try {
        this.isDoing = true
        await this.action()
      } catch (err) {
        console.log('err: ', err)
      } finally {
        this.isDoing = false
      }
    }
  }
}
</script>

<template>
  <button @click="doAction" :disabled="isDoing">
    <fa-icon :icon="isDoing ? 'fa-solid fa-circle-notch' : icon" :spin="isDoing" />
  </button>
</template>

<style scoped lang="scss"></style>

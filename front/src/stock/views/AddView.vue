<script lang="ts">
import { useArticleStore } from '../store/ArticleStore'

export default {
  name: 'HomeView',
  data() {
    return {
      newArticle: {
        name: 'Truc',
        price: 0,
        qty: 1
      },
      isAdding: false,
      errorMsg: ''
    }
  },
  methods: {
    async handleSubmit() {
      try {
        this.isAdding = true
        // take a snapshot of a the reactive newArticle data.
        const newArticle = { ...this.newArticle }
        const articleStore = useArticleStore()
        await articleStore.add(newArticle)
        await this.$router.push({ name: 'stockList' })
      } catch (err) {
        console.log('err: ', err)
        this.errorMsg = err.message
      } finally {
        this.isAdding = false
      }
    }
  }
}
</script>

<template>
  <main>
    <h1>Ajouter un article</h1>
    <form @submit.prevent="handleSubmit()">
      <label>
        <span>Nom</span>
        <input type="text" v-model="newArticle.name" />
        <span class="error"></span>
      </label>
      <label>
        <span>Prix</span>
        <input type="number" v-model="newArticle.price" />
        <span class="error"></span>
      </label>
      <label>
        <span>Quantité</span>
        <input type="number" v-model="newArticle.qty" />
        <span class="error"></span>
      </label>
      <div class="error">
        {{ errorMsg }}
      </div>
      <button class="primary" :disabled="isAdding">
        <fa-icon
          :icon="'fa-solid ' + (this.isAdding ? 'fa-circle-notch' : 'fa-plus')"
          :spin="isAdding"
        />
        <span>Ajouter</span>
      </button>
    </form>
  </main>
</template>

<style scoped lang="scss">
form {
  display: flex;
  flex-flow: column;
  gap: 0.5em;

  width: 100%;
  max-width: 25em;

  label {
    display: flex;
    flex-flow: column;

    input {
      padding: 0.5em 1em;
      border: 0.1em solid #aaa;
      border-radius: 0.3em;
    }
  }

  div.error {
    height: 3em;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
}
</style>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Article } from '@gestionstock/commons'
import { useArticleStore } from '../store/ArticleStore'
import AsyncButton from '@/components/AsyncButton.vue'
import { computed, ref } from 'vue'
import MainTitle from '@/components/MainTitle.vue'

const selectedArticles = ref(new Set<Article>())
const errorMsg = ref('')
const articleStore = useArticleStore()
const addViewRoute = {
  name: 'stockAdd'
}

const select = (a: Article) => {
  console.log('select')
  selectedArticles.value.has(a) ? selectedArticles.value.delete(a) : selectedArticles.value.add(a)
  selectedArticles.value = new Set(selectedArticles.value)
}

const remove = async (): Promise<void> => {
  const ids = [...selectedArticles.value].map((a) => a.id)
  await articleStore.remove(ids)
  selectedArticles.value.clear()
}

const initialize = async () => {
  if (articleStore.articles === undefined) {
    try {
      await articleStore.refresh()
    } catch (err) {
      console.error('err: ', err)
      if (err instanceof Error) {
        setError(err.message)
        return
      }
      setError('Erreur Technique')
    }
  }
}

const articles = computed(() => articleStore.articles)

const resetError = () => {
  errorMsg.value = ''
}
const setError = (err: string) => {
  errorMsg.value = err
}

initialize()
</script>

<template>
  <main>
    <MainTitle>
      <template v-slot:title>Liste des articles</template>
    </MainTitle>
    <div class="content">
      <nav>
        <AsyncButton
          @start="resetError"
          @error="setError"
          title="Rafraîchir"
          :action="articleStore.refresh"
          icon="fa-solid fa-rotate-right"
        >
        </AsyncButton>
        <router-link :to="addViewRoute" class="button" title="Ajouter">
          <fa-icon icon="fa-solid fa-plus" />
        </router-link>
        <AsyncButton
          :hidden="selectedArticles.size === 0"
          title="Supprimer"
          :action="remove"
          icon="fa-solid fa-trash-can"
          @start="resetError"
          @error="setError"
        >
        </AsyncButton>
      </nav>
      <div class="error">
        {{ errorMsg }}
      </div>
      <table>
        <thead>
          <th class="name">Nom</th>
          <th class="price">Prix</th>
          <th class="qty">Quantité</th>
        </thead>
        <tbody>
          <tr
            v-for="a in articles"
            :key="a.id"
            @click="select(a)"
            :class="{ selected: selectedArticles.has(a) }"
          >
            <td class="name">{{ a.name }}</td>
            <td class="price number">{{ a.price }} €</td>
            <td class="qty number">{{ a.qty }}</td>
          </tr>
          <tr v-if="articles === undefined && errorMsg === ''">
            <td colspan="3">
              <div class="loading">
                <fa-icon icon="fa-solid fa-circle-notch" :spin="true"></fa-icon>
                <span>Loading...</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<style scoped lang="scss">
nav {
  display: flex;
  gap: 0.5em;
}

div.error {
  height: 2em;
  display: flex;
  align-items: center;
  font-weight: bold;
}

table {
  border: 0.1em solid #aaa;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 0.3em;
  overflow: hidden;

  th,
  td {
    padding: 0.5em 1em;
  }

  thead {
    background: #aaa;
  }

  tbody {
    cursor: pointer;
    tr:nth-child(even) {
      background: #eee;
    }

    tr:hover {
      background: #ddd;
    }

    tr.selected {
      background: #ccc;
    }

    .number {
      text-align: right;
    }
  }

  div.loading {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
  }
}
</style>

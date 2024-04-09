<script setup lang="ts">
import type { Article } from '../interfaces/Article'
import { useArticleStore } from '../store/ArticleStore'
import AsyncButton from '@/components/AsyncButton.vue'
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { computed } from 'vue'

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

const remove = async () => {
  try {
    errorMsg.value = ''
    const ids = [...selectedArticles.value].map((a: Article) => a.id)
    await articleStore.remove(ids)
    selectedArticles.value.clear()
  } catch (err) {
    console.log('err: ', err)
    errorMsg.value = 'Erreur Technique'
  }
}

const refresh = async () => {
  try {
    errorMsg.value = ''
    console.log('refreshing')
    await articleStore.refresh()
    console.log('refreshed')
  } catch (err) {
    console.log('err: ', err)
    errorMsg.value = 'Erreur Technique'
  }
}

onMounted(() => {
  if (articleStore.articles === undefined) {
    articleStore.refresh()
  }
})

const articles = computed(() => {
  return articleStore.articles
})
</script>

<template>
  <main>
    <h1>Liste des articles</h1>
    <div class="content">
      <nav>
        <AsyncButton title="Rafraîchir" :action="refresh" icon="fa-solid fa-rotate-right">
        </AsyncButton>
        <router-link append :to="addViewRoute" class="button" title="Ajouter">
          <fa-icon icon="fa-solid fa-plus" />
        </router-link>
        <AsyncButton
          :hidden="selectedArticles.size === 0"
          title="Supprimer"
          :action="remove"
          icon="fa-solid fa-trash-can"
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
          <tr v-if="articles === undefined">
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

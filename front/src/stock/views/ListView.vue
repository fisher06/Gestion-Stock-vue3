<script lang="ts">
import type { Article } from '../interfaces/Article'
import { useArticleStore } from '../store/ArticleStore'
import AsyncButton from '@/components/AsyncButton.vue'

export default {
  name: 'ListView',
  components: {
    AsyncButton
  },
  data() {
    return {
      selectedArticles: new Set<Article>(),
      errorMsg: ''
    }
  },
  computed: {
    articles() {
      const articleStore = useArticleStore()
      return articleStore.articles
    }
  },
  methods: {
    select(a: Article) {
      console.log('select')
      this.selectedArticles.has(a) ? this.selectedArticles.delete(a) : this.selectedArticles.add(a)
      this.selectedArticles = new Set(this.selectedArticles)
    },
    async remove() {
      const articleStore = useArticleStore()
      try {
        this.errorMsg = ''
        const ids = [...this.selectedArticles].map((a: Article) => a.id)
        await articleStore.remove(ids)
        this.selectedArticles.clear()
      } catch (err) {
        console.log('err: ', err)
        this.errorMsg = 'Erreur Technique'
      }
    },
    async refresh() {
      const articleStore = useArticleStore()
      try {
        this.errorMsg = ''
        console.log('refreshing')
        await articleStore.refresh()
        console.log('refreshed')
      } catch (err) {
        console.log('err: ', err)
        this.errorMsg = 'Erreur Technique'
      }
    }
  },
  mounted() {
    const articleStore = useArticleStore()
    if (articleStore.articles === undefined) {
      articleStore.refresh()
    }
  }
}
</script>

<template>
  <main>
    <h1>Liste des articles</h1>
    <div class="content">
      <nav>
        <AsyncButton title="Rafraîchir" :action="refresh" icon="fa-solid fa-rotate-right">
        </AsyncButton>
        <router-link append to="add" class="button" title="Ajouter">
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

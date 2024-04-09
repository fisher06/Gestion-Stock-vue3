import { defineStore } from 'pinia'
import type { Article, NewArticle } from '../interfaces/Article'
import { api } from '../api'
import { ref } from 'vue'

// export const useArticleStore = defineStore('article', {
//   state: () => ({
//     articles: undefined as Article[] | undefined
//   }),
//   actions: {
//     async add(newArticle: NewArticle) {
//       await api.add(newArticle)
//       this.articles = await api.getArticles()
//     },
//     async remove(ids: Article['id'][]) {
//       await api.remove(ids)
//       this.articles = await api.getArticles()
//     },
//     async refresh() {
//       this.articles = await api.getArticles()
//     }
//   }
// })

export const useArticleStore = defineStore('article', () => {
  const articles = ref<Article[] | undefined>()
  const add = async (newArticle: NewArticle): Promise<void> => {
    await api.add(newArticle)
    articles.value = await api.getArticles()
  }

  const remove = async (ids: Article['id'][]): Promise<void> => {
    await api.remove(ids)
    articles.value = await api.getArticles()
  }
  const refresh = async (): Promise<void> => {
    articles.value = await api.getArticles()
  }
  return { articles, add, remove, refresh }
})

import { defineStore } from 'pinia'
import type { Article, NewArticle } from '../interfaces/Article'
import { api } from '../api'

export const useArticleStore = defineStore('articleStore', {
  state: () => ({
    articles: undefined as Article[] | undefined
  }),
  actions: {
    async add(newArticle: NewArticle) {
      await api.add(newArticle)
      this.articles = await api.getArticles()
    },
    async remove(ids: Article['id'][]) {
      await api.remove(ids)
      this.articles = await api.getArticles()
    },
    async refresh() {
      this.articles = await api.getArticles()
    }
  }
})

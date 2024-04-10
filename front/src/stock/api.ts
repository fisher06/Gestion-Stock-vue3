import { sleep } from '@gestionstock/commons'
import type { Article, NewArticle } from '@gestionstock/commons'

const url = '/api/articles'

class API {
  async add(newArticle: NewArticle) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(newArticle),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log('response.status: ', response.status)
      if (response.status >= 400) {
        throw new Error('Erreur Technique')
      }
    } catch (err) {
      console.log('err: ', err)
      throw new Error('Erreur Technique')
    }
  }

  async getArticles() {
    try {
      await sleep(300)
      const response = await fetch(url)
      if (response.status >= 400) {
        throw new Error('Erreur Technique')
      }
      const articles = await response.json()
      return articles
    } catch (err) {
      console.log('err: ', err)
      throw new Error('Erreur Technique')
    }
  }

  async remove(ids: Article['id'][]) {
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        body: JSON.stringify(ids),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.status === 400) {
        const message = await response.text()
        throw new Error(message)
      }
      if (response.status >= 400) {
        throw new Error('Erreur Technique')
      }
    } catch (err) {
      console.log('err: ', err)
      if (err instanceof Error) {
        throw err
      }
      throw new Error('Erreur Technique')
    }
  }
}

export const api = new API()

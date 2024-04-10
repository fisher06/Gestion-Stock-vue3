export interface Article {
  /**
   * ID.
   */
  id: string;

  /**
   * Nom.
   */
  name: string;
  price: number;
  qty: number;
}

/**
 * Nouvel article.
 */
export type NewArticle = Omit<Article, "id">;

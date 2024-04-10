import express from "express";
import { randomUUID } from "node:crypto";
import type { Article, NewArticle } from "@gestionstock/commons";

const app = express.Router();

let articles: Article[] = [
  {
    id: "a1",
    name: "A 1",
    price: 10,
    qty: 10,
  },
  {
    id: "a2",
    name: "A 2",
    price: 4,
    qty: 2,
  },
];

app.get("/articles", (req, res) => {
  res.json(articles);
});

app.post("/articles", express.json(), (req, res) => {
  const newArticle: NewArticle = req.body;
  const article: Article = {
    ...newArticle,
    id: randomUUID(),
  };
  articles.push(article);
  res.status(201).end();
});

app.delete(
  "/articles",
  express.json(),
  (req: express.Request<unknown, unknown, string[]>, res) => {
    const ids: Article["id"][] = req.body;
    if (ids.length === 2) {
      res.status(400).end("Interdit d'effacer deux éléments");
      return;
    }
    const idsSet = new Set(ids);
    articles = articles.filter((article) => !idsSet.has(article.id));
    res.status(204).end();
  },
);

export default app;

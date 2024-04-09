import express from "express";
import { Article, NewArticle } from "./interfaces/Article";
import { randomUUID } from "crypto";

const app = express.Router();

let articles: Article[] = [
  { id: "a1", name: "A 1", price: 10, qty: 10 },
  { id: "a2", name: "A 2", price: 20, qty: 11 },
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

app.delete("/articles", express.json(), (req, res) => {
  const ids: Article["id"][] = req.body;
  const idsSet = new Set(ids);
  articles = articles.filter((a) => !idsSet.has(a.id));
  res.status(204).end();
});

export default app;

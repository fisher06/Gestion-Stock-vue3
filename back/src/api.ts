import express from "express";
import { Article } from "./interfaces/Article";

const app = express.Router();

const articles: Article[] = [
  { id: "a1", name: "A 1", price: 10, qty: 10 },
  { id: "a2", name: "A 2", price: 20, qty: 11 },
];

app.get("/articles", (req, res) => {
  res.json(articles);
});

export default app;

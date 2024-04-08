const express = require("express");
const app = express.Router();

const articles = [
  { id: "a1", name: "A 1", qty: 10 },
  { id: "a2", name: "A 2", qty: 11 },
];

app.get("/articles", (req, res) => {
  res.json(articles);
});

module.exports = app;

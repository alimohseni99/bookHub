import express from "express";
import { books } from "../db/books";
const app = express();

app.get("/books", function (req, res) {
  res.send(books);
});

export default app;

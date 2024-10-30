import express from "express";
import { books } from "../db/books.ts";
import { BookTypes } from "./types";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
const app = express();

app.use(express.json());

app.get("/books", (req, res) => {
  res.send(books);
});

app.post("/books", (req, res) => {
  const newBook: BookTypes = req.body;
  const filePath = path.join(__dirname, "../db/books.ts");
  newBook.id = getUUID();
  books.push(newBook);
  const fileContent = `export const books = ${JSON.stringify(books, null, 2)}`;

  fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
      throw err;
    } else {
      console.log("Book added");
    }
  });
  res.status(201).send(newBook);
});

function getUUID() {
  return uuidv4();
}

export default app;

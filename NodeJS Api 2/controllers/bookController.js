const Book = require("../models/bookModel");
const { getPostData } = require("../utils");

async function getBooks(req, res) {
  try {
    const books = await Book.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(books));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Internal Server Error" }));
  }
}

async function getBook(req, res, id) {
  try {
    const book = await Book.findById(id);
    if (!book) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Book not found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(book));
    }
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Internal Server Error" }));
  }
}

async function createBook(req, res) {
    try {
        const body = await getPostData(req);
        const { name, genre} = JSON.parse(body);

        if(!name || !genre) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Invalid data provided" }));
            return;
        }

        const book = {name, genre};
        const newBook = await Book.create(book);

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newBook));
    } catch(error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Internal Server Error" }));
    }
}

async function updateBook(req, res, id) {
    try {
        const book = await Book.findById(id);
        if(!book) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Book not found" }));
        } else {
            const body = await getPostData(req);
            const {name, genre} = JSON.parse(body);

            const bookData = {
                name: name || book.name,
                genre: genre || book.genre,
            };

            const updBook = await Book.update(id, bookData);
            
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(updBook));
        }
    } catch(error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Internal Server Error" }));
    }
}

async function deleteBook(req, res, id) {
    try {
        const book = await Book.findById(id);

        if (!book) {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({ message: "Book Not Found"}));
        } else {
            await Book.remove(id);
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify({ message: `Book ${id} removed` }));
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
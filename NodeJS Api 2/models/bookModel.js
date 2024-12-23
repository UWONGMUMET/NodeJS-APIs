let books = require('../data/books.json');

const {v4: uuidv4} = require('uuid');

const {writeDataToFile} = require('../utils');

function findAll() {
  return Promise.resolve(books);
}

function findById(id) {
  const book = books.find((p) => p.id === id);
  return Promise.resolve(book);
}

function create(book) {
    return new Promise((resolve, reject) => {
        const newBook = {id: uuidv4(), ...book}
        books.push(newBook)
        writeDataToFile('./data/books.json', books)
        resolve(newBook)
    })
}

function update(id, book) {
    return new Promise((resolve, reject) => {
        const index = books.findIndex((p) => p.id === id)
        books[index] = {id,...book}
        writeDataToFile('./data/books.json', books)
        resolve(books[index])
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        books = books.filter((p) => p.id !== id)
        writeDataToFile('./data/books.json', books)
        resolve()
    })
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};

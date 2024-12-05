let foods = require('../data/foods.json');

const {v4: uuidv4} = require('uuid');

const {writeDataToFile} = require('../utils');

function findAll() {
    return Promise.resolve(foods);
}

function findById(id) {
    const food = foods.find((p) => p.id === id);
    return Promise.resolve(food);
}

function create(food) {
    return new Promise((resolve, reject) => {
        const newFood = {id: uuidv4(),...food};
        foods.push(newFood);
        writeDataToFile('./data/foods.json', foods);
        resolve(newFood);
    });
}

function update(id, food) {
    return new Promise((resolve, reject) => {
        const index = foods.findIndex((p) => p.id === id);
        foods[index] = {id, ...food};
        writeDataToFile('./data/foods.json', foods);
        resolve(foods[index]);
    });
}

function remove(id) {
    return new Promise((resolve, reject) => {
        foods = foods.filter((p) => p.id!== id);
        writeDataToFile('./data/foods.json', foods);
        resolve();
    });
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
};

const Food = require('../models/foodModel');
const { getPostData } = require("../utils");

async function getFoods(req, res) {
    try {
        const foods = await Food.findAll();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(foods));
    } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({message: "Interval Server Error"}))
    }
}

async function getFood(req, res, id) {
    try {
        const food = await Food.findById(id);
        if(!food) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Food not found" }));
        } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(food));
        }
    } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Interval Server Error" }));
    }
}

async function createFood(req, res) {
    try {
        const body = await getPostData(req);
        const { name, price } = JSON.parse(body);

        if(!name || !price) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Invalid data provided" }));
            return;
        }

        const food = {name, price};
        const newFood = await Food.create(food);

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newFood));

    } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Interval Server Error" }));
    }
}

async function updateFood(req, res, id) {
    try {
        const food = await Food.findById(id);
        if(!food) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Food not found" }));
            return;
        } else {
            const body = await getPostData(req);
            const { name, price } = JSON.parse(body);

            const foodData = {
                name: name || food.name,
                price: price || food.price,
            }

            const updFood = await Food.update(id, foodData);

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(updFood));
        }
    } catch(error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Interval Server Error" }));
    }
}

async function deleteFood(req, res, id) {
    try {
        const food = await Food.findById(id);
        if(!food) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Food not found" }));
            return;
        } else {
            await Food.remove(id);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: `Food ${id} removed` }));
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getFoods,
    getFood,
    createFood,
    updateFood,
    deleteFood,
}
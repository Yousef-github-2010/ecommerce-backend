import "dotenv/config";
import mongoose from "mongoose";

import connectDb from "../config/db.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

const seed = async () => {
    try {
        await connectDb();

        await Order.deleteMany({});
        await Product.deleteMany({});
        await Category.deleteMany({});

        const categories = await Category.insertMany([
            {
                name: "Electronics",
                description: "Electronic Devices",
                slug: "electronics"
            },
            {
                name: "Clothes",
                description: "Fashion Products",
                slug: "clothes"
            },
            {
                name: "Books",
                description: "Books Collection",
                slug: "books"
            }
        ]);

        const products = await Product.insertMany([
            {
                name: "Laptop",
                description: "HP Laptop",
                price: 30000,
                stock: 10,
                category: categories[0]._id,
                image: "laptop.jpg",
                inStock: true
            },
            {
                name: "Phone",
                description: "Samsung Phone",
                price: 18000,
                stock: 20,
                category: categories[0]._id,
                image: "phone.jpg",
                inStock: true
            },
            {
                name: "T-Shirt",
                description: "Cotton T-Shirt",
                price: 400,
                stock: 50,
                category: categories[1]._id,
                image: "shirt.jpg",
                inStock: true
            },
            {
                name: "Jeans",
                description: "Blue Jeans",
                price: 900,
                stock: 25,
                category: categories[1]._id,
                image: "jeans.jpg",
                inStock: true
            },
            {
                name: "Node.js Book",
                description: "Learn Node.js",
                price: 350,
                stock: 30,
                category: categories[2]._id,
                image: "node.jpg",
                inStock: true
            },
            {
                name: "JavaScript Book",
                description: "Learn JavaScript",
                price: 300,
                stock: 40,
                category: categories[2]._id,
                image: "js.jpg",
                inStock: true
            }
        ]);
        console.log(`${categories.length} Categories Added`);
        console.log(`${products.length} Products Added`);
    } catch (err) {
        console.log(err);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    }
};

seed();
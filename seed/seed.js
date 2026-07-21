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

        // Create Categories
        const categories = await Category.insertMany([
            {
                name: "Electronics",
                description: "Electronic Devices"
            },
            {
                name: "Clothes",
                description: "Fashion Products"
            },
            {
                name: "Books",
                description: "Books Collection"
            }
        ]);

        // Create Products
        const products = await Product.insertMany([
            {
                name: "Laptop",
                description: "HP Laptop",
                price: 30000,
                stock: 10,
                category: categories[0]._id,
                images: ["laptop.jpg"]
            },
            {
                name: "Phone",
                description: "Samsung Phone",
                price: 18000,
                stock: 20,
                category: categories[0]._id,
                images: ["phone.jpg"]
            },
            {
                name: "T-Shirt",
                description: "Cotton T-Shirt",
                price: 400,
                stock: 50,
                category: categories[1]._id,
                images: ["shirt.jpg"]
            },
            {
                name: "Jeans",
                description: "Blue Jeans",
                price: 900,
                stock: 25,
                category: categories[1]._id,
                images: ["jeans.jpg"]
            },
            {
                name: "Node.js Book",
                description: "Learn Node.js",
                price: 350,
                stock: 30,
                category: categories[2]._id,
                images: ["node.jpg"]
            },
            {
                name: "JavaScript Book",
                description: "Learn JavaScript",
                price: 300,
                stock: 40,
                category: categories[2]._id,
                images: ["js.jpg"]
            }
        ]);

        console.log(`${categories.length} Categories Added`);
        console.log(`${products.length} Products Added`);
    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    }
};

seed();
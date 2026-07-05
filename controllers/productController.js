import Product from "../models/Product.js";
import Category from "../models/Category.js";
import generateResponse from "../utils/generateResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

const getProducts = asyncHandler(async (req, res) => {

    const { category, minPrice, maxPrice, search, inStock } = req.query;

    let filter = {};

    if (category) filter.category = category;

    if (minPrice || maxPrice) {
        filter.price = {};

        if (minPrice) filter.price.$gte = Number(minPrice);
        if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (search) {
        filter.name = {
            $regex: search,
            $options: "i"
        };
    }

    if (inStock === "true") {
        filter.inStock = true;
    }

    const products = await Product.find(filter)
        .populate("category", "name description");

    res.json(
        generateResponse(
            "success",
            "Products fetched successfully",
            products
        )
    );

});

const getProduct = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id)
        .populate("category", "name description");

    if (!product) {
        throw new AppError("Product not found", 404);
    }

    res.json(
        generateResponse(
            "success",
            "Product fetched successfully",
            product
        )
    );

});

const createProduct = asyncHandler(async (req, res) => {

    const category = await Category.findById(req.body.category);

    if (!category) {
        throw new AppError("Category not found", 404);
    }

    const product = await Product.create(req.body);

    res.status(201).json(
        generateResponse(
            "success",
            "Product created successfully",
            product
        )
    );

});

const updateProduct = asyncHandler(async (req, res) => {

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    if (!product) {
        throw new AppError("Product not found", 404);
    }

    res.json(
        generateResponse(
            "success",
            "Product updated successfully",
            product
        )
    );

});

const deleteProduct = asyncHandler(async (req, res) => {

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
        throw new AppError("Product not found", 404);
    }

    res.json(
        generateResponse(
            "success",
            "Product deleted successfully"
        )
    );

});

export {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};
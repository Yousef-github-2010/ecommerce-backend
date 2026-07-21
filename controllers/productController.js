import Product from "../models/Product.js";
import Category from "../models/Category.js";
import generateResponse from "../utils/generateResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

// GET /api/products
const getProducts = asyncHandler(async (req, res) => {
    const { category, minPrice, maxPrice, search, inStock } = req.query;
    const filter = {};

    // Filter by category
    if (category) {
        filter.category = category;
    }

    // Filter by price
    if (minPrice || maxPrice) {
        filter.price = {};

        if (minPrice) {
            filter.price.$gte = Number(minPrice);
        }

        if (maxPrice) {
            filter.price.$lte = Number(maxPrice);
        }
    }

    // Filter by stock
    if (inStock === "true") {
        filter.stock = { $gt: 0 };
    }

    // Filter in name OR description
    if (search) {
        filter.$or = [
            {
                name: {
                    $regex: search,
                    $options: "i"
                }
            },
            {
                description: {
                    $regex: search,
                    $options: "i"
                }
            }
        ];
    }

    const products = await Product.find(filter)
        .populate("category", "name");

    res.json(
        generateResponse(
            "success",
            "Products fetched successfully",
            products
        )
    );
});

// GET /api/products/:id
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

// POST /api/products
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

// PATCH /api/products/:id
const updateProduct = asyncHandler(async (req, res) => {

    if (req.body.category) {
        const category = await Category.findById(req.body.category);

        if (!category) {
            throw new AppError("Category not found", 404);
        }
    }

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    ).populate("category", "name description");

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

// DELETE /api/products/:id
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
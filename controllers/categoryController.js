import Category from "../models/Category.js";
import generateResponse from "../utils/generateResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find();

    res.json(
        generateResponse(
            "success",
            "Categories fetched successfully",
            categories
        )
    );
});

const getCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        throw new AppError("Category not found", 404);
    }

    res.json(
        generateResponse(
            "success",
            "Category fetched successfully",
            category
        )
    );
});

const createCategory = asyncHandler(async (req, res) => {
    const category = await Category.create(req.body);

    res.status(201).json(
        generateResponse(
            "success",
            "Category created successfully",
            category
        )
    );
});

const updateCategory = asyncHandler(async (req, res) => {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    if (!category) {
        throw new AppError("Category not found", 404);
    }

    res.json(
        generateResponse(
            "success",
            "Category updated successfully",
            category
        )
    );
});

const deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
        throw new AppError("Category not found", 404);
    }

    res.json(
        generateResponse(
            "success",
            "Category deleted successfully"
        )
    );
});

export {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
};
import express from "express";

import {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/productController.js";

const router = express.Router();

// GET All Products
router.get("/", getProducts);

// GET Product By ID
router.get("/:id", getProduct);

// Create Product
router.post("/", createProduct);

// Update Product
router.patch("/:id", updateProduct);

// Delete Product
router.delete("/:id", deleteProduct);

export default router;
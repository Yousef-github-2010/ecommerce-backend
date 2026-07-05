import express from "express";

import {
    getCart,
    addToCart,
    updateCartItem,
    deleteCartItem
} from "../controllers/cartController.js";

const router = express.Router();
router.get("/", getCart);
router.post("/", addToCart);
router.patch("/:productId", updateCartItem);
router.delete("/:productId", deleteCartItem);

export default router;
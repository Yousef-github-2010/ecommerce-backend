import express from "express";

import {
    getOrders,
    getOrder,
    createOrder,
    updateOrderStatus
} from "../controllers/orderController.js";

const router = express.Router();

router.get("/", getOrders);

router.get("/:id", getOrder);

router.post("/", createOrder);

router.patch("/:id", updateOrderStatus);

export default router;
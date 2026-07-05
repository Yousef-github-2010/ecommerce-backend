import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import generateResponse from "../utils/generateResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find();

    res.json(
        generateResponse(
            "success",
            "Orders fetched successfully",
            orders
        )
    );
});

const getOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        throw new AppError("Order not found", 404);
    }

    res.json(
        generateResponse(
            "success",
            "Order fetched successfully",
            order
        )
    );
});

const createOrder = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne().populate("items.product");

    if (!cart || cart.items.length === 0) {
        throw new AppError("Cart is empty", 400);
    }

    let totalPrice = 0;
    const items = [];

    for (const item of cart.items) {
        const product = await Product.findById(item.product._id);

        if (!product) {
            throw new AppError("Product not found", 404);
        }

        if (product.stock < item.quantity) {
            throw new AppError(`${product.name} is out of stock`, 400);
        }

        product.stock -= item.quantity;
        product.inStock = product.stock > 0;

        await product.save();

        totalPrice += item.price * item.quantity;

        items.push({
            product: product._id,
            name: product.name,
            price: item.price,
            quantity: item.quantity
        });
    }

    const order = await Order.create({
        orderNumber: `ORD-${Date.now()}`,
        items,
        totalPrice,
        shippingAddress: req.body.shippingAddress,
        status: "Pending"
    });

    cart.items = [];
    cart.totalPrice = 0;

    await cart.save();

    res.status(201).json(
        generateResponse(
            "success",
            "Order created successfully",
            order
        )
    );
});

const updateOrderStatus = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        throw new AppError("Order not found", 404);
    }

    const allowedStatus = [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled"
    ];

    if (!allowedStatus.includes(req.body.status)) {
        throw new AppError("Invalid order status", 400);
    }

    order.status = req.body.status;

    await order.save();

    res.json(
        generateResponse(
            "success",
            "Order status updated successfully",
            order
        )
    );
});

export {
    getOrders,
    getOrder,
    createOrder,
    updateOrderStatus
};
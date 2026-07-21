import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import generateResponse from "../utils/generateResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

const getCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne().populate(
        "items.product",
        "name price image"
    );
    res.json(
        generateResponse(
            "success",
            "Cart fetched successfully",
            cart
        )
    );
});

const addToCart = asyncHandler(async (req, res) => {
    const { product, quantity } = req.body;
    const foundProduct = await Product.findById(product);

    if (!foundProduct) {
        throw new AppError("Product not found", 404);
    }
    if (foundProduct.stock < quantity) {
        throw new AppError("Not enough stock", 400);
    }

    let cart = await Cart.findOne();

    if (!cart) {
        cart = await Cart.create({
            items: [],
            totalPrice: 0
        });
    }

    const existingItem = cart.items.find(
        item => item.product.toString() === product
    );

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({
            product,
            quantity,
            price: foundProduct.price
        });
    }

    cart.totalPrice = cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    await cart.save();
    res.status(201).json(
        generateResponse(
            "success",
            "Product added to cart",
            cart
        )
    );
});

const updateCartItem = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne();

    if (!cart) {
        throw new AppError("Cart not found", 404);
    }

    const item = cart.items.find(
        item => item.product.toString() === req.params.productId
    );

    if (!item) {
        throw new AppError("Item not found", 404);
    }

    item.quantity = req.body.quantity;

    cart.totalPrice = cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    await cart.save();

    res.json(
        generateResponse(
            "success",
            "Cart updated successfully",
            cart
        )
    );
});

const deleteCartItem = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne();

    if (!cart) {
        throw new AppError("Cart not found", 404);
    }

    cart.items = cart.items.filter(
        item => item.product.toString() !== req.params.productId
    );

    cart.totalPrice = cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
    await cart.save();

    res.json(
        generateResponse(
            "success",
            "Item removed successfully",
            cart
        )
    );
});

export {
    getCart,
    addToCart,
    updateCartItem,
    deleteCartItem
};
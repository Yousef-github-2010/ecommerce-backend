import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
    {
        orderNumber: {
            type: String,
            unique: true,
            required: [true, "Order number is required"]
        },

        items: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },

                name: {
                    type: String,
                    required: [true, "Product name is required"]
                },

                price: {
                    type: Number,
                    required: [true, "Product price is required"],
                    min: [0, "Price cannot be negative"]
                },

                quantity: {
                    type: Number,
                    required: [true, "Quantity is required"],
                    min: [1, "Quantity must be at least 1"]
                }
            }
        ],

        totalPrice: {
            type: Number,
            required: [true, "Total price is required"],
            min: [0, "Total price cannot be negative"]
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "Processing",
                "Shipped",
                "Delivered",
                "Cancelled"
            ],
            default: "Pending"
        },

        shippingAddress: {
            type: String,
            required: [true, "Shipping address is required"]
        }
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
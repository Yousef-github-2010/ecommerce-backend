import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema(
    {
        items: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },

                quantity: {
                    type: Number,
                    required: true,
                    default: 1,
                    min: 1
                },

                price: {
                    type: Number,
                    required: true,
                    min: 0
                }
            }
        ],
        totalPrice: {
            type: Number,
            default: 0,
            min: 0
        }
    },
    {
        timestamps: true
    }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
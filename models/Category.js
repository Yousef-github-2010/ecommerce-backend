import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Category name is required"],
            trim: true
        },

        description: {
            type: String,
            required: [true, "Category description is required"]
        },

        slug: {
            type: String,
            required: [true, "Category slug is required"],
            unique: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
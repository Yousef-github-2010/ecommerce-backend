import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Category name is required"],
            unique: true,
            trim: true
        },

        description: {
            type: String,
            trim: true
        },

        slug: {
            type: String,
            unique: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

categorySchema.pre("save", function (next) {
    if (this.isModified("name")) {
        this.slug = this.name
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-");
    }
    next();
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
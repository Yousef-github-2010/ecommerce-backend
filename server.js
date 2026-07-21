import "dotenv/config";
import express from "express";
import mongoSanitize from "express-mongo-sanitize";
import connectDb from "./config/db.js";

// Routes
import categoryRouter from "./routes/categoryRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

// Utils
import generateResponse from "./utils/generateResponse.js";

// Middlewares
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());

// Health Check
app.get("/api/health", (req, res) => {
    res.status(200).json(
        generateResponse(
            "success",
            "Server is running"
        )
    );
});

// Routes
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);


// Error Middlewares
app.use(notFound);
app.use(errorHandler);

// Start Server
const startServer = async () => {
    try {
        await connectDb();

        app.listen(process.env.PORT, () => {
            console.log(
                `Server running on port ${process.env.PORT}`
            );
        });

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

startServer();
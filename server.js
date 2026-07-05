// Mongo & Express & Dotenv
import "dotenv/config";
import express from "express";
import mongoSanitize from "express-mongo-sanitize";
// Connection
import connectDb from "./config/db.js";
// Routes
import productRouter from "./routes/productRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
// Utils
import generateResponse from "./utils/generateResponse.js";
// Middleware
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(mongoSanitize());

// REST API
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);

// Health Check
app.get("/api/health", (req, res) => {
    res.status(200).json(
        generateResponse(
            "success",
            "Server is running"
        )
    );
});

// 404 Middleware
app.use(notFound);

// Error Handler
app.use(errorHandler);

// Start Server
const startServer = async () => {
    try {
        await connectDb();
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    } catch (err) {
        console.log(err);
    }
};

startServer();
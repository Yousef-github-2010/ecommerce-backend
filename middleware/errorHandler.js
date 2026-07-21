const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message;

    if (err.name === "ValidationError") {
        statusCode = 400;

        message = Object.values(err.errors)
            .map(error => error.message)
            .join(", ");
    }

    if (err.name === "CastError") {
        statusCode = 400;
        message = `Invalid ${err.path}: ${err.value}`;
    }

    if (err.code === 11000) {
        statusCode = 409;

        const field = Object.keys(err.keyValue)[0];

        message = `${field} already exists`;
    }

    res.status(statusCode).json({
        status: statusCode >= 500 ? "error" : "fail",
        message,
        stack:
            process.env.NODE_ENV === "production"
                ? null
                : err.stack
    });
};

export default errorHandler;
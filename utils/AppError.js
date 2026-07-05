class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.message = message;
        this.statusCode = statusCode;

        if (statusCode >= 400 && statusCode < 500) {
            this.status = "fail";
        } else {
            this.status = "error";
        }
    }
}

export default AppError;
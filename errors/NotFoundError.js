const HttpStatus = require("http-status-codes");

class NotFoundError extends Error {
    constructor(
        message = "Resource not found",
        statusCode = HttpStatus.NOT_FOUND
    ) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = NotFoundError;

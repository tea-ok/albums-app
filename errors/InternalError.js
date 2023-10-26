const HttpStatus = require("http-status-codes");

class InternalError extends Error {
    constructor(
        message = "Internal Server Error",
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR
    ) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = InternalError;

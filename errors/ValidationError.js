const HttpStatus = require("http-status-codes");

class ValidationError extends Error {
    constructor(
        message = "Validation Error",
        statusCode = HttpStatus.BAD_REQUEST
    ) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ValidationError;

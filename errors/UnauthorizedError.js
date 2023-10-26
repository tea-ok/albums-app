const HttpStatus = require("http-status-codes");

class UnauthorizedError extends Error {
    constructor(
        message = "Unauthorized",
        statusCode = HttpStatus.UNAUTHORIZED
    ) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = UnauthorizedError;

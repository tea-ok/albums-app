const HttpStatus = require("http-status-codes");

class ForbiddenError extends Error {
    constructor(message = "Forbidden", statusCode = HttpStatus.FORBIDDEN) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ForbiddenError;

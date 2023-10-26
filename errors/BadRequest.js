const HttpStatus = require("http-status-codes");

class BadRequest extends Error {
    constructor(message = "Bad Request", statusCode = HttpStatus.BAD_REQUEST) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = BadRequest;

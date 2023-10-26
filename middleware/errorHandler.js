const HttpStatus = require("http-status-codes");
const InternalError = require("../errors/InternalError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const ValidationError = require("../errors/ValidationError");
const NotFoundError = require("../errors/NotFoundError");
const BadRequest = require("../errors/BadRequest");
const ForbiddenError = require("../errors/ForbiddenError");

const errorHandler = (err, req, res, next) => {
    // Handle known errors
    if (err instanceof InternalError) {
        console.error("Internal Error --", err);
        res.status(err.statusCode).json({ error: err.message });
    } else if (err instanceof UnauthorizedError) {
        console.error("Unauthorized Error --", err);
        res.status(err.statusCode).json({ error: err.message });
    } else if (err instanceof ValidationError) {
        console.error("Validation Error --", err);
        res.status(err.statusCode).json({ error: err.message });
    } else if (err instanceof NotFoundError) {
        console.error("Not Found Error --", err);
        res.status(err.statusCode).json({ error: err.message });
    } else if (err instanceof BadRequest) {
        console.error("Bad Request --", err);
        res.status(err.statusCode).json({ error: err.message });
    } else if (err instanceof ForbiddenError) {
        console.error("Forbidden Error --", err);
        res.status(err.statusCode).json({ error: err.message });
    } else {
        // Handle unexpected errors
        console.error("Unexpected Error --", err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: "Internal Server Error",
        });
    }
};

module.exports = errorHandler;

const UnauthorizedError = require("../errors/UnauthorizedError");
const ForbiddenError = require("../errors/ForbiddenError");
const InternalError = require("../errors/InternalError");
const Album = require("../models/Album");

const authenticate = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        throw new UnauthorizedError("User is not authenticated");
    }
};

const isAlbumOwner = async (req, res, next) => {
    const albumId = req.params.id;
    if (req.user && req.user.role === "admin") {
        return next(); // Admins can perform all actions
    }

    const album = await Album.findById(albumId);
    if (!album) {
        throw new InternalError("Album not found");
    }

    if (req.user && req.user._id.equals(album.owner)) {
        return next(); // User is the owner of the album
    } else {
        throw new ForbiddenError(
            "User is not authorized to perform this action"
        );
    }
};

const isAdmin = (req, res, next) => {
    if (req.user.role === "admin") {
        return next();
    } else {
        throw new ForbiddenError(
            "User is not authorized to perform this action"
        );
    }
};

module.exports = { authenticate, isAlbumOwner, isAdmin };

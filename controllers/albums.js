const { StatusCodes } = require("http-status-codes");
const ValidationError = require("../errors/ValidationError");
const NotFoundError = require("../errors/NotFoundError");
const Album = require("../models/Album");
const mongoose = require("mongoose");

const getAllalbums = async (req, res) => {
    let sort = {};
    let filter = {};
    let fields = req.query.fields ? req.query.fields.replace(/,/g, " ") : "";

    if (req.query.sortBy) {
        sort[req.query.sortBy] = req.query.order === "desc" ? -1 : 1;
    }
    if (req.query.year) {
        filter.year = req.query.year;
    }
    if (req.query.search) {
        const regex = new RegExp(req.query.search, "i"); // "i" means that it's case insensitive
        filter.$or = [{ title: regex }, { artist: regex }];
    }
    const albums = await Album.find(filter).select(fields).sort(sort);

    res.json(albums);
};

const addAlbum = async (req, res) => {
    const { title, artist, year, genre, tracks } = req.body;
    const album = new Album({
        title,
        artist,
        year,
        genre,
        tracks,
        owner: req.user._id, // Contains user's ID from passport
    });

    const validationError = album.validateSync();
    if (validationError) {
        throw new ValidationError(
            "Album validation failed - Missing required fields",
            StatusCodes.BAD_REQUEST
        );
    } else {
        const newAlbum = await album.save();
        res.status(201).json(newAlbum);
    }
};

const deleteAlbum = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new NotFoundError("Invalid ID", StatusCodes.BAD_REQUEST);
    }

    const album = await Album.findById(id);
    if (album) {
        await Album.deleteOne({ _id: id });
        res.status(200).json(album);
    } else {
        throw new NotFoundError("Album not found", StatusCodes.NOT_FOUND);
    }
};

const updateAlbum = async (req, res) => {
    const id = req.params.id;
    const albumUpdates = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new NotFoundError("Invalid ID", StatusCodes.BAD_REQUEST);
    }

    const updatedAlbum = await Album.findByIdAndUpdate(id, albumUpdates, {
        new: true,
    });
    if (!updatedAlbum) {
        throw new NotFoundError("Album not found", StatusCodes.NOT_FOUND);
    } else {
        res.status(200).json(updatedAlbum);
    }
};

module.exports = {
    getAllalbums,
    addAlbum,
    deleteAlbum,
    updateAlbum,
};

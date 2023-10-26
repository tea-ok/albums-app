// Album model for MongoDB
const mongoose = require("mongoose");
const User = require("./User");

const AlbumSchema = new mongoose.Schema({
    artist: {
        type: String,
        required: [true, "Artist name is required"],
    },
    title: {
        type: String,
        required: [true, "Album title is required"],
    },
    year: {
        type: Number,
        required: [true, "Release year is required"],
        min: [1900, "Release year must be after 1900"],
        max: [
            new Date().getFullYear(),
            "Release year must be before current year",
        ],
    },
    genre: String,
    tracks: {
        type: Number,
        min: [1, "Track count must be greater than 0"],
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

const Album = mongoose.model("Album", AlbumSchema);

module.exports = Album;

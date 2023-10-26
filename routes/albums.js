const express = require("express");
const router = express.Router();

const {
    getAllalbums,
    addAlbum,
    deleteAlbum,
    updateAlbum,
} = require("../controllers/albums");
const { authenticate, isAlbumOwner } = require("../middleware/userAuth");

/*** ENDPOINTS ***/

router.get("/", authenticate, getAllalbums);
router.post("/", authenticate, addAlbum);
router.delete("/:id", authenticate, isAlbumOwner, deleteAlbum);
router.put("/:id", authenticate, isAlbumOwner, updateAlbum);

module.exports = router;

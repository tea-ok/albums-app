const express = require("express");
const { isAdmin } = require("../middleware/userAuth");
const router = express.Router();

const {
    createUser,
    login,
    logout,
    getAllUsers,
    updateUser,
    deleteUser,
} = require("../controllers/users");

/*** ENDPOINTS ***/

router.post("/register", createUser);
router.post("/login", login);
router.post("/logout", logout);
router.get("/", isAdmin, getAllUsers);
router.put("/:id", isAdmin, updateUser);
router.delete("/:id", isAdmin, deleteUser);

module.exports = router;

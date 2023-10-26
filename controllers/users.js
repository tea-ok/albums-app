const User = require("../models/User");
const passport = require("passport");
const bcryptjs = require("bcryptjs");
const UnauthorizedError = require("../errors/UnauthorizedError");
const BadRequest = require("../errors/BadRequest");
const InternalError = require("../errors/InternalError");

const createUser = async (req, res) => {
    if (
        !req.body.name ||
        !req.body.email ||
        !req.body.password ||
        !req.body.passwordConfirmation
    ) {
        throw new BadRequest("Missing fields");
    }

    if (req.body.password !== req.body.passwordConfirmation) {
        throw new BadRequest("Passwords do not match");
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
        throw new BadRequest("User with this email already exists");
    }

    const { name, email, password } = req.body;
    const salt = await bcryptjs.genSalt();
    const passwordHash = await bcryptjs.hash(password, salt);
    const newUser = new User({
        name,
        email,
        passwordHash,
    });

    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
};

const getAllUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

const updateUser = async (req, res) => {
    const id = req.params.id;
    const { name, email, password } = req.body;
    const salt = await bcryptjs.genSalt();
    const passwordHash = await bcryptjs.hash(password, salt);
    const updatedUser = {
        name,
        email,
        passwordHash,
    };

    const user = await User.findByIdAndUpdate(id, updatedUser, { new: true });
    res.json(user);
};

const deleteUser = async (req, res) => {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    res.json(user);
};

const login = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return next(new UnauthorizedError(info.message));
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }

            return res.status(200).json({ message: "Login successful" });
        });
    })(req, res, next);
};

const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(new InternalError("Error logging out"));
        } else {
            res.status(200).json({ message: "Logged out successfully" });
        }
    });
};

module.exports = {
    createUser,
    login,
    logout,
    getAllUsers,
    updateUser,
    deleteUser,
};

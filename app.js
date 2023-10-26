require("express-async-errors");
const express = require("express");
const session = require("express-session");
const bcryptjs = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const MongoDBStore = require("connect-mongodb-session")(session);
const albums = require("./routes/albums");
const users = require("./routes/users");
const connectMongoDB = require("./db/mongodb");
const dotenv = require("dotenv");
const path = require("path");
const errorHandler = require("./middleware/errorHandler");
const User = require("./models/User");

const app = express();
const PORT = 5000;
dotenv.config();

app.use(express.json());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: new MongoDBStore({
            uri: process.env.MONGO_URL,
            collection: "sessions",
        }),
    })
);

/*** PASSPORT CONFIG ***/
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (username, password, done) => {
            const user = await User.findOne({ email: username });
            if (!user) {
                return done(null, false, {
                    message: "No user with this email exists",
                });
            }

            const isMatch = await bcryptjs.compare(password, user.passwordHash);
            if (!isMatch) {
                return done(null, false, { message: "Password is incorrect" });
            }

            return done(null, user);
        }
    )
);

app.use("/api/users", users);
app.use("/api/albums", albums);
app.use("/api/albums/:id", albums);

// index.html is the default page
app.use(
    express.static(path.join(__dirname, "public"), { index: "index.html" })
);

// Error handler middleware
app.use(errorHandler);

/*** SERVER START ***/
const start = async () => {
    try {
        await connectMongoDB(process.env.MONGO_URL);
        app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
};

start();

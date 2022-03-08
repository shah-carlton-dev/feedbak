const express = require("express");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_pass = process.env.JWT_PASS;

// connect to db
const dbo = require("../db/conn");

const usersRouter = express.Router();

// get all users
usersRouter.route("/all").get(function (req, response) {
    let userColl = dbo.getDb("feedbak01").collection("user");
    userColl
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            response.json(result);
        });
});

// get user by id
usersRouter.route("/:id").get(function (req, response) {
    let userColl = dbo.getDb("feedbak01").collection("user");
    userColl
        .find({ _id: ObjectId(req.params.id) })
        .toArray(function (err, result) {
            if (err) throw err;
            response.json(result);
        });
});

// create new user
usersRouter.route("/new").post(function (req, response) {
    const userCollection = dbo.getDb("feedbak01").collection('user')
    let { username, email, password } = req.body

    userCollection
        .find({ $or: [{ "username": username }, { "email": email }] })
        .toArray(async function (err, existingUsers) {
            if (err) throw err;
            if (existingUsers.length > 0) {
                return response.status(400).json({ message: "Username or email already in use" })
            }
            else {
                const salt = await bcrypt.genSalt();
                password = await bcrypt.hash(password, salt);
                userCollection.insertOne({
                    username, email, password, reviews: [], admin: false
                }, function (err, res) {
                    if (err) console.log(err)
                    return response.status(200).json(res)
                })
            }
        });
});

// valide user token
usersRouter.route("/token").post(function (req, response) {
    const userCollection = dbo.getDb("feedback01").collection("user")
    try {
        const token = req.body.authToken;
        if (!token) return response.status(400).json({ message: "No token given" });
        const verified = jwt.verify(token, jwt_pass);
        if (!verified) return response.status(400).json({ message: "Could not validate token" })

        userCollection.findOne({ _id: ObjectId(verified.id) }, function (err, user) {
            if (err) return response.status(400).json({ message: "No user found by ID" })
            if (user == null) return response.status(400).json({ message: "No user found by ID" })
            return response.status(200).json({ message: "Successfully verified", valid: true, token: token, user: user })
        })
    } catch (err) {
        return response.status(400).json({ message: `Error while validating token: ${err}` })
    }
});

// log user in
usersRouter.route("/login").post(function (req, response) {
    const userCollection = dbo.getDb("feedback01").collection("user")
    try {
        let { username, password } = req.body;
        userCollection.findOne({ username }, async function (err, user) {
            if (err) return response.status(400).json({ message: "Error finding user" });
            if (user == null) response.status(400).json({ message: "no user found" });
            else {
                await bcrypt.compare(password, user.password).then(res => {
                    if (!res) return response.status(400).json({ message: 'Invalid password. Nice try, bot.' });
                    else {
                        const token = jwt.sign({ id: user._id }, jwt_pass);
                        delete user.password;
                        return response.status(200).json({
                            user,
                            token
                        });
                    }
                });
            }
        })
    } catch (err) {
        return res.status(400).json({ message: "Error logging in. Please try again." });
    }
});

// update username by id
usersRouter.route("/updateUsername/:id").put(function (req, response) {
    const userCollection = dbo.getDb("feedback01").collection("user");
    userCollection
        .find({ username: req.body.username })
        .toArray(function (err, usernameList) {
            if (err) return response.status(400).json({ message: "Error in checking username availability" })
            if (usernameList.length > 0) return response.status(400).json({ message: "Requested username is already in use" })
            userCollection
                .updateOne({ _id: ObjectId(req.params.id) }, {
                    $set: { username: req.body.username }
                })
                .then(result => response.status(200).json({ message: "Successfully updated username", data: result }))
                .catch(err => response.status(400).json({ message: "Error while updating user doc", data: err }))
        });
});

// update email by id
usersRouter.route("/updateEmail/:id").put(function (req, response) {
    const userCollection = dbo.getDb("feedback01").collection("user");
    userCollection
        .find({ email: req.body.email })
        .toArray(function (err, emailList) {
            if (err) return response.status(400).json({ message: "Error in checking email availability" })
            if (emailList.length > 0) return response.status(400).json({ message: "Requested email is already in use" })
            userCollection
                .updateOne({ _id: ObjectId(req.params.id) }, {
                    $set: { email: req.body.email }
                })
                .then(result => response.status(200).json({ message: "Successfully updated email", data: result }))
                .catch(err => response.status(400).json({ message: "Error while updating user doc", data: err }))
        });
});

// delete user by id
usersRouter.route("/:id").delete((req, response) => {
    const userCollection = dbo.getDb("feedback01").collection("user");
    userCollection
        .deleteOne({ _id: ObjectId(req.params.id) }, (err, data) => {
            if (err) return response.status(400).json({ message: "Error while deleting user", data: err })
            else return response.status(200).json({ message: "User deleted successfully", data })
        })
});

module.exports = usersRouter;
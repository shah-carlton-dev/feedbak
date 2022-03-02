const express = require("express");
var ObjectId = require("mongodb").ObjectId;

// connect to db
const dbo = require("../db/conn");

const busiRouter = express.Router();

/**
 * get all posts for a company
 */
busiRouter.route("/all").get(function (req, res) {
    let db_connect = dbo.getDb("feedbak01");
    db_connect
        .collection("review")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

/**
 * get post by id
 */
busiRouter.route("/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
        .collection("business")
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

/**
 * post a new review
 */
busiRouter.route("/new").post(function (req, response) {
    let db_connect = dbo.getDb("feedbak01");
    let business = {
        name: req.body.name,
        about: req.body.about,
        website: req.body.website,
        admins: [],
        featured: [],
        reviews: [],
        daetJoined: new Date()
    }
    db_connect
        .collection("business")
        .insertOne(business, function (err, res) {
            if (err) throw err;
            response.json(res);
        });
});

/** TODO
 * update post by id
 * @param score - new score for the post
 */
busiRouter.route("/update/:id").put(function (req, response) {
    let db_connect = dbo.getDb();
    let review = { _id: ObjectId(req.params.id) };
    console.log(review)
    let newReview = {
        $set: {
            score: req.body.score,
        },
    };
    db_connect
        .collection("business")
        .updateOne(review, newReview, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            response.json(res);
        });
});

// delete post by id
busiRouter.route("/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("business").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    });
});

module.exports = busiRouter;
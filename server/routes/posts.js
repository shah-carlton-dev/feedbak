const express = require("express");
var ObjectId = require("mongodb").ObjectId;

// connect to db
const dbo = require("../db/conn");

const postsRouter = express.Router();

/**
 * get all posts for a company
 */
postsRouter.route("/all/:id").get(function (req, res) {
    let db_connect = dbo.getDb("feedbak01");
    const businessId = ObjectId(req.params.id)
    db_connect
        .collection("review")
        .find({
            "business": businessId
        })
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

/**
 * get post by id
 */
postsRouter.route("/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
        .collection("review")
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

/**
 * post a new review
 */
postsRouter.route("/new").post(function (req, response) {
    let db_connect = dbo.getDb("feedbak01");
    let review = {
        title: req.body.title,
        author: ObjectId(req.body.author),
        post: req.body.post,
        score: req.body.score,
        business: ObjectId(req.body.businessId),
        featured: req.body.featured,
        date: new Date()
    }
    db_connect
        .collection("review")
        .insertOne(review, function (err, res) {
            if (err) throw err;
            response.json(res);
        });
});

/**
 * update post by id
 * @param score - new score for the post
 */
postsRouter.route("/update/:id").put(function (req, response) {
    let db_connect = dbo.getDb();
    let review = { _id: ObjectId(req.params.id) };
    console.log(review)
    let newReview = {
        $set: {
            score: req.body.score,
        },
    };
    db_connect
        .collection("review")
        .updateOne(review, newReview, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            response.json(res);
        });
});

// delete post by id
postsRouter.route("/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("review").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    });
});

module.exports = postsRouter;
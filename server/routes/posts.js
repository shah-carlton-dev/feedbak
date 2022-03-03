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
    db_connect
        .collection("review")
        .find({
            "business": ObjectId(req.params.id)
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
    db_connect
        .collection("review")
        .findOne(
            { _id: ObjectId(req.params.id) },
            function (err, result) {
                if (err) throw err;
                res.json(result);
            });
});

/**
 * post a new review, add review to user and company profiles
 * expects: 
 * {
 * title, authorId, post, businessId
 * }
 */
postsRouter.route("/new").post(async function (req, response) {
    let db_connect = dbo.getDb("feedbak01");
    let review = {
        title: req.body.title,
        author: ObjectId(req.body.authorId),
        post: req.body.post,
        score: 0,
        business: ObjectId(req.body.businessId),
        featured: false,
        date: new Date()
    }
    db_connect
        .collection("review")
        .insertOne(review, function (err, res) {
            if (err) throw err;
            response.json(res);
            db_connect
                .collection("user")
                .updateOne(
                    { _id: ObjectId(req.body.authorId) },
                    { $push: { reviews: ObjectId(res.insertedId) } }
                )
            db_connect
                .collection("business")
                .updateOne(
                    { _id: ObjectId(req.body.businessId) },
                    { $push: { reviews: ObjectId(res.insertedId) } }
                )
        })
});

/**
 * update post by id
 * @param score - new score for the post
 */
postsRouter.route("/update/:id").put(function (req, response) {
    let db_connect = dbo.getDb();
    db_connect
        .collection("review")
        .updateOne(
            { _id: ObjectId(req.params.id) },
            { $set: { score: req.body.score } },
            function (err, res) {
                if (err) throw err;
                console.log("1 document updated");
                response.json(res);
            });
});

// delete post by id
postsRouter.route("/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    db_connect
        .collection("review")
        .findOne(
            { _id: ObjectId(req.params.id) },
            function (err, res) {
                if (err) throw err;
                db_connect
                    .collection("user")
                    .updateOne(
                        { _id: ObjectId(result.author) },
                        { $pull: { reviews: ObjectId(req.params.id) } }
                    )
                db_connect
                    .collection("business")
                    .updateOne(
                        { _id: ObjectId(result.business) },
                        { $pull: { reviews: ObjectId(req.params.id) } }
                    )
                response.json({
                    deleted: true,
                    document: res
                })
            });
    db_connect
        .collection("review")
        .deleteOne(
            { _id: ObjectId(req.params.id) }
        );
});

module.exports = postsRouter;
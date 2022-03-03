const express = require("express");
var ObjectId = require("mongodb").ObjectId;

// connect to db
const dbo = require("../db/conn");

const busiRouter = express.Router();

// get all businesses
busiRouter.route("/all").get(function (req, res) {
    let db_connect = dbo.getDb("feedbak01");
    db_connect
        .collection("business")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// get all businesses but lite version
busiRouter.route("/search").get(function (req, res) {
    let db_connect = dbo.getDb("feedbak01");
    db_connect
        .collection("business")
        .find({})
        .project({ name: 1, about: 1 })
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });

});

// get business by id
busiRouter.route("/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    db_connect
        .collection("business")
        .findOne({ _id: ObjectId(req.params.id) }, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// create a new business
busiRouter.route("/new").post(function (req, response) {
    let db_connect = dbo.getDb("feedbak01");
    let business = {
        name: req.body.name,
        about: req.body.about,
        website: req.body.website,
        admins: [],
        featured: [],
        reviews: [],
        dateJoined: new Date()
    }
    db_connect
        .collection("business")
        .insertOne(business, function (err, res) {
            if (err) throw err;
            response.json(res);
        });
});

// update business by id
busiRouter.route("/update/:id").put(function (req, response) {
    let db_connect = dbo.getDb();
    db_connect
        .collection("business")
        .updateOne({ _id: ObjectId(req.params.id) }, {
            $set: {
                name: req.body.name,
                about: req.body.about,
                website: req.body.website
            }
        }, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            response.json(res);
        });
});

// delete business by id
// what to do about deletions
busiRouter.route("/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("business").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    });
});

// need to be able to add users to this, with unique auth keys every time

module.exports = busiRouter;
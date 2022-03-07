const express = require("express");
const ObjectId = require("mongodb").ObjectId;

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
            // console.log("1 document updated");
            response.json(res);
        });
});

// archive business by id and move all reviews to archive
busiRouter.route("/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    const businessId = ObjectId(req.params.id);
    let msgSent = false;
    let numCompletions = 0;

    db_connect.collection("review")
        .find({
            "business": businessId
        })
        .toArray(function (err, reviewDocs) {
            if (err) throw err;
            if (reviewDocs.length === 0) return;
            reviewIds = reviewDocs.map(doc => doc._id);
            db_connect.collection("review_archive")
                .insertMany(reviewDocs, function (err, res) {
                    if (err) throw err;
                })

            db_connect.collection("review")
                .deleteMany({ _id: { "$in": reviewIds } })
                .catch(err => console.log(`error encountered: ${err}`))
        });

    db_connect.collection("business")
        .findOne({ _id: businessId }, function (err, businessDoc) {
            if (err) throw err;
            if (businessDoc === null) {
                if (!msgSent) {
                    response.json({ result: "no matching business docs found" })
                    msgSent = true;
                }
                return;
            }
            db_connect.collection("business_archive")
                .insertOne(businessDoc, function (err, res) {
                    if (err) throw err;
                })

            db_connect.collection("business")
                .deleteOne({ _id: businessId })
                .catch(err => console.log(`error encountered: ${err}`))
            
            response.json({result: "successful move!"})
        });

});

module.exports = busiRouter;
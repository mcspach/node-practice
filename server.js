const express = require("express");
const bodyParser = require("body-parser");
const { response } = require("express");
const { ObjectId } = require("mongodb");
const app = express();
const MongoClient = require("mongodb").MongoClient;

//templating engine
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());

//data
MongoClient.connect(
  "mongodb+srv://drmort:Ill12Grum!!@cluster0.yygta.mongodb.net/?retryWrites=true&w=majority"
)
  .then((client) => {
    //database
    const db = client.db("movie-quotes");
    const quotesCollection = db.collection("quotes");
    //routes
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get("/", (req, res) => {
      db.collection("quotes")
        .find()
        .toArray()
        .then((results) => {
          res.render("index.ejs", { quotes: results });
        })
        .catch((error) => console.error(error));
    });

    app.post("/quotes", (req, res) => {
      quotesCollection
        .insertOne(req.body)
        .then((result) => {
          res.redirect("/");
          console.log(req.body, result);
        })
        .catch((error) => console.error(error));
    });

    app.put("/quotes", (req, res) => {
      console.log(req.body);
      quotesCollection
        .findOneAndUpdate(
          { _id: ObjectId(req.body._id) },
          {
            $set: {
              name: req.body.name,
              quote: req.body.quote,
            },
          },
          { upsert: false }
        )
        .then((result) => {
          res.json("Good job, you updated a quote.");
        })
        .catch((error) => console.error(error));
    });

    app.delete("/quotes", (req, res) => {
      quotesCollection
        .deleteOne({ _id: ObjectId(req.body._id) })
        .then((result) => {
          res.json("Good Job. Deleted One");
        })
        .catch((error) => console.error(error));
    });

    app.listen(3000, function () {
      console.log("listening on 3000");
    });
    console.log("Connected to Mongo");
  })
  .catch((error) => console.error(error));


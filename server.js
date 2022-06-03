const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;

//templating engine
app.set("view engine", "ejs");

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

      //   res.sendFile(__dirname + "/index.html");
    });

    app.post("/quotes", (req, res) => {
      quotesCollection
        .insertOne(req.body)
        .then((result) => {
          console.log(req.body, result);
        })
        .catch((error) => console.error(error));
    });

    app.listen(3000, function () {
      console.log("listening on 3000");
    });
    console.log("Connected to Mongo");
  })
  .catch((error) => console.error(error));


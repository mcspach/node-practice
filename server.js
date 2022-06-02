const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/quotes", (req, res) => {
  console.log("I would have posted if there wazza DB");
});
app.listen(3000, function () {
  console.log("listening on 3000");
});

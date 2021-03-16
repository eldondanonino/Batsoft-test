const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql");
const Router = require("./Router");

app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());
new Router(app, database);
const port = 3000;

//Setting up the database for the app to use
const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "batsoft",
});

database.connect(function (err) {
  if (err) {
    console.log();
    throw err;
  }
  console.log("Database connected!");
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port);

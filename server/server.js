const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 4000;
const mongoose = require("mongoose");

app.use(cors());
app.use(bodyParser.json());

//database connection
mongoose.connect("mongodb://127.0.0.1:27017/expense", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb Connection establised successfully");
});

//server connection
app.listen(PORT, function () {
  console.log(`Server is running on Port ${PORT}`);
});

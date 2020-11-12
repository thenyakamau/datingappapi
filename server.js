const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const morgan = require("morgan");
const colors = require("colors");
const database = require("./config/database");
const userRoute = require("./routes/user");
const indexRouter = require("./routes/index");

dotenv.config({ path: ".env" });

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/user", userRoute);

app.use(express.static(__dirname + "/public"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 500;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

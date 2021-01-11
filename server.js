const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const path = require("path");
const morgan = require("morgan");
const colors = require("colors");
const database = require("./config/database");
const userRoute = require("./routes/user");
const conversationRoute = require("./routes/conversation");
const matchRouter = require("./routes/match");
const indexRouter = require("./routes/index");
const fileUpload = require("express-fileupload");

const cors = require("cors");

dotenv.config({ path: ".env" });

const app = express();
const server = http.createServer(app);
const socketio = require("socket.io")(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/user", userRoute);
app.use("/conversation", conversationRoute);
app.use("/match", matchRouter);

app.use(express.static(__dirname + "/public"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 500;

socketio.on("connection", (userSocket) => {
  userSocket.on("send_message", (data) => {
    userSocket.broadcast.emit("receive_message", data);
  });
});

server.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

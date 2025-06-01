const express = require('express');
const app = express();
const userRouter = require("./router/userRouter.js");
const donationRouter = require("./router/donationRouter.js");
const authRouter = require("./router/authRouter.js");
const notificationRouter = require("./router/notificationRouter.js");
const errorHandler = require("./middleware/errorHandler.js");
const path = require("path");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");


app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    origin: [process.env.CLIENT_URL, "http://localhost:4000"],
    credentials: true
  })
);


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
  })
);

// Routes
 app.use("/api/auth", authRouter);
  app.use("/api", donationRouter);
  app.use("/api", userRouter);
  app.use("/api", notificationRouter);
  app.use("/", (req, res) =>
    res.status(200).json({ success: true, server: "food donation Backend" })
  );


// error handler
app.use(errorHandler);

module.exports = app;
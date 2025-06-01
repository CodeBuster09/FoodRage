const express = require("express");
const notificationRouter = express.Router();
const {
  getNotifications,
  removeNotification
} = require("../controller/notificationController.js");
const jwtAuth = require("../middleware/jwtAuthenticaion.js");

notificationRouter.get("/notifications", jwtAuth, getNotifications);
notificationRouter.delete(
  "/notification/:notificationId",
  jwtAuth,
  removeNotification
);

module.exports = notificationRouter;

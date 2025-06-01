const express = require("express");
const userRouter = express.Router();
const cloudinaryImageUpload = require("../middleware/cloudinaryImageUpload.js");
const {
  addUser,
  getUsers,
  getUser,
  editUser
} = require("../controller/userController.js");
const jwtAuth = require("../middleware/jwtAuthenticaion.js");
const {isAdmin }= require("../middleware/authMiddleware.js");


userRouter.post("/user", jwtAuth, cloudinaryImageUpload, addUser);
userRouter.patch("/user", jwtAuth, cloudinaryImageUpload, editUser);
userRouter.get("/user", jwtAuth, getUser);
userRouter.get("/users", jwtAuth,isAdmin, getUsers);

module.exports = userRouter;

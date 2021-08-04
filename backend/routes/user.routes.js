'use strict'

const router = require("express").Router();
// const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
// const uploadController = require('../controllers/upload.controller');
// const multer = require("multer");
// const upload = multer();

// auth
// router.post("/register", authController.signUp);
// router.post("/login", authController.signIn);
// router.get("/logout", authController.logout);

// user DB
router.get("/", userController.getAllUsers);
router.get("/:usrId", userController.userInfo);
router.put("/:usrId", userController.updateUser);
router.delete("/:usrId", userController.deleteUser);
router.patch("/follow/:usrId", userController.follow);
router.patch("/unfollow/:usrId", userController.unfollow);

// upload
// router.post("/upload", upload.single("file"), uploadController.uploadProfil);

module.exports = router;

console.log('backend/routes/user.routes.js 🚀');
const { isAuth } = require("../../middlewares/auth");

const { register, login, getProfile } = require("../controllers/authController");

const authRoutes = require("express").Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.get("/profile", isAuth, getProfile);

module.exports = authRoutes;
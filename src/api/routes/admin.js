const express = require("express");
const { isAuth, isAdmin } = require("../../middlewares/auth");
const { getGuests } = require("../controllers/guest");

const router = express.Router();

router.get("/guests", isAuth, isAdmin, getGuests);

module.exports = router;
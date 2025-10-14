const { getGuests, addGuest, searchGuest } = require("../controllers/guest");

const guestRoutes = require("express").Router();

guestRoutes.get("/", getGuests);
guestRoutes.get("/search", searchGuest);
guestRoutes.post("/", addGuest);

module.exports = guestRoutes;

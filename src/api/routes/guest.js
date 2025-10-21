const { getGuests, addGuest, searchGuest, updateGuest } = require("../controllers/guest");

const guestRoutes = require("express").Router();

guestRoutes.get("/", getGuests);
guestRoutes.get("/search", searchGuest);
guestRoutes.post("/", addGuest);
guestRoutes.put("/:id", updateGuest);

module.exports = guestRoutes;

const { getGuests, getGuestByToken, addGuest, searchGuest, updateGuestByToken } = require("../controllers/guest");

const guestRoutes = require("express").Router();

guestRoutes.get("/", getGuests);
guestRoutes.get("/token/:token", getGuestByToken);
guestRoutes.get("/search", searchGuest);
guestRoutes.post("/", addGuest);
guestRoutes.put("/:id", updateGuestByToken);

module.exports = guestRoutes;

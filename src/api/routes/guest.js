const { generateTokenForGuest, getGuests, getGuestByToken, updateGuestByToken, searchGuest } = require("../controllers/guest");

const guestRoutes = require("express").Router();

guestRoutes.post("/generate-token", generateTokenForGuest);
guestRoutes.get("/", getGuests);
guestRoutes.get("/token/:token", getGuestByToken);
guestRoutes.put("/token/:token", updateGuestByToken);
guestRoutes.get("/search", searchGuest);

module.exports = guestRoutes;

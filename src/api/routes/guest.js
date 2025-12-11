const { generateTokenForGuest, getGuests, getGuestByToken, addGuest, searchGuest, updateGuestByToken } = require("../controllers/guest");

const guestRoutes = require("express").Router();

guestRoutes.post("/generate-token", generateTokenForGuest);
guestRoutes.get("/", getGuests);
guestRoutes.get("/token/:token", getGuestByToken);
guestRoutes.get("/search", searchGuest);
guestRoutes.post("/", addGuest);
guestRoutes.put("/token/:token", updateGuestByToken);

module.exports = guestRoutes;

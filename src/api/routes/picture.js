const { getPictures, addPicture, deletePicture } = require("../controllers/picture.js");
const { upload } = require("../../utils/cloudinary");
const { isAuth } = require("../../middlewares/auth");

const pictureRoutes = require("express").Router();

pictureRoutes.get("/", getPictures);
pictureRoutes.post("/", upload.single("image"), addPicture);
pictureRoutes.delete("/:id", isAuth, deletePicture);

module.exports = pictureRoutes;
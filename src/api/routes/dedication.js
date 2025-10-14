const { createDedication, getDedications, deleteDedication } = require("../controllers/dedication.js") ;
const { upload } = require("../../utils/cloudinary");
const { isAuth } = require("../../middlewares/auth.js");

const dedicationRoutes = require("express").Router();

dedicationRoutes.get("/", getDedications);
dedicationRoutes.post("/", upload.single("file"), createDedication);
dedicationRoutes.delete("/:id", isAuth, deleteDedication);

module.exports = dedicationRoutes;
const { createIdea, getIdeas, getAllIdeas, getApprovedIdeas, deleteIdea  } = require ("../controllers/idea.js");
const { isAuth } = require("../../middlewares/auth.js");

const ideaRoutes = require("express").Router();

ideaRoutes.get("/", getIdeas);
ideaRoutes.post("/", createIdea);
ideaRoutes.get("/admin", isAuth, getAllIdeas);
ideaRoutes.get("/", getApprovedIdeas);
ideaRoutes.delete("/:id", isAuth, deleteIdea);


module.exports = ideaRoutes;
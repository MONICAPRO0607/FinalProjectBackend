const { createIdea, getIdeas, deleteIdea  } = require ("../controllers/idea.js");
const { isAuth } = require("../../middlewares/auth.js");

const ideaRoutes = require("express").Router();

ideaRoutes.get("/", getIdeas);
ideaRoutes.post("/", createIdea);
ideaRoutes.delete("/:id", isAuth, deleteIdea);

module.exports = ideaRoutes;
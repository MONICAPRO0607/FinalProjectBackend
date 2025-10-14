const Idea = require("../models/idea");

const createIdea = async (req, res) => {
  try {
    const idea = new Idea(req.body);
    await idea.save();
    res.status(201).json(idea);
  } catch (error) {
    res.status(400).json({ message: "Error al crear la idea", error });
  }
};

const getIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find().sort({ createdAt: -1 });
    res.json(ideas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener ideas", error });
  }
};

const deleteIdea = async (req, res) => {
  try {
    const { id } = req.params;
    await Idea.findByIdAndDelete(id);
    res.json({ message: "Idea eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar idea", error });
  }
};

module.exports = { createIdea, getIdeas, deleteIdea };
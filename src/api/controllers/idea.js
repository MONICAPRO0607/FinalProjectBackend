const Idea = require("../models/idea");

const createIdea = async (req, res) => {
  try {
   const newIdea = new Idea({
   name: req.body.name,
   message: req.body.message,
   approved: false,
  });
  const saved = await newIdea.save();
  res.json(saved);
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

const getApprovedIdeas = async (req, res) => {
  const ideas = await Idea.find({ approved: true });
  res.json(ideas);
};

const getAllIdeas = async (req, res) => {
  const ideas = await Idea.find();
  res.json(ideas);
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

module.exports = { createIdea, getIdeas, getAllIdeas, getApprovedIdeas, deleteIdea };
const Idea = require("../models/idea");

const normalizeCategory = (cat) => {
  if (!cat) return null;

  const normalized = cat
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

  const map = {
    "cancion": "Canción",
    "actividad": "Actividad",
    "juego": "Juego",
    "detalle especial": "Detalle especial",
  };
  return map[normalized] || null;
};

const createIdea = async (req, res) => {
  try {
    const { name, idea, category, message } = req.body;

    if (!name?.trim() || !idea?.trim()) {
      return res.status(400).json({ message: "Debes completar nombre e idea" });
    }

    const normalizedCategory = normalizeCategory(category);

    console.log("CATEGORY RECIBIDA:", category);
    console.log("NORMALIZED:", normalizedCategory);
    
    if (!normalizedCategory) {
      return res.status(400).json({ message: "Categoría inválida" });
    }

    const newIdea = new Idea({
      name: name.trim(),
      idea: idea.trim(),
      category: normalizedCategory,
      message: message?.trim() || "",
      approved: false,
    });

  const saved = await newIdea.save();
  res.status(201).json(saved);
  } catch (error) {
    console.error("Error real al guardar idea:", error);
    res.status(400).json({ message: "Error al crear la idea", error: error.message });
  }
};

const getIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find().sort({ createdAt: -1 });
    res.status(200).json(ideas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener ideas", error });
  }
};

const getApprovedIdeas = async (req, res) => {
   try {
    const ideas = await Idea.find({ approved: true }).sort({ createdAt: -1 });
    res.status(200).json(ideas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener ideas aprobadas" });
  }
};

const getAllIdeas = async (req, res) => {
  const ideas = await Idea.find();
  res.json(ideas);
};

const deleteIdea = async (req, res) => {
   try {
    await Idea.findByIdAndDelete(req.params.id);
    res.json({ message: "Idea eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar idea" });
  }
};

module.exports = { createIdea, getIdeas, getAllIdeas, getApprovedIdeas, deleteIdea };
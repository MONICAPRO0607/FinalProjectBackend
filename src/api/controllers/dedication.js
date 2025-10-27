const Dedication = require("../models/dedication");

const createDedication = async (req, res) => {
  try {
    const { name, message } = req.body;
    let file = null;

    if (req.file) file = req.file.path;
    const dedication = new Dedication({ name, message, file });

    await dedication.save();
    res.status(201).json(dedication);
  } catch (error) {
    res.status(400).json({ message: "Error al crear la dedicatoria", error });
  }
};

const getDedications = async (req, res) => {
  try {
    const dedications = await Dedication.find().sort({ createdAt: -1 }).populate("guest");
    res.json(dedications);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener dedicatorias", error });
  }
};

const deleteDedication = async (req, res) => {
  try {
    const { id } = req.params;
    await Dedication.findByIdAndDelete(id);
    res.json({ message: "Dedicatoria eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar dedicatoria", error });
  }
};

module.exports = { createDedication, getDedications, deleteDedication };
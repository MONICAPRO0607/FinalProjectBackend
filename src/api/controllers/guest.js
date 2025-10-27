const Guest = require("../models/guest");

const getGuests = async (req, res) => {
  try {
    const guests = await Guest.find().populate("dedications", "idea", "picture");
    res.json(guests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error obteniendo invitados" });
  }
};

const addGuest = async (req, res) => {
  try {
    const { name, menu, allergies, specialNeeds, message } = req.body;

    const existingGuest = await Guest.findOne({ name });
    if (!existingGuest) {
      return res.status(404).json({ message: "Invitado no encontrado" });
    }

    existingGuest.menu = menu || existingGuest.menu;
    existingGuest.allergies = allergies || existingGuest.allergies;
    existingGuest.specialNeeds = specialNeeds || existingGuest.specialNeeds;
    existingGuest.message = message || existingGuest.message;
    existingGuest.confirmed = true;

    await existingGuest.save();
    res.status(200).json(existingGuest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al guardar el invitado" });
  }
};

const updateGuest = async (req, res) => {
  try {
    const updated = await Guest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar invitado" });
  }
};

const searchGuest = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) return res.status(400).json({ message: "Falta el parámetro name" });

    const normalized = name.toLowerCase().trim().normalize("NFD").replace(/\p{Diacritic}/gu, "");

    const guestFound = await Guest.findOne({
      nameNormalized: { $regex: normalized, $options: "i" }
    });

    if (!guestFound) return res.status(404).json({ message: "Invitado no encontrado" });

    res.json(guestFound);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error buscando invitado" });
  }
};

module.exports = { getGuests, addGuest, searchGuest, updateGuest };
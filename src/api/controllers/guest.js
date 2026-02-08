const crypto = require("crypto");
const Guest = require("../models/guest");

const generateTokenForGuest = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Debes enviar nombre y correo electrónico" });
    };

    const normalizedName = name.toLowerCase().trim().normalize("NFD").replace(/\p{Diacritic}/gu, "");

    let guest = await Guest.findOne({ nameNormalized: normalizedName, email: email.trim() });

    if (!guest) {
      return res.status(404).json({ message: "No estás en la lista de invitados, no puedes generar un código" });
    }

    if (!guest.token) {
      guest.token = crypto.randomBytes(4).toString("hex").toUpperCase();
      await guest.save();
    }

    res.json({ token: guest.token, name: guest.name, email: guest.email, party: guest.party, relation: guest.relation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generando token" });
  }
};

const getGuests = async (req, res) => {
  try {
    const guests = await Guest.find();
    res.json(guests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error obteniendo invitados" });
  }
};

const getGuestByToken = async (req, res) => {
   try {
    const { token } = req.params;
    if (!token) return res.status(400).json({ message: "No se proporcionó un token." });

    const guest = await Guest.findOne({ token });
    if (!guest) return res.status(404).json({ message: "Invitado no encontrado o token inválido." });

    res.json(guest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error obteniendo invitado por token." });
  }
}; 

const updateGuestByToken = async (req, res) => {
  try {
    const { token } = req.params;
    const { menu, allergies, specialNeeds, message, confirmed } = req.body;

    const guest = await Guest.findOne({ token });
    if (!guest) return res.status(404).json({ message: 'Invitado no encontrado' });

    guest.menu = menu ?? guest.menu;
    guest.allergies = allergies ?? guest.allergies;
    guest.specialNeeds = specialNeeds ?? guest.specialNeeds;
    guest.message = message ?? guest.message;
    guest.confirmed = confirmed ?? guest.confirmed;

    await guest.save();
    res.json({ success: true, guest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error actualizando invitado' });
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

module.exports = { generateTokenForGuest, getGuests, getGuestByToken, updateGuestByToken, searchGuest };
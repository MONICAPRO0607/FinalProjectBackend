const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const { generarLlave } = require("../../utils/jwt");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Admin.findOne({ username });
    if (!user) return res.status(401).json({ message: "Usuario no encontrado" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = generarLlave(user._id);
    res.json({
      token,
      user: { id: user._id, username: user.username, role: user.role },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

module.exports = router;
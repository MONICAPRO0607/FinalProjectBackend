const mongoose = require("mongoose");

const novioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ["novio", "invitado", "admin"], default: "novio" },
});

const Novio = mongoose.model("Novio", novioSchema, "Novio");

module.exports = Novio;
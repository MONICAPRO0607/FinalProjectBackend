const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  tipo: { type: String, required: true },
  medidas: { type: String, required: true }
}, {
  timestamps: true,
  collection: "Producto"
});

const Producto = mongoose.model("Producto", ProductSchema, "Producto");
module.exports = Producto;


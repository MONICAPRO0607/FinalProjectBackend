const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const clienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  telefono: { type: String, required: true },
  direccion: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  pedido: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pedido" }],
  rol: {
    type: String,
    required: true,
    default: "user",
    enum: ["admin", "user"]
  }
}, {
  timestamps: true,
  collection: "Cliente"
});

clienteSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  
  try {const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
} catch (err) {
  next(err);
}
});

const Cliente = mongoose.model("Cliente", clienteSchema, "cliente");
module.exports = Cliente;
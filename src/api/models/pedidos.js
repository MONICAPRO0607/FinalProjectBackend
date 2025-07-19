const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  clienteId: {type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Cliente'},
  tipo: { type: String, required: true},
  materiales: { type: String, required: true },
  medidas: { type: String, required: true },
  fechaPedido: { type: Date, required: true },
  estado: { type: String, enum: ['En proceso', 'Terminado', 'Entregado'], default: 'En proceso'}
}, {
  timestamps: true,
  collection: "Pedido"
});

const Pedido =  mongoose.model("Pedido", pedidoSchema, "Pedido");
module.exports = Pedido;
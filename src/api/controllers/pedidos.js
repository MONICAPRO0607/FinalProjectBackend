const Pedido = require('../models/pedidos');

// Obtener todos los pedidos
const getPedidos = async (req, res, next) => {
  try {
    const pedidos = await Pedido.find().populate('clienteId');
    return res.status(200).json(pedidos);
  } catch (error) {
    return res.status(400).json("Error al obtener pedidos")
  }
};

// Crear pedido
const createPedido = async (req, res, next) => {
  try {
    const newPedido = new Pedido(req.body);
    const pedido = await newPedido.save();
    return res.status(201).json(pedido);
  } catch (error) {
    return res.status(400).json("Error al crear pedido")
  }
};

// Obtener pedidos por cliente
const getPedidosPorCliente = async (req, res, next) => {
  try {
    const pedidos = await Pedido.find({ clienteId: req.params.id });
    return res.status(200).json(pedidos);
  } catch (error) {
    return res.status(400).json("Error al obtener pedidos del cliente")
  };
};

// Eliminar pedido por cliente
  const deletePedido = async (req, res, next) => {
    try {
      const pedido = await Pedido.findOneAndDelete({ clienteId: req.params.id });
      return res.status(200).json(pedido);
    } catch (error) {
      return res.status(400).json("Error al eliminar pedido")
    };
  };


module.exports = {getPedidos, createPedido, getPedidosPorCliente, deletePedido}
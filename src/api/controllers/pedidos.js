const Pedido = require('../models/pedidos');

// Obtener todos los pedidos
const getPedidos = async (req, res, next) => {
  try {
    const pedidos = await Pedido.find().populate('clienteId', 'nombre email');
    return res.status(200).json(pedidos);
  } catch (error) {
    return res.status(400).json("Error al obtener pedidos")
  }
};

// Crear pedido
const createPedido = async (req, res, next) => {
   try {
    const newPedido = new Pedido({
      clienteId: req.user._id,
      tipo: req.body.tipo,
      materiales: req.body.materiales,
      medidas: req.body.medidas,
      fechaPedido: new Date(),
      estado: 'En proceso'
    });

    const pedido = await newPedido.save();
    return res.status(201).json(pedido);
  } catch (error) {
    console.error(error);
    return res.status(400).json("Error al crear pedido");
  }
};

// Obtener pedidos por cliente
const getPedidosPorCliente = async (req, res, next) => {
  try {
    if (req.user.rol !== 'admin' && req.user._id.toString() !== req.params.id) {
      return res.status(403).json("No autorizado");
    }
    const pedidos = await Pedido.find({ clienteId: req.params.id });
    return res.status(200).json(pedidos);
  } catch (error) {
    return res.status(400).json("Error al obtener pedidos del cliente");
  }
};

// Obtener productos por pedido
const getProductsByPedido = async (req, res, next) => {
  try {
    const products = await Product.find({ pedidoId: req.params.id }).populate('productId');
    return res.status(200).json(products);
  } catch (error) {
    return res.status(400).json("Error al obtener productos del pedido");
  }};

// Eliminar pedido por cliente
  const deletePedido = async (req, res, next) => {
     try {
    const pedido = await Pedido.findById(req.params.id);
    if (!pedido) return res.status(404).json("Pedido no encontrado");

    // Solo admin o dueño del pedido
    if (req.user.rol !== "admin" && pedido.clienteId.toString() !== req.user.id) {
      return res.status(403).json("No tienes permiso para eliminar este pedido");
    }

    await pedido.remove();
    return res.status(200).json({ message: "Pedido eliminado" });
  } catch (error) {
    return res.status(400).json("Error al eliminar pedido");
  }
};


module.exports = {getPedidos, createPedido, getPedidosPorCliente, getProductsByPedido, deletePedido}
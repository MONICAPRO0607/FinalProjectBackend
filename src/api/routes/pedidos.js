const { isAuth } = require("../../middlewares/auth");
const { getPedidos, createPedido, getPedidosPorCliente, deletePedido } = require("../controllers/pedidos");

const pedidosRoutes = require("express").Router();

pedidosRoutes.get("/", getPedidos);
pedidosRoutes.post("/", isAuth, createPedido);
pedidosRoutes.get("/:id", getPedidosPorCliente);
pedidosRoutes.delete("/:id", isAuth, deletePedido);

module.exports = pedidosRoutes;

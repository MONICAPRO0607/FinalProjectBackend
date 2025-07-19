const { isAuth } = require("../../middlewares/auth");
const { getCliente, getClienteById, registerCliente, loginCliente, updateCliente} = require("../controllers/clientes");

const clientesRoutes = require("express").Router();

clientesRoutes.get("/", getCliente);
clientesRoutes.get("/:id", getClienteById);
clientesRoutes.post("/register", registerCliente);
clientesRoutes.post("/login", loginCliente);
clientesRoutes.put("/:id", isAuth, updateCliente);

module.exports = clientesRoutes;
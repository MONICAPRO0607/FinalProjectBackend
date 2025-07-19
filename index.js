require("dotenv").config();
const express = require('express');
const { connectDB } = require('./src/config/db');
const pedidosRoutes = require ("./src/api/routes/pedidos");
const clientesRoutes = require ("./src/api/routes/clientes");
const cors = require('cors');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/v1/pedidos", pedidosRoutes);
app.use("/api/v1/clientes", clientesRoutes);
  
app.use((req, res, next) => {
  return res.status(404).json("Route Not Found")
});

app.listen(3000, () => {
  console.log("servidor levantado en http://localhost:3000")
});
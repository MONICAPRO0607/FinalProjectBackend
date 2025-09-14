require("dotenv").config();
const express = require('express');
const { connectDB } = require('./src/config/db');
const pedidosRoutes = require("./src/api/routes/pedidos");
const clientesRoutes = require("./src/api/routes/clientes");
const productsRoutes = require("./src/api/routes/products"); 
const cors = require('cors');

const app = express();

connectDB();

const allowedOrigins = ['https://project10-navy.vercel.app', 'http://localhost:5173'];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(new Error(`CORS Policy: origen ${origin} no permitido`), false);
    }
    return callback(null, true);
  },
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true
}));


app.use(express.json());

app.use("/api/v1/pedidos", pedidosRoutes);
app.use("/api/v1/clientes", clientesRoutes);
app.use("/api/v1/products", productsRoutes); 

app.use((req, res, next) => {
  return res.status(404).json("Route Not Found");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor levantado en https://project10-navy.vercel.app`);
});
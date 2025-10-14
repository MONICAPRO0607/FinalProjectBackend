require("dotenv").config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./src/config/db');

const authRoutes = require("./src/api/routes/auth");
const dedicationRoutes = require("./src/api/routes/dedication");
const guestRoutes = require("./src/api/routes/guest");
const ideaRoutes = require("./src/api/routes/idea"); 
const pictureRoutes = require("./src/api/routes/picture");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/guest", guestRoutes);
app.use("/api/v1/dedication", dedicationRoutes);
app.use("/api/v1/idea", ideaRoutes); 
app.use("/api/v1/picture", pictureRoutes);


app.use((req, res, next) => {
  res.status(404).json({ message: "Route Not Found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor levantado en puerto ${PORT}`);
});

module.exports = app;

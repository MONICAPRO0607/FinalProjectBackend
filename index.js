require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./src/config/db");
const { loadGuestsFromCSV } = require("./src/config/loadGuests");

const authRoutes = require("./src/api/routes/auth");
const dedicationRoutes = require("./src/api/routes/dedication");
const guestRoutes = require("./src/api/routes/guest");
const ideaRoutes = require("./src/api/routes/idea");
const pictureRoutes = require("./src/api/routes/picture");
const adminRoutes = require("./src/api/routes/admin");

const app = express();

connectDB()
  .then(() => loadGuestsFromCSV())
  .catch((err) => console.error("Error conectando a la BD:", err));


const allowedOrigins = [
  "http://localhost:5173",
  "https://final-project-backend-smoky.vercel.app"
];

app.use(cors({
  origin: function(origin, callback){
    if(!origin || allowedOrigins.includes(origin)){
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true 
}));

// app.use((req, res, next) => {
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.setHeader("Access-Control-Allow-Origin", origin);
//   }
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }
  
//   next();
// });

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/guest", guestRoutes);
app.use("/api/v1/dedication", dedicationRoutes);
app.use("/api/v1/idea", ideaRoutes);
app.use("/api/v1/picture", pictureRoutes);
app.use("/api/v1/admin", adminRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Route Not Found" });
});

app.use((err, req, res, next) => {
  console.error("🔥 ERROR GLOBAL:", err);
  res.status(500).json({ message: "Error interno del servidor", error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor levantado en puerto ${PORT}`);
});

module.exports = app;

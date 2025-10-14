const jwt = require("jsonwebtoken");
const Novio = require("../api/models/Novio");

const isAuth = async (req, res, next) => {
  try {
      console.log("Authorization header:", req.headers.authorization);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token no proporcionado o mal formado" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const novio = await Novio.findById(decoded.id).select("-password");
    if (!novio) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    req.novio = novio;
    next();
  } catch (error) {
    console.error("❌ Error en autenticación:", error.message);
    return res.status(401).json({ message: "No autorizado o token inválido" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.novio && req.novio.rol === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Acceso solo para administradores" });
};

module.exports = { isAuth, isAdmin };
const jwt = require("jsonwebtoken");

const generarLlave = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d", 
  });
};

const verificarLlave = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error("❌ Token inválido:", error.message);
    throw new Error("Token inválido o expirado");
  }
};

module.exports = { generarLlave, verificarLlave };

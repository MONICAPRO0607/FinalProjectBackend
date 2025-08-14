const Cliente = require("../api/models/clientes");
const { verificarLlave } = require("../utils/jwt");

const isAuth = async (req, res, next) => {
    try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json("Token no proporcionado o mal formado");
    }
    
    const token = authHeader.replace("Bearer ", "");
    const { id } = verificarLlave(token);

      
    const cliente = await Cliente.findById(id);
    if (!cliente) return res.status(404).json("Usuario no encontrado");

    req.user = {
      id: cliente._id,
      nombre: cliente.nombre,
      email: cliente.email,
      rol: cliente.rol
    };
        next();
        
    } catch (error) {
        console.error("Auth error:", error);
        return res.status(401).json("No estás autorizado")
    }
};

module.exports = { isAuth }

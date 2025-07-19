const Cliente = require("../api/models/clientes");
const { verificarLlave } = require("../utils/jwt");


const isAuth = async (req, res, next) => {
    try {

        console.log("Authorization header:", req.headers.authorization);
        
        const token = req.headers.authorization;

          // Validación robusta del token
            if (!token || !token.startsWith("Bearer ")) {
            return res.status(401).json("Token no proporcionado o mal formado");
            };

        const parsedToken = token.replace("Bearer ", "");

        const { id } = verificarLlave(parsedToken);
        
        const cliente = await Cliente.findById(id);
        if (!cliente) {
        return res.status(404).json("Usuario no encontrado");
        };

        cliente.password = null;
        req.user = cliente;
        next();
        
    } catch (error) {
        console.error("Auth error:", error);
        return res.status(401).json("No estás autorizado")
    }
};

module.exports = { isAuth }

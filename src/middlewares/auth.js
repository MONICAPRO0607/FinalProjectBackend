const jwt = require('jsonwebtoken')
const Admin = require('../api/models/admin')

const isAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token no proporcionado o mal formado' });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Admin.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    req.user = user;
    next()
  } catch (error) {
    console.error('❌ Error en autenticación:', error.message)
    return res.status(401).json({ message: 'No autorizado o token inválido' })
  }
}

const isAdmin = (req, res, next) => {
  if (req.user?.role === 'admin') {
    return next()
  }
  return res.status(403).json({ message: 'Acceso solo para administradores' })
}

module.exports = { isAuth, isAdmin }

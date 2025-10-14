const bcrypt = require("bcrypt");
const Novio = require("../models/Novio");
const { generarLlave } = require("../../utils/jwt");
const { isAuth } = require("../../middlewares/auth");

const register = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const existe = await Novio.findOne({ email });
    if (existe) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoNovio = new Novio({
      nombre,
      email,
      password: hashedPassword,
      rol: rol || "novio",
    });

    await nuevoNovio.save();

    const token = generarLlave(nuevoNovio._id);

    res.status(201).json({
      message: "Usuario registrado con éxito",
      user: {
        id: nuevoNovio._id,
        nombre: nuevoNovio.nombre,
        email: nuevoNovio.email,
        rol: nuevoNovio.rol,
      },
      token,
    });
  } catch (error) {
    console.error("❌ Error en register:", error);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const usuario = await Novio.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const match = await bcrypt.compare(password, usuario.password);
    if (!match) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = generarLlave(usuario._id);

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      user: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
      token,
    });
  } catch (error) {
    console.error("❌ Error en login:", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

const getProfile = async (req, res) => {
  try {
    const usuario = await Novio.findById(req.novio.id).select("-password");
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(usuario);
  } catch (error) {
    console.error("❌ Error en getProfile:", error);
    res.status(500).json({ message: "Error al obtener perfil" });
  }
};

module.exports = { register, login, getProfile };
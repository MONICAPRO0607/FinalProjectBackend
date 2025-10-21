const { isAuth } = require("../../middlewares/auth")
const jwt = require("jsonwebtoken");

const loginAdmin = (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASS
  ) {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    return res.json({ token });
  }

  res.status(401).json({ message: "Credenciales incorrectas" });
};

module.exports = { loginAdmin };

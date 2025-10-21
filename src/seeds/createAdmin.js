require("dotenv").config();
const { connectDB } = require("../config/db");
const Admin = require("../api/models/admin");

(async () => {
  try {
    await connectDB();
    const username = process.env.ADMIN_USER || "novios";
    const password = process.env.ADMIN_PASS || "Paula&Quique2026";

    const exists = await Admin.findOne({ username });
    if (exists) {
      console.log("Admin ya existe");
      process.exit(0);
    }

    const admin = new Admin({ username, password, role: "admin" });
    await admin.save();
    console.log("Admin creado:", admin.username);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
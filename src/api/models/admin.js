const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "admin" },
}, { timestamps: true,
    collection: "admin"
});

AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

AdminSchema.methods.comparePassword = function (candidate) {
  const bcrypt = require("bcrypt");
  return bcrypt.compare(candidate, this.password);
};

const Admin = mongoose.model("Admin", AdminSchema, "admin");

module.exports = Admin;
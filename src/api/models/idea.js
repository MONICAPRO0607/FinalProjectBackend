const mongoose = require("mongoose");

const ideaSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["cancion", "actividad", "juego", "detalle_especial"],
    },
    idea: { type: String, required: true, trim: true },
    message: { type: String, default: "" },
    approved: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    collection: "idea",
  }
);

const Idea = mongoose.model("Idea", ideaSchema);
module.exports = Idea;
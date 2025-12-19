const mongoose = require("mongoose");

const ideaSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["Canción", "Actividad", "Juego", "Detalle especial"],
    },
    idea: { type: String, required: true, trim: true },
    message: { type: String, default: "" },
    approved: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    collection: "ideas",
  }
);

const Idea = mongoose.model("Idea", ideaSchema);
module.exports = Idea;
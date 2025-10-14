const mongoose = require("mongoose");

const ideaSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: {
    type: String,
    enum: ["Canción", "Actividad", "Juego", "Detalle especial"],
    default: "Idea",
  },
  idea: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true,
    collection: "Idea"
   });

const idea = mongoose.model("Idea", ideaSchema, "Idea");
module.exports = idea;
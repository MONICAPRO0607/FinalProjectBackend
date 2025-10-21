const mongoose = require("mongoose");

const ideaSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: {
    type: String,
    enum: ["Canción", "Actividad", "Juego", "Detalle especial"],
    default: "Idea",
  },
  message: { type: String, default: "" },
  idea: { type: String, required: true, trim: true },
  approved: { type: Boolean, default: false } ,
}, { timestamps: true,
    collection: "Idea"
   });

const Idea = mongoose.model("Idea", ideaSchema, "idea");
module.exports = Idea;
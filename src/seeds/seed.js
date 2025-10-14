require("dotenv").config();
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const mongoose = require("mongoose");
const { connectDB } = require("../config/db");
const Guest = require("../models/guest"); 

const filePath = path.join(__dirname, "../config/guests.csv");

(async () => {
  try {
    await connectDB();
    console.log("✅ Conectado a MongoDB");

    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        const { name, relation, party } = row;
        if (name && relation && party) {
          results.push({
            name,
            nameNormalized: name.toLowerCase().trim().normalize("NFD").replace(/\p{Diacritic}/gu, ""),
            relation,
            party,
            menu: "",
            allergies: "",
            specialNeeds: "",
            message: "",
            confirmed: false,
          });
        }
      })
      .on("end", async () => {
        console.log(`📥 ${results.length} registros leídos desde CSV`);

        await Guest.deleteMany({});
        console.log("🧹 Colección 'guest' vaciada");

        await Guest.insertMany(results);
        console.log("🌱 Seed completado con éxito!");

        mongoose.connection.close();
      });
  } catch (error) {
    console.error("❌ Error cargando seed:", error);
    mongoose.connection.close();
  }
})();

const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");
const Guest = require("../api/models/guest");

async function loadGuestsFromCSV() {
  const filePath = path.join(__dirname, "guests.csv");
  const results = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        try {
          for (const row of results) {
             if (!row.name) continue;
            const nameNormalized = row.name
              .toString()
              .toLowerCase()
              .trim()
              .normalize("NFD")
              .replace(/\p{Diacritic}/gu, "");

            await Guest.updateOne(
              { nameNormalized },
              {
                $setOnInsert: {
                  name: row.name,
                  relation: row.relation || "",
                  party: row.party || "",
                  nameNormalized,
                },
              },
              { upsert: true }
            );
          }

          console.log("✅ Invitados cargados desde CSV correctamente");
          resolve();
        } catch (error) {
          console.error("❌ Error cargando invitados:", error);
          reject(error);
        }
      });
  });
}

module.exports = { loadGuestsFromCSV };
//entry point za backend

const express = require("express"); //uvoz express biblioteke
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // učita .env fajl   (process.env.NAZIV)

const app = express(); //instanca servera

const PORT = process.env.PORT || 5000; //.env ide u gitignore
//middleware
app.use(cors()); //omogućava frontend-u (npr. sa localhost:3000) da šalje zahteve serveru
app.use(express.json()); //omogućava Express-u da čita JSON telo u POST, PUT zahtevima

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Povezano sa MongoDB");
    app.listen(PORT, () => {
      //server slusa na portu 5000
      console.log(`🚀 Server radi na http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Greška pri povezivanju sa MongoDB:", error);
  });

const routes = require("./routes"); //trazi index.js !!!
app.use("/", routes);

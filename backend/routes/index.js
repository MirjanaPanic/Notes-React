//centralni registar ruta
//modularna organizacija ruta

const express = require("express");
const router = express.Router();

//moduli koje uvozim
const notesRoutes = require("./notes"); //uvozim modul iz fajla notes.js
const usersRoutes = require("./users");

//Povezivanje ruta
router.use("/notes", notesRoutes); //sve rute koje pocinju sa /notes
router.use("/users", usersRoutes);

module.exports = router;

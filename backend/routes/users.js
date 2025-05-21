const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//dodavanje korisnika
router.post("/create", async (req, res) => {
  try {
    console.log("Stigao POST /users zahtev");
    const { username, password } = req.body; // lozinka dolazi u običnom obliku

    // Napravi hash od lozinke
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Sačuvaj korisnika sa hashiranom lozinkom
    const newUser = new User({ username, passwordHash });
    await newUser.save();

    res.status(201).json({ message: "User created", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

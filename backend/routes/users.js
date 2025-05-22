const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// create new user
// http://localhost:5000/users/register
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body; //lozinka kao plaintext

    //validacija podataka pre nego sto stignu do baze:
    if (!username || !password) {
      return res.status(400).json({
        error: "Username and password are required!",
      });
    }

    /* provera da li se koristi index -> koristi se :)
    const explain = await User.findOne({ username }).explain();
    console.log("🔍 Index check:", explain.queryPlanner.winningPlan.inputStage);
    */

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: "Username already exists" }); //409 - conflict
    }

    if (username.length > 20) {
      return res.status(400).json({
        error: "Username maximum length is 20 characters.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: "Minumum password length is 6 characters.",
      });
    }

    //validacija formata - regex ?

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ username, passwordHash });
    await newUser.save();

    //kad dodam novog usera da li uopste da mi vraca nesto
    res.status(201);
  } catch (error) {
    //console.error(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

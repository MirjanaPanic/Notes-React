const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

router.post("/add", async (req, res) => {
  try {
    console.log("hello");
    const { title, content, tags, userId } = req.body;

    const newNote = new Note({
      title,
      content,
      tags,
      userId,
    });

    // Sačuvaj belešku u bazi
    await newNote.save();

    // Vrati uspešan odgovor sa podacima o belešci
    res
      .status(201)
      .json({ message: "Nova beleška je uspešno dodata", note: newNote });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

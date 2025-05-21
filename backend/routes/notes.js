const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

//create a new note
// http://localhost:5000/notes/add
router.post("/add", async (req, res) => {
  try {
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

//lists of all notes for logged user
//zadam userId i on izlista
router.post("/all", async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "Nedostaje userId" });
    }

    const notes = await Note.find({ userId })
      .select("tags title content updatedAt")
      .sort({ updatedAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Greška pri dohvatanju beleški:", error);
    res.status(500).json({ error: "Greška pri dohvatanju beleški" });
  }
});

module.exports = router;

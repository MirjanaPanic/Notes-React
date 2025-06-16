const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const mongoose = require("mongoose");

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

//lists all tags in sidebar
// routes/notes.js ili gde god imaš rute
const getUserTags = async (userId) => {
  try {
    const tags = await Note.distinct("tags", {
      userId: userId,
    });

    return tags.sort(); // opciono sortiranje
  } catch (error) {
    throw new Error(`Greška pri dohvatanju tagova: ${error.message}`);
  }
};

// http://localhost:5000/notes/tags
router.post("/tags", async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "Nedostaje userId" });
    }

    // Validacija da li je userId validan ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        error: "Nevalidan userId format",
      });
    }

    const tags = await getUserTags(userId);

    res.json({
      success: true,
      tags: tags,
      count: tags.length,
    });
  } catch (error) {
    console.error("Greška pri dohvatanju tagova:", error);
    res.status(500).json({
      error: "Serverska greška pri dohvatanju tagova",
    });
  }
});

//find notes by selected tag
// http://localhost:5000/notes/tag/tag1
// http://localhost:5000/notes/tag/nekitaggg
router.post("/tag/:tag", async (req, res) => {
  try {
    const { tag } = req.params;
    const { userId } = req.body; //from body userId prosledjujemo

    // Validacija
    if (!userId) {
      return res.status(400).json({
        error: "UserId is must have",
      });
    }

    if (!tag) {
      return res.status(400).json({
        error: "You have to send a tag",
      });
    }

    //upit
    const notes = await Note.find({
      userId: userId,
      tags: { $elemMatch: { $eq: tag } },
    })
      .hint({ userId: 1, tags: 1 })
      .sort({ updatedAt: -1 });
    //.explain("allPlansExecution");
    //console.log(JSON.stringify(notes, null, 2)); // ili ispitaj ceo objekat;;

    res.status(200).json({
      data: notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Greška pri dohvatanju beleški",
      error: error.message,
    });
  }
});

/*(async function checkIndexes() {
  console.log("=== POSTOJEĆI INDEKSI ===");
  const indexes = await Note.collection.getIndexes();
  console.log(JSON.stringify(indexes, null, 2));

  // Proverite da li compound index postoji
  const compoundIndex = Object.entries(indexes).find(([name, idx]) => {
    const keys = Object.keys(idx);
    return JSON.stringify(keys) === JSON.stringify(["userId", "tags"]);
  });

  if (compoundIndex) {
    console.log("✅ Compound index { userId: 1, tags: 1 } postoji");
    console.log("Index details:", compoundIndex);
  } else {
    console.log("❌ Compound index ne postoji!");
  }
})(); //IIFE
// */

//brisanje note po id koji se prosledi
router.post("/deleteNote", async (req, res) => {
  try {
    const { userId, noteId } = req.body;

    if (!userId || !noteId) {
      return res.status(400).json({
        success: false,
        message: "Missing noteId or userId",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({
        success: false,
        message: "Not valid noteId",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Not valid userId",
      });
    }

    const deletedNote = await Note.findOneAndDelete({
      _id: noteId,
      userId: userId,
    });

    // Ako beleška nije pronađena ili ne pripada korisniku
    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found or you don't have permission to delete",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note successfully deleted",
      deletedNote: {
        id: deletedNote._id,
        title: deletedNote.title,
      },
    });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({
      success: false,
      message: "Server error deleting note",
    });
  }
});

//azuriranje beleske
router.put("/editNote", async (req, res) => {
  try {
    const { userId, noteId, title, content, tags } = req.body;

    if (!userId || !noteId) {
      return res.status(400).json({
        success: false,
        message: "Missing noteId or userId",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({
        success: false,
        message: "Not valid noteId",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Not valid userId",
      });
    }

    const updatedNote = await Note.findOneAndUpdate(
      { _id: noteId, userId }, //filter
      { title, content, tags }, //novi podaci
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found or you don't have permission to edit",
      });
    }
    res.status(200).json({
      updatedNote,
    });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({
      success: false,
      message: "Server error updating note",
    });
  }
});

module.exports = router;

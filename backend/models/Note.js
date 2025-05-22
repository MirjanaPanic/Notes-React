const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxlength: 100,
      default: "",
    },
    content: {
      type: String,
      maxlength: 5000,
      default: "",
    },
    tags: {
      type: [String],
      default: [],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Compound indeks
noteSchema.index({ userId: 1, tags: 1 });

//Validacija
noteSchema.pre("validate", function (next) {
  if (this.title === "" && this.content === "") {
    this.invalidate("title", "Title i content ne mogu biti oba prazna.");
    this.invalidate("content", "Title i content ne mogu biti oba prazna.");
  }
  next();
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;

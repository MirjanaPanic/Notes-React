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
    /*color: {
      type: Number,
      default: 0xffffff, // bela boja
    },*/
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Validacija: title i content ne smeju oboje biti prazni
noteSchema.pre("validate", function (next) {
  if (this.title === "" && this.content === "") {
    this.invalidate("title", "Title i content ne mogu biti oba prazna.");
    this.invalidate("content", "Title i content ne mogu biti oba prazna.");
  }
  next();
});

module.exports = mongoose.model("Note", noteSchema);

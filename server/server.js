// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const NoteSchema = new mongoose.Schema({
//   title: String,
//   content: String,
//   createdAt: { type: Date, default: Date.now }
// });

// const Note = mongoose.model("Note", NoteSchema);

// // Routes
// app.get("/notes", async (req, res) => {
//   const notes = await Note.find().sort({ createdAt: -1 });
//   res.json(notes);
// });

// app.post("/notes", async (req, res) => {
//   const note = new Note(req.body);
//   await note.save();
//   res.json(note);
// });

// app.delete("/notes/:id", async (req, res) => {
//   await Note.findByIdAndDelete(req.params.id);
//   res.json({ message: "Deleted" });
// });

// const PORT = process.env.PORT || 5000;
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('MongoDB connected');
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   })
//   .catch(err => console.log(err));

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ CORS Configuration for specific frontend
const corsOptions = {
  origin: "http://notes.yogeshtech.xyz",
  methods: ["GET", "POST", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

const NoteSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now }
});

const Note = mongoose.model("Note", NoteSchema);

// Routes
app.get("/notes", async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 });
  res.json(notes);
});

app.post("/notes", async (req, res) => {
  const note = new Note(req.body);
  await note.save();
  res.json(note);
});

app.delete("/notes/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));

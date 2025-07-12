// client/src/App.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });

  useEffect(() => {
    axios.get(`${BACKEND_URL}/notes`).then((res) => setNotes(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${BACKEND_URL}/notes`, form);
    setNotes([res.data, ...notes]);
    setForm({ title: "", content: "" });
  };

  const handleDelete = async (id) => {
    await axios.delete(`${BACKEND_URL}/notes/${id}`);
    setNotes(notes.filter((n) => n._id !== id));
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "1rem" }}>
      <h2>📝 Personal Notes</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <br />
        <textarea
          placeholder="Write your note..."
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
        />
        <br />
        <button type="submit">Add Note</button>
      </form>

      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <h4>{note.title}</h4>
            <p>{note.content}</p>
            <button onClick={() => handleDelete(note._id)}>Delete</button>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

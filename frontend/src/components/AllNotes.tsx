import { useEffect, useState } from "react";
//import { createContext } from "react";
import Note from "./Note";


export default function AllNotes({trigger}:{trigger:boolean}) {
  const [notes, setNotes] = useState([]);
  //const [trigger, setTrigger] = useState(false);
  const userId = "682cafe9d959c1097479f229";
  //const triggerContext = createContext(false); 

  //da izlistam notes
  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await fetch("http://localhost:5000/notes/all", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) throw new Error("Failed to fetch notes");

        const data = await response.json();
        setNotes(data);
      } catch (err) {
        console.error("Error:", err);
      }
    }

    fetchNotes();
  }, [trigger]); //neka druga zavisnost
  //trigger se promeni kad korisnik doda novu belesku ili obrise, znaci na klik na dugme save

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "1rem",
        padding: "1rem",
      }}
    >
      {notes.map((note) => {
        return <Note note={note}></Note>;
      })}
    </div>
  );
}

import { useEffect, useState } from "react";
import Note from "./Note";
import LoadingMessage from "./ui/LoadingMessage";
import ErrorMessage from "./ui/ErrorMessage";
import type { ErrorType, NoteType } from "../types";

export default function AllNotes({ trigger }: { trigger: boolean }) {
  const [notes, setNotes] = useState<NoteType[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType>(null);

  const userId = "682cafe9d959c1097479f229"; //srediti ovo

  useEffect(() => {
    const controller = new AbortController();
    async function fetchNotes() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:5000/notes/all", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
          signal: controller.signal,
        });

        if (!response.ok) throw new Error("Failed to fetch notes");

        const data: NoteType[] = await response.json();
        setNotes(data);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
          console.error("Error:", err);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();
    //cleanup - unmount(unistenje komponente), promena dependencies(prvo cleanup pa onda useEffect), re-render
    return () => controller.abort();
  }, [trigger]);
  //trigger se promeni kad korisnik doda novu belesku ili obrise, znaci na klik na dugme save

  if (loading) return <LoadingMessage />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div
      style={{
        //Masonry layout
        columns: "250px",
        columnGap: "1rem",
        padding: "1rem",
        backgroundColor: "#e6ded1",
      }}
    >
      {notes.map((note) => {
        return <Note key={note._id} note={note}></Note>;
      })}
    </div>
  );
}

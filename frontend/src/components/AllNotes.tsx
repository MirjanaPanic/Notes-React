import { useEffect, useState } from "react";
import Note from "./Note";
import LoadingMessage from "./ui/LoadingMessage";
import ErrorMessage from "./ui/ErrorMessage";
import type { ErrorType, NoteType } from "../lib/types";
import { USER_ID } from "../lib/constants";
import { useNavigate } from "react-router-dom";

export default function AllNotes({
  display,
  tag,
}: {
  display: string;
  tag?: string;
}) {
  const [notes, setNotes] = useState<NoteType[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType>(null);

  const navigate = useNavigate();

  useEffect(() => {
    setNotes([]); // Očisti na početku
    const controller = new AbortController();

    async function fetchNotes() {
      setLoading(true);
      setError(null);

      try {
        const url = tag
          ? `http://localhost:5000/notes/tag/${tag}`
          : "http://localhost:5000/notes/all";

        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: USER_ID }),
          signal: controller.signal,
        });

        if (!response.ok) throw new Error("Failed to fetch notes");

        const responseData = await response.json();

        if (
          Array.isArray(responseData.data) &&
          responseData.data.length === 0
        ) {
          // redirekt na allnotes
          navigate("/");
        }
        setNotes(tag ? responseData.data : responseData);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchNotes();
    return () => controller.abort();
  }, [display, tag,navigate]); // Oba dependency-ja

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
        return <Note key={note._id} note={note} />;
      })}
    </div>
  );
}

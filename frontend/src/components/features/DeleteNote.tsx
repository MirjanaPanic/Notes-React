//import { useState } from "react";
//import AllNotes from "../AllNotes";
import { useHomeContext } from "../context";
import MyButton from "../reusable/MyButton";

export default function DeleteNote({
  deleteData,
  onDiscard,
}: {
  deleteData: object;
  onDiscard: () => void;
}) {
  const { refreshNotes } = useHomeContext();

  async function handleDelete() {
    //nece da brise belesku kad je na neki tag :(
    //dodati da kad se obrise note, a nema vise beleski pod tim tagom, da se on ukloni iz sidebar liste tagova odmah(ne na refresh kad se ponovo ucitava str i fetchuje)
    try {
      const response = await fetch("http://localhost:5000/notes/deleteNote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deleteData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete note");
        //da izadje neka poruka da nije uspela da se obrise
      }
      refreshNotes(); //javi roditelju, da osvezi opet allNotes
      //da ako se obrisu sve beleske nekog taga, on se ukloni iz sidebar
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  }

  return (
    <>
      <div style={{ margin: "5px" }}>
        <p style={{ fontSize: "15px" }}> Delete this note?</p>
        <MyButton type="success" onClick={handleDelete}>
          {" "}
          Yes
        </MyButton>
        <MyButton type="secondary" onClick={onDiscard}>
          {" "}
          Discard{" "}
        </MyButton>
      </div>
    </>
  );
}

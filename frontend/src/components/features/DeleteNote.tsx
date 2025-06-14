//import { useState } from "react";
//import AllNotes from "../AllNotes";
import MyButton from "../reusable/MyButton";

export default function DeleteNote({
  deleteData,
  onDiscard,
  onDeleteSuccess,
}: {
  deleteData: object;
  onDiscard: () => void;
  onDeleteSuccess: () => void;
}) {
  async function handleClick() {
    console.log("klik na trash: ", deleteData);
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
      onDeleteSuccess(); //javi roditelju, da osvezi opet allNotes
      //i sedebar
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  }

  return (
    <>
      <div style={{ margin: "5px" }}>
        <p style={{ fontSize: "15px" }}> Delete this note?</p>
        <MyButton type="success" onClick={handleClick}>
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

import { useState } from "react";
import AllNotes from "../AllNotes";
import MyButton from "../custom/MyButton";

export default function DeleteNote({
  deleteData,
  onDiscard,
}: {
  deleteData: object;
  onDiscard: () => void;
}) {
  const [checked, setChecked] = useState(false);

  async function handleClick() {
    console.log("klik na trash: ", deleteData);
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
      setChecked(true);
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  }

  return (
    <>
      {checked ? (
        <AllNotes trigger={true}></AllNotes>
      ) : (
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
      )}
    </>
  );
}

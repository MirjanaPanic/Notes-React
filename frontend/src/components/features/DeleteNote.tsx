import { deleteNote } from "../../api/crud";
import { useHomeContext } from "../context";
import MyButton from "../reusable/MyButton";

export default function DeleteNote({
  deleteData,
  onDiscard,
}: {
  deleteData: {
    userId: string;
    noteId?: string;
  };
  onDiscard: () => void;
}) {
  const { refreshNotes } = useHomeContext();

  async function handleDelete() {
    try {
      await deleteNote(deleteData);
      refreshNotes();
      onDiscard();
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  }

  return (
    <>
      <div style={{ margin: "5px" }}>
        <p style={{ fontSize: "15px" }}> Delete this note?</p>
        <MyButton type="success" onClick={handleDelete}>
          Yes
        </MyButton>
        <MyButton type="secondary" onClick={onDiscard}>
          Discard
        </MyButton>
      </div>
    </>
  );
}

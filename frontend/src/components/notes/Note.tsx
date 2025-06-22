import { Button } from "react-bootstrap";
import type { NoteType } from "../../lib/types";
import { useState } from "react";
import DeleteNote from "../features/DeleteNote";
import { USER_ID } from "../../lib/constants";
import OpenNote from "../reusable/OpenNote";
import NoteTags from "./NoteTags";
import NoteContent from "./NoteContent";
import TrashIcon from "../../icons/TrashIcon";
import EditIcon from "../../icons/EditIcon";

type TypeAction = "delete" | "edit" | null; //null mi je kao "none"(nije izabrana action)

export default function Note({ note }: { note: NoteType }) {
  const [action, setAction] = useState<TypeAction>(null); //undefined ako se ne inicijalizuje

  const [deleteData, setDeleteData] = useState<{
    userId: string;
    noteId?: string;
  }>({ userId: USER_ID });

  function handleDelete(noteId: string) {
    const updatedDeleteData = {
      ...deleteData,
      noteId: noteId,
    };
    setDeleteData(updatedDeleteData);
    setAction("delete");
  }

  function handleEdit() {
    setAction("edit");
  }

  function handleDiscard() {
    setAction(null);
  }

  return (
    <>
      <div
        style={{
          backgroundColor: "#393E46",
          color: "white",
          padding: "1rem",
          borderRadius: "20px",
          marginBottom: "1rem", // razmak između kartica
          breakInside: "avoid", // sprečava prelom kartice između kolona
          display: "inline-block",
          width: "100%",
        }}
      >
        <div>
          <div
            style={{
              marginBottom: "0.5rem",
              fontSize: "0.8rem",
              color: "#ccc",
              display: "flex",
              justifyContent: "space-between", // Razvlači levo-desno
              alignItems: "center", // Vertikalno centriranje
              flexWrap: "nowrap", // Sprečava prelamanje reda
              gap: "0.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "0.5rem",
                flexGrow: 1, // zauzima sav preostali prostor
                minWidth: 0, // omogućava skraćivanje po širini ako treba
              }}
            >
              <NoteTags tags={note.tags} />
            </div>
            <Button
              style={{
                backgroundColor: "inherit",
                border: "none",
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "24px",
                minHeight: "24px",
                flexShrink: 0, // ne skuplja se ako tagovi zauzmu prostor
              }}
              onClick={handleEdit}
            >
              <EditIcon />
            </Button>
          </div>

          <NoteContent title={note.title} content={note.content} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between", // razmak između dugmeta i teksta
            alignItems: "center", // vertikalno poravnanje
            fontSize: "0.75rem",
            color: "#aaa",
            marginTop: "1rem",
            gap: "1rem", // dodatno (neobavezno)
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              onClick={() => handleDelete(note._id)}
              style={{
                backgroundColor: "transparent",
                border: "none",
                padding: 0,
                marginRight: "0.5rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <TrashIcon />
            </Button>
          </div>
          <span style={{ whiteSpace: "nowrap" }}>
            Last modified: {new Date(note.updatedAt).toLocaleString()}
          </span>
        </div>

        {/*Delete and Edit MODALS */}
        {action === "delete" && (
          <DeleteNote deleteData={deleteData} onDiscard={handleDiscard} />
        )}
        {action === "edit" && (
          <OpenNote action={"edit"} note={note} onDiscard={handleDiscard} />
        )}
      </div>
    </>
  );
}

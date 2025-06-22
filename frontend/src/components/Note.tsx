import { Button } from "react-bootstrap";
import type { NoteType } from "../lib/types";
import { useState } from "react";
import DeleteNote from "./features/DeleteNote";
import { USER_ID } from "../lib/constants";
import OpenNote from "./reusable/OpenNote";
import NoteTags from "./layout/NoteTags";
import NoteContent from "./layout/NoteContent";

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
        key={note._id}
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
          {/*  tagovi i expand icon */}
          <section>
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
              {/* Tagovi - fleksibilni levi deo */}
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

              {/* Ikonica - desni deo */}
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#FFFFFF"
                >
                  <path d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z" />
                </svg>
              </Button>
            </div>
          </section>

          <NoteContent title={note.title} content={note.content} />
        </div>
        {/*  trash button i last modified*/}
        <section>
          {" "}
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill="#db2121"
                  style={{ cursor: "pointer" }}
                >
                  <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                </svg>
              </Button>
            </div>

            <span style={{ whiteSpace: "nowrap" }}>
              Last modified: {new Date(note.updatedAt).toLocaleString()}
            </span>
          </div>
        </section>

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

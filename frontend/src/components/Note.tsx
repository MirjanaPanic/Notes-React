import { Button } from "react-bootstrap";
import type { NoteType } from "../lib/types";
import { useState } from "react";
import DeleteNote from "./features/DeleteNote";
import { TAG_LENGTH_NOTE, USER_ID } from "../lib/constants";

export default function Note({ note }: { note: NoteType }) {
  
  const [checkDelete, setCheckDelete] = useState(false);
  const [deleteData, setDeleteData] = useState<{
    userId: string;
    noteId?: string;
  }>({ userId: USER_ID });

  async function handleDelete(noteId: string) {
    //kad se klikne na trash, da se ispod pojavi div
    const updatedDeleteData = {
      ...deleteData,
      noteId: noteId,
    };
    setDeleteData(updatedDeleteData);
    setCheckDelete(true); //to trigeruje re-render
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
                {note.tags.map((tag) => {
                  const displaytag =
                    tag.length <= TAG_LENGTH_NOTE ? tag : `${tag.slice(0, TAG_LENGTH_NOTE)}...`;
                  return (
                    <span
                      key={tag}
                      style={{
                        color: "#B4D8B2",
                        fontSize: "0.85rem",
                        whiteSpace: "nowrap",
                      }}
                      //onMouseEnter={() => console.log("Hovered!")}
                    >
                      {displaytag}
                    </span>
                  );
                })}
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
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  width="20px"
                  viewBox="0 -960 960 960"
                  fill="white"
                >
                  <path d="M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z" />
                </svg>
              </Button>
            </div>
          </section>
          {/*  title i content */}
          <section>
            <strong style={{ fontSize: "1rem" }}>{note.title}</strong>
            <p
              style={{
                marginTop: "0.5rem",
                fontSize: "0.85rem",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 20,
                WebkitBoxOrient: "vertical",
              }}
            >
              {note.content || "(No Content)"}
            </p>
          </section>
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
        {checkDelete && <DeleteNote deleteData={deleteData} />}
      </div>
    </>
  );
}

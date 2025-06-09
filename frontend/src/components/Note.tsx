import { Button } from "react-bootstrap";
import type { NoteType } from "../types";
import { useState } from "react";
import DeleteAlert from "./features/DeleteNote";

export default function Note({ note }: { note: NoteType }) {
  const userId = "682cafe9d959c1097479f229"; //srediti ovo

  const [showAlert, setShowAlert] = useState(false);
  const [deleteData, setDeleteData] = useState<{
    userId: string;
    noteId?: string;
  }>({ userId: userId });

  function handleShowAlert() {
    setShowAlert(false);
  }

  async function handleDelete(noteId: string) {
    const updatedDeleteData = {
      ...deleteData,
      noteId: noteId,
    };

    setDeleteData(updatedDeleteData);
    setShowAlert(true);
  }

  return (
    <>
      {showAlert && deleteData && (
        <DeleteAlert
          show={showAlert}
          handleShowAlert={handleShowAlert}
          deleteData={deleteData}
        />
      )}

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
          <div
            style={{
              marginBottom: "0.5rem",
              fontSize: "0.8rem",
              color: "#ccc",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                marginBottom: "0.5rem",
                fontSize: "0.85rem",
                color: "#ccc",
              }}
            >
              {note.tags.map((tag) => {
                return (
                  <span
                    key={tag}
                    style={{ marginRight: "0.5rem", color: "#B4D8B2" }}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
            <Button style={{ backgroundColor: "inherit", border: "none" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="white"
              >
                <path d="M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z" />
              </svg>
            </Button>
          </div>

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
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "0.75rem",
            color: "#aaa",
            marginTop: "1rem",
          }}
        >
          {/* Trash icon */}
          <Button
            onClick={() => handleDelete(note._id)}
            style={{ backgroundColor: "transparent", border: "none" }}
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

          {/* Last modified text */}
          <span>
            Last modified: {new Date(note.updatedAt).toLocaleString()}
          </span>
        </div>
      </div>
    </>
  );
}

//za add note i edit note
//da vidim sta moze biti zajednicko
import { useEffect, useRef, useState } from "react";
import { CloseButton, Form, Modal } from "react-bootstrap";
import MyButton from "./MyButton";
import { USER_ID } from "../../lib/constants";
import { useHomeContext } from "../context";
import { addNote, updateNote } from "../../api/notes";
import { adjustTextareaHeight } from "../../utils/textarea";
import type { NoteType } from "../../lib/types";

export default function OpenNote({
  action,
  note,
  onDiscard,
}: {
  action: "add" | "edit";
  note?: NoteType;
  onDiscard: () => void;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { refreshNotes } = useHomeContext();

  console.log(action);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setTags(note.tags);
    }
  }, [note]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  function handleAddTag() {
    const trimmed = tagInput.trim(); //uklanja praznine sa pocetka i kraja stringa
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    } else if (trimmed === "") {
      alert("You have not entered a tag.");
    } else {
      alert("You have already selected this tag.");
    }
  }

  function handleRemoveTag(tagToRemove: string) {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  }

  function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    setContent(value);
    adjustTextareaHeight(textareaRef);
  }

  async function handleSave() {
    const noteData = {
      title,
      content,
      tags,
      userId: USER_ID,
    };

    if (action === "edit") {
      if (note) {
        const noteForEdit = { ...noteData, noteId: note._id };
        await updateNote(noteForEdit); // poziva se endpoint za izmenu
        //da zamenim samo postojecu belesku s novim podacima
        refreshNotes();
      }
    } else {
      await addNote(noteData); // novi note
      refreshNotes();
    }

    // handleDiscard(); //treba ako ne radim refreshNotes()
  }

  function handleDiscard() {
    setTitle("");
    setContent("");
    setTags([]);
    setTagInput("");
    onDiscard();
  }

  return (
    <Modal
      show={true}
      onHide={onDiscard}
      centered
      contentClassName="rounded-modal"
    >
      <div className="rounded" style={{ backgroundColor: "#e6ded1" }}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              name="title input"
              className="mb-2"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)} //kad klikne na Save tek onda da se setuje setTitle??
              style={{ backgroundColor: "#f1eada" }}
            />
            <Form.Control
              name="note input"
              as="textarea"
              placeholder="Take a note..."
              rows={10}
              value={content}
              //onChange={(e) => setContent(e.target.value)}
              onChange={handleContentChange}
              ref={textareaRef}
              style={{
                overflow: "hidden",
                resize: "none",
                backgroundColor: "#f1eada",
              }}
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <div className="d-flex gap-2 flex-wrap mb-2">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="d-flex align-items-center px-2 rounded-pill"
                  style={{ backgroundColor: "#949d67", color: "white" }}
                >
                  {tag}
                  <CloseButton
                    variant="white"
                    onClick={() => handleRemoveTag(tag)}
                    className="ms-2"
                  />
                </div>
              ))}
            </div>
            <div className="d-flex gap-2">
              <Form.Control
                name="add tag"
                type="text"
                placeholder="Add tag"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                style={{ backgroundColor: "#f1eada" }}
              />
              <MyButton type="success" onClick={handleAddTag}>
                Add
              </MyButton>
            </div>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <MyButton
            type="success"
            onClick={handleSave}
            disabled={!title.trim() && !content.trim()}
          >
            {action === "edit" ? "Save changes" : "Save"}
          </MyButton>
          <MyButton type="secondary" onClick={handleDiscard}>
            Discard
          </MyButton>
        </Modal.Footer>
      </div>
    </Modal>
  );
}

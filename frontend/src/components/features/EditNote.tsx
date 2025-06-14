//import { Form, Modal } from "react-bootstrap";
//import type { NoteType } from "../../lib/types";

import { CloseButton, Form, Modal } from "react-bootstrap";
import type { NoteType } from "../../lib/types";
import { useRef, useState } from "react";
import MyButton from "../reusable/MyButton";

export default function EditNote({
  editData,
  show,
  onClose,
}: {
  editData: NoteType;
  show: boolean;
  onClose: () => void;
}) {
  //ovo se salje kao editovani podaci:
  const [tags, setTags] = useState<string[]>([]);
  const [title, setTitle] = useState(editData.title);
  const [content, setContent] = useState(editData.content);

  //da imam i state za uneti tag

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  function handleRemoveTag(tagToRemove: string) {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  }
  function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    setContent(value);

    // Auto resize
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // reset
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // adjust
    }
  }

  function handleSave() {}

  function handleDiscard() {}

  return (
    <Modal show={show} onHide={onClose}>
      <div className="rounded" style={{ backgroundColor: "#e6ded1" }}>
        <Modal.Header>
          <div className="d-flex gap-2 flex-wrap mb-2">
            {editData.tags.map((tag) => (
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
        </Modal.Header>

        <Modal.Body>
          <Form.Group>
            <Form.Control
              name="title edit"
              className="mb-2"
              type="text"
              placeholder="Set title"
              value={title}
              onChange={(e) => setTitle(e.target.value)} //kad klikne na Save tek onda da se setuje setTitle??
              style={{ backgroundColor: "#f1eada" }}
            />
            <Form.Control
              name="note edit"
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
          <Modal.Footer>
            <MyButton
              type="success"
              onClick={handleSave}
              disabled={!title.trim() && !content.trim()}
            >
              Save
            </MyButton>
            <MyButton type="secondary" onClick={handleDiscard}>
              Discard
            </MyButton>
          </Modal.Footer>
        </Modal.Body>
      </div>
    </Modal>
  );
}

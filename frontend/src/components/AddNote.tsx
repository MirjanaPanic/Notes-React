import { useState, useRef, useEffect } from "react";
import { Modal, Button, Form, CloseButton } from "react-bootstrap";

type AddNoteProps = {
  show: boolean;
  handleClose: () => void;
  handleTriger: () => void;
};

export default function AddNote({
  show,
  handleClose,
  handleTriger,
}: AddNoteProps) {
  //dodati negde userId da se pamti za ulogovanog korisnika
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const [tagInput, setTagInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  //Fokus i auto-grow kada se modal otvori
  useEffect(() => {
    if (show && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; //auto-grow
    }
  }, [show]);

  function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    setContent(value);

    // Auto resize
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // reset
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // adjust
    }
  }

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

  async function handleSave() {
    const note = {
      title,
      content,
      tags,
      userId: "682cafe9d959c1097479f229", // videti gde da se pamti userId
    };

    try {
      const response = await fetch("http://localhost:5000/notes/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      handleTriger(); //kad se sacuva nova beleska, da se fetch opet izvrsi
    } catch (error) {
      console.error("There was a problem saving the data:", error);
    }
    //odavde, dati znak triggeru u useEffect da opet se izvrsi
    handleDiscard();
  }

  function handleDiscard() {
    setTitle("");
    setContent("");
    setTags([]);
    setTagInput("");
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleDiscard} centered>
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
              <Button
                style={{ backgroundColor: "#b0c4e4", border: "none" }}
                onClick={handleAddTag}
              >
                Add
              </Button>
            </div>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button
            onClick={handleSave}
            disabled={!title.trim() && !content.trim()}
            style={{ backgroundColor: "#28a444", border: "none" }}
          >
            Save
          </Button>
          <Button variant="secondary" onClick={handleDiscard}>
            Discard
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
}

import { useState, useRef, useEffect } from "react";
import { Modal, Button, Form, Badge, CloseButton } from "react-bootstrap";

type AddNoteProps = {
  show: boolean;
  handleClose: () => void;
};

export default function AddNote({ show, handleClose }: AddNoteProps) {
  //dodati negde userId da se pamti za ulogovanog korisnika
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const [tagInput, setTagInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Fokus i auto-grow kada se modal otvori
  useEffect(() => {
    if (show && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = "auto"; // reset
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // auto-grow
    }
  }, [show]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);

    // Auto resize
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // reset
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // adjust
    }
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

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

      const data = await response.json();
      console.log("Odgovor sa servera:", data);
      console.log("Data saved successfully!");
    } catch (error) {
      console.error("There was a problem saving the data:", error);
    }

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
      <div style={{ backgroundColor: "white" }}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              name="input title"
              className="mb-2"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)} //kad klikne na Save tek onda da se setuje setTitle??
            />

            <Form.Control
              name="input note"
              placeholder="Take a note..."
              as="textarea"
              rows={10}
              value={content}
              //onChange={(e) => setContent(e.target.value)}
              onChange={handleContentChange}
              ref={textareaRef}
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <div className="d-flex gap-2 flex-wrap mb-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  bg="primary"
                  className="d-flex align-items-center px-2"
                >
                  {tag}
                  <CloseButton
                    variant="white"
                    onClick={() => handleRemoveTag(tag)}
                    className="ms-2"
                  />
                </Badge>
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
              />
              <Button onClick={handleAddTag}>Add</Button>
            </div>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleDiscard}>
            Discard
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={!title.trim() && !content.trim()}
          >
            Save
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
}

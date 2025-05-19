import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function TakeNote() {
  const [show, setShow] = useState(false);

  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center p-3"
      style={{ backgroundColor: "#e6ded1" }}
    >
      <Form onClick={handleOpen} className="d-flex w-75">
        <Form.Control
          type="text"
          placeholder="Take a note..."
          className="rounded-pill me-2"
          style={{
            backgroundColor: "#f1eada",
            border: "1px solid gray",
            height:"50px"
          }}
        />
      </Form>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modal naslov</Modal.Title>
        </Modal.Header>
        <Modal.Body>Ovde ide sadržaj modala.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Zatvori
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

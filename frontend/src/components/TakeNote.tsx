import { useState } from "react";
import { Form } from "react-bootstrap";
import AddNote from "./AddNote";

export default function TakeNote() {
  const [show, setShow] = useState(false); //true - otvara se modal

  function handleOpen() {
    setShow(true);
  }
  function handleClose() {
    setShow(false);
  }

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center p-3"
      style={{ backgroundColor: "#e6ded1" }}
    >
      <Form name="note input" onClick={handleOpen} className="d-flex w-75">
        <Form.Control
          type="text"
          placeholder="Take a note..."
          className="rounded-pill me-2"
          style={{
            backgroundColor: "#f1eada",
            border: "1px solid gray",
            height: "50px",
          }}
        />
      </Form>

      {show && <AddNote show={show} handleClose={handleClose} />}
    </div>
  );
}

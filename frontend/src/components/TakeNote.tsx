import { useState } from "react";
import { Form } from "react-bootstrap";
import AddNote from "./AddNote";


export default function TakeNote({ changeTrigger }: { changeTrigger: () => void }) {
  
 
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
      {!show && (
        <Form name="note input" className="d-flex w-75" onClick={handleOpen}>
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
      )}

      {show && <AddNote show={show} handleClose={handleClose} handleTriger={changeTrigger} />}
    </div>
  );
}

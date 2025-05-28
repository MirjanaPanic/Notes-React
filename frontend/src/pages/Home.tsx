import MyNavbar from "../components/layout/Navbar";
import AllNotes from "../components/AllNotes";
import Sidebar from "../components/layout/Sidebar";
//import TakeNote from "../components/TakeNote";
import { useState } from "react";
//import { Form } from "react-bootstrap";
import AddNote from "../components/features/AddNote";

export default function Home() {
  const [trigger, setTrigger] = useState(false);
  const [show, setShow] = useState(false); //true - otvara se modal

  function handleOpen() {
    setShow(true);
  }
  function handleClose() {
    setShow(false);
  }

  //da preuzmem usera, i da ga prosledim kome treba
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar handleOpen={handleOpen} trigger={trigger} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <MyNavbar />

        <div  className="note-container"
          style={{
            padding: "1rem",
            backgroundColor: "#f1eada",
            flex: 1,
            overflowY: "auto", // ako sadrzaj preraste
          }}
        >
          <AllNotes trigger={trigger} />

          {show && (
            <AddNote
              show={show}
              handleClose={handleClose}
              handleTriger={() => setTrigger(!trigger)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

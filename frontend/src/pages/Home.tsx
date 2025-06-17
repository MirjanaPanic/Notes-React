import MyNavbar from "../components/layout/Navbar";
import AllNotes from "../components/AllNotes";
import Sidebar from "../components/layout/Sidebar";

import OpenNote from "../components/reusable/OpenNote";
import { HomeContext } from "../components/context";
import { useState } from "react";
import { useMatch, useParams } from "react-router-dom";

export default function Home() {
  const [trigger, setTrigger] = useState(false);
  const [show, setShow] = useState(false);
  const [updByTags, setUpdByTags] = useState(false);

  const { tag } = useParams(); // ako je aktivan tag u URL-u

  const match = useMatch("/notes/tag/:tag");

  function handleOpen() {
    setShow(true);
  }
  function handleDiscard() {
    setShow(false);
  }

  function refreshNotes() {
    //i setTag isto!  u zavisnosti da li je na / ili na nekom tagu
    if (match) {
      //const tag = match.params.tag;
      setUpdByTags((prev) => !prev);
    } else {
      setTrigger((prev) => !prev);
    }
  }

  //da preuzmem usera, i da ga prosledim kome treba
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar onOpen={handleOpen} trigger={trigger} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <MyNavbar />

        {/* MAIN PART OF THE PAGE */}
        <div
          className="note-container"
          style={{
            padding: "1rem",
            backgroundColor: "#f1eada",
            flex: 1,
            overflowY: "auto", // ako sadrzaj preraste
          }}
        >
          <HomeContext.Provider value={{ refreshNotes }}>
            {!tag ? (
              <AllNotes trigger={trigger} />
            ) : (
              <AllNotes refreshBytag={updByTags} tag={tag} />
            )}
            {show && ( //ADD NOTE
              <OpenNote action={"add"} onDiscard={handleDiscard} />
            )}
          </HomeContext.Provider>
        </div>
      </div>
    </div>
  );
}

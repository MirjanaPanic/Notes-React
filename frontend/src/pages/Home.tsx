import MyNavbar from "../components/layout/Navbar";
import AllNotes from "../components/notes/AllNotes";
import Sidebar from "../components/layout/Sidebar";
import OpenNote from "../components/reusable/OpenNote";
import { HomeContext } from "../components/context";
import { useState } from "react";
import { useParams } from "react-router-dom";

type TypeDisplayNotes = "notesByTag" | "allNotes";

export default function Home() {
  const [showAddModal, setShowAddModal] = useState(false);

  const [displayNotes, setDisplayNotes] =
    useState<TypeDisplayNotes>("allNotes");

  const { tag } = useParams(); // ako je aktivan tag u URL-u
  //const match = useMatch("/notes/tag/:tag");

  function handleOpen() {
    setShowAddModal(true);
  }
  function handleDiscard() {
    setShowAddModal(false);
  }

  function refreshNotes() {
    setDisplayNotes((prev) =>
      prev === "notesByTag" ? "allNotes" : "notesByTag"
    );
  }

  //da preuzmem usera, i da ga prosledim kome treba
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar onOpen={handleOpen} trigger={displayNotes} />
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
              <AllNotes display={displayNotes} />
            ) : (
              <AllNotes display={displayNotes} tag={tag} />
            )}
            {showAddModal && ( //ADD NOTE
              <OpenNote action={"add"} onDiscard={handleDiscard} />
            )}
          </HomeContext.Provider>
        </div>
      </div>
    </div>
  );
}

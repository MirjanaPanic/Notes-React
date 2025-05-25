import MyNavbar from "../components/Navbar";
import AllNotes from "../components/AllNotes";
import Sidebar from "../components/Sidebar";
import TakeNote from "../components/TakeNote";
import { useState } from "react";

export default function Home() {
  const [trigger, setTrigger] = useState(false);

  //da preuzmem usera, i da ga prosledim kome treba
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar trigger={trigger} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <MyNavbar />

        <div
          style={{
            padding: "1rem",
            backgroundColor: "#f1eada",
            flex: 1,
            overflowY: "auto", // ako sadrzaj preraste
          }}
        >
          <TakeNote changeTrigger={() => setTrigger(!trigger)} />
          <AllNotes trigger={trigger} />
        </div>
      </div>
    </div>
  );
}

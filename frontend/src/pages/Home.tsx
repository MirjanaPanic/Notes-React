import MyNavbar from "../components/Navbar";
import Notes from "../components/Notes";
import Sidebar from "../components/Sidebar";
import TakeNote from "../components/TakeNote";

export default function Home() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <MyNavbar />

        {/* Sadržaj stranica */}
        <div style={{ padding: "1rem", backgroundColor: "#f1eada", flex: 1 }}>
          <TakeNote />
          <Notes />
        </div>
      </div>
    </div>
  );
}

import MyNavbar from "../components/Navbar";

import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar levo */}
      <Sidebar />

      {/* Glavni sadržaj sa navbarom i stranicama */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Horizontalni navbar (gore) */}
        <MyNavbar />

        {/* Sadržaj stranica */}
        <div style={{ padding: "1rem", backgroundColor: "#f1eada", flex: 1 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

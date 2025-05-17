import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{ padding: "1rem", backgroundColor: "#282c34", color: "white" }}
    >
      <ul
        style={{ display: "flex", gap: "1rem", listStyle: "none", margin: 0 }}
      >
        <li>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Home
          </Link>
        </li>
      </ul>
    </nav>
  );
}

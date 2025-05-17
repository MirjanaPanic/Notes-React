import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { path: "/", label: "Početna" },
    { path: "/about", label: "O nama" },
    { path: "/contact", label: "Kontakt" },
    { path: "/profile", label: "Profil" },
  ];

  return (
    <aside
      style={{
        width: "200px",
        backgroundColor: "#282c34",
        color: "white",
        padding: "1rem",
        boxSizing: "border-box",
      }}
    >
      <nav>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {links.map(({ path, label }) => (
            <li key={path} style={{ marginBottom: "0.5rem" }}>
              <Link
                to={path}
                style={{
                  color: location.pathname === path ? "#61dafb" : "white",
                  textDecoration: "none",
                  display: "block",
                  padding: "0.5rem 1rem",
                  borderRadius: 4,
                  backgroundColor:
                    location.pathname === path
                      ? "rgba(97, 218, 251, 0.2)"
                      : "transparent",
                }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

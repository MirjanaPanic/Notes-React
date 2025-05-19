export default function Sidebar() {
  return (
    <div
      style={{
        width: "200px",
        backgroundColor: "#282c34",
        color: "#ecb1d2",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "1rem",
      }}
    >
      <h2 style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>NoMind</h2>
      <nav style={{ width: "100%" }}>
        <ul style={{ listStyle: "none", padding: 0, width: "100%" }}>
          <li
            style={{
              display: "block",
              padding: "0.75rem 1rem",
              textDecoration: "none",
            }}
          >
            📝 All Notes
          </li>
          <ul style={{ listStyle: "none", color: "#949d67" }}>
            <li>
              <a href="#" style={{ textDecoration: "none", color: "inherit" }}>
                {" "}
                ideas
              </a>
            </li>
            <li>
              <a href="#" style={{ textDecoration: "none", color: "inherit" }}>
                {" "}
                love life
              </a>
            </li>
            <li>
              <a href="#" style={{ textDecoration: "none", color: "inherit" }}>
                {" "}
                faculty
              </a>
            </li>
            <li>
              <a href="#" style={{ textDecoration: "none", color: "inherit" }}>
                {" "}
                goals
              </a>
            </li>
            {/* Add more later */}
          </ul>
        </ul>
      </nav>
    </div>
  );
}

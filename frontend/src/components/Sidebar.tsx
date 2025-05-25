import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

export default function Sidebar({ trigger }: { trigger: boolean }) {
  const [tags, setTags] = useState([]); //dependency je tags..... opet isto
  const userId = "682cafe9d959c1097479f229";

  useEffect(() => {
    const fetchTags = async () => {
      if (!userId) return;
      try {
        const response = await fetch("http://localhost:5000/notes/tags", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTags(data.tags || []);
      } catch (err) {
        console.error("Greška pri dohvatanju tagova:", err);
      }
    };

    fetchTags();
  }, [trigger]);

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
        height: "100%", // ✅ raste unutar roditelja
        overflowY: "auto",
      }}
    >
      <h2 style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>NoMind</h2>
      <nav style={{ width: "100%" }}>
        <ul style={{ listStyle: "none", padding: 0, width: "100%" }}>
                  <Button className="rounded-pill" style={{backgroundColor:"#ecb1d2", color:"#434343",border:"none"}}> Take a note</Button>
          
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
            {tags.map((tag) => {
              return (
                <li>
                  <a
                    href="#"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {" "}
                    {tag}
                  </a>
                </li>
              );
            })}
          </ul>
        </ul>
      </nav>
    </div>
  );
}

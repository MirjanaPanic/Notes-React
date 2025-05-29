import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function Sidebar({
  handleOpen,
  trigger,
}: {
  handleOpen: () => void;
  trigger: boolean;
}) {
  const [tags, setTags] = useState<string[]>([]); //dependency je tags..... opet isto
  const userId = "682cafe9d959c1097479f229";

  const navigate = useNavigate();

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

  function handleTagClick(tag: string) {
    navigate(`/notes/tag/${tag}`);
    //da se prikaze i all notes, pa kad klikne da se allnotes trigeruje
  }

  function handleAllClick() {
    navigate("/");
  }

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
      <div style={{ marginBottom: "30px" }}>
        {" "}
        <h2 style={{ fontSize: "1.5rem", marginBottom: "3rem" }}>NoMind</h2>
        <Button
          style={{
            backgroundColor: "#ecb1d2",
            color: "#434343",
            border: "none",
            borderRadius: "20px",
          }}
          onClick={handleOpen} // da se otvori modal
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#434343"
          >
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v268q-19-9-39-15.5t-41-9.5v-243H200v560h242q3 22 9.5 42t15.5 38H200Zm0-120v40-560 243-3 280Zm80-40h163q3-21 9.5-41t14.5-39H280v80Zm0-160h244q32-30 71.5-50t84.5-27v-3H280v80Zm0-160h400v-80H280v80ZM720-40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40Zm-20-80h40v-100h100v-40H740v-100h-40v100H600v40h100v100Z" />
          </svg>
          New note
        </Button>
      </div>{" "}
      <Button
        style={{
          color: "#ecb1d2",
          backgroundColor: "inherit",
          border: "none",
          borderRadius: "20px",
        }}
        onClick={() => handleAllClick()}
      >
        All notes
      </Button>
      <div
        className="note-container"
        style={{
          width: "100%",
          overflowY: "auto", // samo ovde ide scroll
          maxHeight: "100%",
        }}
      >
        <ul
          style={{
            listStyle: "none",
            color: "#949d67",
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start", //flex-start poravna ulevo
            padding: 0,
            marginLeft: "30px",
          }}
        >
          {tags.map((tag, index) => {
            //dodati key na <li> !!!!!
            //srediti da tagovi se poravnaju levo
            const displaytag =
              tag.length <= 10 ? tag : `${tag.slice(0, 10)}...`;
            return (
              <Button
                key={`${tag}-${index}`}
                style={{
                  display: "flex", // ikonica i tekst u jednom redu
                  alignItems: "center", // vertikalno centriranje
                  gap: "0.5rem", // razmak između ikonice i teksta
                  marginBottom: "0.4rem",
                  backgroundColor: "inherit",
                  border: "none",
                  fontSize: "0.9rem",
                  color: "#B4D8B2",
                }}
                onClick={() => handleTagClick(tag)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#B4D8B2"
                >
                  <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h440q19 0 36 8.5t28 23.5l216 288-216 288q-11 15-28 23.5t-36 8.5H160Zm0-80h440l180-240-180-240H160v480Zm220-240Z" />
                </svg>
                {displaytag}
              </Button>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

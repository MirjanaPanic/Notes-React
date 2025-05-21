interface NoteType {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  updatedAt: string;
}

export default function Note({ note }: { note: NoteType }) {
  return (
    <div
      key={note._id}
      style={{
        backgroundColor: "#1e1e1e",
        color: "white",
        padding: "1rem",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "200px",
      }}
    >
      <div>
        <div
          style={{ marginBottom: "0.5rem", fontSize: "0.8rem", color: "#ccc" }}
        >
          {note.tags.map((tag) => (
            <span key={tag} style={{ marginRight: "0.5rem" }}>
              #{tag}
            </span>
          ))}
        </div>
        <strong style={{ fontSize: "1.1rem" }}>
          {note.title || "(No Title)"}
        </strong>
        <p style={{ marginTop: "0.5rem", fontSize: "0.95rem" }}>
          {note.content || "(No Content)"}
        </p>
      </div>
      <div style={{ textAlign: "right", fontSize: "0.75rem", color: "#aaa" }}>
        Last modified: {new Date(note.updatedAt).toLocaleString()}
      </div>
    </div>
  );
}

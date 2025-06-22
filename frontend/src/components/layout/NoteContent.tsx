export default function NoteContent({title, content}:{title:string, content:string}) {
  return (
    <>
      {" "}
      <strong style={{ fontSize: "1rem" }}>{title}</strong>
      <p
        style={{
          marginTop: "0.5rem",
          fontSize: "0.85rem",
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 20,
          WebkitBoxOrient: "vertical",
        }}
      >
        {content || "(No Content)"}
      </p>
    </>
  );
}

import Note from "./Note";

export default function Notes() {
  return (
    <div
      className="d-flex flex-wrap flex-row-reverse justify-content-between align-items-start gap-3 p-3 "
      style={{
        backgroundColor: "#e6ded1",
      }}
    >
      <Note />
      <Note />
      <Note />
      <Note />
      <Note />
      <Note />
      <Note />
     
    </div>
  );
}

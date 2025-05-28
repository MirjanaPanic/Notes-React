export default function Error({ message }: { message: string }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "2rem",
        color: "#d32f2f",
        backgroundColor: "#ffebee",
        border: "1px solid #ffcdd2",
        borderRadius: "4px",
        margin: "1rem",
      }}
    >
      Error: {message}
    </div>
  );
}

import { Button, Modal } from "react-bootstrap";

export default function DeleteAlert({
  show,
  handleShowAlert,
  deleteData,
}: {
  show: boolean;
  handleShowAlert: () => void;
  deleteData: object;
}) {
  async function handleDelete() {
    console.log("podaci za brisanje", deleteData);
    //fetch ka metodi za brisanje
    try {
      const response = await fetch("http://localhost:5000/notes/deleteNote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deleteData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete note");
      }

      console.log("Note deleted successfully:", data.deletedNote);
      handleShowAlert();
      //i da osvezi prikaz, useffect neki
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  }

  return (
    show && (
      <Modal
        show={show}
        onHide={handleShowAlert}
        centered
        contentClassName="rounded-modal"
      >
        <div className="rounded" style={{ backgroundColor: "#e6ded1" }}>
          <Modal.Body>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <p style={{ marginBottom: "1rem" }}>
                Are you sure you want to delete this note?
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                }}
              >
                <Button
                  style={{
                    backgroundColor: "#28a444",
                    border: "none",
                    borderRadius: "20px",
                    padding: "0.5rem 1rem",
                  }}
                  onClick={handleDelete}
                >
                  Yes
                </Button>
                <Button
                  variant="secondary"
                  style={{
                    borderRadius: "20px",
                    padding: "0.5rem 1rem",
                  }}
                  onClick={handleShowAlert}
                >
                  Discard
                </Button>
              </div>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    )
  );
}

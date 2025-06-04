import { Button, Modal } from "react-bootstrap";

export default function Alert({
  show,
  deleteData,
}: {
  show: boolean;
  deleteData: object;
}) {
  console.log("podaci za brisanje" + deleteData);
  return (
    show && (
      <Modal>
        <Modal.Body>
          <p> Are you sure want to delete this note? </p>

          <Button> Yes</Button>
          <Button> No</Button>
        </Modal.Body>
      </Modal>
    )
  );
}

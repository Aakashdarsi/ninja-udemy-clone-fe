import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useCartAction } from "../cartState";

export const Model = () => {
  const modal_status = useCartAction();
  return (
    <div>
      <Button variant="primary" onClick={modal_status.open}>
        Launch demo modal
      </Button>

      <Modal show={modal_status.clicked} onHide={modal_status.close}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modal_status.close}>
            Close
          </Button>
          <Button variant="primary" onClick={modal_status.close}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

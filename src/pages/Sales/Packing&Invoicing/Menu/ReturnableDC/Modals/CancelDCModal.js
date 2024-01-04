import React from "react";
import { Modal } from "react-bootstrap";

function CancelDCModal({ cancelDC, closeCancelDC, handleDCCancel }) {
  return (
    <Modal show={cancelDC} onHide={closeCancelDC} size="md">
      <Modal.Header closeButton>
        <Modal.Title>magod_Packing_And_Invoicing</Modal.Title>
      </Modal.Header>
      <Modal.Body>Do you wish to cancel the Returnable DC?</Modal.Body>
      <Modal.Footer>
        <button
          className="button-style"
          style={{ width: "50px" }}
          onClick={handleDCCancel}
        >
          Yes
        </button>

        <button
          className="button-style"
          style={{ width: "50px", backgroundColor: "rgb(173, 173, 173)" }}
          onClick={closeCancelDC}
        >
          No
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default CancelDCModal;

import React from "react";
import { Modal } from "react-bootstrap";

function EwayBillSaveModal({
  ewayBillSave,
  closeEwayBillSave,
  openEwayBillPrint,
}) {
  return (
    <Modal show={ewayBillSave} onHide={closeEwayBillSave} size="md">
      <Modal.Header closeButton>
        <Modal.Title>Magod ReturnableDC</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Do you wish to Save the E way Bill No for this DC/Inv?
      </Modal.Body>

      <Modal.Footer>
        <button
          className="button-style"
          style={{ width: "50px" }}
          onClick={openEwayBillPrint}
        >
          Yes
        </button>

        <button
          className="button-style"
          style={{ width: "50px", backgroundColor: "rgb(173, 173, 173)" }}
          onClick={closeEwayBillSave}
        >
          No
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default EwayBillSaveModal;

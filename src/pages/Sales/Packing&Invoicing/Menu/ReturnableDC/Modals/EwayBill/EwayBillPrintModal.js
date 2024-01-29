import React from "react";
import { Modal } from "react-bootstrap";

function EwayBillPrintModal({
  ewayBillPrint,
  closeEwayBillPrint,
  openEwayBillPdf,
  closeEwayBillPdf,
}) {
  return (
    <Modal show={ewayBillPrint} onHide={closeEwayBillPrint} size="md">
      <Modal.Header closeButton>
        <Modal.Title>Magod ReturnableDC</Modal.Title>
      </Modal.Header>
      <Modal.Body>Do you wish to print DC?</Modal.Body>

      <Modal.Footer>
        <button
          className="button-style"
          style={{ width: "50px" }}
          onClick={openEwayBillPdf}
        >
          Yes
        </button>

        <button
          className="button-style"
          style={{ width: "50px", backgroundColor: "rgb(173, 173, 173)" }}
          onClick={closeEwayBillPrint}
        >
          No
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default EwayBillPrintModal;

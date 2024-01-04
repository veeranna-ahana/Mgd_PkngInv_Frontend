import React, { Fragment } from "react";
import { Modal } from "react-bootstrap";
import { PDFViewer, StyleSheet, Image } from "@react-pdf/renderer";

function EwayBillPdfModal({
  ewayBillPdf,
  closeEwayBillPdf,
  formData,
  DeliveryChallan,
}) {
  return (
    <Modal show={ewayBillPdf} onHide={closeEwayBillPdf} fullscreen>
      <Modal.Header closeButton>
        <Modal.Title>Returnable Delivery Challan</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Fragment>
          <PDFViewer width="1200" height="600" filename="somename.pdf">
            <DeliveryChallan formData={formData} />
          </PDFViewer>
        </Fragment>
      </Modal.Body>
    </Modal>
  );
}

export default EwayBillPdfModal;

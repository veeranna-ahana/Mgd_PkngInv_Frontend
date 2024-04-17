import React, { Fragment, useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { PDFViewer, StyleSheet, Image } from "@react-pdf/renderer";
import { apipoints } from "../../../../../../api/PackInv_API/ReturnableDC/ReturnableDC";
import Axios from "axios";

function EwayBillPdfModal({
  ewayBillPdf,
  closeEwayBillPdf,
  formData,
  DeliveryChallan,
}) {
  const [PDFData, setPDFData] = useState({});

  function fetchPDFData() {
    Axios.get(apipoints.getPDFData).then((res) => {
      setPDFData(res.data[0]);
    });
  }

  useEffect(() => {
    fetchPDFData();
  }, []);

  return (
    <Modal show={ewayBillPdf} onHide={closeEwayBillPdf} fullscreen>
      <Modal.Header closeButton>
        <Modal.Title>Returnable Delivery Challan</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Fragment>
          <PDFViewer width="1200" height="600" filename="somename.pdf">
            <DeliveryChallan formData={formData} PDFData={PDFData} />
          </PDFViewer>
        </Fragment>
      </Modal.Body>
    </Modal>
  );
}

export default EwayBillPdfModal;

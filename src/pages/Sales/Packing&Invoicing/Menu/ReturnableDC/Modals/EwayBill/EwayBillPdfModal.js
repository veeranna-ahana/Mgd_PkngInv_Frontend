import React, { Fragment, useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { PDFViewer, StyleSheet, Image, pdf } from "@react-pdf/renderer";
import { apipoints } from "../../../../../../api/PackInv_API/ReturnableDC/ReturnableDC";
import Axios from "axios";
import { toast } from "react-toastify";

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

  const savePdfToServer = async () => {
    try {
      const adjustment = "Delivery_Challan";

      // Step 1: Call the API to set the adjustment name
      await Axios.post(apipoints.setAdjustmentName, {
        adjustment,
      });

      const blob = await pdf(
        <DeliveryChallan formData={formData} PDFData={PDFData} />
      ).toBlob();

      const pdfFormData = new FormData();

      const file = new File([blob], "GeneratedPDF.pdf", {
        type: "application/pdf",
      });

      pdfFormData.append("file", file);

      const response = await Axios.post(apipoints.savePDF, pdfFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        toast.success("PDF saved successfully!");
      }
    } catch (error) {
      console.error("Error saving PDF to server:", error);
    }
  };

  return (
    <Modal show={ewayBillPdf} onHide={closeEwayBillPdf} fullscreen>
      <Modal.Header closeButton>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Modal.Title>Returnable Delivery Challan</Modal.Title>
          <button className="button-style" onClick={savePdfToServer}>
            Save to Server
          </button>
        </div>
      </Modal.Header>

      <Modal.Body>
        <Fragment>
          <PDFViewer width="1200" height="600" filename="Delivery_Challan.pdf">
            <DeliveryChallan formData={formData} PDFData={PDFData} />
          </PDFViewer>
        </Fragment>
      </Modal.Body>
    </Modal>
  );
}

export default EwayBillPdfModal;

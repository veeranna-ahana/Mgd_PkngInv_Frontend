import React, { Fragment, useState, useEffect } from "react";

import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  pdf,
} from "@react-pdf/renderer";
import { Button, Modal } from "react-bootstrap";
import PrintInvoice from "./PrintInvoice";
import Axios from "axios";

import { toast } from "react-toastify";

import { apipoints } from "../../../../api/PackInv_API/Invoice/Invoice";

export default function ModalInvoice(props) {
  const [PDFData, setPDFData] = useState({});

  const handleClose = () => props.setPrintInvoiceModal(false);

  function fetchPDFData() {
    Axios.post(apipoints.getPDFData, {}).then((res) => {
      setPDFData(res.data[0]);
    });
  }

  useEffect(() => {
    fetchPDFData();
  }, []);

  // console.log("PDFData", PDFData);

  let exciseArr = [];
  for (let i = 0; i < props.invDetailsData.length; i++) {
    const element = props.invDetailsData[i];

    if (exciseArr.filter((obj) => obj === element.Excise_CL_no).length > 0) {
    } else {
      exciseArr.push(element.Excise_CL_no);
    }
  }

  const savePdfToServer = async () => {
    try {
      const adjustment = "Invoice"; // Replace with the actual name you want to send

      // Step 1: Call the API to set the adjustment name
      await Axios.post(apipoints.setAdjustmentName, {
        adjustment,
      });
      const blob = await pdf(
        <PrintInvoice
          PDFData={PDFData}
          rowLimit={props.rowLimit}
          invRegisterData={props.invRegisterData}
          invDetailsData={props.invDetailsData}
          invTaxData={props.invTaxData}
          exciseArr={exciseArr}
        />
      ).toBlob();

      const file = new File([blob], "GeneratedPDF.pdf", {
        type: "application/pdf",
      });

      const formData = new FormData();

      formData.append("file", file);

      const response = await Axios.post(apipoints.savePDF, formData, {
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
    <>
      <Modal fullscreen show={props.printInvoiceModal} onHide={handleClose}>
        <Modal.Header closeButton>
          {/* <Modal.Title>Print Invoice</Modal.Title> */}
          <Modal.Title
            style={{
              // fontSize: "12px",
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            Print Invoice
            <button
              className="button-style"
              variant="primary"
              style={{ fontSize: "10px", marginRight: "35px" }}
              onClick={savePdfToServer}
            >
              Save to Server
            </button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="m-0 p-1">
          <Fragment>
            <PDFViewer width="1358" height="595" filename="Invoice.pdf">
              <PrintInvoice
                PDFData={PDFData}
                rowLimit={props.rowLimit}
                invRegisterData={props.invRegisterData}
                invDetailsData={props.invDetailsData}
                invTaxData={props.invTaxData}
                exciseArr={exciseArr}
              />
            </PDFViewer>
          </Fragment>
        </Modal.Body>
      </Modal>
    </>
  );
}

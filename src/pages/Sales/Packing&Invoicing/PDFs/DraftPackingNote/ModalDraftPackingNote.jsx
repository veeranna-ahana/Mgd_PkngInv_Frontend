import React, { Fragment, useState } from "react";
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
import PrintDraftPackingNote from "./PrintDraftPackingNote";

import Axios from "axios";

import { toast } from "react-toastify";
import { apipoints } from "../../../../api/PackInv_API/Invoice/Invoice";

export default function ModalPackingNote(props) {
  const handleClose = () => props.setPrintDraftPNModal(false);

  const rowLimit = 20;

  function* chunks(arr, n) {
    for (let i = 0; i < arr.length; i += n) {
      yield arr.slice(i, i + n);
    }
  }

  const savePdfToServer = async () => {
    try {
      const adjustment = "Draft_Packing_Note"; // Replace with the actual name you want to send

      // Step 1: Call the API to set the adjustment name
      await Axios.post(apipoints.setAdjustmentName, {
        adjustment,
      });
      const blob = await pdf(
        <PrintDraftPackingNote
          invRegisterData={props.invRegisterData}
          // invDetailsData={props.invDetailsData}
          invTaxData={props.invTaxData}
          // invDetailsData={[...chunks(props?.invDetailsData, rowLimit)]}
          invDetailsData={props?.invDetailsData}
          rowLimit={rowLimit}
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
      <Modal fullscreen show={props.printDraftPNModal} onHide={handleClose}>
        <Modal.Header closeButton>
          {/* <Modal.Title>Print Draft Packing Note</Modal.Title> */}
          <Modal.Title
            style={{
              // fontSize: "12px",
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            Print Draft Packing Note
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
            <PDFViewer width="1358" height="595" filename="PackingNote.pdf">
              <PrintDraftPackingNote
                invRegisterData={props.invRegisterData}
                // invDetailsData={props.invDetailsData}
                invTaxData={props.invTaxData}
                // invDetailsData={[...chunks(props?.invDetailsData, rowLimit)]}
                invDetailsData={props?.invDetailsData}
                rowLimit={rowLimit}
              />
            </PDFViewer>
          </Fragment>
        </Modal.Body>
      </Modal>
    </>
  );
}

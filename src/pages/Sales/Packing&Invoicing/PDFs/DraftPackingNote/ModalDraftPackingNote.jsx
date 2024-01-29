import React, { Fragment, useState } from "react";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { Button, Modal } from "react-bootstrap";
import PrintDraftPackingNote from "./PrintDraftPackingNote";
// import PrintInvoiceAndAnnexure from "./PrintInvoiceAndAnnexure";
// import MLLogo from "../../../../../../../ML-LOGO.png";
// PrintInvoiceAndAnnexure

// PrintDraftPackingNote
export default function ModalPackingNote(props) {
  const handleClose = () => props.setPrintDraftPNModal(false);

  // console.log("props... in modal", props);
  const rowLimit = 20;

  function* chunks(arr, n) {
    for (let i = 0; i < arr.length; i += n) {
      yield arr.slice(i, i + n);
    }
  }

  return (
    <>
      <Modal fullscreen show={props.printDraftPNModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Print Draft Packing Note</Modal.Title>
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

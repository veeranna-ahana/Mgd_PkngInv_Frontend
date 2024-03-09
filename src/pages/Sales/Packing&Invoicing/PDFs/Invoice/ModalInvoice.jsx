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
import PrintInvoice from "./PrintInvoice";
// import MLLogo from "../../../../../../../ML-LOGO.png";
// PrintInvoice

export default function ModalInvoiceAndAnnexure(props) {
  const handleClose = () => props.setPrintInvoiceModal(false);

  // console.log("details", props.invDetailsData);

  let exciseArr = [];
  for (let i = 0; i < props.invDetailsData.length; i++) {
    const element = props.invDetailsData[i];

    if (exciseArr.filter((obj) => obj === element.Excise_CL_no).length > 0) {
    } else {
      exciseArr.push(element.Excise_CL_no);
    }
  }

  return (
    <>
      <Modal fullscreen show={props.printInvoiceModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Print Invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body className="m-0 p-1">
          <Fragment>
            <PDFViewer width="1358" height="595" filename="Invoice.pdf">
              <PrintInvoice
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

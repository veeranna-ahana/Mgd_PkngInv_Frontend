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
import PrintInvoiceAndAnnexure from "./PrintInvoiceAndAnnexure";
// import MLLogo from "../../../../../../../ML-LOGO.png";
// PrintInvoiceAndAnnexure

export default function ModalInvoiceAndAnnexure(props) {
  const handleClose = () => props.setPrintAnneureModal(false);

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
      <Modal fullscreen show={props.printAnneureModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Print Invoice / Annexure</Modal.Title>
        </Modal.Header>
        <Modal.Body className="m-0 p-1">
          <Fragment>
            <PDFViewer
              width="1358"
              height="595"
              filename="InvoiceAndAnnexure.pdf"
            >
              <PrintInvoiceAndAnnexure
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

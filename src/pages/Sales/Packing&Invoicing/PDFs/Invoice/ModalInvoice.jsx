import React, { Fragment, useState, useEffect } from "react";

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
import Axios from "axios";

import { apipoints } from "../../../../api/PackInv_API/Invoice/Invoice";

export default function ModalInvoiceAndAnnexure(props) {
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

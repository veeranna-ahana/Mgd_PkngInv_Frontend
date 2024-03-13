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
import PrintPackingNote from "./PrintPackingNote";
import Axios from "axios";

import { apipoints } from "../../../../api/PackInv_API/Invoice/Invoice";

export default function ModalPackingNote(props) {
  const [PDFData, setPDFData] = useState({});

  const handleClose = () => props.setPrintCopyModal(false);

  function fetchPDFData() {
    Axios.post(apipoints.getPDFData, {}).then((res) => {
      setPDFData(res.data[0]);
    });
  }

  useEffect(() => {
    fetchPDFData();
  }, []);

  // console.log("PDFData", PDFData);

  const rowLimit = 20;

  function* chunks(arr, n) {
    for (let i = 0; i < arr.length; i += n) {
      yield arr.slice(i, i + n);
    }
  }

  return (
    <>
      <Modal
        fullscreen
        // show={true}
        show={props.printCopyModal}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Print Packing Note</Modal.Title>
        </Modal.Header>
        <Modal.Body className="m-0 p-1">
          <Fragment>
            <PDFViewer width="1358" height="595" filename="PackingNote.pdf">
              <PrintPackingNote
                PDFData={PDFData}
                invRegisterData={props.invRegisterData}
                // invDetailsData={props.invDetailsData}
                invTaxData={props.invTaxData}
                invDetailsData={[...chunks(props?.invDetailsData, rowLimit)]}
                rowLimit={rowLimit}
              />
            </PDFViewer>
          </Fragment>
        </Modal.Body>
      </Modal>
    </>
  );
}

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
import PrintAnnexure from "./PrintAnnexure";
import Axios from "axios";

import { apipoints } from "../../../../api/PackInv_API/Invoice/Invoice";

export default function ModalAnnexure(props) {
  const [PDFData, setPDFData] = useState({});

  const handleClose = () => props.setPrintAnneureModal(false);

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
      <Modal fullscreen show={props.printAnneureModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Print Annexure</Modal.Title>
        </Modal.Header>
        <Modal.Body className="m-0 p-1">
          <Fragment>
            <PDFViewer width="1358" height="595" filename="Annexure.pdf">
              <PrintAnnexure
                PDFData={PDFData}
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

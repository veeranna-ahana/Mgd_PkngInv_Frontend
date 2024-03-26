import React, { Fragment, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import Axios from "axios";
import { apipoints } from "../../../../../api/PackInv_API/ReturnableDC/ReturnableDC";
import DeliveryChallan from "../PDFs/DeliveryChallan";

function InspectionPackingForm({
  showInspModal,
  setShowInspModal,
  closeInspModal,
  handleSave,
  formData,
  updateFormData,
}) {
  // const { formData, updateFormData } = usePackAndInvContext();
  const [inspectedBy, setInspectedBy] = useState("");
  const [packedBy, setPackedBy] = useState("");
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showpdfModal, setShowPdfModal] = useState(false);
  const [showgstModal, setShowGstModal] = useState(false);

  const handleInputChange = (e) => {
    if (e.target.name === "inspectedBy") {
      setInspectedBy(e.target.value);
    } else if (e.target.name === "packedBy") {
      setPackedBy(e.target.value);
    }
  };

  const handleModalClose = () => {
    closeInspModal(inspectedBy, packedBy);
    if (!formData.gstNo) {
      setShowGstModal(true);
    } else {
      setShowPrintModal(true);
    }
  };

  const handlePrintModalClose = () => {
    setShowPrintModal(false);
  };

  const handleGSTModalClose = () => {
    setShowGstModal(false);
  };

  const handleGstYes = () => {
    updateFormData((prevData) => ({
      ...prevData,
      gstNo: "Not Registered",
    }));
    setShowGstModal(false);
    setShowPrintModal(true);
  };

  const handleGstClose = () => {
    setShowGstModal(false);
  };

  const handlePrintYes = () => {
    const srlType = "ReturnableGoodDC";
    const prefix = `${formData.unitName.charAt(0).toUpperCase()}G`;
    const VoucherNoLength = 4;
    if (inspectedBy.trim() === "" || packedBy.trim() === "") {
      toast.error("Enter the name of Inspected By and Packed By to continue");
      setShowPrintModal(false);
    } else {
      Axios.post(apipoints.createDC, {
        dcInvNo: formData.dcInvNo,
        unit: formData.unitName,
        srlType: srlType,
        prefix: prefix,
        VoucherNoLength: VoucherNoLength,
      })
        .then((response) => {
          if (response.status === 200) {
            toast.success("Returnable DC Created");
            console.log("DC_DATE", response.data[0].DC_Date);
            if (response.data[0].DC_Date) {
              const date = new Date(response.data[0].DC_Date);
              const formattedDateString = date.toLocaleDateString("en-GB");
              updateFormData({
                ...formData,
                dcStatus: response.data[0].DCStatus,
                dcDate: formattedDateString,
                dcNo: response.data[0].DC_No,
              });
              console.log("dcStatus", formData.dcStatus);
            } else {
              console.error("No date value received in the response.");
            }
            handleSave();

            setShowPrintModal(false);
            setShowPdfModal(true);
          } else {
            toast.error(
              "Failed to update inspection and packing details. Please try again."
            );
          }
        })
        .catch((error) => {
          console.error(
            "Error while updating inspection and packing details:",
            error
          );
        });
    }
  };

  const handlePdfClose = () => {
    setShowPdfModal(false);
  };

  return (
    <div>
      <Modal
        show={showInspModal}
        onHide={handleModalClose}
        // style={{ width: "450px" }}
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>Inspection and Packing Form</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="row">
            <div className="col-md-4 col-sm-12">
              <label className="form-label">Inspected By</label>
            </div>

            <div className="col-md-6 col-sm-12">
              <input
                type="text"
                name="inspectedBy"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 col-sm-12">
              <label className="form-label">Packed By</label>
            </div>

            <div className="col-md-6 col-sm-12">
              <input type="text" name="packedBy" onChange={handleInputChange} />
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {showPrintModal && (
        <Modal show={showPrintModal} onHide={handlePrintModalClose} size="md">
          <Modal.Header closeButton>
            <Modal.Title>Print</Modal.Title>
          </Modal.Header>

          <Modal.Body>Print ReturnableDC?</Modal.Body>
          <Modal.Footer>
            <button
              className="button-style"
              style={{ width: "50px" }}
              onClick={handlePrintYes}
            >
              Yes
            </button>

            <button
              className="button-style"
              style={{ width: "50px", backgroundColor: "rgb(173, 173, 173)" }}
              onClick={handlePrintModalClose}
            >
              No
            </button>
          </Modal.Footer>
        </Modal>
      )}

      {showpdfModal && (
        <Modal show={showpdfModal} onHide={handlePdfClose} fullscreen>
          <Modal.Header closeButton>
            <Modal.Title>Returnable Delivery Challan</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Fragment>
              <PDFViewer width="1200" height="600" filename="somename.pdf">
                <DeliveryChallan formData={formData} />
              </PDFViewer>
            </Fragment>
          </Modal.Body>
        </Modal>
      )}

      {showgstModal && (
        <Modal show={showgstModal} onHide={handleGSTModalClose} size="md">
          <Modal.Header closeButton>
            <Modal.Title>Magod ReturnableDC</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            GST No Missing, Is Vendor Not Registerd GST? Select Yes to Print No
            to Exit.
          </Modal.Body>
          <Modal.Footer>
            <button
              className="button-style"
              style={{ width: "50px" }}
              onClick={handleGstYes}
            >
              Yes
            </button>

            <button
              className="button-style"
              style={{ width: "50px", backgroundColor: "rgb(173, 173, 173)" }}
              onClick={handleGstClose}
            >
              No
            </button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default InspectionPackingForm;

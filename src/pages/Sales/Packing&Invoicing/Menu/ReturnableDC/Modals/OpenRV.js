import React, { useState, Fragment, useEffect } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import { apipoints } from "../../../../../api/PackInv_API/ReturnableDC/ReturnableDC";
import Axios from "axios";
import ReceiptVoucher from "../PDFs/ReceiptVoucher";

function OpenRV({
  showRVModal,
  closeJobWorkModalRV,
  handleInputChange,
  formData,
  updateFormData,
}) {
  const [print, setPrint] = useState(false);
  const [pdfModal, setPdfModal] = useState(false);
  const [cancel, setCancel] = useState(false);

  const printModal = (e) => {
    e.preventDefault();
    setPrint(true);
  };

  const printModalClose = () => {
    setPrint(false);
  };

  const handlePrintYes = () => {
    setPrint(false);
    setPdfModal(true);
  };

  const cancelModal = (e) => {
    e.preventDefault();
    if (!formData.CancelReason || formData.CancelReason.length < 10) {
      toast.error("Enter Proper Reason for Cancel");
    } else {
      setCancel(true);
    }
  };

  const cancelModalClose = () => {
    setCancel(false);
  };

  const handlePdfClose = () => {
    setPdfModal(false);
  };

  const firstTable = () => {
    Axios.post(apipoints.firstTable, { rvId: formData.selectedRowData.RvID })
      .then((response) => {
        console.log("First Table Response:", response.data);
        updateFormData((prevData) => ({
          ...prevData,
          firstTable: response.data,
        }));
      })
      .catch((error) => {
        console.error("Error making first API request:", error);
      });
  };

  const secondTable = () => {
    Axios.post(apipoints.secondTable, {
      dcInvNo: formData.dcInvNo,
    })
      .then((response) => {
        console.log("Second Table Response:", response.data);
        updateFormData((prevData) => ({
          ...prevData,
          secondTable: response.data,
        }));
      })
      .catch((error) => {
        console.error("Error making first API request:", error);
      });
  };

  useEffect(() => {
    if (showRVModal && formData.selectedRowData.RvID) {
      firstTable();
      secondTable();
    }
  }, [showRVModal, formData.selectedRowData.RvID]);

  const handleCancel = async () => {
    try {
      const response = await Axios.post(apipoints.cancel, {
        rvId: formData.selectedRowData.RvID,
        firstTable: formData.firstTable,
        dcInvNo: formData.dcInvNo,
        CancelReason: formData.CancelReason,
      });

      const date = new Date(response.data.updatedRvDate);
      const formattedDateString = date.toLocaleDateString("en-GB");

      console.log("draft_dc_inv_details", response.data.draft_dc_inv_details);
      console.log("updatedRVNo", response.data.updatedRVNo);
      console.log("updateRvStatus", response.data.updateRvStatus);
      console.log(
        "draft_dc_inv_register",
        response.data.draft_dc_inv_register[0].DCStatus
      );

      updateFormData((prevData) => ({
        ...prevData,
        tableData: response.data.draft_dc_inv_details,
      }));

      updateFormData((prevData) => ({
        ...prevData,
        selectedRowData: {
          ...prevData.selectedRowData,
          RVStatus: response.data.updateRvStatus,
          CancelReason: response.data.CancelReason,
        },
        tableData: response.data.draft_dc_inv_details,
        rvNo: response.data.updatedRVNo,
        CancelReason: response.data.CancelReason,
        rvDate: formattedDateString,
        dcStatus: response.data.draft_dc_inv_register[0].DCStatus,
        RVStatus: response.data.updateRvStatus,
      }));

      const receiveTableData = await Axios.post(apipoints.receiveTable, {
        rvId: formData.selectedRowData.RvID,
        Ref_VrId: formData.dcInvNo,
      });

      console.log("RVStatus", receiveTableData.data);
      console.log("formData.RVStatus", formData.RVStatus);

      updateFormData((prevData) => ({
        ...prevData,
        receiveTable: receiveTableData.data,
        RVStatus: receiveTableData.data[0].RVStatus,
      }));
      toast.success("Receipt Voucher Cancelled");

      setCancel(false);
    } catch (error) {
      console.error(
        "An error occurred during the update:",
        error.message || error
      );
    }
  };

  return (
    <Modal show={showRVModal} onHide={closeJobWorkModalRV} fullscreen>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Title className="title">
        Job Work Goods Receipt Voucher
      </Modal.Title>
      <Modal.Body>
        <div className="row">
          <div className="col-md-3 col-sm-12">
            <label className="form-label">Voucher No</label>
            <input
              type="text"
              disabled
              value={formData.selectedRowData.RV_No}
            />
          </div>
          <div className="col-md-2 col-sm-12">
            <label className="form-label "></label>
            <input
              type="text"
              className="mt-2"
              disabled
              value={
                formData.selectedRowData.RV_Date
                  ? new Date(
                      formData.selectedRowData.RV_Date
                    ).toLocaleDateString("en-GB")
                  : ""
              }
            />
          </div>
          <div className="col-md-2 col-sm-12">
            <label className="form-label mt-2"></label>
            <input
              type="text"
              disabled
              className="mt-2"
              value={formData.selectedRowData.RVStatus}
            />
          </div>
          <div className="col-md-3 col-sm-12">
            <label className="form-label">Weight</label>
            <input
              type="text"
              disabled
              value={parseInt(formData.selectedRowData.TotalWeight)}
            />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-4 col-sm-12">
            <label className="form-label">Receive Form</label>
            <input
              type="text"
              disabled
              value={formData.selectedRowData.Customer}
            />
          </div>
          <div className="col-md-3 col-sm-12">
            <label className="form-label"></label>
            <input
              type="text"
              disabled
              className="mt-2"
              value={formData.selectedRowData.Cust_Code}
            />
          </div>
          <div className="col-md-2 col-sm-12 mt-3">
            <button
              className={
                formData.RVStatus === "Updated" ||
                formData.selectedRowData.RVStatus === "Updated" ||
                formData.selectedRowData.RVStatus === "Cancelled"
                  ? "button-style button-disabled"
                  : "button-style"
              }
              disabled={
                formData.RVStatus === "Updated" ||
                formData.selectedRowData.RVStatus === "Updated" ||
                formData.selectedRowData.RVStatus === "Cancelled"
              }
              // onClick={handleSave}
            >
              Save
            </button>
          </div>
          <div className="col-md-3 col-sm-12 mt-3">
            <button
              className={
                formData.selectedRowData.RVStatus === "Received" ||
                formData.selectedRowData.RVStatus === "Cancelled"
                  ? "button-style button-disabled"
                  : "button-style"
              }
              onClick={cancelModal}
              disabled={
                formData.selectedRowData.RVStatus === "Received" ||
                formData.selectedRowData.RVStatus === "Cancelled"
              }
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-4 col-sm-12">
            <label className="form-label">DC Reference</label>
            <input
              type="text"
              disabled
              value={formData.selectedRowData.Ref_VrNo}
            />
          </div>
          <div className="col-md-3 col-sm-12">
            <label className="form-label">GST No</label>
            <input
              type="text"
              disabled
              value={formData.selectedRowData.CustGSTNo}
            />
          </div>
          <div className="col-md-2 col-sm-12 mt-3">
            <button
              className={
                formData.RVStatus === "Updated" ||
                formData.selectedRowData.RVStatus === "Updated" ||
                formData.selectedRowData.RVStatus === "Cancelled"
                  ? "button-style button-disabled"
                  : "button-style"
              }
              disabled={
                formData.RVStatus === "Updated" ||
                formData.selectedRowData.RVStatus === "Updated" ||
                formData.selectedRowData.dcStatus === "Cancelled"
              }
              // onClick={acceptModal}
            >
              Accept
            </button>
          </div>
          <div className="col-md-3 col-sm-12 mt-3">
            <button className="button-style" onClick={printModal}>
              Print
            </button>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-4 col-sm-12">
            <label className="form-label">Cust Docu Ref</label>
            <input
              type="text"
              name="CustDocuNo"
              value={formData.selectedRowData.CustDocuNo}
              // onChange={handleInputChange}
              disabled={
                formData.RVStatus === "Updated" ||
                formData.selectedRowData.RVStatus === "Updated" ||
                formData.selectedRowData.RVStatus === "Cancelled" ||
                formData.selectedRowData.RVStatus === "Closed"
              }
            />
          </div>
          <div className="col-md-3 col-sm-12">
            <label className="form-label">E Way Bill No</label>
            <input
              type="text"
              name="ewayBillNo"
              value={formData.selectedRowData.EWayBillRef}
              // onChange={handleInputChange}
              disabled={
                formData.RVStatus === "Updated" ||
                formData.selectedRowData.RVStatus === "Updated" ||
                formData.selectedRowData.RVStatus === "Cancelled" ||
                formData.selectedRowData.RVStatus === "Closed"
              }
            />
          </div>
          <div className="col-md-4 col-sm-12">
            <label className="form-label">Reason</label>
            <input
              type="text"
              name="CancelReason"
              value={
                formData.selectedRowData.RVStatus === "Updated"
                  ? formData.CancelReason
                  : formData.selectedRowData.CancelReason
              }
              onChange={handleInputChange}
              disabled={formData.selectedRowData.RVStatus === "Cancelled"}
            />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-7 col-sm-12">
            <div>
              <button
                className={
                  formData.RVStatus === "Updated" ||
                  formData.selectedRowData.RVStatus === "Updated" ||
                  formData.selectedRowData.RVStatus === "Cancelled"
                    ? "button-style button-disabled"
                    : "button-style"
                }
                disabled={
                  formData.RVStatus === "Updated" ||
                  formData.selectedRowData.RVStatus === "Updated" ||
                  formData.selectedRowData.RVStatus === "Cancelled"
                }
                // onClick={remove}
              >
                Remove
              </button>
            </div>

            <div
              className="row mt-3"
              style={{
                overflowY: "scroll",
                overflowX: "scroll",
                maxHeight: "300px",
              }}
            >
              <Table
                striped
                className="table-data border"
                style={{ border: "1px" }}
              >
                <thead
                  className="tableHeaderBGColor"
                  style={{
                    textAlign: "center",
                    position: "sticky",
                    top: "-1px",
                  }}
                >
                  <tr>
                    <th style={{ whiteSpace: "nowrap" }}>Select</th>
                    <th style={{ whiteSpace: "nowrap" }}>Part Name</th>
                    <th style={{ whiteSpace: "nowrap" }}>Part Description</th>
                    <th style={{ whiteSpace: "nowrap" }}>Qty Sent</th>
                    <th style={{ whiteSpace: "nowrap" }}>UOM</th>
                    <th style={{ whiteSpace: "nowrap" }}>Received</th>
                    <th style={{ whiteSpace: "nowrap" }}>Inspected</th>
                    <th style={{ whiteSpace: "nowrap" }}>Accepted</th>
                    <th style={{ whiteSpace: "nowrap" }}>Rejected</th>
                  </tr>
                </thead>

                <tbody className="tablebody">
                  {formData.firstTable?.map((row, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="checkbox"
                          className="mt-1"
                          disabled={
                            formData.selectedRowData.RVStatus === "Updated" ||
                            formData.selectedRowData.dcStatus === "Cancelled"
                          }
                        />
                      </td>
                      <td>{row.Part_Name}</td>
                      <td>{row.Part_Discription}</td>
                      <td>{parseInt(row.DC_Qty)}</td>
                      <td>{row.UOM}</td>
                      <td>
                        <input
                          type="number"
                          name="Qty_Received"
                          value={parseInt(row.Qty_Received)}
                          disabled={
                            formData.selectedRowData.RVStatus === "Updated" ||
                            formData.selectedRowData.dcStatus === "Cancelled"
                          }
                          style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "transparent",
                            border: "none",
                          }}
                          // onChange={(e) =>
                          //   handleEditChange(e, "Qty_Received", index)
                          // }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="Qty_Inspected"
                          value={parseInt(row.Qty_Inspected)}
                          disabled={
                            formData.selectedRowData.RVStatus === "Updated" ||
                            formData.selectedRowData.RVStatus === "Cancelled"
                          }
                          style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "transparent",
                            border: "none",
                          }}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="Qty_Accepted"
                          value={parseInt(row.Qty_Accepted)}
                          disabled={
                            formData.selectedRowData.RVStatus === "Updated" ||
                            formData.selectedRowData.RVStatus === "Cancelled"
                          }
                          style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "transparent",
                            border: "none",
                          }}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="Qty_Rejected"
                          value={parseInt(row.Qty_Rejected)}
                          disabled={
                            formData.selectedRowData.RVStatus === "Updated" ||
                            formData.selectedRowData.RVStatus === "Cancelled"
                          }
                          style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "transparent",
                            border: "none",
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>

          <div className="col-md-5 col-sm-12">
            <div>
              <button
                className={
                  formData.RVStatus === "Updated" ||
                  formData.selectedRowData.RVStatus === "Updated" ||
                  formData.selectedRowData.RVStatus === "Cancelled"
                    ? "button-style button-disabled"
                    : "button-style"
                }
                disabled={
                  formData.RVStatus === "Updated" ||
                  formData.selectedRowData.RVStatus === "Updated" ||
                  formData.selectedRowData.RVStatus === "Cancelled"
                }
                // onClick={handleAddButtonClick}
              >
                Add
              </button>
            </div>

            <div
              className="row mt-3"
              style={{
                overflowY: "scroll",
                overflowX: "scroll",
                maxHeight: "300px",
              }}
            >
              <Table
                striped
                className="table-data border"
                style={{ border: "1px" }}
              >
                <thead className="tableHeaderBGColor">
                  <tr>
                    <th style={{ whiteSpace: "nowrap" }}>Select</th>
                    <th style={{ whiteSpace: "nowrap" }}>Part Name</th>
                    <th style={{ whiteSpace: "nowrap" }}>Part Description</th>
                    <th style={{ whiteSpace: "nowrap" }}>UOM</th>
                    <th style={{ whiteSpace: "nowrap" }}>Sent</th>
                    <th style={{ whiteSpace: "nowrap" }}>Returned</th>
                  </tr>
                </thead>

                <tbody className="tablebody">
                  {formData.secondTable.map((row, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="checkbox"
                          className="mt-1"
                          id={`checkbox_${index}`}
                          disabled={
                            formData.selectedRowData.RVStatus === "Updated" ||
                            formData.selectedRowData.dcStatus === "Cancelled"
                          }
                          // onChange={(e) =>
                          //   handleCheckboxChangeSecondTable(e, row)
                          // }
                          checked={row.isSelected}
                        />
                      </td>
                      <td>{row.Dwg_Code}</td>
                      <td>{row.Dwg_No}</td>
                      <td>{row.UOM}</td>
                      <td>{row.Qty}</td>
                      <td>{row.QtyReturned}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </Modal.Body>

      {print && (
        <Modal show={print} onHide={printModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>magod_Packing_And_Invoicing</Modal.Title>
          </Modal.Header>
          <Modal.Body>Print Returned Goods Receipt Voucher?</Modal.Body>
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
              onClick={printModalClose}
            >
              No
            </button>
          </Modal.Footer>
        </Modal>
      )}

      {pdfModal && (
        <Modal show={pdfModal} onHide={handlePdfClose} fullscreen>
          <Modal.Header closeButton>
            <Modal.Title>Returnable Material Receipt Voucher</Modal.Title>
          </Modal.Header>
          <Fragment>
            <PDFViewer width="1200" height="600" filename="somename.pdf">
              <ReceiptVoucher formData={formData} />
            </PDFViewer>
          </Fragment>
        </Modal>
      )}

      {cancel && (
        <Modal show={cancel} onHide={cancelModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>magod_Packing_And_Invoicing</Modal.Title>
          </Modal.Header>
          <Modal.Body>Do you wish to cancel this Receipt Voucher?</Modal.Body>
          <Modal.Footer>
            <button
              className="button-style"
              style={{ width: "50px" }}
              onClick={handleCancel}
            >
              Yes
            </button>

            <button
              className="button-style"
              style={{ width: "50px", backgroundColor: "rgb(173, 173, 173)" }}
              onClick={cancelModalClose}
            >
              No
            </button>
          </Modal.Footer>
        </Modal>
      )}
    </Modal>
  );
}

export default OpenRV;

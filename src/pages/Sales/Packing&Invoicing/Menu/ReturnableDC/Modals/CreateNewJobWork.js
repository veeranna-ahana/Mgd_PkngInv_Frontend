import React, { useState, Fragment, useEffect } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import { apipoints } from "../../../../../api/PackInv_API/ReturnableDC/ReturnableDC";
import Axios from "axios";
import ReceiptVoucher from "../PDFs/ReceiptVoucher";

function CreateNewJobWork({
  showJobWorkModal,
  closeJobWorkModal,
  handleInputChange,
  formData,
  updateFormData,
}) {
  const [accept, setAccept] = useState(false);
  const [print, setPrint] = useState(false);
  const [pdfModal, setPdfModal] = useState(false);
  const [cancel, setCancel] = useState(false);

  const [isReceivedDisabled, setIsReceivedDisabled] = useState(false);
  const [isInspectedEnabled, setIsInspectedEnabled] = useState(false);
  const [isAcceptedEnabled, setIsAcceptedEnabled] = useState(false);

  const [maxAllowedQty, setMaxAllowedQty] = useState(0);

  const acceptModalClose = () => {
    setAccept(false);
  };

  const printModal = (e) => {
    e.preventDefault();
    setPrint(true);
  };

  const printModalClose = () => {
    setPrint(false);
    setAccept(false);
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

  const handlePrintYes = () => {
    setAccept(false);
    setPrint(false);
    setCancel(false);
    setPdfModal(true);
  };

  const handlePdfClose = () => {
    setPdfModal(false);
  };

  const firstTable = () => {
    // Include formData.rvId in the request
    Axios.post(apipoints.firstTable, { rvId: formData.rvId })
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
    Axios.post(apipoints.secondTable, { dcInvNo: formData.dcInvNo })
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
    if (showJobWorkModal && formData.rvId) {
      firstTable();
      secondTable();
    }
  }, [showJobWorkModal, formData.rvId]);

  const handleEditChange = (event, field, index) => {
    const { value } = event.target;

    if (field === "Qty_Received") {
      const enteredValue = parseInt(value);
      const dcQty = parseInt(formData.firstTable[index].DC_Qty);
      const Qty = parseInt(formData.secondTable[index].Qty);
      const qtyReturned = parseInt(formData.secondTable[index].QtyReturned);

      const newMaxAllowedQty = Math.min(dcQty, Qty - qtyReturned);

      if (enteredValue > dcQty) {
        setIsInspectedEnabled(true);
        setIsAcceptedEnabled(true);
        toast.error("Cannot Receive More than Quantity Sent");
      } else if (!isNaN(enteredValue) && enteredValue > newMaxAllowedQty) {
        setIsInspectedEnabled(true);
        setIsAcceptedEnabled(true);
        toast.error(`Qty_Received cannot be greater than ${newMaxAllowedQty}`);
        setMaxAllowedQty(newMaxAllowedQty);
      } else {
        setIsInspectedEnabled(false);
        setIsAcceptedEnabled(false);
        setMaxAllowedQty(newMaxAllowedQty);
      }
    }

    if (field === "Qty_Inspected") {
      const enteredValue = parseInt(value);
      const qtyReceived = parseInt(formData.firstTable[index].Qty_Received);

      if (enteredValue > qtyReceived) {
        setIsAcceptedEnabled(true);
        toast.error("Cannot Inspect More than Quantity Received");
      } else {
        setIsAcceptedEnabled(false);
      }
    }

    if (field === "Qty_Accepted") {
      const enteredValue = parseInt(value);
      const Qty_Received = parseInt(formData.firstTable[index].Qty_Received);
      if (enteredValue > Qty_Received) {
        toast.error("Cannot Accept More than Quantity Received");
      } else {
        //
      }
    }

    updateFormData((prevData) => {
      const updatedFirstTable = [...prevData.firstTable];
      updatedFirstTable[index][field] = value;

      const qtyReceived = parseInt(updatedFirstTable[index].Qty_Received);
      const qtyInspected = parseInt(updatedFirstTable[index].Qty_Inspected);
      const qtyAccepted = parseInt(updatedFirstTable[index].Qty_Accepted);

      updatedFirstTable[index].Qty_Rejected =
        isNaN(qtyReceived) || isNaN(qtyAccepted)
          ? 0
          : Math.max(qtyReceived - qtyAccepted, 0);

      if (qtyReceived < 0) {
        updatedFirstTable[index].Qty_Received = 0;
      }

      if (qtyAccepted < 0) {
        updatedFirstTable[index].Qty_Accepted = 0;
      }

      if (qtyInspected < 0) {
        updatedFirstTable[index].Qty_Inspected = 0;
      }

      return {
        ...prevData,
        firstTable: updatedFirstTable,
      };
    });
  };

  const handleCheckboxChangeFirstTable = (event, rowData) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      updateFormData((prevData) => ({
        ...prevData,
        firstTableArray: [...prevData.firstTableArray, rowData],
      }));
    } else {
      updateFormData((prevData) => ({
        ...prevData,
        firstTableArray: prevData.firstTableArray.filter(
          (item) => item !== rowData
        ),
      }));
    }
  };

  const handleCheckboxChangeSecondTable = (event, rowData) => {
    const isChecked = event.target.checked;
    console.log("rowData", rowData);

    if (isChecked) {
      updateFormData((prevData) => ({
        ...prevData,
        secondTableArray: [...prevData.secondTableArray, rowData],
      }));
    } else {
      updateFormData((prevData) => ({
        ...prevData,
        secondTableArray: prevData.secondTableArray.filter(
          (item) => item !== rowData
        ),
      }));
    }
  };

  const remove = () => {
    if (formData.firstTableArray.length > 0) {
      const selectedIds = formData.firstTableArray?.map((row) => row.Id);

      console.log("selectedIds", selectedIds);

      Axios.post(apipoints.removeFirstTableData, {
        ids: selectedIds,
        rvId: formData.rvId,
      })
        .then((response) => {
          console.log("Delete operation successful:", response.data);
          updateFormData((prevData) => ({
            ...prevData,
            firstTable: response.data,
            firstTableArray: [],
          }));
        })
        .catch((error) => {
          console.error("Error during delete operation:", error);
        });
    } else {
      console.log("No rows selected for deletion");
      toast.warn("Select rows to Remove");
    }
  };

  const handleAddButtonClick = () => {
    if (formData.secondTableArray.length > 0) {
      const selectedRows = formData.secondTableArray.filter(
        (row) => row.Draft_dc_inv_DetailsID
      );

      if (selectedRows.length > 0) {
        Axios.post(apipoints.addToFirstTable, {
          rowsToAdd: selectedRows,
          rvId: formData.rvId,
        })
          .then((response) => {
            console.log("Add operation successful:", response.data);

            updateFormData((prevData) => ({
              ...prevData,
              firstTable: response.data,
              secondTableArray: [],
            }));

            const selectedIndices = selectedRows?.map((selectedRow) =>
              formData.secondTable.findIndex(
                (row) =>
                  row.Draft_dc_inv_DetailsID ===
                  selectedRow.Draft_dc_inv_DetailsID
              )
            );

            selectedIndices.forEach((index) => {
              const checkbox = document.getElementById(`checkbox_${index}`);
              if (checkbox) {
                checkbox.checked = false;
              }
            });
          })
          .catch((error) => {
            console.error("Error during add operation:", error);
          });
      } else {
        console.log("No rows selected to add.");
      }
    } else {
      console.log("No rows in the second table.");
      toast.warn("Select rows to Add");
    }
  };

  const handleSave = async () => {
    try {
      const hasErrors = formData.firstTable.some((row) => {
        const enteredValue = parseInt(row.Qty_Received);
        const dcQty = parseInt(row.DC_Qty);

        const correspondingSecondTableRow = formData.secondTable.find(
          (secondRow) => secondRow.Draft_dc_inv_DetailsID === row.Rv_SrlId
        );

        if (correspondingSecondTableRow) {
          const Qty = parseInt(correspondingSecondTableRow.Qty);
          const qtyReturned = parseInt(correspondingSecondTableRow.QtyReturned);

          console.log("Qty", Qty);
          console.log("qtyReturned", qtyReturned);

          const maxAllowedQuantity = Math.min(dcQty, Qty - qtyReturned);

          console.log("maxAllowedQuantity", maxAllowedQuantity);

          return (
            enteredValue > dcQty ||
            (!isNaN(enteredValue) && enteredValue > maxAllowedQuantity)
          );
        }

        // Handle the case where no corresponding row is found
        return false;
      });

      const hasReceivedErrors = formData.firstTable.some((row) => {
        const enteredValue = parseInt(row.Qty_Received);
        const dcQty = parseInt(row.DC_Qty);

        return enteredValue > dcQty;
      });

      const hasInspectedErrors = formData.firstTable.some((row) => {
        const enteredValue = parseInt(row.Qty_Inspected);
        const qtyReceived = parseInt(row.Qty_Received);
        return enteredValue > qtyReceived;
      });

      const hasAcceptedErrors = formData.firstTable.some((row) => {
        const enteredValue = parseInt(row.Qty_Accepted);
        const qtyReceived = parseInt(row.Qty_Received);
        return enteredValue > qtyReceived;
      });

      const hasBlankErrors = formData.firstTable.some((row) => {
        return (
          isNaN(parseFloat(row.Qty_Received)) ||
          isNaN(parseFloat(row.Qty_Inspected)) ||
          isNaN(parseFloat(row.Qty_Accepted))
        );
      });

      if (hasReceivedErrors) {
        toast.error("Cannot Receive More than Quantity Sent");
      } else if (hasErrors) {
        toast.error(`Qty_Received cannot be greater than ${maxAllowedQty}`);
      } else if (hasInspectedErrors) {
        toast.error("Cannot Inspect More than Quantity Received");
      } else if (hasAcceptedErrors) {
        toast.error("Cannot Accept More than Quantity Received");
      } else if (hasBlankErrors) {
        toast.error("Numeric Value Required");
      } else {
        const response = await Axios.post(apipoints.saveJobWork, {
          firstTable: formData.firstTable,
          rvId: formData.rvId,
          CustDocuNo: formData.CustDocuNo,
          CustGSTNo: formData.CustGSTNo,
          RVStatus: formData.RVStatus,
          UpDated: formData.UpDated,
          Type: formData.Type,
          Ref_VrId: formData.dcInvNo,
          Ref_VrNo: formData.Ref_VrNo,
          CancelReason: formData.CancelReason,
        });

        if (response.data && response.data.firstTable) {
          updateFormData((prevData) => ({
            ...prevData,
            firstTable: response.data.firstTable,
            // receiveTable: response.data.materialReceiptRegister,
          }));
        }

        toast.success("Data Saved");
      }
    } catch (error) {
      console.error("An error occurred while saving:", error.message || error);
    }
  };

  const acceptModal = async () => {
    try {
      const hasErrors = formData.firstTable.some((row) => {
        const enteredValue = parseInt(row.Qty_Received);
        const dcQty = parseInt(row.DC_Qty);

        const correspondingSecondTableRow = formData.secondTable.find(
          (secondRow) => secondRow.Draft_dc_inv_DetailsID === row.Rv_SrlId
        );

        if (correspondingSecondTableRow) {
          const Qty = parseInt(correspondingSecondTableRow.Qty);
          const qtyReturned = parseInt(correspondingSecondTableRow.QtyReturned);

          console.log("Qty", Qty);
          console.log("qtyReturned", qtyReturned);

          const maxAllowedQuantity = Math.min(dcQty, Qty - qtyReturned);

          console.log("maxAllowedQuantity", maxAllowedQuantity);

          return (
            enteredValue > dcQty ||
            (!isNaN(enteredValue) && enteredValue > maxAllowedQuantity)
          );
        }

        return false;
      });

      const hasReceivedErrors = formData.firstTable.some((row) => {
        const enteredValue = parseInt(row.Qty_Received);
        const dcQty = parseInt(row.DC_Qty);
        return enteredValue > dcQty;
      });

      const hasInspectedErrors = formData.firstTable.some((row) => {
        const enteredValue = parseInt(row.Qty_Inspected);
        const qtyReceived = parseInt(row.Qty_Received);
        return enteredValue > qtyReceived;
      });

      const hasAcceptedErrors = formData.firstTable.some((row) => {
        const enteredValue = parseInt(row.Qty_Accepted);
        const qtyReceived = parseInt(row.Qty_Received);
        return enteredValue > qtyReceived;
      });

      const hasBlankErrors = formData.firstTable.some((row) => {
        return (
          isNaN(parseFloat(row.Qty_Received)) ||
          isNaN(parseFloat(row.Qty_Inspected)) ||
          isNaN(parseFloat(row.Qty_Accepted))
        );
      });

      if (hasReceivedErrors) {
        toast.error("Cannot Receive More than Quantity Sent");
      } else if (hasErrors) {
        toast.error(`Qty_Received cannot be greater than ${maxAllowedQty}`);
      } else if (hasInspectedErrors) {
        toast.error("Cannot Inspect More than Quantity Received");
      } else if (hasAcceptedErrors) {
        toast.error("Cannot Accept More than Quantity Received");
      } else if (hasBlankErrors) {
        toast.error("Numeric Value Required");
      } else {
        const response = await Axios.post(apipoints.saveJobWork, {
          firstTable: formData.firstTable,
          rvId: formData.rvId,
          CustDocuNo: formData.CustDocuNo,
          CustGSTNo: formData.CustGSTNo,
          RVStatus: formData.RVStatus,
          UpDated: formData.UpDated,
          Type: formData.Type,
          Ref_VrId: formData.dcInvNo,
          Ref_VrNo: formData.Ref_VrNo,
          CancelReason: formData.CancelReason,
        });

        if (response.data && response.data.firstTable) {
          updateFormData((prevData) => ({
            ...prevData,
            firstTable: response.data.firstTable,
            // receiveTable: response.data.materialReceiptRegister,
          }));
        }

        const acceptanceErrors = formData.firstTable.filter((row) => {
          const qtyAccepted = parseInt(row.Qty_Accepted);
          const qtyRejected = parseInt(row.Qty_Rejected);
          const qtyReceived = parseInt(row.Qty_Received);
          return qtyAccepted + qtyRejected !== qtyReceived;
        });

        if (formData.CustDocuNo.trim() === "") {
          toast.error("Enter Customer Docu Reference");
        } else if (formData.ewayBillNo.trim() === "") {
          toast.error("Enter E Way Bill Reference, NIL if no E Way Bill");
        } else if (acceptanceErrors.length > 0) {
          const srlToUpdate = acceptanceErrors[0].Srl;
          setTimeout(() => {
            toast.error(`Update Qty Accepted for Srl ${srlToUpdate}`);
          }, 1000);
        } else {
          setAccept(true);
        }
      }
    } catch (error) {
      console.error("An error occurred while saving", error.message || error);
    }
  };

  const getRVNo = async () => {
    const srlType = "ReturnedGoodsVr";
    const ResetPeriod = "FinanceYear";
    const ResetValue = 0;
    const VoucherNoLength = 4;
    const prefix = `${formData.unitName.charAt(0).toUpperCase()}`;
    try {
      const response = await Axios.post(apipoints.insertRunNoRow, {
        unit: formData.unitName,
        srlType: srlType,
        ResetPeriod: ResetPeriod,
        ResetValue: ResetValue,
        VoucherNoLength: VoucherNoLength,
        prefix: prefix,
      });

      console.log("getRVNo Response", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAccept = async () => {
    const srlType = "ReturnedGoodsVr";
    const prefix = `${formData.unitName.charAt(0).toUpperCase()}`;
    try {
      const response = await Axios.post(apipoints.accept, {
        rvId: formData.rvId,
        firstTable: formData.firstTable,
        dcInvNo: formData.dcInvNo,
        ewayBillNo: formData.ewayBillNo,
        unit: formData.unitName,
        srlType: srlType,
        prefix: prefix,
      });

      const date = new Date(response.data.updatedRvDate);
      const formattedDateString = date.toLocaleDateString("en-GB");

      console.log("draft_dc_inv_details", response.data.draft_dc_inv_details);
      console.log("updatedRVNo", response.data.updatedRVNo);
      console.log("updatedRvStatus", response.data.updatedRvStatus);
      console.log(
        "draft_dc_inv_register",
        response.data.draft_dc_inv_register[0].DCStatus
      );

      // console.log("countUpdate", response.data.countUpdate[0].UpdatedCount);

      updateFormData((prevData) => ({
        ...prevData,
        tableData: response.data.draft_dc_inv_details,
        rvNo: response.data.updatedRVNo,
        rvDate: formattedDateString,
        dcStatus: response.data.draft_dc_inv_register[0].DCStatus,
        RVStatus: response.data.updatedRvStatus,
      }));

      const receiveTableData = await Axios.post(apipoints.receiveTable, {
        rvId: formData.rvId,
        Ref_VrId: formData.dcInvNo,
      });

      console.log("receiveTableData", receiveTableData.data);

      updateFormData((prevData) => ({
        ...prevData,
        receiveTable: receiveTableData.data,
      }));

      setAccept(false);
      setPrint(true);
    } catch (error) {
      console.error(
        "An error occurred during the update:",
        error.message || error
      );
    }
  };

  const handleCancel = async () => {
    try {
      const response = await Axios.post(apipoints.cancel, {
        rvId: formData.rvId,
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
        rvNo: response.data.updatedRVNo,
        CancelReason: response.data.CancelReason,
        rvDate: formattedDateString,
        dcStatus: response.data.draft_dc_inv_register[0].DCStatus,
        RVStatus: response.data.updateRvStatus,
      }));

      const receiveTableData = await Axios.post(apipoints.receiveTable, {
        rvId: formData.rvId,
        Ref_VrId: formData.dcInvNo,
      });

      updateFormData((prevData) => ({
        ...prevData,
        receiveTable: receiveTableData.data,
        // RVStatus: receiveTableData.data[0].RVStatus,
      }));
      toast.success("Receipt Voucher Cancelled");

      setAccept(false);
      setCancel(false);
      // setPrint(true);
    } catch (error) {
      console.error(
        "An error occurred during the update:",
        error.message || error
      );
    }
  };

  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault();

  return (
    <Modal show={showJobWorkModal} onHide={closeJobWorkModal} fullscreen>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Title className="title">
        Job Work Goods Receipt Voucher
      </Modal.Title>
      <Modal.Body>
        <div className="row">
          <div className="col-md-3 col-sm-12">
            <label className="form-label">Voucher No</label>
            <input type="text" disabled value={formData.rvNo} />
          </div>
          <div className="col-md-2 col-sm-12">
            <label className="form-label "></label>
            <input
              type="text"
              className="mt-2"
              disabled
              value={formData.rvDate}
            />
          </div>
          <div className="col-md-2 col-sm-12">
            <label className="form-label mt-2"></label>
            <input
              type="text"
              disabled
              className="mt-2"
              value={formData.RVStatus}
            />
          </div>
          <div className="col-md-3 col-sm-12">
            <label className="form-label">Weight</label>
            <input
              type="text"
              disabled
              value={parseInt(formData.rvTotalWeight)}
            />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-4 col-sm-12">
            <label className="form-label">Receive From</label>
            <input type="text" disabled value={formData.rvCustomer} />
          </div>
          <div className="col-md-3 col-sm-12">
            <label className="form-label"></label>
            <input
              type="text"
              disabled
              className="mt-2"
              value={formData.rvCustCode}
            />
          </div>
          <div className="col-md-2 col-sm-12 mt-3">
            <button
              className={
                formData.RVStatus === "Updated" ||
                formData.RVStatus === "Cancelled"
                  ? "button-style button-disabled"
                  : "button-style"
              }
              disabled={
                formData.RVStatus === "Updated" ||
                formData.RVStatus === "Cancelled"
              }
              onClick={handleSave}
            >
              Save
            </button>
          </div>
          <div className="col-md-3 col-sm-12 mt-3">
            <button
              className={
                formData.RVStatus === "Received" ||
                formData.RVStatus === "Cancelled"
                  ? // maxAllowedQty === 0
                    "button-style button-disabled"
                  : "button-style"
              }
              onClick={cancelModal}
              disabled={
                formData.RVStatus === "Received" ||
                // maxAllowedQty === 0 ||
                formData.RVStatus === "Cancelled"
              }
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-4 col-sm-12">
            <label className="form-label">DC Reference</label>
            <input type="text" disabled value={formData.Ref_VrNo} />
          </div>
          <div className="col-md-3 col-sm-12">
            <label className="form-label">GST No</label>
            <input type="text" disabled value={formData.CustGSTNo} />
          </div>
          <div className="col-md-2 col-sm-12 mt-3">
            <button
              className={
                formData.RVStatus === "Updated" ||
                formData.RVStatus === "Cancelled"
                  ? "button-style button-disabled"
                  : "button-style"
              }
              disabled={
                formData.RVStatus === "Updated" ||
                formData.RVStatus === "Cancelled"
              }
              // onClick={acceptModal}
              onClick={() => {
                getRVNo();
                acceptModal();
              }}
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
              value={formData.CustDocuNo}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-3 col-sm-12">
            <label className="form-label">E Way Bill No</label>
            <input
              type="text"
              name="ewayBillNo"
              value={formData.ewayBillNo}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4 col-sm-12">
            <label className="form-label">Reason</label>

            <input
              type="text"
              name="CancelReason"
              value={formData.CancelReason}
              onChange={handleInputChange}
              disabled={
                formData.RVStatus === "Cancelled" ||
                formData.RVStatus === "Received"
              }
            />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-7 col-sm-12">
            <div>
              <button
                className={
                  formData.RVStatus === "Updated" ||
                  formData.RVStatus === "Cancelled"
                    ? "button-style button-disabled"
                    : "button-style"
                }
                disabled={
                  formData.RVStatus === "Updated" ||
                  formData.RVStatus === "Cancelled"
                }
                onClick={remove}
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
                          id={`checkbox_${index}`}
                          onChange={(e) =>
                            handleCheckboxChangeFirstTable(e, row)
                          }
                          checked={formData.firstTableArray.includes(row)}
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
                          onKeyDown={blockInvalidChar}
                          disabled={isReceivedDisabled}
                          style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "transparent",
                            border: "none",
                          }}
                          onChange={(e) =>
                            handleEditChange(e, "Qty_Received", index)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="Qty_Inspected"
                          value={parseInt(row.Qty_Inspected)}
                          onKeyDown={blockInvalidChar}
                          disabled={
                            formData.RVStatus === "Updated" ||
                            formData.RVStatus === "Cancelled" ||
                            isInspectedEnabled
                          }
                          style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "transparent",
                            border: "none",
                          }}
                          onChange={(e) =>
                            handleEditChange(e, "Qty_Inspected", index)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="Qty_Accepted"
                          value={parseInt(row.Qty_Accepted)}
                          onKeyDown={blockInvalidChar}
                          disabled={
                            formData.RVStatus === "Updated" ||
                            formData.RVStatus === "Cancelled" ||
                            isAcceptedEnabled
                          }
                          style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "transparent",
                            border: "none",
                          }}
                          onChange={(e) =>
                            handleEditChange(e, "Qty_Accepted", index)
                          }
                        />
                      </td>
                      <td>{parseInt(row.Qty_Rejected)}</td>
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
                  formData.RVStatus === "Cancelled"
                    ? "button-style button-disabled"
                    : "button-style"
                }
                disabled={
                  formData.RVStatus === "Updated" ||
                  formData.RVStatus === "Cancelled"
                }
                onClick={handleAddButtonClick}
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
                  {formData.secondTable?.map((row, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="checkbox"
                          className="mt-1"
                          id={`checkbox_${index}`}
                          onChange={(e) =>
                            handleCheckboxChangeSecondTable(e, row)
                          }
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

      {accept && (
        <Modal show={accept} onHide={acceptModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Magod ReturnableDC</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you accepting the good returned and accepted/rejected?
          </Modal.Body>
          <Modal.Footer>
            <button
              className="button-style"
              style={{ width: "50px" }}
              onClick={handleAccept}
            >
              Yes
            </button>

            <button
              className="button-style"
              style={{ width: "50px", backgroundColor: "rgb(173, 173, 173)" }}
              onClick={acceptModalClose}
            >
              No
            </button>
          </Modal.Footer>
        </Modal>
      )}

      {cancel && (
        <Modal show={cancel} onHide={cancelModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Magod ReturnableDC</Modal.Title>
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

      {print && (
        <Modal show={print} onHide={printModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Magod ReturnableDC</Modal.Title>
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
    </Modal>
  );
}

export default CreateNewJobWork;

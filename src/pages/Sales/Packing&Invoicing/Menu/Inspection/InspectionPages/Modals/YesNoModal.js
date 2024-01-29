import React, { useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import Axios from "axios";
import { apipoints } from "../../../../../../api/PackInv_API/Inspection/InspProfi";
export default function YesNoModal(props) {
  const {
    setSmShow,
    onOkButtonClick,
    onHide,
    actionType,
    orderScheduleDetailsData,
    setOrderScheduleDetailsData,
    selectedScheduleDetailsRows,
    setSelectedScheduleDetailsRows,
  } = props;

  const handleOkClick = () => {
    if (actionType === "clear") {
      // Create a copy of the current state to work with
      const updatedPartListData = [...orderScheduleDetailsData];
      console.log("updatedPartListData", updatedPartListData);
      // Loop through the rows and clear QtyCleared for selected rows

      updatedPartListData.forEach((row) => {
        console.log("row.SchDetailsID", row.SchDetailsID);
        console.log("selectedScheduleDetailsRows", selectedScheduleDetailsRows);

        // Check if any object in selectedScheduleDetailsRows has the same SchDetailsID
        if (
          selectedScheduleDetailsRows?.some(
            (item) => item.SchDetailsID === row.SchDetailsID
          )
        ) {
          console.log("yes");
          row.QtyCleared = row.QtyProduced - row.QtyRejected;
          // row.PackNow = row.QtyCleared - row.
          console.log("row.QtyCleared", row.QtyCleared);
        } else {
          console.log("no");
        }
      });
      // Perform the Axios POST request to update the data
      Axios.post(apipoints.updateSchDetails, updatedPartListData)
        .then((res) => {
          //console.log("schdetailsdata", res.data);

          // Calculate the total quantity cleared for selected rows
          const totalQtyCleared = updatedPartListData.reduce((total, row) => {
            if (selectedScheduleDetailsRows?.includes(row.SchDetailsID)) {
              return total + row.QtyCleared;
            }
            return total;
          }, 0);

          // Display a toast based on the totalQtyCleared value

          // if (totalQtyCleared > 0) {
          //   toast.success(`Parts Cleared and Saved Successfully`);
          //   // setSelectedScheduleDetailsRows([]);
          // } else {
          //   toast.success(`Parts Reset and Saved Successfully`);
          // }
          // toast.success(`Parts Reset and Saved Successfully`);
          // Update the state with the modified data
          toast.success(`Parts cleared and Saved Successfully`);
          setOrderScheduleDetailsData(updatedPartListData);
          setSelectedScheduleDetailsRows([]);
        })
        .catch((error) => {
          //console.error("Error:", error);
          toast.error("An error occurred while saving data.");
        });
    } else if (actionType === "reset") {
      const updatedPartListData = [...orderScheduleDetailsData];
      // Loop through the rows and reset QtyCleared for selected rows
      updatedPartListData.forEach((row) => {
        if (
          selectedScheduleDetailsRows?.some(
            (item) => item.SchDetailsID === row.SchDetailsID
          )
        ) {
          row.QtyCleared = 0; // Reset QtyCleared to 0
        }
      });
      // Perform the Axios POST request to update the data
      Axios.post(apipoints.updateSchDetails, updatedPartListData)
        .then((res) => {
          // Calculate the total quantity cleared for selected rows
          const totalQtyCleared = updatedPartListData.reduce((total, row) => {
            if (selectedScheduleDetailsRows?.includes(row.SchDetailsID)) {
              return total + row.QtyCleared;
            }
            return total;
          }, 0);

          // // Display a toast based on the totalQtyCleared value
          // if (totalQtyCleared > 0) {
          //   toast.success(`Parts Cleared and Saved Successfully`);
          // } else {
          //   toast.success(`Parts Reset and Saved Successfully`);
          // }
          toast.success(`Parts Reset and Saved Successfully`);
          // Update the state with the modified data
          setOrderScheduleDetailsData(updatedPartListData);
          setSelectedScheduleDetailsRows([]);
        })
        .catch((error) => {
          toast.error("An error occurred while saving data.");
        });
    }

    // else if (actionType === "reject") {
    //   console.log("entering into the HandleRejectionReportClick...1");
    //   const currentYear = new Date().getFullYear();
    //   const nextYear = currentYear + 1;
    //   const financialYear = `${currentYear.toString().slice(-2)}/${nextYear
    //     .toString()
    //     .slice(-2)}`;

    //   let lastRejReportNo = rejFormData[0]?.Rej_ReportNo;
    //   let numericPart = lastRejReportNo?.match(/\d+$/);
    //   let nextSerialNumber = parseInt(numericPart[0]) + 1;
    //   let newRejReportNo = `${financialYear}/ IR / ${nextSerialNumber
    //     .toString()
    //     .padStart(4, "0")}`;
    //   setReportNo(newRejReportNo);

    //   let lastRej_Id = rejFormData[0].Rej_Id;
    //   let nextRej_Id = lastRej_Id + 1;
    //   setNewRejId(nextRej_Id);
    //   setRejFormData((prevState) => [
    //     {
    //       ...prevState[0],
    //       Rej_ReportNo: newRejReportNo,
    //       Rej_Id: nextRej_Id,
    //     },
    //   ]);
    //   console.log("entering into the HandleRejectionReportClick...2");

    //   try {
    //     Axios.post(apipoints.submitRejectionReport, {
    //       selectedScheduleDetailsRows,
    //       ScheduleId: selectedScheduleDetailsRows[0]?.ScheduleId,
    //       Cust_Code: selectedScheduleDetailsRows[0]?.Cust_Code,
    //       Cust_Name: props.headerData[0]?.Cust_name,
    //       Rejection_Ref: props.headerData[0]?.OrdSchNo,
    //       reportNo: newRejReportNo,
    //       Status: irstatus,
    //       RaisedBy: raisedBy,
    //       acceptedValue: acceptedValue,
    //       rejectedValue: rejectedValue,
    //       Rej_Id: nextRej_Id,
    //       QtyRejected: qtyReject,
    //       RejectedReason: rejectReason,
    //     }).then((res) => {
    //       console.log("res from submitRejectionReport..", res.data);
    //       props.getOrderScheduleData();
    //       console.log("getOrderScheduleData is exicuted");
    //       setLgShow(false);
    //       toast.success(
    //         `Dwg Rejected Successfully, with Rej Report No ${newRejReportNo}`
    //       );
    //     });
    //   } catch (error) {}
    // }
    onOkButtonClick(); // Call the specified function
    onHide(); // Close the modal
  };
  return (
    <div>
      {" "}
      <Modal
        {...props}
        size="sm"
        // show={smShow}
        // onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            ScheduleDetails
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Part Data Updated</Modal.Body>
        <Modal.Footer>
          <button
            className="button-style "
            style={{ width: "75px" }}
            onClick={handleOkClick}
          >
            OK
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

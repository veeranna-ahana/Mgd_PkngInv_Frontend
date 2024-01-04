import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { apipoints } from "../../../../../../api/PackInv_API/Inspection/InspProfi";
import { toast } from "react-toastify";
import InternalRejectionForm from "../../Menus/Profile/Components/InternalRejectionForm";
import InternalRejectionModal from "../Modals/InternalRejectionModal";
function ScheduleDetails(props) {
  const nav = useNavigate();
  const [modalShow, setModalShow] = React.useState(false);
  const {
    schdetails,
    setSchdetails,
    selectedRows,
    setSelectedRows,
    updateSchdetails,
    handleCheckboxChange,
    scheduleId,
    isChecked,
    selectedRowData,
    setSelectedRowData,
    tbldata,
  } = props;
  const [draftQtyOK, setDraftQtyOK] = useState(true);
  const [pckNowValue, setPckNowValue] = useState(0);
  const [rejFormData, setRejFormData] = useState([]);
  const [newRejId, setNewRejId] = useState(null);
  const [reportNo, setReportNo] = useState("Draft"); // Initial serial value

  const [rejectedValue, setRejectedValue] = useState("");

  const [acceptedValue, setAcceptedValue] = useState("");
  // const [irstatus, setIrtatus] = useState("Created"); // Initial serial value

  const [rejectionformData, setRejectionformData] = useState({
    RaisedBy: "Sales",
    Rej_Status: "Created",
    Internal: 0,
    OrderScheduleNo: "",
    Cust_Code: "",
    Cust_Name: "",
    ScheduleId: "",
    RejctionValue: "",
    AcceptedValue: "",
  });

  // console.log("custname", tbldata);
  // console.log("custname", tbldata.custname);
  // console.log("custname", tbldata.selectRow.ScheduleId);
  // console.log("custname", tbldata.selectRow.OrdSchNo);

  // setRejectionformData((prevFormData) => ({
  //   ...prevFormData,
  //   Cust_Name: tbldata.custname,
  //   ScheduleId: tbldata.selectRow.ScheduleId,
  //   Cust_Code: tbldata.selectRow.Cust_Code,
  //   OrderScheduleNo: tbldata.selectRow.OrdSchNo,
  // }));

  // console.log("formdata........123", formData);
  // console.log("custname", tbldata.selectcustname);
  // console.log("custname", tbldata.custname);
  // console.log("custname", tbldata.custname);
  // for (let i = 0; i < selectedRowData.length; i++) {
  //   const element = selectedRowData[i];
  //   console.log("selectedRowData1", element.Cust_Code);
  //   console.log("selectedRowData2", element.DwgName);
  //   console.log("selectedRowData3", element.OrderScheduleNo);
  //   console.log("selectedRowData4", element.ScheduleId);

  //   // Set formData.Cust_Code to the value of element.Cust_Code
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     Cust_Code: element.Cust_Code,
  //     ScheduleId: element.ScheduleId,
  //   }));
  // }

  const resetInDraftParts = ({
    orders,
    draftDCInvDetails,
    draftDCInvRegister,
    dgvReadyForPkng,
  }) => {
    // useEffect(() => {
    const draftParts = draftDCInvDetails
      .filter((detail) => detail.DCStatus === "Draft")
      .map((detail) => ({
        OrderSchDetailsID: detail.OrderSchDetailsID,
        Qty: detail.Qty,
      }))
      .reduce((acc, detail) => {
        acc[detail.OrderSchDetailsID] =
          (acc[detail.OrderSchDetailsID] || 0) + detail.Qty;
        return acc;
      }, {});

    orders.forEach((schPart) => {
      schPart.InDraftPN = 0;
    });

    Object.keys(draftParts).forEach((orderSchDetailsID) => {
      const orderSchDetail = orders.find(
        (schPart) => schPart.SchDetailsID === orderSchDetailsID
      );
      if (orderSchDetail) {
        orderSchDetail.InDraftPN = draftParts[orderSchDetailsID];
      }
    });

    orders.forEach((schPart) => {
      schPart.PackNow =
        schPart.QtyCleared - schPart.QtyPacked - schPart.InDraftPN;
      setPckNowValue(schPart.PackNow);
      if (schPart.PackNow < 0) {
        setDraftQtyOK(false);
      }
    });

    dgvReadyForPkng.forEach((dr) => {
      if (parseInt(dr.PackNow1, 10) < 0) {
        // Apply styling logic for negative PackNow value
        dr.BackColor = "Orange";
        alert(`${dr.DwgNo1} : Pack Quantity Greater Than Cleared Qty`);
      } else if (parseInt(dr.PackNow1, 10) === 0) {
        // Apply styling logic for PackNow value equals to 0
        dr.BackColor = "LawnGreen";
      } else {
        // Apply styling logic for positive PackNow value
        dr.BackColor = "LightGreen";
        // Uncomment the line below if you want to show an alert for positive PackNow value
        // alert(`${dr.DwgNo1} : Pack Quantity Less Than Cleared Qty`);
      }
    });

    // Assuming orders and dgvReadyForPkng are state variables in your component
    // Update the state to trigger a re-render if needed
    // setOrders([...orders]);
    // setDgvReadyForPkng([...dgvReadyForPkng]);
    // }, [orders, draftDCInvDetails, dgvReadyForPkng]);

    return draftQtyOK;
  };

  //CLEAR AND SAVE
  const clearAndSave = () => {
    // Check if any row is selected
    if (selectedRows.length === 0) {
      toast.warning(`Please select the rows`);
      return;
    }

    // Create a copy of the current state to work with
    const updatedPartListData = [...schdetails];

    // Loop through the rows and clear QtyCleared for selected rows
    updatedPartListData.forEach((row) => {
      console.log("row", row);
      if (selectedRows.includes(row.SchDetailsID)) {
        // Clear by setting to QtyProduced - QtyRejected;
        row.QtyCleared = row.QtyProduced - row.QtyRejected;
        // row.PackNow = row.QtyCleared - row.

        if (row.QtyCleared >= row.QtyProduced) {
          toast.error("You cannot clear more quqntity than produced");
        }
      }
    });

    // Perform the Axios POST request to update the data
    Axios.post(apipoints.updateSchDetails, updatedPartListData)
      .then((res) => {
        //console.log("schdetailsdata", res.data);

        // Calculate the total quantity cleared for selected rows
        const totalQtyCleared = updatedPartListData.reduce((total, row) => {
          if (selectedRows.includes(row.SchDetailsID)) {
            return total + row.QtyCleared;
          }
          return total;
        }, 0);

        // Display a toast based on the totalQtyCleared value
        if (totalQtyCleared > 0) {
          toast.success(`Parts Cleared and Saved Successfully`);
          setSelectedRows([]);
          // resetInDraftParts();
        } else {
          toast.success(`Parts Reset and Saved Successfully`);
          setSelectedRows([]);
        }

        // Update the state with the modified data
        setSchdetails(updatedPartListData);
      })
      .catch((error) => {
        //console.error("Error:", error);
        toast.error("An error occurred while saving data.");
      });
    // Clear the selected rows
    setSelectedRows([]);
  };

  //RESET AND SAVE
  const resetAndSave = () => {
    // Check if any row is selected
    if (selectedRows.length === 0) {
      toast.warning(`Please select the rows.`);
      return;
    }
    const updatedPartListData = [...schdetails];
    // Loop through the rows and reset QtyCleared for selected rows
    updatedPartListData.forEach((row) => {
      if (selectedRows.includes(row.SchDetailsID)) {
        row.QtyCleared = 0; // Reset QtyCleared to 0
      }
    });
    // Perform the Axios POST request to update the data
    Axios.post(apipoints.updateSchDetails, updatedPartListData)
      .then((res) => {
        //console.log("schdetailsdata", res.data);

        // Calculate the total quantity cleared for selected rows
        const totalQtyCleared = updatedPartListData.reduce((total, row) => {
          if (selectedRows.includes(row.SchDetailsID)) {
            return total + row.QtyCleared;
          }
          return total;
        }, 0);

        // Display a toast based on the totalQtyCleared value
        if (totalQtyCleared > 0) {
          toast.success(`Parts Cleared and Saved Successfully`);
        } else {
          toast.success(`Parts Reset and Saved Successfully`);
          setSelectedRows([]);
          // resetInDraftParts();
        }
        // Update the state with the modified data
        setSchdetails(updatedPartListData);
      })
      .catch((error) => {
        toast.error("An error occurred while saving data.");
      });
  };

  // REJECT PARTS
  const rejectParts = () => {
    console.log("selectedRowData", selectedRowData);
    try {
      // Check if any row is selected
      if (selectedRowData.length === 0) {
        toast.warning(`Please select the rows.`);
        return;
      }

      // for (let i = 0; i < selectedRowData.length; i++) {
      //   const element = selectedRowData[i];

      // }

      if (selectedRowData.length > 0) {
        setModalShow(true);
        // Assuming your backend API endpoint for fetching data is '/api/getRejectionData'

        Axios.post(apipoints.RejectionReport, {})
          .then((res) => {
            // console.log("Response from RejectionReport....:", res.data);
            setRejFormData(res.data);
          })

          .catch((error) => {
            //console.error("Error:", error);
            toast.error("An error occurred while saving data.");
          });

        // console.log("rejFormData", rejFormData[0]?.Rej_ReportNo);

        // setRejFormData((prevRejFormData) => {
        //   // Create a shallow copy of the array and update the property
        //   const updatedRejFormData = [...prevRejFormData];
        //   updatedRejFormData[0].Rej_ReportNo = reportNo;

        //   return updatedRejFormData;
        // });

        // console.log("Updated rejFormData", rejFormData[0]?.Rej_ReportNo);
        // console.log("rejFormData....", rejFormData);

        // Assuming the response contains rejectionsList and internalRejectionPartsList
        // const { rejectionsList, internalRejectionPartsList } = response.data;
      }

      // Update state or perform other actions with the data
      // ...

      // Clear the selected rows
      // setSelectedRows([]);

      // Refetch data or update state as needed
      // ...
    } catch (error) {
      console.error("Error raising rejection:", error);
    }
  };

  const handleModalClose = () => {
    setModalShow(false);
    setNewRejId(null);
    setReportNo("Draft");
    setRejectedValue("");
    setAcceptedValue("");
  };

  return (
    <>
      <div className="row justify-left-center m-2">
        <button
          className="button-style "
          onClick={clearAndSave}
          style={{ width: "150px", marginLeft: "4px" }}
        >
          Clear Parts
        </button>

        <button
          className="button-style "
          style={{ width: "140px", marginLeft: "4px" }}
          onClick={resetAndSave}
        >
          Reset Parts
        </button>

        <button
          className="button-style "
          onClick={rejectParts}
          // onClick={() => setModalShow(true)}
          style={{ width: "120px", marginLeft: "4px" }}
        >
          Reject Parts
        </button>

        <InternalRejectionModal
          show={modalShow}
          selectedRowData={selectedRowData}
          setSelectedRowData={setSelectedRowData}
          rejFormData={rejFormData}
          newRejId={newRejId}
          setNewRejId={setNewRejId}
          setRejFormData={setRejFormData}
          reportNo={reportNo}
          setReportNo={setReportNo}
          rejectedValue={rejectedValue}
          setRejectedValue={setRejectedValue}
          acceptedValue={acceptedValue}
          setAcceptedValue={setAcceptedValue}
          tbldata={tbldata}
          onHide={() => handleModalClose()}
        />
      </div>
      <div style={{ height: "400px", overflowY: "scroll" }}>
        <Table striped className="table-data border">
          <thead
            className="tableHeaderBGColor "
            style={{ whiteSpace: "nowrap", textAlign: "center" }}
          >
            <tr>
              <th>Select</th>
              <th>Dwg Name</th>
              <th>Material</th>
              <th>Source</th>
              <th>Process</th>
              <th>Scheduled</th>
              <th>Produced</th>
              <th>Cleared</th>
              <th>Rejected</th>
              <th>Packed</th>
              <th>Deliverd</th>
              <th>In DraftN</th>
              <th>Pack Now</th>
              <th>JW Cost</th>
              <th>Mtrl Cost</th>
            </tr>
          </thead>
          <tbody
            className="tablebody"
            style={{ whiteSpace: "nowrap", textAlign: "center" }}
          >
            {schdetails && schdetails.length > 0
              ? schdetails.map((val, i) => (
                  <tr key={i}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(val.SchDetailsID)} // Change 'i' to 'val.SchDetailsID'
                        onChange={() => handleCheckboxChange(val.SchDetailsID)} // Change 'i' to 'val.SchDetailsID'
                      />
                    </td>
                    <td>{val.DwgName}</td>
                    <td>{val.Material}</td>
                    <td></td>
                    <td>{val.MProcess}</td>
                    <td>{val.QtyScheduled}</td>
                    <td>{val.QtyProduced}</td>
                    <td>{val.QtyCleared}</td>
                    <td>{val.QtyRejected}</td>
                    <td>{val.QtyPacked}</td>
                    <td>{val.QtyDelivered}</td>
                    <td>{val.InDraftPn}</td>
                    <td>{pckNowValue}</td>
                    <td>{val.JWCost}</td>
                    <td>{val.MtrlCost}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default ScheduleDetails;

{
  /* {schdetails && schdetails.length > 0
            ? schdetails.map((val, i) => (
                <tr key={i}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(val.SchDetailsID)} // Change 'i' to 'val.SchDetailsID'
                      onChange={() => handleCheckboxChange(val.SchDetailsID)} // Change 'i' to 'val.SchDetailsID'
                    />
                  </td>
                  <td>{val.DwgName}</td>
                  <td>{val.Material}</td>
                  <td></td>
                  <td>{val.MProcess}</td>
                  <td>{val.QtyScheduled}</td>
                  <td>{val.QtyProduced}</td>
                  <td>{val.QtyCleared}</td>
                  <td>{val.QtyRejected}</td>
                  <td>{val.QtyPacked}</td>
                  <td>{val.QtyDelivered}</td>
                  <td>{val.InDraftPn}</td>
                  <td>{pckNowValue}</td>
                  <td>{val.JWCost}</td>
                  <td>{val.MtrlCost}</td>
                </tr>
              ))
            : null} */
}

// ----------------------------------------------------------------------------------------------------------------

import React, { useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import Axios from "axios";
import { apipoints } from "../../../../../../api/PackInv_API/Inspection/InspProfi";

// export default function InternalRejectionModal(props) {
const {
  orderScheduleDetailsData,
  setOrderScheduleDetailsData,
  selectedScheduleDetailsRows,
  setSelectedScheduleDetailsRows,
  newRejId,
  setNewRejId,
  tbldata,
  rejFormData,
  setRejFormData,

  reportNo,
  setReportNo,
  rejectedValue,
  setRejectedValue,
  acceptedValue,
  setAcceptedValue,
  onHide,
} = props;

const [serialId, setSerialId] = useState(1);
const [irstatus, setIrtatus] = useState("Created");
const [raisedBy, setRaisedBy] = useState("Sales");
const [isButtonDisabled, setButtonDisabled] = useState(false);
const [rejectReason, setRejectReason] = useState([
  "Enter Reason For Rejecting Parts",
]);
const [qtyReject, setQtyReject] = useState(() => {
  // Your logic or loop to calculate the initial value
  const initialValues = selectedScheduleDetailsRows.map(
    (val) => val.QtyProduced - val.QtyCleared
  );

  return initialValues;
});

const HandleRejectionReportClick = () => {
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  const financialYear = `${currentYear.toString().slice(-2)}/${nextYear
    .toString()
    .slice(-2)}`;
  console.log("financialYear", financialYear);

  let lastRejReportNo = rejFormData[0]?.Rej_ReportNo;
  let numericPart = lastRejReportNo.match(/\d+$/);
  let nextSerialNumber = parseInt(numericPart[0]) + 1;
  let newRejReportNo = `${financialYear}/ IR / ${nextSerialNumber
    .toString()
    .padStart(4, "0")}`;
  console.log("newRejReportNo.........", newRejReportNo);
  setReportNo(newRejReportNo);

  let lastRej_Id = rejFormData[0].Rej_Id;
  let nextRej_Id = lastRej_Id + 1;
  setNewRejId(nextRej_Id);
  setRejFormData((prevState) => [
    {
      ...prevState[0],
      Rej_ReportNo: newRejReportNo,
      Rej_Id: nextRej_Id,
    },
  ]);

  console.log("setRejFormData..............", rejFormData.Rej_Id);

  Axios.post(apipoints.submitRejectionReport, {
    selectedScheduleDetailsRows,
    // tbldata,
    // rejFormData,
    Cust_Name: tbldata.custname,
    Rejection_Ref: tbldata.selectRow.OrdSchNo,
    reportNo: newRejReportNo,
    Status: irstatus,
    RaisedBy: raisedBy,
    acceptedValue: acceptedValue,
    rejectedValue: rejectedValue,
    Rej_Id: nextRej_Id,
    QtyRejected: qtyReject,
    RejectedReason: rejectReason,
  })
    .then((res) => {
      console.log("Response from raiseRejection....:", res.data);
      setButtonDisabled(true);
    })
    .catch((error) => {
      toast.error("An error occurred while saving data.");
    });
};

const handleIRInputChange = (e, setValue, type) => {
  let value = e.target.value;

  // Remove leading zeros
  value = value.replace(/^0+/, "");

  // Remove non-numeric characters
  value = value.replace(/[^0-9.]/g, "");

  // Check if the value is a positive number
  if (value === "" || parseFloat(value) < 0) {
    setValue("");
  } else {
    setValue(value);
  }

  if (type === "accepted") {
    setAcceptedValue((prevAcceptedValues) => {
      const updatedValues = [...prevAcceptedValues];
      updatedValues = value;
      return updatedValues;
    });
  } else if (type === "rejected") {
    setRejectedValue((prevRejectedValues) => {
      const updatedValues = [...prevRejectedValues];
      updatedValues = value;
      return updatedValues;
    });
  }
};

const handleInputChange = (e, i) => {
  const { name, value } = e.target;
  setRejectReason(e.target.value);
  const updatedQtyReject = [...qtyReject];
  updatedQtyReject[i] = e.target.value;
  setQtyReject(updatedQtyReject);
};

return (
  <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Rejection Form Internal
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div>
        <div className="row ">
          <div className="col-md-6 form-bg">
            <div style={{ marginBottom: "9px" }}>
              <label className="form-label">Customer</label>
              <input
                className=""
                // value={`${tbldata.custname}(${tbldata.selectRow.Cust_Code})`}
              />
            </div>
          </div>
          <div className="col-md-3 form-bg">
            <label className="form-label">Rejection Ref</label>
            <input
              type="text"
              // value={tbldata.selectedScheduleDetailsRows?.OrdSchNo}
            />
          </div>
          <div className="col-md-3 form-bg">
            <label className="form-label">Report No</label>
            <input type="text" value={reportNo} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-3 form-bg">
            <div style={{ marginBottom: "9px" }}>
              <label className="form-label">Status</label>
              <input className="" value={irstatus} />
            </div>
          </div>
          <div className="col-md-3 form-bg">
            <div style={{ marginBottom: "9px" }}>
              <label className="form-label">Raised By</label>
              <input className="" value={raisedBy} />
            </div>
          </div>
          <div className="col-md-3 form-bg">
            <label className="form-label">Rejected Value</label>
            <input
              type="text"
              value={rejectedValue}
              onChange={(e) => handleIRInputChange(e, setRejectedValue)}
            />
          </div>

          <div className="col-md-3 form-bg">
            <label className="form-label">Accepted Value</label>
            <input
              type="text"
              value={acceptedValue}
              onChange={(e) => handleIRInputChange(e, setAcceptedValue)}
            />
          </div>
        </div>

        <div className="row justify-content-end mt-3">
          <button
            className="button-style "
            style={{ width: "230px" }}
            onClick={HandleRejectionReportClick}
            //  disabled={isButtonDisabled}
          >
            Clear Rejection Report
          </button>
        </div>
      </div>

      <div style={{ height: "220px", overflowY: "scroll" }}>
        <Table striped className="table-data border mt-3">
          <thead
            className="tableHeaderBGColor "
            style={{ whiteSpace: "nowrap", textAlign: "center" }}
          >
            <tr>
              <th>Id</th>
              <th>Rej_Id</th>
              <th>Dwg_Name</th>
              <th>Qty_Rejected</th>
              <th>Rejection_Reason</th>
            </tr>
          </thead>
          <tbody
            className="tablebody"
            style={{ whiteSpace: "nowrap", textAlign: "center" }}
          >
            {"selectedRowData" && selectedScheduleDetailsRows.length > 0
              ? selectedScheduleDetailsRows.map((val, i) => (
                  <tr key={i}>
                    <td>{serialId + i}</td>
                    <td>{newRejId !== null ? newRejId : 1}</td>
                    <td>{selectedScheduleDetailsRows[i].DwgName}</td>
                    <td>
                      <input
                        type="number"
                        defaultValue={val.QtyProduced - val.QtyCleared}
                        style={{ border: "none", textAlign: "center" }}
                        onChange={(handleInputChange, i)}
                      />
                    </td>

                    <td>
                      <input
                        // placeholder="Enter Reason For Rejecting Parts"
                        style={{ border: "none", textAlign: "center" }}
                        defaultValue={rejectReason}
                        onChange={(handleInputChange, i)}
                      />
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
      </div>
    </Modal.Body>
    <Modal.Footer>
      {/* <Button onClick={props.onHide}>Close</Button> */}
    </Modal.Footer>
  </Modal>
);
// }

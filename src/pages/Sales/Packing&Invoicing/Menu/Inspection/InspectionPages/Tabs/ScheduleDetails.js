import { React, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Axios from "axios";
import { toast } from "react-toastify";
import { apipoints } from "../../../../../../api/PackInv_API/Inspection/InspProfi";
import YesNoModal from "../Modals/YesNoModal";
import InternalRejectionModal from "../Modals/InternalRejectionModal";
export default function ScheduleDetails(props) {
  const [VeryNewRejData, setVeryNewRejData] = useState([]);

  const {
    getOrderScheduleData,
    orderScheduleDetailsData,
    setOrderScheduleDetailsData,
    selectedScheduleDetailsRows,
    setSelectedScheduleDetailsRows,
    headerData,
  } = props;

  //console.log("selectedScheduleDetailsRows", selectedScheduleDetailsRows);
  const [smShow, setSmShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [rejFormData, setRejFormData] = useState([]);
  const [newRejId, setNewRejId] = useState(null);
  const [reportNo, setReportNo] = useState("Draft");
  const [rejectedValue, setRejectedValue] = useState(0);
  const [acceptedValue, setAcceptedValue] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);

  let initialValuess = selectedScheduleDetailsRows.map(
    (val) => val.QtyProduced - val.QtyCleared - val.QtyRejected
  );

  const [qtyRejectt, setQtyRejectt] = useState(initialValuess);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };
  const clearAndSave = () => {
    // Check if any row is selected
    if (selectedScheduleDetailsRows.length === 0) {
      toast.warning(`Please select the row.`);
      return;
    }
    // if (selectedScheduleDetailsRows.QtyDelivered != 0) {
    //   toast.warning(`Dwg was Delivered, Please choose another`);
    //   return;
    // }
    for (const row of selectedScheduleDetailsRows) {
      if (row.QtyProduced === row.QtyRejected || row.QtyDelivered != 0) {
        toast.warning(
          `Please select the rows or ensure Cleared is less than Produced`
        );
        return;
      }
    }

    setActionType("clear");
    setSmShow(true);
  };
  const resetAndSave = () => {
    // Check if any row is selected
    if (selectedScheduleDetailsRows.length === 0) {
      toast.warning(`Please select the row.`);
      return;
    }
    for (const row of selectedScheduleDetailsRows) {
      if (row.QtyProduced === row.QtyRejected) {
        toast.warning(
          `Please select the rows or ensure Cleared is less than Produced`
        );
        return;
      }
    }

    setActionType("reset");
    setSmShow(true);
  };

  const rejectAndSave = () => {
    try {
      if (
        selectedScheduleDetailsRows.length === 0 ||
        selectedScheduleDetailsRows.some(
          (row) => row.QtyCleared === row.QtyProduced
        )
      ) {
        toast.warning(
          `Please select the rows or ensure Cleared is less than Produced`
        );
        return;
      }
      for (const row of selectedScheduleDetailsRows) {
        if (row.QtyRejected === row.QtyProduced) {
          toast.warning(
            `Please select the rows or ensure Cleared is less than Produced`
          );
          return;
        } else if (row.QtyCleared + row.QtyProduced == row.QtyRejected) {
          toast.warning(
            `Please select the rows or ensure Cleared is less than Produced`
          );
          return;
        }
      }

      if (selectedScheduleDetailsRows.length > 0) {
        setLgShow(true);

        Axios.post(apipoints.RejectionReport, {})
          .then((res) => {
            setRejFormData(res.data);
          })

          .catch((error) => {
            toast.error("An error occurred while saving data.");
          });
      }
    } catch (error) {}
  };

  const handleModalClose = () => {
    setLgShow(false);
    setNewRejId(null);
    setReportNo("Draft");
    setRejectedValue(0);
    setAcceptedValue(0);
  };

  const handleOkButtonClick = () => {
    if (actionType === "clear") {
      clearAndSave();
    } else if (actionType === "reset") {
      resetAndSave();
    } else if (actionType === "reject") {
      resetAndSave();
    }

    setSmShow(false);
    setActionType(null);
  };

  for (let i = 0; i < selectedScheduleDetailsRows.length; i++) {
    const element = selectedScheduleDetailsRows[i];

    console.log(
      "selectedScheduleDetailsRows.QtyDelivered",
      element.QtyDelivered
    );
  }

  // useEffect(() => {
  //   getOrderScheduleData();
  // }, []);

  // useEffect(() => {
  //   if (
  //     orderScheduleDetailsData.length > 0 &&
  //     !selectedScheduleDetailsRows.refName
  //   ) {
  //     selectedRowFn(orderScheduleDetailsData[0], 0); // Select the first row
  //   }
  // }, [orderScheduleDetailsData, selectedScheduleDetailsRows, selectedRowFn]);

  return (
    <>
      <div className="row justify-content-center m-2">
        <button
          className={
            props.selectedScheduleDetailsRows.length === 0 ||
            props.selectedScheduleDetailsRows.some(
              (row) =>
                row.QtyDelivered > 0 ||
                row.QtyPacked > 0 ||
                row.QtyRejected >= row.QtyProduced ||
                row.QtyCleared === row.QtyProduced ||
                row.QtyCleared + row.QtyRejected === row.QtyProduced
            )
              ? "button-style button-disabled"
              : "button-style"
          }
          onClick={clearAndSave}
          style={{ width: "150px", marginLeft: "4px" }}
          disabled={
            props.selectedScheduleDetailsRows.length === 0 ||
            props.selectedScheduleDetailsRows.some(
              (row) =>
                row.QtyDelivered > 0 ||
                row.QtyPacked > 0 ||
                row.QtyRejected >= row.QtyProduced ||
                row.QtyCleared === row.QtyProduced ||
                row.QtyCleared + row.QtyRejected === row.QtyProduced
            )
          }
        >
          Clear All Parts
        </button>
        <button
          className={
            props.selectedScheduleDetailsRows.length === 0 ||
            props.selectedScheduleDetailsRows.some(
              (row) =>
                row.QtyDelivered > 0 ||
                row.QtyPacked > 0 ||
                row.QtyRejected === row.QtyProduced ||
                row.QtyCleared === 0
            )
              ? "button-style button-disabled"
              : "button-style"
          }
          style={{ width: "140px", marginLeft: "4px" }}
          onClick={resetAndSave}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          disabled={
            props.selectedScheduleDetailsRows.length === 0 ||
            props.selectedScheduleDetailsRows.some(
              (row) =>
                row.QtyDelivered > 0 ||
                row.QtyPacked > 0 ||
                row.QtyRejected === row.QtyProduced ||
                row.QtyCleared === 0
            )
          }
        >
          Reset All Parts
        </button>
        <button
          className={
            props.selectedScheduleDetailsRows.length === 0 ||
            props.selectedScheduleDetailsRows.some(
              (row) =>
                row.QtyDelivered > 0 ||
                row.QtyPacked > 0 ||
                row.QtyRejected >= row.QtyProduced ||
                row.QtyCleared === row.QtyProduced ||
                row.QtyCleared + row.QtyRejected === row.QtyProduced
            )
              ? "button-style button-disabled"
              : "button-style"
          }
          onClick={rejectAndSave}
          style={{ width: "120px", marginLeft: "4px" }}
          disabled={
            props.selectedScheduleDetailsRows.length === 0 ||
            props.selectedScheduleDetailsRows.some(
              (row) =>
                row.QtyDelivered > 0 ||
                row.QtyPacked > 0 ||
                row.QtyRejected >= row.QtyProduced ||
                row.QtyCleared === row.QtyProduced ||
                row.QtyCleared + row.QtyRejected === row.QtyProduced
            )
          }
        >
          Reject Parts
        </button>
        <YesNoModal
          show={smShow}
          setSmShow={setSmShow}
          onHide={() => setSmShow(false)}
          actionType={actionType}
          setActionType={setActionType}
          onOkButtonClick={handleOkButtonClick}
          orderScheduleDetailsData={orderScheduleDetailsData}
          setOrderScheduleDetailsData={setOrderScheduleDetailsData}
          selectedScheduleDetailsRows={selectedScheduleDetailsRows}
          setSelectedScheduleDetailsRows={setSelectedScheduleDetailsRows}
        />
        <InternalRejectionModal
          VeryNewRejData={VeryNewRejData}
          setVeryNewRejData={setVeryNewRejData}
          show={lgShow}
          setLgShow={setLgShow}
          selectedScheduleDetailsRows={selectedScheduleDetailsRows}
          setSelectedScheduleDetailsRows={setSelectedScheduleDetailsRows}
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
          orderScheduleDetailsData={orderScheduleDetailsData}
          setOrderScheduleDetailsData={setOrderScheduleDetailsData}
          headerData={headerData}
          getOrderScheduleData={getOrderScheduleData}
          qtyRejectt={qtyRejectt}
          actionType={actionType}
          setActionType={setActionType}
          smShow={smShow}
          setSmShow={setSmShow}
          handleOkButtonClick={handleOkButtonClick}
          // qtyReject={qtyReject}
          // setQtyReject={setQtyReject}
          // rejectReason={rejectReason}
          // setRejectReason={setRejectReason}
          onHide={() => handleModalClose()}
        />
      </div>
      <div style={{ maxHeight: "400px", overflow: "auto" }}>
        <Table striped className="table-data border">
          <thead
            className="tableHeaderBGColor "
            style={{ whiteSpace: "nowrap", textAlign: "center" }}
          >
            <tr>
              <th>SL No</th>
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
              <th>In Draft PN</th>
              <th>Pack Now</th>
              <th>JW Cost</th>
              <th>Mtrl Cost</th>
            </tr>
          </thead>
          <tbody
            className="tablebody"
            style={{ whiteSpace: "nowrap", textAlign: "center" }}
          >
            {props.orderScheduleDetailsData?.map((val, key) => (
              <tr
                className={
                  props.selectedScheduleDetailsRows.includes(val)
                    ? "selected-row"
                    : ""
                }
                onClick={(e) => {
                  if (props.selectedScheduleDetailsRows.includes(val)) {
                    const newArray = props.selectedScheduleDetailsRows.filter(
                      (obj) => obj.SchDetailsID != val.SchDetailsID
                    );
                    props.setSelectedScheduleDetailsRows(newArray);
                  } else {
                    props.setSelectedScheduleDetailsRows([
                      ...props.selectedScheduleDetailsRows,
                      val,
                    ]);
                  }
                }}
              >
                <td>{key + 1}</td>
                <td>{val.DwgName}</td>
                <td>{val.Mtrl_Code}</td>
                <td>{val.Mtrl_Source}</td>
                <td>{val.Operation}</td>
                <td>{val.QtyScheduled}</td>
                <td>{val.QtyProduced}</td>
                <td>{val.QtyCleared}</td>
                <td>{val.QtyRejected}</td>
                <td>{val.QtyPacked}</td>
                <td>{val.QtyDelivered}</td>
                <td>{val.InDraftPN}</td>
                <td>
                  {parseInt(val.QtyCleared) -
                    parseInt(val.QtyPacked) -
                    parseInt(val.InDraftPN)}
                </td>
                <td>{parseFloat(val.JWCost).toFixed(2)}</td>
                <td>{parseFloat(val.MtrlCost).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

import React, { useState, useEffect } from "react";
import { Modal, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import Axios from "axios";
import { apipoints } from "../../../../../../api/PackInv_API/Inspection/InspProfi";
import YesNoModal from "./YesNoModal";

export default function InternalRejectionModal(props) {
  const {
    getOrderScheduleData,
    orderScheduleDetailsData,
    setOrderScheduleDetailsData,
    selectedScheduleDetailsRows,
    setSelectedScheduleDetailsRows,
    newRejId,
    setNewRejId,
    rejFormData,
    setRejFormData,
    reportNo,
    setReportNo,
    rejectedValue,
    setRejectedValue,
    acceptedValue,
    setAcceptedValue,
    headerData,
    setLgShow,
    onHide,
    qtyRejectt,
    actionType,
    setActionType,
    smShow,
    setSmShow,
    handleOkButtonClick,
  } = props;

  // console.log("qtyRejectttttttttttttttttt", qtyRejectt);
  // let qtyRej = selectedScheduleDetailsRows.map(
  //   (val) => val.QtyProduced - val.QtyCleared
  // );

  //  console.log("...1", selectedScheduleDetailsRows);
  const [serialId, setSerialId] = useState(1);
  const [irstatus, setIrtatus] = useState("Created");
  const [raisedBy, setRaisedBy] = useState("Sales");
  const [Unit, SetUnit] = useState("Jigani");

  const [rejectReason, setRejectReason] = useState([
    "Enter Reason For Rejecting Parts",
  ]);

  let initialValues = selectedScheduleDetailsRows.map(
    (val) => val.QtyProduced - val.QtyCleared - val.QtyRejected
  );

  const [qtyReject, setQtyReject] = useState(initialValues);

  useEffect(() => {
    setQtyReject(initialValues);
  }, []);

  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const getRejRepNo = async () => {
    const srlType = "Internal_Rejection";
    const ResetPeriod = "FinanceYear";
    const ResetValue = 0;
    const VoucherNoLength = 4;
    const prefix = "IR / ";
    try {
      const response = await Axios.post(apipoints.insertRunNoRow, {
        unit: Unit,
        srlType: srlType,
        ResetPeriod: ResetPeriod,
        ResetValue: ResetValue,
        VoucherNoLength: VoucherNoLength,
        prefix: prefix,
      });

      console.log("getDCNo Response", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const HandleRejectionReportClick = () => {
    const srlType = "Internal_Rejection";
    const prefix = "IR / ";
    getRejRepNo();
    // console.log("entering into the HandleRejectionReportClick...1");
    const currentYear = new Date().getFullYear();
    // const nextYear = currentYear + 1;
    const pastYear = currentYear - 1;
    // const financialYear = `${currentYear.toString().slice(-2)}/${nextYear
    //   .toString()
    //   .slice(-2)}`;
    const financialYear = `${pastYear.toString().slice(-2)}/${currentYear
      .toString()
      .slice(-2)}`;

    let lastRejReportNo = rejFormData[0]?.Rej_ReportNo;
    let numericPart = lastRejReportNo?.match(/\d+$/);
    let nextSerialNumber = parseInt(numericPart[0]) + 1;
    let newRejReportNo = `${financialYear}/ IR / ${nextSerialNumber
      .toString()
      .padStart(4, "0")}`;
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
    // console.log("entering into the HandleRejectionReportClick...2");

    try {
      Axios.post(apipoints.submitRejectionReport, {
        selectedScheduleDetailsRows,
        ScheduleId: selectedScheduleDetailsRows[0]?.ScheduleId,
        Cust_Code: selectedScheduleDetailsRows[0]?.Cust_Code,
        Cust_Name: props.headerData?.Cust_name,
        Rejection_Ref: props.headerData?.OrdSchNo,
        reportNo: newRejReportNo,
        Status: irstatus,
        RaisedBy: raisedBy,
        acceptedValue: acceptedValue,
        rejectedValue: rejectedValue,
        Rej_Id: nextRej_Id,
        QtyRejected: qtyReject,
        RejectedReason: rejectReason,
        unit: Unit,
        srlType: srlType,
        prefix: prefix,
      }).then((res) => {
        // console.log("res from submitRejectionReport..", res.data);
        props.getOrderScheduleData();
        // console.log("getOrderScheduleData is exicuted");
        setLgShow(false);
        toast.success(
          `Dwg Rejected Successfully, with Rej Report No ${newRejReportNo}`
        );
      });
    } catch (error) {}
    // setActionType("reject");
    // setSmShow(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await props.getOrderScheduleData();
        // Other asynchronous operations if needed
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [props.lgShow]); // Assuming you want to trigger this effect when lgShow changes

  const handleIRInputChange = (e, setValue, type) => {
    let value = e.target.value;

    value = value.replace(/^0+/, "");

    value = value.replace(/[^0-9.]/g, "");

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

    if (name === "rejectReason") {
      const updateReasons = [...rejectReason];
      updateReasons[i] = value;
      setRejectReason(updateReasons);
      // setRejectReason(e.target.value);
    } else if (name === "qtyReject") {
      const updatedQtyReject = [...qtyReject];
      updatedQtyReject[i] = value;
      if (updatedQtyReject[i] > initialValues) {
        toast.warning(
          "Please Check, Entered value is greater than the Quantity "
        );
      }
      setQtyReject(updatedQtyReject);
    }
  };

  useEffect(() => {
    props.setVeryNewRejData(props.selectedScheduleDetailsRows);
  }, [props.lgShow]);

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
                  value={`${props.headerData?.Cust_name}(${selectedScheduleDetailsRows[0]?.Cust_Code})`}
                />
              </div>
            </div>
            <div className="col-md-3 form-bg">
              <label className="form-label">Rejection Ref</label>
              <input type="text" value={props.headerData?.OrdSchNo} />
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
                required
                type="text"
                value={rejectedValue}
                onChange={(e) => handleIRInputChange(e, setRejectedValue)}
              />
            </div>

            <div className="col-md-3 form-bg">
              <label className="form-label">Accepted Value</label>
              <input
                required
                type="text"
                value={acceptedValue}
                onChange={(e) => handleIRInputChange(e, setAcceptedValue)}
              />
            </div>
          </div>

          <div className="row justify-content-end mt-3">
            <button
              className={
                reportNo !== "Draft"
                  ? "button-style button-disabled"
                  : "button-style"
              }
              style={{ width: "230px" }}
              onClick={HandleRejectionReportClick}
              disabled={reportNo !== "Draft"}
            >
              Clear Rejection Report
            </button>
            <YesNoModal
              show={smShow}
              setSmShow={setSmShow}
              onHide={() => setSmShow(false)}
              actionType={actionType}
              setActionType={setActionType}
              onOkButtonClick={handleOkButtonClick}
            ></YesNoModal>
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
                          name="qtyReject"
                          defaultValue={
                            val.QtyProduced - val.QtyCleared - val.QtyRejected
                            // initialValues
                          }
                          style={{ border: "none", textAlign: "center" }}
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </td>

                      <td>
                        <input
                          style={{ border: "none", textAlign: "center" }}
                          name="rejectReason"
                          placeholder="Enter Reason For Rejecting Parts"
                          defaultValue={
                            rejectReason[i] != undefined ? rejectReason[i] : ""
                          }
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </Table>
        </div>
      </Modal.Body>
    </Modal>
  );
}

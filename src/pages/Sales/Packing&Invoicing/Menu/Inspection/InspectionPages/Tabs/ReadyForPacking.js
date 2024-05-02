import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
// Table
import { Link } from "react-router-dom";

import { apipoints } from "../../../../../../api/PackInv_API/Inspection/InspProfi";
// FirstTable

import FirstTable from "./ReadyForPackingTables/FirstTable";
import SecondTable from "./ReadyForPackingTables/SecondTable";
import ThirdTable from "./ReadyForPackingTables/ThirdTable";
import { toast } from "react-toastify";
import Axios from "axios";

import ModalPackingNote from "../../../../PDFs/PackingNote/ModalPackingNote";
import ConfirmationModal from "../Modals/ConfirmationModal";
import InspectionAndPacking from "../Modals/InspectionAndPacking";

import ModalDraftPackingNote from "../../../../PDFs/DraftPackingNote/ModalDraftPackingNote";

export default function ReadyForPacking(props) {
  const todayDate = new Date();

  const [runningNoData, setRunningNoData] = useState({});

  const [formData, setFormData] = useState({
    unitName: "Jigani",
  });

  const [printPNModal, setPrintPNModal] = useState(false);
  const [printDraftPNModal, setPrintDraftPNModal] = useState(false);

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmationModalFor, setConfirmationModalFor] = useState("");
  const [selectedRegisterRow, setSelectedRegisterRow] = useState({});

  const [InspectionAndPackingModal, setInspectionAndPackingModal] =
    useState(false);

  const getDCNo = async () => {
    // console.log("todayDate", todayDate);

    let finYear = `${
      (todayDate.getMonth() + 1 < 4
        ? todayDate.getFullYear() - 1
        : todayDate.getFullYear()
      )
        .toString()
        .slice(-2) +
      "/" +
      (todayDate.getMonth() + 1 < 4
        ? todayDate.getFullYear()
        : todayDate.getFullYear() + 1
      )
        .toString()
        .slice(-2)
    }`;

    // console.log("finYear", finYear);

    let srlType = "PkngNoteNo";
    if (
      selectedRegisterRow.Dc_InvType === "Internal" ||
      selectedRegisterRow.Cust_Code === "0000"
    ) {
      srlType = "InternalDC";
    }
    const ResetPeriod = "FinanceYear";
    const ResetValue = 0;
    const Length = 5;
    // const prefix = "";

    Axios.post(apipoints.insertAndGetRunningNo, {
      finYear: finYear,
      unitName: formData.unitName,
      srlType: srlType,
      ResetPeriod: ResetPeriod,
      ResetValue: ResetValue,
      Length: Length,
      // prefix: prefix,
    }).then((res) => {
      setRunningNoData(res.data.runningNoData);
      console.log("getDCNo Response", res.data);
    });
  };

  // const [insAndPack, setInsAndPack] = useState({
  //   inspectedBy: props.headerData?.Dealing_Engineer,
  //   packedBy: "",
  // });
  const createDraftPNFunc = () => {
    let rowsForCreateDraftPN = [];

    for (let i = 0; i < props.selectedReadyForPackingRows.length; i++) {
      const element = props.selectedReadyForPackingRows[i];
      if (
        parseInt(element.QtyCleared) -
          parseInt(element.QtyPacked) -
          parseInt(element.InDraftPN) >
        0
      ) {
        // console.log(
        //   "good to go",
        //   parseInt(element.QtyCleared) -
        //     parseInt(element.QtyPacked) -
        //     parseInt(element.InDraftPN)
        // );
        rowsForCreateDraftPN.push(element);
      } else {
        // console.log(
        //   "no need.....",
        //   parseInt(element.QtyCleared) -
        //     parseInt(element.QtyPacked) -
        //     parseInt(element.InDraftPN)
        // );
      }
    }

    // console.log("createDraftPNFunc", props.selectedReadyForPackingRows);

    // console.log("rowsForCreateDraftPN", rowsForCreateDraftPN);
    if (rowsForCreateDraftPN.length > 0) {
      Axios.post(apipoints.postCreateDraftPN, {
        headerData: props.headerData,
        rowsForCreateDraftPN: rowsForCreateDraftPN,
      }).then((res) => {
        if (res.data.flag === 0) {
          toast.error(res.data.message);
        } else {
          props.getOrderScheduleData();

          toast.success(res.data.message);
        }
        // console.log("ressssssss", res.data);
      });
    } else {
      toast.warning(
        "No materials with sufficient quantity to Create Draft PN, select another material"
      );
    }
  };

  // console.log(
  //   "selectedRegisterRow",
  //   toString(selectedRegisterRow?.DC_Inv_No).length
  // );
  const printDraftPNFunc = () => {
    // console.log("print draft pn func....");

    if (props.invDetailsData.length === 0) {
      toast.warning("Please select the packing note for printing");
    } else {
      setPrintDraftPNModal(true);
    }
  };

  const deleteDraftPNFunc = () => {
    Axios.post(apipoints.deleteDraftPN, {
      DC_Inv_No: selectedRegisterRow.DC_Inv_No,
    }).then((res) => {
      if (res.data.flag === 0) {
        toast.error(res.data.message);
      } else if (res.data.flag === 1) {
        props.getOrderScheduleData();
        setSelectedRegisterRow({});
        props.setInvDetailsData([]);
        toast.success(res.data.message);
      } else {
        // props.getOrderScheduleData();

        toast.error("Uncaught error found");
      }
    });
  };

  const saveDraftPNFunc = () => {
    if (props.invDetailsData.length === 0) {
      toast.warning("Please select the packing note for printing");
    } else {
      // console.log("details data...", props.invDetailsData);
      Axios.post(apipoints.saveDraftPN, {
        invDetailsData: props.invDetailsData,
      }).then((res) => {
        if (res.data.flag === 0) {
          toast.error(res.data.message);
        } else if (res.data.flag === 1) {
          props.getOrderScheduleData();
          // setSelectedRegisterRow({});
          // props.setInvDetailsData([]);
          toast.success(res.data.message);
        } else {
          // props.getOrderScheduleData();

          toast.error("Uncaught error found");
        }
      });
    }
  };

  const preparePNFunc = () => {
    // console.log("clicked prepare pn", props.insAndPack);
    // console.log("preaper...........");
    Axios.post(apipoints.preparePN, {
      DC_Inv_No: selectedRegisterRow.DC_Inv_No,
      insAndPack: props.insAndPack,
      invDetailsData: props.invDetailsData,
      runningNoData: runningNoData,
    }).then((res) => {
      if (res.data.flag === 0) {
        toast.error(res.data.message);
        setInspectionAndPackingModal(false);
      } else if (res.data.flag === 1) {
        props.getOrderScheduleData();
        setSelectedRegisterRow({});
        props.setInvDetailsData([]);
        toast.success(res.data.message);
        setInspectionAndPackingModal(false);
      } else {
        // props.getOrderScheduleData();
        setInspectionAndPackingModal(false);

        toast.error("Uncaught error found");
      }
    });
  };

  const printPNFunc = () => {
    // console.log("print draft pn func....");

    if (props.invDetailsData.length === 0) {
      toast.warning("Please select the packing note for printing");
    } else {
      setPrintPNModal(true);
    }
  };
  // console.log("insAndPack", props.insAndPack);
  // console.log("headerData", props.headerData);

  // console.log("selectedRegisterRow", selectedRegisterRow);
  return (
    <>
      <div>
        {/* buttons */}
        <div className="row col-md-12">
          <div className="d-flex flex-row justify-content-between">
            <button
              // disabled={selectedRows.length === 0}
              // className={
              // selectedRows.length === 0
              // ? "button-disabled button-style m-0"
              // : "button-style m-0"
              // }

              disabled={props.selectedReadyForPackingRows.length === 0}
              onClick={createDraftPNFunc}
              className={
                props.selectedReadyForPackingRows.length === 0
                  ? "button-style button-disabled m-1"
                  : "button-style m-1"
              }
            >
              Create Draft PN
            </button>
            <button
              disabled={selectedRegisterRow.DC_No}
              className={
                selectedRegisterRow.DC_No
                  ? "button-style button-disabled m-1"
                  : "button-style m-1"
              }
              onClick={printDraftPNFunc}
            >
              Print Draft PN
            </button>
            <button
              disabled={selectedRegisterRow.DC_No}
              className={
                selectedRegisterRow.DC_No
                  ? "button-style button-disabled m-1"
                  : "button-style m-1"
              }
              onClick={(e) => {
                if (!selectedRegisterRow.DC_Inv_No) {
                  toast.warning("Please select the draft PN for deleting");
                } else {
                  setConfirmationModalFor("Delete Draft PN");
                  setConfirmModalOpen(true);
                }
              }}
            >
              Delete Draft PN
            </button>
            <button
              disabled={selectedRegisterRow.DC_No}
              className={
                selectedRegisterRow.DC_No
                  ? "button-style button-disabled m-1"
                  : "button-style m-1"
              }
              onClick={saveDraftPNFunc}
            >
              Save Draft PN
            </button>
            <button
              disabled={selectedRegisterRow.DC_No}
              className={
                selectedRegisterRow.DC_No
                  ? "button-style button-disabled m-1"
                  : "button-style m-1"
              }
              onClick={(e) => {
                if (props.invDetailsData.length === 0) {
                  toast.warning("Please select the draft PN");
                } else {
                  getDCNo();
                  setConfirmationModalFor("Prepare PN");
                  setInspectionAndPackingModal(true);
                }
              }}
            >
              Prepare PN
            </button>
            <button
              disabled={!selectedRegisterRow.DC_No}
              className={
                !selectedRegisterRow.DC_No
                  ? "button-style button-disabled m-1"
                  : "button-style m-1"
              }
              onClick={printPNFunc}
            >
              Print PN
            </button>

            {selectedRegisterRow.DC_No ? (
              <Link
                to={`/PackingAndInvoices/PackingNote/Description`}
                state={selectedRegisterRow.DC_Inv_No}
              >
                <button className="button-style m-1">Open Invoice</button>
              </Link>
            ) : (
              <Link>
                <button className="button-style button-disabled m-1">
                  Open Invoice
                </button>
              </Link>
            )}

            {/* <Link
              to={`/PackingAndInvoices/PackingNote/Description`}
              state={selectedRegisterRow.DC_Inv_No}
            >
              <button className="button-style m-1">Open Invoice</button>
            </Link> */}
          </div>
        </div>
        {/* space */}
        <div className="p-1"></div>
        <div className="row">
          <div className="col-md-7 border-end">
            <div
              style={{
                height: "400px",
                overflow: "auto",
                // border: "1px solid black",
                // background: "rgb(242 242 242 / 66%)",
              }}
            >
              <FirstTable
                orderScheduleDetailsData={props.orderScheduleDetailsData}
                selectedReadyForPackingRows={props.selectedReadyForPackingRows}
                setSelectedReadyForPackingRows={
                  props.setSelectedReadyForPackingRows
                }
                // schdetails={schdetails}
                // selectedRows={selectedRows}
                // handleCheckboxChange={handleCheckboxChange}
              />
            </div>
          </div>
          <div className="col-md-5">
            <div style={{ height: "190px", overflow: "auto" }}>
              <SecondTable
                invRegisterData={props.invRegisterData}
                setInvDetailsData={props.setInvDetailsData}
                allInvDetailsData={props.allInvDetailsData}
                invDetailsData={props.invDetailsData}
                setSelectedRegisterRow={setSelectedRegisterRow}
                selectedRegisterRow={selectedRegisterRow}
              />
            </div>
            <div className="p-2">
              <div className="border-bottom"></div>
            </div>
            <div style={{ height: "190px", overflow: "auto" }}>
              <ThirdTable
                setInvDetailsData={props.setInvDetailsData}
                invDetailsData={props.invDetailsData}
              />
            </div>
          </div>
        </div>
        <div className="p-2"></div>
      </div>
      {/* modals */}
      <div>
        <ModalDraftPackingNote
          setPrintDraftPNModal={setPrintDraftPNModal}
          printDraftPNModal={printDraftPNModal}
          // data...
          invRegisterData={selectedRegisterRow}
          invDetailsData={props.invDetailsData}
          invTaxData={[]}
        />
        <ModalPackingNote
          setPrintCopyModal={setPrintPNModal}
          printCopyModal={printPNModal}
          // data...
          invRegisterData={selectedRegisterRow}
          invDetailsData={props.invDetailsData}
          invTaxData={[]}
        />

        <ConfirmationModal
          setConfirmModalOpen={setConfirmModalOpen}
          confirmModalOpen={confirmModalOpen}
          message={
            confirmationModalFor === "Delete Draft PN"
              ? `Are you sure to delete the draft PN`
              : confirmationModalFor === "Prepare PN"
              ? `Are you sure to prepare the PN`
              : "Error"
          }
          yesClickedFunc={
            confirmationModalFor === "Delete Draft PN"
              ? deleteDraftPNFunc
              : confirmationModalFor === "Prepare PN"
              ? preparePNFunc
              : "Error"
          }
        />
        <InspectionAndPacking
          setInspectionAndPackingModal={setInspectionAndPackingModal}
          InspectionAndPackingModal={InspectionAndPackingModal}
          setConfirmModalOpen={setConfirmModalOpen}
          setInsAndPack={props.setInsAndPack}
          insAndPack={props.insAndPack}
          headerData={props.headerData}
        />
      </div>
      {/* old */}
      {/* <div>
        {" "}
        <div className="row">
          <div className="col-md-7 ">
            <div className="row justify-content-center">
              {selectedRows.length ? (
                <button
                  className="button-style "
                  style={{ width: "150px" }}
                  onClick={handleSubmitreadyforP}
                >
                  Create Draft PN
                </button>
              ) : (
                <button
                  className="button-style button-disabled"
                  style={{ width: "150px" }}
                  disabled
                >
                  Create Draft PN
                </button>
              )}
              <button className="button-style " style={{ width: "140px" }}>
                Print Draft PN
              </button>
              <button className="button-style " style={{ width: "150px" }}>
                Delete Draft PN
              </button>
              <button className="button-style " style={{ width: "140px" }}>
                Save Draft PN
              </button>
            </div>{" "}
            <div
              style={{ height: "420px", overflow: "scroll", marginTop: "9px" }}
            >
              <Table striped className="table-data border">
                <thead
                  className="tableHeaderBGColor tablebody"
                  style={{ whiteSpace: "nowrap" }}
                >
                  <tr style={{ textAlign: "center" }}>
                    <th>Select</th>
                    <th>Dwg Name</th>
                    <th>Material</th>
                    <th>Scheduled</th>
                    <th>Produced</th>
                    <th>Cleared</th>
                    <th>InDraftPN</th>
                    <th>PackNow</th>
                    <th>PackingLevel</th>
                  </tr>
                </thead>
                <tbody
                  className="tablebody "
                  style={{ whiteSpace: "nowrap", textAlign: "center" }}
                >
                  {schdetails && schdetails.length > 0
                    ? schdetails.map((val, i) => (
                        <tr key={i}>
                          <td>
                            <input
                              type="checkbox"
                              checked={selectedRows.includes(val.SchDetailsID)} // Change 'i' to 'val.SchDetailsID'
                              onChange={() =>
                                handleCheckboxChange(val.SchDetailsID)
                              } // Change 'i' to 'val.SchDetailsID'
                            />
                          </td>
                          <td>{val.DwgName}</td>
                          <td>{val.Mtrl_Code}</td>
                          <td>{val.QtyScheduled}</td>
                          <td>{val.QtyProduced}</td>
                          <td>{val.QtyCleared}</td>
                          <td>{val.InDraftPn}</td>
                          <td></td>
                          <td>{val.PackingLevel}</td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </Table>
            </div>
          </div>{" "}
          <div className="col-md-5">
            <div className="row justify-content-center">
              <button className="button-style " style={{ width: "140px" }}>
                Prepare PN
              </button>
              <button className="button-style " style={{ width: "150px" }}>
                Print PN
              </button>
              <button
                className="button-style "
                style={{ width: "140px" }}
                onClick={() => {
                  navigate(
                    "/PackingAndInvoices/Inspection/Profile/ScheduleList/InvoiceForm"
                  );
                }}
              >
                Open Invoice
              </button>
            </div>
            <div
              className="row mt-2"
              style={{ height: "220px", overflowY: "scroll" }}
            >
              <Table striped className="table-data border">
                <thead
                  className="tableHeaderBGColor "
                  style={{ textAlign: "center" }}
                >
                  <tr>
                    <th>type</th>
                    <th>PN No</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody className="tablebody" style={{ textAlign: "center" }}>
                  <tr>
                    <td>asdfghj</td>
                    <td>asdf</td>
                    <td>asdf</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div
              className="row"
              style={{ height: "200px", overflowY: "scroll" }}
            >
              <Table striped>
                <thead
                  thead
                  className="tableHeaderBGColor"
                  style={{ textAlign: "center" }}
                >
                  <tr>
                    <th>Dwg No</th>
                    <th>Mtrl</th>
                    <th>Qty</th>
                    <th>Unit Wt</th>
                  </tr>
                </thead>

                <tbody className="tablebody" style={{ textAlign: "center" }}>
                  <tr>
                    <td>asdfghj</td>
                    <td>asdfghj</td>
                    <td>asdfghj</td>
                    <td>asdfghj</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

// import React, { useEffect, useState } from "react";
// import Table from "react-bootstrap/Table";
// import { useNavigate } from "react-router-dom";
// import Axios from "axios";
// import { apipoints } from "../../../../../../api/PackInv_API/Inspection/InspProfi";
// import { toast } from "react-toastify";
// import FirstTable from "./Tables/FirstTable";
// import SecondTable from "./Tables/SecondTable";
// import ThirdTable from "./Tables/ThirdTable";

// function ReadyForPacking(props) {
//   // State to store the data
//   const {
//     schdetails,
//     setSchdetails,
//     selectedRows,
//     updateSchdetails,
//     handleCheckboxChange,
//     scheduleId,
//     isChecked,
//   } = props;

//   const [dcInvCounter, setDcInvCounter] = useState(1);
//   const [formData, setFormData] = useState({
//     DC_Inv_No: "",
//     DC_Inv_Srl: "",
//     ScheduleID: "",
//     OrderSchDetailsID: "",
//     Cust_Code: "",
//     Order_No: "",
//     Order_Srl_No: "",
//     OrderScheduleNo: "",
//     Dwg_Code: "",
//     Dwg_No: "",
//     Mtrl: "",
//     Material: "",
//     Qty: "",
//     Unit_Wt: "",
//     Excise_CL_no: "",
//     DespStatus: "",
//     PkngLevel: "",
//     InspLevel: "",
//   });

//   const [tableData, setTableData] = useState();

//   const [status, setStatus] = useState("");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   let navigate = useNavigate();

//   // Function to generate the next value for DC_Inv_No
//   const generateNextDcInvNo = () => {
//     const nextDcInvNo = `${dcInvCounter}`; // You can customize the format
//     setDcInvCounter((prevCounter) => prevCounter + 1); // Increment the counter
//     return nextDcInvNo;
//   };
//   // Function to handle form data changes
//   const handleChangereadyforP = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Function to handle form submission
//   const handleSubmitreadyforP = async (name, value) => {
//     // const newDcInvNo = generateNextDcInvNo();
//     // for (let i = 0; i < schdetails.length; i++) {
//     //   // const element = schdetails[i];

//     //   setFormData((prevFormData) => ({
//     //     ...prevFormData,
//     //     DC_Inv_Srl: newDcInvNo,
//     //     DespStatus: "draft",
//     //     ScheduleID: schdetails[i].ScheduleId,
//     //     OrderSchDetailsID: schdetails[i].SchDetailsID,
//     //     Cust_Code: schdetails[i].Cust_Code,
//     //     Order_No: schdetails[i].Order_No,
//     //     Order_Srl_No: schdetails[i].Order_Srl,
//     //     OrderScheduleNo: schdetails[i].ScheduleNo,
//     //     Dwg_Code: schdetails[i].Dwg_Code,
//     //     Dwg_No: schdetails[i].DwgName,
//     //     Mtrl: schdetails[i].Mtrl,
//     //     Material: schdetails[i].Material,
//     //     Qty: "",
//     //     Unit_Wt: schdetails[i].UnitWt,
//     //     Excise_CL_no: "",
//     //     PkngLevel: schdetails[i].PackingLevel,
//     //     InspLevel: schdetails[i].InspLevel,
//     //   }));
//     // }
//     //  console.log("entering into inserting a draft data");

//     try {
//       //  console.log("selectedRows....", selectedRows);
//       // Send POST request using Axios
//       Axios.post(apipoints.postInvoiceDataDetails, {
//         selectedRows,
//       }).then((res) => {
//         setTableData(res.data);
//       });

//       // Handle the response as needed
//       // console.log("tableData", tableData);
//     } catch (error) {
//       // Handle errors
//       console.error("Error:", error);
//     }
//   };

//   const handleAddNePN = async () => {
//     try {
//       setLoading(true);

//       const response = await Axios.post(apipoints.postInvoicedata, {
//         selectedRows,
//       }).then((res) => {
//         setTableData(res.data);
//       });
//       // Handle success response
//       if (response != 0) {
//         toast.success("Packing note added successfully");
//       }
//     } catch (error) {
//       console.error("Error adding new packing note:", error);
//       setError("Failed to add new packing note");
//     } finally {
//       setLoading(false);
//     }
//   };

// const createDraftPNFunc = () => {
//   // console.log("createDraftPNFunc");
//   Axios.post(apipoints.postCreateDraftPN, {
//     selectedRowData: props.selectedRowData,
//     selectRow: props.tbldata.selectRow,
//   }).then((res) => {
//     console.log("ressssssss", res.data);
//   });
// };

//   // console.log("porps", props);
//   console.log("select data..", props.tbldata.selectRow);
//   console.log("selectedRowData", props.selectedRowData);
//   return (
// <>
//   <div>
//     {/* buttons */}
//     <div className="row col-md-12">
//       <div className="d-flex flex-row justify-content-between">
//         <button
//           disabled={selectedRows.length === 0}
//           className={
//             selectedRows.length === 0
//               ? "button-disabled button-style m-0"
//               : "button-style m-0"
//           }
//           // className="button-style m-0"
//           onClick={createDraftPNFunc}
//         >
//           Create Draft PN
//         </button>
//         <button className="button-style m-0">Print Draft PN</button>
//         <button className="button-style m-0">Delete Draft PN</button>
//         <button className="button-style m-0">Save Draft PN</button>
//         <button className="button-style m-0">Prepare PN</button>
//         <button className="button-style m-0">Print PN</button>
//         <button className="button-style m-0">Open Invoice</button>
//       </div>
//     </div>
//     {/* space */}
//     <div className="p-1"></div>
//     <div className="row">
//       <div className="col-md-7">
//         <div
//           style={{
//             height: "400px",
//             overflow: "auto",
//             // border: "1px solid black",
//             // background: "rgb(242 242 242 / 66%)",
//           }}
//         >
//           <FirstTable
//             schdetails={schdetails}
//             selectedRows={selectedRows}
//             handleCheckboxChange={handleCheckboxChange}
//           />
//         </div>
//       </div>
//       <div className="col-md-5">
//         <div style={{ height: "190px", overflow: "auto" }}>
//           <SecondTable />
//         </div>
//         {/* <div className="p-1"></div> */}
//         <div style={{ height: "190px", overflow: "auto" }}>
//           <ThirdTable />
//         </div>
//       </div>
//     </div>
//     <div className="p-2"></div>
//   </div>

//   {/* old */}
//   {/* <div>
//     {" "}
//     <div className="row">
//       <div className="col-md-7 ">
//         <div className="row justify-content-center">
//           {selectedRows.length ? (
//             <button
//               className="button-style "
//               style={{ width: "150px" }}
//               onClick={handleSubmitreadyforP}
//             >
//               Create Draft PN
//             </button>
//           ) : (
//             <button
//               className="button-style button-disabled"
//               style={{ width: "150px" }}
//               disabled
//             >
//               Create Draft PN
//             </button>
//           )}
//           <button className="button-style " style={{ width: "140px" }}>
//             Print Draft PN
//           </button>
//           <button className="button-style " style={{ width: "150px" }}>
//             Delete Draft PN
//           </button>
//           <button className="button-style " style={{ width: "140px" }}>
//             Save Draft PN
//           </button>
//         </div>{" "}
//         <div
//           style={{ height: "420px", overflow: "scroll", marginTop: "9px" }}
//         >
//           <Table striped className="table-data border">
//             <thead
//               className="tableHeaderBGColor tablebody"
//               style={{ whiteSpace: "nowrap" }}
//             >
//               <tr style={{ textAlign: "center" }}>
//                 <th>Select</th>
//                 <th>Dwg Name</th>
//                 <th>Material</th>
//                 <th>Scheduled</th>
//                 <th>Produced</th>
//                 <th>Cleared</th>
//                 <th>InDraftPN</th>
//                 <th>PackNow</th>
//                 <th>PackingLevel</th>
//               </tr>
//             </thead>
//             <tbody
//               className="tablebody "
//               style={{ whiteSpace: "nowrap", textAlign: "center" }}
//             >
//               {schdetails && schdetails.length > 0
//                 ? schdetails.map((val, i) => (
//                     <tr key={i}>
//                       <td>
//                         <input
//                           type="checkbox"
//                           checked={selectedRows.includes(val.SchDetailsID)} // Change 'i' to 'val.SchDetailsID'
//                           onChange={() =>
//                             handleCheckboxChange(val.SchDetailsID)
//                           } // Change 'i' to 'val.SchDetailsID'
//                         />
//                       </td>
//                       <td>{val.DwgName}</td>
//                       <td>{val.Mtrl_Code}</td>
//                       <td>{val.QtyScheduled}</td>
//                       <td>{val.QtyProduced}</td>
//                       <td>{val.QtyCleared}</td>
//                       <td>{val.InDraftPn}</td>
//                       <td></td>
//                       <td>{val.PackingLevel}</td>
//                     </tr>
//                   ))
//                 : null}
//             </tbody>
//           </Table>
//         </div>
//       </div>{" "}
//       <div className="col-md-5">
//         <div className="row justify-content-center">
//           <button className="button-style " style={{ width: "140px" }}>
//             Prepare PN
//           </button>
//           <button className="button-style " style={{ width: "150px" }}>
//             Print PN
//           </button>
//           <button
//             className="button-style "
//             style={{ width: "140px" }}
//             onClick={() => {
//               navigate(
//                 "/PackingAndInvoices/Inspection/Profile/ScheduleList/InvoiceForm"
//               );
//             }}
//           >
//             Open Invoice
//           </button>
//         </div>
//         <div
//           className="row mt-2"
//           style={{ height: "220px", overflowY: "scroll" }}
//         >
//           <Table striped className="table-data border">
//             <thead
//               className="tableHeaderBGColor "
//               style={{ textAlign: "center" }}
//             >
//               <tr>
//                 <th>type</th>
//                 <th>PN No</th>
//                 <th>Status</th>
//               </tr>
//             </thead>

//             <tbody className="tablebody" style={{ textAlign: "center" }}>
//               <tr>
//                 <td>asdfghj</td>
//                 <td>asdf</td>
//                 <td>asdf</td>
//               </tr>
//             </tbody>
//           </Table>
//         </div>
//         <div
//           className="row"
//           style={{ height: "200px", overflowY: "scroll" }}
//         >
//           <Table striped>
//             <thead
//               thead
//               className="tableHeaderBGColor"
//               style={{ textAlign: "center" }}
//             >
//               <tr>
//                 <th>Dwg No</th>
//                 <th>Mtrl</th>
//                 <th>Qty</th>
//                 <th>Unit Wt</th>
//               </tr>
//             </thead>

//             <tbody className="tablebody" style={{ textAlign: "center" }}>
//               <tr>
//                 <td>asdfghj</td>
//                 <td>asdfghj</td>
//                 <td>asdfghj</td>
//                 <td>asdfghj</td>
//               </tr>
//             </tbody>
//           </Table>
//         </div>
//       </div>
//     </div>
//   </div> */}
// </>
//   );
// }

// export default ReadyForPacking;

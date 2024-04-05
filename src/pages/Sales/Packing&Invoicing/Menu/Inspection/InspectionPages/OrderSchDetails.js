import React, { useState, useEffect } from "react";
import Axios from "axios";
import { apipoints } from "../../../../../api/PackInv_API/Inspection/InspProfi";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
// import Tabs from "react-bootstrap/Tabs";

import ScheduleDetails from "./Tabs/ScheduleDetails";
import ReadyForPacking from "./Tabs/ReadyForPacking";
import ProductionRejections from "./Tabs/ProductionRejections";
import FormHeader from "./FormHeader";

// FormHeader
export default function OrderSchDetails() {
  const nav = useNavigate();
  const location = useLocation();
  const [scheduleID, setScheduleID] = useState(location.state);
  const [headerData, setHeaderData] = useState({});
  const [orderScheduleDetailsData, setOrderScheduleDetailsData] = useState([]);
  const [insAndPack, setInsAndPack] = useState({
    inspectedBy: "",
    packedBy: "",
  });
  const [selectedScheduleDetailsRows, setSelectedScheduleDetailsRows] =
    useState([]);

  const [selectedReadyForPackingRows, setSelectedReadyForPackingRows] =
    useState([]);
  // ////console.log("scheduleID", scheduleID);

  const [invRegisterData, setInvRegisterData] = useState([]);
  const [invDetailsData, setInvDetailsData] = useState([]);
  const [allInvDetailsData, setAllInvDetailsData] = useState([]);
  const [rejectionData, setRejectionData] = useState();

  const getOrderScheduleData = () => {
    setSelectedScheduleDetailsRows([]);
    setSelectedReadyForPackingRows([]);
    Axios.post(apipoints.getOrderScheduleData, {
      scheduleID: scheduleID,
    }).then((res) => {
      console.log("ressss..............1", res.data);
      //console.log("ressssonseee tbl data..", res.data);

      // console.log(
      //   "header",
      //   res.data.headerData.CreditTerms?.split("Credit"),
      //   "...",
      //   res.data.headerData.CreditTerms?.split("Credit").length
      // );
      let BillType = "";
      if (res.data.headerData.CreditTerms?.split("Credit").length > 1) {
        BillType = "Credit";
      } else {
        BillType = "Cash";
      }
      setHeaderData({
        ...res.data.headerData,
        BillType: BillType,
        PaymentTerms: res.data.headerData.CreditTerms,
      });
      setOrderScheduleDetailsData(res.data.orderScheduleDetailsData);
      setInvRegisterData(res.data.invRegisterData);
      setAllInvDetailsData(res.data.allInvDetailsData);
      setInsAndPack({
        inspectedBy: res.data.headerData.SalesContact || "",
        packedBy: res.data.headerData.Inspected_By || "",
      });
    });
  };

  console.log("header", headerData);
  console.log("insAndPack123", insAndPack);
  const handleRejectionTab = () => {
    // //console.log("entering into handleRejectionTab");
    Axios.post(apipoints.testRejectData, { scheduleID: scheduleID }).then(
      (res) => {
        //console.log("ressss...............1", res.data);
        setRejectionData(res.data);
      }
    );
  };
  useEffect(() => {
    getOrderScheduleData();
    // handleRejectionTab();
  }, []);
  const handleSelectAll = () => {
    setSelectedScheduleDetailsRows(orderScheduleDetailsData);
    setSelectedReadyForPackingRows(orderScheduleDetailsData);

    // const allRowIds = schdetails.map((row) => row.SchDetailsID);
    // setSelectedRows(allRowIds);
    // // Retrieve the complete objects for all selected rows
    // const selectedData = schdetails.filter((row) =>
    //   allRowIds.includes(row.SchDetailsID)
    // );
    // setSelectedRowData(selectedData);
  };
  // const handleReverseSelection = () => {
  //   // ////console.log("clicked reverse");

  //   if (selectedScheduleDetailsRows.length === 0) {
  //     handleSelectAll();
  //   } else {
  //     const newArray = [];

  //     for (let i = 0; i < orderScheduleDetailsData.length; i++) {
  //       const element = orderScheduleDetailsData[i];

  //       if (selectedScheduleDetailsRows?.includes(element)) {
  //         // the element is selected, neeeds to pop out
  //         ////console.log("true");
  //       } else {
  //         // not selected, needed to push
  //         ////console.log("false");
  //       }
  //     }

  //     //
  //   }
  // };

  // const handleReverseSelection = () => {
  //   const allRowIds = orderScheduleDetailsData.map((row) => row.SchDetailsID);
  //   ////console.log("all rows", allRowIds);
  //   const unselectedRowIds = allRowIds.filter(
  //     (id) => !selectedScheduleDetailsRows.includes(id)
  //   );
  //   ////console.log("unselectedRowIds", unselectedRowIds);
  //   setSelectedScheduleDetailsRows(unselectedRowIds);
  // };

  const handleReverseSelection = () => {
    if (selectedScheduleDetailsRows.length === 0) {
      handleSelectAll();
    } else {
      const newArray = [];

      for (let i = 0; i < orderScheduleDetailsData.length; i++) {
        const element = orderScheduleDetailsData[i];

        if (selectedScheduleDetailsRows.includes(element)) {
          // the element is selected, needs to be removed
          // //console.log("true");
        } else {
          // not selected, needs to be added to the newArray
          newArray.push(element);
          // //console.log("false");
        }
      }

      // Update the selected rows with the newArray
      setSelectedScheduleDetailsRows(newArray);
    }
  };

  return (
    <>
      <h4 className="title">Order Schedule Details</h4>

      <div className="row justify-content-last">
        <div className="col-md-12 col-sm-12">
          <button
            className="button-style "
            id="btnclose"
            type="submit"
            onClick={() =>
              nav(
                headerData.Type === "Profile"
                  ? "/PackingAndInvoices/Inspection/Profile/ScheduleList"
                  : headerData.Type === "Service"
                  ? "/PackingAndInvoices/Inspection/Services/ScheduleList"
                  : headerData.Type === "Fabrication"
                  ? "/PackingAndInvoices/Inspection/Fabrication/ScheduleList"
                  : "/PackingAndInvoices"
                // "/PackingAndInvoices/Inspection/Profile/ScheduleList"
              )
            }
            style={{ float: "right" }}
          >
            Close
          </button>
        </div>
      </div>

      <div className="mt-1">
        <FormHeader headerData={headerData} />
      </div>
      {/* selectall and reverse */}
      <div className="">
        <button className="button-style" onClick={handleSelectAll}>
          Select all
        </button>
        <button className="button-style" onClick={handleReverseSelection}>
          Reverse
        </button>
      </div>
      {/* tabssss */}
      <div className="row">
        <Tabs id="controlled-tab-example" className="mt-2 mb-2 tab_font">
          <Tab eventKey="mat_rece" title="Schedule Details">
            <ScheduleDetails
              orderScheduleDetailsData={orderScheduleDetailsData}
              setOrderScheduleDetailsData={setOrderScheduleDetailsData}
              selectedScheduleDetailsRows={selectedScheduleDetailsRows}
              setSelectedScheduleDetailsRows={setSelectedScheduleDetailsRows}
              headerData={headerData}
              getOrderScheduleData={getOrderScheduleData}
              // schdetails={schdetails}
              // setSchdetails={setSchdetails}
              // selectedRows={selectedRows}
              // setSelectedRows={setSelectedRows}
              // updateSchdetails={updateSchdetails}
              // handleCheckboxChange={handleCheckboxChange}
              // selectedRowData={selectedRowData}
              // setSelectedRowData={setSelectedRowData}
              // tbldata={tbldata}
            />
          </Tab>

          <Tab eventKey="mat_retu" title="Ready For Packing">
            <ReadyForPacking
              orderScheduleDetailsData={orderScheduleDetailsData}
              selectedReadyForPackingRows={selectedReadyForPackingRows}
              setSelectedReadyForPackingRows={setSelectedReadyForPackingRows}
              headerData={headerData}
              setHeaderData={setHeaderData}
              invRegisterData={invRegisterData}
              setInvDetailsData={setInvDetailsData}
              invDetailsData={invDetailsData}
              allInvDetailsData={allInvDetailsData}
              insAndPack={insAndPack}
              setInsAndPack={setInsAndPack}
              // func
              getOrderScheduleData={getOrderScheduleData}
              // schdetails={schdetails}
              // setSchdetails={setSchdetails}
              // selectedRows={selectedRows}
              // updateSchdetails={updateSchdetails}
              // handleCheckboxChange={handleCheckboxChange}
              // selectedRowData={selectedRowData}
              // tbldata={tbldata}
            />
          </Tab>

          <Tab eventKey="mat_st_posi" title="Production Rejections">
            <ProductionRejections
              orderScheduleDetailsData={orderScheduleDetailsData}
              selectedReadyForPackingRows={selectedReadyForPackingRows}
              // selectedRows={selectedRows}
              // updateSchdetails={updateSchdetails}
              // handleCheckboxChange={handleCheckboxChange}
              // selectedRowData={selectedRowData}
              // rejectionData={rejectionData}
              // setRejectionData={setRejectionData}
              // selectRejRow={selectRejRow}
              // setselectRejRow={setselectRejRow}
            />
          </Tab>
        </Tabs>
      </div>

      <div className="p-2"></div>
    </>
  );
}

// // ParentComponent.js

// import React, { useState, useEffect } from "react";
// import ScheduleDetails from "../InspectionPages/Tabs/ScheduleDeatails";
// import Axios from "axios";
// import { apipoints } from "../../../../../api/PackInv_API/Inspection/InspProfi";
// import ProductionRejections from "../InspectionPages/Tabs/ProductionRejections";
// import ReadyForPacking from "../InspectionPages/Tabs/ReadyForPacking";
// // import ScheduleDetails from "./ScheduleDetails";
// import Tab from "react-bootstrap/Tab";
// import Tabs from "react-bootstrap/Tabs";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   useLocation,
// } from "react-router-dom";

// function ParentComponent() {
//   const location = useLocation();
//   const [data, setData] = useState();
//   const [tbldata, setTbldata] = useState(location.state);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [selectedRowData, setSelectedRowData] = useState([]);
//   const [schdetails, setSchdetails] = useState([]);
//   const [schDetailsID, setSchDetId] = useState([]);

//   ////console.log("tbldata", tbldata);
// useEffect(() => {
//   if ("custcode" && "selectedOption") {
//     Axios.post(apipoints.getOrderSchforschdetails, {
//       custCode: tbldata.selectRow.Cust_Code,
//       selectedOption: tbldata.selectRow.Type,
//       ScheduleId: tbldata.selectRow.ScheduleId,
//     }).then((res) => {
//       // ////console.log("schdetailsdata", res.data);
//       // ////console.log("schd", res.data[0].SchDetailsID);
//       setSchDetId(res.data[0].SchDetailsID);
//       setSchdetails(res.data);
//     });
//   }
// }, []);

//   // ////console.log("schdetails", schdetails);

//   // const handleCheckboxChange = (schDetailsID) => {
//   //   setSelectedRows((prevSelectedRows) => {
//   //     if (prevSelectedRows.includes(schDetailsID)) {
//   //       return prevSelectedRows.filter(
//   //         (selectedID) => selectedID !== schDetailsID
//   //       );
//   //     } else {
//   //       return [...prevSelectedRows, schDetailsID];
//   //     }
//   //   });
//   // };

//   // const handleCheckboxChange = (schDetailsID) => {
//   //   if (selectedRows.includes(schDetailsID)) {
//   //     setSelectedRows(
//   //       selectedRows.filter((selectedID) => selectedID !== schDetailsID)
//   //     );
//   //   } else {
//   //     setSelectedRows([...selectedRows, schDetailsID]);
//   //   }
//   //   const selectedData = data?.filter((row) =>
//   //     selectedRows?.includes(row.schDetailsID)
//   //   );
//   //   ////console.log("Selected Rows Data:", selectedData);
//   //   // ////console.log("Selected SchDetailsID(s):", selectedRows);
//   // };

//   const handleCheckboxChange = (schDetailsID) => {
//     // Create a copy of the selectedRows array
//     let updatedSelectedRows = [...selectedRows];

//     // Toggle the selection status of the clicked row
//     if (updatedSelectedRows.includes(schDetailsID)) {
//       updatedSelectedRows = updatedSelectedRows.filter(
//         (selectedID) => selectedID !== schDetailsID
//       );
//     } else {
//       updatedSelectedRows.push(schDetailsID);
//     }

//     // Update the state with the new selectedRows array
//     setSelectedRows(updatedSelectedRows);

//     // Retrieve the complete objects for the selected rows
//     const selectedData = schdetails.filter((row) =>
//       updatedSelectedRows.includes(row.SchDetailsID)
//     );
//     setSelectedRowData(selectedData);
//   };
//   // ////console.log("Selected Rows Data 1:", selectedRowData);
//   useEffect(() => {
//     // ////console.log("Selected SchDetailsID(s):", selectedRows);
//   }, [selectedRows]);
//   // ////console.log(selectedRows);
//   // ////console.log(selectedRows); // This will log the selectedRows array

//   // Function to handle "Select All" button click
//   // const handleSelectAll = () => {
//   //   const allRows = schdetails.map((_, index) => index);
//   //   setSelectedRows(allRows);
//   // };
//   const handleSelectAll = () => {
//     const allRowIds = schdetails.map((row) => row.SchDetailsID);
//     setSelectedRows(allRowIds);
//     // Retrieve the complete objects for all selected rows
//     const selectedData = schdetails.filter((row) =>
//       allRowIds.includes(row.SchDetailsID)
//     );
//     setSelectedRowData(selectedData);
//   };

//   ////console.log("Selected Rows Data :", selectedRowData);

//   // ////console.log("selectedRows......", selectedRows);

//   // Function to handle "Reverse Selection" button click
//   // const handleReverseSelection = () => {
//   //   const allRows = schdetails.map((_, index) => index);
//   //   const unselectedRows = allRows.filter(
//   //     (index) => !selectedRows.includes(index)
//   //   );
//   //   setSelectedRows(unselectedRows);
//   // };

//   const handleReverseSelection = () => {
//     const allRowIds = schdetails.map((row) => row.SchDetailsID);
//     const unselectedRowIds = allRowIds.filter(
//       (id) => !selectedRows.includes(id)
//     );
//     setSelectedRows(unselectedRowIds);
//   };

//   // Function to update schdetails state in ParentComponent
//   const updateSchdetails = (updatedData) => {
//     setSchdetails(updatedData);
//   };

//   // ////console.log("updatedData", schdetails);
//   return (
// <div>
//   <div>
//     <h4 className="title">Order Schedule Details</h4>
//     {/* <hr className="horizontal-line" /> */}
//     <div className="form-bg">
//       <div className="row">
//         <div className="col-md-8">
//           <label className="form-label">Customer</label>
//           <input type="text" value={tbldata.custname} />
//         </div>
//         <div className="col-md-4">
//           <label className="form-label">Sales contact</label>
//           <input type="text" value={tbldata.selectRow.SalesContact} />
//         </div>
//       </div>

//       <div className="row">
//         <div className="col-md-4">
//           <div style={{ marginBottom: "9px" }}>
//             <label className="form-label">Schedule No</label>
//             <input className="" value={tbldata.selectRow.ScheduleNo} />
//           </div>
//         </div>
//         <div className="col-md-4">
//           <div style={{ marginBottom: "9px" }}>
//             <label className="form-label">Schedule Type</label>
//             <input className="" value={tbldata.selectRow.ScheduleType} />
//           </div>
//         </div>
//         <div className="col-md-4">
//           <div style={{ marginBottom: "9px" }}>
//             <label className="form-label">Schedule status</label>
//             <input className="" value={tbldata.selectRow.Schedule_Status} />
//           </div>
//         </div>
//       </div>

//       <div className="row">
//         <div className="col-md-4">
//           <label className="form-label">Clearance</label>
//           <select className="ip-select">
//             <option value="option 1">a</option>
//             <option value="option 1">b</option>
//             <option value="option 1">c</option>
//           </select>
//         </div>

//         <div className="col-md-4">
//           <label className="form-label">Program Engineer</label>
//           <input className="" value={tbldata.selectRow.Program_Engineer} />
//         </div>
//         <div className="col-md-4">
//           <label className="form-label">PO</label>
//           <input className="" value={tbldata.selectRow.PO} />
//         </div>
//       </div>

//       <div className="row mt-3 mb-4">
//         <div className="col-md-4">
//           <label className="form-label">Target Date</label>
//           <input className="" value={tbldata.selectRow.schTgtDate} />
//           <label className="form-label">Delivary Date</label>
//           <input className="" value={tbldata.selectRow.Delivery_Date} />
//         </div>
//         <div className="col-md-4">
//           <label className="form-label">Special Instructions</label>
//           <textarea
//             style={{ height: "100px" }}
//             className="form-control"
//             value={tbldata.selectRow.Special_Instructions}
//           ></textarea>
//         </div>
//       </div>
//     </div>
//   </div>
//   <button className="button-style" onClick={handleSelectAll}>
//     Select all
//   </button>
//   <button className="button-style" onClick={handleReverseSelection}>
//     Reverse
//   </button>
//   <div className="row">
//     <Tabs id="controlled-tab-example" className="mt-2 mb-2 tab_font">
//       <Tab eventKey="mat_rece" title="Schedule Deatails">
//         <ScheduleDetails
//           schdetails={schdetails}
//           setSchdetails={setSchdetails}
//           selectedRows={selectedRows}
//           setSelectedRows={setSelectedRows}
//           updateSchdetails={updateSchdetails}
//           handleCheckboxChange={handleCheckboxChange}
//           selectedRowData={selectedRowData}
//           setSelectedRowData={setSelectedRowData}
//           tbldata={tbldata}
//         />
//       </Tab>

//       <Tab eventKey="mat_retu" title="Ready For Packing">
//         <ReadyForPacking
//           schdetails={schdetails}
//           setSchdetails={setSchdetails}
//           selectedRows={selectedRows}
//           updateSchdetails={updateSchdetails}
//           handleCheckboxChange={handleCheckboxChange}
//           selectedRowData={selectedRowData}
//           tbldata={tbldata}
//         />
//       </Tab>

//       <Tab eventKey="mat_st_posi" title="Production Rejections">
//         <ProductionRejections
//           schdetails={schdetails}
//           setSchdetails={setSchdetails}
//           selectedRows={selectedRows}
//           updateSchdetails={updateSchdetails}
//           handleCheckboxChange={handleCheckboxChange}
//           selectedRowData={selectedRowData}
//         />
//       </Tab>
//     </Tabs>
//   </div>
// </div>
//   );
// }

// export default ParentComponent;

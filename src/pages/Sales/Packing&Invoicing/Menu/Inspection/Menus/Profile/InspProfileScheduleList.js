// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { Typeahead } from "react-bootstrap-typeahead";
// import {
//   Table,
//   Row,
//   Col,
//   Form,
//   FormLabel,
//   FormCheck,
//   Button,
// } from "react-bootstrap";

// import Axios from "axios";
// import { apipoints } from "../../../../../api/PackInv_API/Inspection/InspProfi";

// const {
//   getRequest,
//   postRequest,
//   request,
// } = require("../../../../../api/apiinstance");
// const { endpoints } = require("../../../../../api/constants");

// function InspProfileScheduleList() {
//   let navigate = useNavigate();

//   const [custdata, setCustData] = useState("");

//   //form data
//   let [custcode, setCustCode] = useState("");

//   useEffect(() => {
//     Axios.get(apipoints.getCustomerdata, {}).then((custdetdata) => {
//       console.log("customer data", custdetdata.data);
//       for (let i = 0; i < custdetdata.length; i++) {
//         custdetdata[i].label = custdetdata[i].Cust_name;
//       }
//       setCustData(custdetdata);
//       console.log("custdetdata", custdetdata);
//     });
//   }, []);

//   // useEffect(() => {
//   //   async function fetchData() {
//   //     postRequest(endpoints.getCustomers, {}, (custdetdata) => {
//   //       for (let i = 0; i < custdetdata.length; i++) {
//   //         custdetdata[i].label = custdetdata[i].Cust_name;
//   //       }
//   //       setCustData(custdetdata);
//   //       console.log("custdetdata", custdetdata);
//   //       // setLoaded(true);
//   //     });
//   //   }
//   //   fetchData();
//   // }, []);

//   // useEffect(() => {
//   //   Axios.get(apipoints.getCustomerdata, {}, (custdetdata) => {
//   //     console.log("dataaa", custdetdata.data);
//   //     for (let i = 0; i < custdetdata.length; i++) {
//   //       custdetdata[i].label = custdetdata[i].Cust_name;
//   //       console.log("ASDFGHJKL", custdetdata[i].label);
//   //     }
//   //     setCustData(custdetdata);
//   //   });
//   // }, []);

//   let selectCust = async (e) => {
//     console.log("cust data = ", e);
//     console.log("cust code = ", e[0].Cust_Code);
//     console.log("table customer = ", custdata);
//     let cust;
//     for (let i = 0; i < custdata.length; i++) {
//       if (custdata[i]["Cust_Code"] === e[0].Cust_Code) {
//         cust = custdata[i];
//         break;
//       }
//     }
//     setCustCode(cust.Cust_Code);

//     postRequest(
//       endpoints.getCustomerDetails,
//       {
//         custcode: cust.Cust_Code,
//       },
//       (resp) => {
//         console.log(resp);
//         let excustdata = resp[0];
//       }
//     );
//   };

//   return (
//     <div>
//       <h4 className="title">Packing Schedules</h4>
//       <div className="row">
//         <div className="col-md-4">
//           {" "}
//           <div>
//             <label className="form-label">Namee</label>
//             <label
//               style={{
//                 color: "#f20707",
//                 fontSize: "16px",
//                 fontWeight: "bold",
//               }}
//             >
//               *
//             </label>
//             {custdata.length > 0 ? (
//               <Typeahead
//                 id="CustName"
//                 options={custdata}
//                 placeholder="Select Customer"
//                 onChange={(label) => selectCust(label)}
//               />
//             ) : (
//               ""
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="row mt-3">
//         <div className="col-md-4">
//           <label className="form-label">Find Schedule</label>
//           <input />
//         </div>
//         <div className="col-md-2 mt-3">
//           <button
//             className="button-style"
//             onClick={() => {
//               navigate("/PackingAndInvoices/Service/FindSchedule");
//             }}
//           >
//             {" "}
//             Open
//           </button>
//         </div>
//       </div>
//       <div className="col-md-4 col-sm-12">
//         <div className="row mt-4">
//           {" "}
//           <div
//             style={{ height: "300px", overflowY: "scroll", marginTop: "25px" }}
//           >
//             <Table striped className="table-data border">
//               <thead className="tableHeaderBGColor tablebody">
//                 <tr>
//                   <th>OrdSchNo</th>
//                   <th>PO</th>
//                 </tr>
//               </thead>

//               <tbody className="tablebody">
//                 <tr>
//                   <td>asdfghj</td>
//                   <td>asdfghj</td>
//                 </tr>
//               </tbody>
//             </Table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default InspProfileScheduleList;

import { React, useState } from "react";
import ScheduleList from "../../InspectionPages/ScheduleList";

function InspProfileScheduleList() {
  const [ProfileType, setProfileType] = useState("Profile");
  return (
    <>
      <ScheduleList Type={ProfileType} />
    </>
  );
}

export default InspProfileScheduleList;

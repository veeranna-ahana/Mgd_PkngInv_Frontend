// import React, { useState, useEffect } from "react";
// // import ProfileSRP from "../Components/ProfileSRP.js";

// const { getRequest, postRequest } = require("../../../../../api/apiinstance");
// const { endpoints } = require("../../../../../api/constants");

// function InspServiceFindSchedule() {
//   const [data, setData] = useState();

//   // useEffect(() => {
//   //   async function getTestData() {
//   //     getRequest(endpoints.getCustomerData, {}, (custdetdata) => {
//   //       console.log("data", custdetdata);
//   //       setData(custdetdata);
//   //     });
//   //   }
//   //   getTestData();
//   // }, []);

//   useEffect(() => {
//     async function fetchData() {
//       const response = await fetch(
//         "http://localhost:3001/schedulelist/getallcustomers"
//       );
//       const data = await response.json();
//       console.log("data", data);
//       setData(data);
//     }

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <div>
//         <h4 className="title">Order Schedule Details</h4>
//         {/* <hr className="horizontal-line" /> */}

//         <div className="row">
//           <div className="col-md-8">
//             <label className="form-label">Customer</label>
//             <input type="text" />
//           </div>
//           <div className="col-md-4">
//             <label className="form-label">Select contact</label>
//             <input type="text" />
//           </div>
//           {/* <div className="col-md-4">
//             <div className="row justify-content-space-between">
//               <div className="col-md-4">
//                 <label>Code</label>
//                 <input className="" />
//               </div>
//               <div className="col-md-8  ">
//                 <label className="">Email</label>
//                 <input className="" />
//               </div>
//             </div>
//           </div> */}
//         </div>

//         <div className="row">
//           <div className="col-md-4">
//             <div style={{ marginBottom: "9px" }}>
//               <label className="form-label">Schedule No</label>
//               <input className="" />
//             </div>
//           </div>
//           <div className="col-md-4">
//             <div style={{ marginBottom: "9px" }}>
//               <label className="form-label">Schedule Type</label>
//               <input className="" />
//             </div>
//           </div>
//           <div className="col-md-4">
//             <div style={{ marginBottom: "9px" }}>
//               <label className="form-label">Schedule status</label>
//               <input className="" />
//             </div>
//           </div>

//           {/* <div className="col-md-4">
//             <div style={{ marginBottom: "9px" }}>
//               <label className="">Country</label>
//               <input className="" />
//             </div>
//             <div style={{ marginBottom: "9px" }}>
//               <label className="form-label">State</label>
//               <select className="ip-select">
//                 <option value="option 1"> Karnataka</option>
//                 <option value="option 2">Delhi</option>
//                 <option value="option 3">Mumbai</option>
//               </select>
//             </div>
//           </div> */}
//         </div>

//         <div className="row">
//           <div className="col-md-4">
//             <label className="form-label">Clearance</label>
//             <select className="ip-select">
//               <option value="option 1">a</option>
//               <option value="option 1">b</option>
//               <option value="option 1">c</option>
//             </select>
//           </div>

//           <div className="col-md-4">
//             <label className="form-label">Program Engineer</label>
//             <input className="" />
//           </div>
//           <div className="col-md-4">
//             <label className="form-label">PO</label>
//             <input className="" />
//           </div>
//         </div>

//         <div className="row mt-3">
//           <div className="col-md-4">
//             <label className="form-label">Target Date</label>
//             <input className="" />
//             <label className="form-label">Delivary Date</label>
//             <input className="" />
//           </div>
//           <div className="col-md-4">
//             <label className="form-label">Special Instructions</label>
//             <textarea
//               style={{ height: "100px" }}
//               className="form-control"
//             ></textarea>
//           </div>
//         </div>
//       </div>

//       <div className="row mt-4">
//         <ProfileSRP />
//       </div>
//       {/* <div>asdfghjkl</div> */}
//     </div>
//   );
// }

// export default InspServiceFindSchedule;

import { React, useState } from "react";
import FindSchedule from "../../InspectionPages/FindSchedule";

function InspServiceFindSchedule() {
  const [ServiceType, setServiceType] = useState("Service");
  return (
    <>
      <FindSchedule Type={ServiceType} />
    </>
  );
}

export default InspServiceFindSchedule;

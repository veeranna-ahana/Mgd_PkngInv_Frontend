// import React, { useState, useEffect } from "react";
// import Axios from "axios";
// import { apipoints } from "../../../../../../api/PackInv_API/Inspection/InspProfi";
// import { Table } from "react-bootstrap";
// // Table
// export default function ProductionRejections(props) {
//   const [selectRejRow, setselectRejRow] = useState([]);
//   // const [rejectionData, setRejectionData] = useState();
//   const [intRejeData, setIntRejeData] = useState();
//   const { orderScheduleDetailsData, selectedReadyForPackingRows } = props;
//   const [scId, setscId] = useState();
//   const [rejectionData, setRejectionData] = useState();

//   // //console.log("props.rejectionData", rejectionData);
//   // //console.log(
//   //   "orderScheduleDetailsData[0]?.scheduleId",
//   //   orderScheduleDetailsData[0]?.ScheduleId
//   // );

//   let SchIdd = orderScheduleDetailsData[0]?.ScheduleId;

//   console.log("first.....", SchIdd);
//   Axios.post(apipoints.testRejectData, {
//     scId: orderScheduleDetailsData[0]?.ScheduleId,
//   }).then((res) => {
//     setRejectionData(res.data);
//   });

//   // console.log("scId", SchIdd);
//   // Axios.post(apipoints.testRejectData, {
//   //   scId: orderScheduleDetailsData[0]?.ScheduleId,
//   // }).then((res) => {
//   //   setRejectionData(res.data);
//   // });

//   const handleRowClick = (row) => {
//     setselectRejRow((prevSelectedRow) =>
//       prevSelectedRow === row ? null : row
//     );

//     Axios.post(apipoints.testInternalRejectData, {
//       row,
//     }).then((res) => {
//       //console.log("Internalressss...............2", res.data);
//       setIntRejeData(res.data);
//     });
//   };
//   // const handleRowClick = (row) => {
//   //   setselectRejRow((prevSelectedRow) =>
//   //     prevSelectedRow && prevSelectedRow.id === row.id ? null : row
//   //   );

//   //   Axios.post(apipoints.testInternalRejectData, {
//   //     row,
//   //   }).then((res) => {
//   //     //console.log("Internalressss...............2", res.data);
//   //     setIntRejeData(res.data);
//   //   });
//   // };

//   //console.log("Selected Row:", selectRejRow);

//   const formatReportDate = (dateString) => {
//     const date = new Date(dateString);
//     const formattedDate = date.toLocaleDateString("en-GB");
//     return formattedDate;
//   };
//   return (
//     <>
//       {" "}
//       <div>
//         <div className="row">
//           <div className="col-md-6 col-sm-12">
//             <div style={{ maxHeight: "400px", overflow: "auto" }}>
//               <Table striped className="table-data border">
//                 <thead
//                   className="tableHeaderBGColor"
//                   style={{ whiteSpace: "nowrap" }}
//                 >
//                   <tr>
//                     <th>Rejection Rprt No</th>
//                     <th>Raised by</th>
//                     <th>internal</th>
//                     <th>Report Date</th>
//                     <th>Rejection value</th>
//                     <th>Accepted value</th>
//                   </tr>
//                 </thead>

//                 <tbody className="tablebody" style={{ textAlign: "center" }}>
//                   {rejectionData?.map((val, i, row) => (
//                     <tr
//                       key={val.id}
//                       onClick={() => handleRowClick(val)}
//                       className={
//                         selectRejRow && selectRejRow === val
//                           ? "selectedRowClr"
//                           : ""
//                       }
//                     >
//                       <td>{rejectionData[i].Rej_ReportNo}</td>
//                       <td>{rejectionData[i].RaisedBy}</td>
//                       <td>{rejectionData[i].Internal}</td>
//                       <td>
//                         {formatReportDate(rejectionData[i].Rej_ReportDate)}
//                       </td>
//                       <td>{rejectionData[i].RejctionValue}</td>
//                       <td>{rejectionData[i].AcceptedValue}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//             </div>
//           </div>
//           <div className="col-md-6 col-sm-12">
//             <div style={{ maxHeight: "400px", overflow: "auto" }}>
//               <Table striped className="table-data border">
//                 <thead className="tableHeaderBGColor tablebody">
//                   <tr>
//                     <th>Dwg Name</th>
//                     <th>Qty Rejected</th>
//                     <th>Rejection Reason</th>
//                   </tr>
//                 </thead>

//                 <tbody className="tablebody" style={{ textAlign: "center" }}>
//                   {intRejeData?.map((val, i, row) => (
//                     <tr>
//                       <td>{intRejeData[i].Dwg_Name}</td>
//                       <td>{intRejeData[i].Qty_Rejected}</td>
//                       <td>{intRejeData[i].Rejection_Reason}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// // import React from "react";
// // import Table from "react-bootstrap/Table";

// // function ProductionRejections() {
// //   return (
// // <div>
// //   <div className="row">
// //     <div className="col-md-6 col-sm-12">
// //       <div style={{ height: "400px", overflowY: "scroll" }}>
// //         <Table striped className="table-data border">
// //           <thead
// //             className="tableHeaderBGColor"
// //             style={{ whiteSpace: "nowrap" }}
// //           >
// //             <tr>
// //               <th>Rejection Rprt No</th>
// //               <th>Raised by</th>
// //               <th>internal</th>
// //               <th>Report Date</th>
// //               <th>Rejection value</th>
// //               <th>Accepted value</th>
// //             </tr>
// //           </thead>

// //           <tbody className="tablebody">
// //             <tr>
// //               <td>asdfghj</td>
// //               <td>asdfghj</td>
// //               <td>asdfghj</td>
// //               <td>asdfghj</td>
// //               <td>asdfghj</td>
// //               <td>asdfghj</td>
// //             </tr>
// //           </tbody>
// //         </Table>
// //       </div>
// //     </div>
// //     <div className="col-md-6 col-sm-12">
// //       <div style={{ height: "400px", overflowY: "scroll" }}>
// //         <Table striped className="table-data border">
// //           <thead className="tableHeaderBGColor tablebody">
// //             <tr>
// //               <th>Dwg Name</th>
// //               <th>Qty Rejected</th>
// //               <th>Rejection Reason</th>
// //             </tr>
// //           </thead>

// //           <tbody className="tablebody">
// //             <tr>
// //               <td>asdfghj</td>
// //               <td>asdfghj</td>
// //               <td>asdfghj</td>
// //             </tr>
// //           </tbody>
// //         </Table>
// //       </div>
// //     </div>
// //   </div>
// // </div>
// //   );
// // }

// // export default ProductionRejections;

import React, { useState, useEffect } from "react";
import Axios from "axios";
import { apipoints } from "../../../../../../api/PackInv_API/Inspection/InspProfi";
import { Table } from "react-bootstrap";

export default function ProductionRejections(props) {
  const [selectRejRow, setselectRejRow] = useState([]);
  const [intRejeData, setIntRejeData] = useState();
  const { orderScheduleDetailsData, selectedReadyForPackingRows } = props;
  const [rejectionData, setRejectionData] = useState();

  useEffect(() => {
    // Move the API call inside useEffect to prevent continuous requests
    const fetchData = async () => {
      try {
        const res = await Axios.post(apipoints.testRejectData, {
          scId: orderScheduleDetailsData[0]?.ScheduleId,
        });
        setRejectionData(res.data);
      } catch (error) {
        console.error("Error fetching rejection data:", error);
      }
    };

    if (orderScheduleDetailsData && orderScheduleDetailsData[0]?.ScheduleId) {
      fetchData();
    }
  }, [orderScheduleDetailsData]); // Dependency array to ensure the effect runs when orderScheduleDetailsData changes

  const handleRowClick = (row) => {
    setselectRejRow((prevSelectedRow) =>
      prevSelectedRow === row ? null : row
    );

    Axios.post(apipoints.testInternalRejectData, {
      row,
    }).then((res) => {
      setIntRejeData(res.data);
    });
  };

  const formatReportDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-GB");
    return formattedDate;
  };

  return (
    <>
      <div>
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <div style={{ maxHeight: "400px", overflow: "auto" }}>
              <Table striped className="table-data border">
                <thead
                  className="tableHeaderBGColor"
                  style={{ whiteSpace: "nowrap" }}
                >
                  <tr>
                    <th>Rejection Rprt No</th>
                    <th>Raised by</th>
                    <th>internal</th>
                    <th>Report Date</th>
                    <th>Rejection value</th>
                    <th>Accepted value</th>
                  </tr>
                </thead>

                <tbody className="tablebody" style={{ textAlign: "center" }}>
                  {rejectionData?.map((val, i, row) => (
                    <tr
                      key={val.id}
                      onClick={() => handleRowClick(val)}
                      className={
                        selectRejRow && selectRejRow === val
                          ? "selectedRowClr"
                          : ""
                      }
                    >
                      <td>{rejectionData[i].Rej_ReportNo}</td>
                      <td>{rejectionData[i].RaisedBy}</td>
                      <td>{rejectionData[i].Internal}</td>
                      <td>
                        {formatReportDate(rejectionData[i].Rej_ReportDate)}
                      </td>
                      <td>{rejectionData[i].RejctionValue}</td>
                      <td>{rejectionData[i].AcceptedValue}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div style={{ maxHeight: "400px", overflow: "auto" }}>
              <Table striped className="table-data border">
                <thead className="tableHeaderBGColor tablebody">
                  <tr>
                    <th>Dwg Name</th>
                    <th>Qty Rejected</th>
                    <th>Rejection Reason</th>
                  </tr>
                </thead>

                <tbody className="tablebody" style={{ textAlign: "center" }}>
                  {intRejeData?.map((val, i, row) => (
                    <tr>
                      <td>{intRejeData[i].Dwg_Name}</td>
                      <td>{intRejeData[i].Qty_Rejected}</td>
                      <td>{intRejeData[i].Rejection_Reason}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

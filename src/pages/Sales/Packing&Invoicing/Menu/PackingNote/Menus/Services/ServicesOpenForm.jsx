import { useState } from "react";
import React from "react";
import PNAccountSelect from "../../PackingNotePages/PNAccountSelect";

export default function ServicesOpenForm() {
  const [ServicesPNType, setServicesPNType] = useState("Services");
  return (
    <>
      <PNAccountSelect PNType={ServicesPNType} />
      {/* <div>MiscOpenForm</div> */}
    </>
  );
}

// import React from 'react'
// import { Table } from 'react-bootstrap'
// import { Link } from 'react-router-dom'

// export default function ServicesOpenForm() {
//   return (
//     <div>
//       <div className="col-md-12">
//         <h4 className="title">Packing Note List</h4>
//       </div>
//       <h5 className="mt-3">
//         <b>PN List : Services Status Packed</b>
//       </h5>
//       <div>
//         <Link to={"/PackingAndInvoices/PakingNote/Services"}>

//           <button className="button-style " style={{ width: "150px" }}>
//             Open
//           </button>
//         </Link>
//       </div>
//       <div className="mt-3">
//         <Table striped className="table-data border" style={{ border: "1px",width:"600px" }}>
//           <thead className="tableHeaderBGColor">
//             <tr>
//               <th>Inv Type</th>
//               <th>PN No</th>
//               <th>PN Date</th>
//               <th>Customer Name</th>
//             </tr>
//           </thead>
//           <tbody className="tablebody"></tbody>
//         </Table>
//       </div>

//     </div>
//   )
// }
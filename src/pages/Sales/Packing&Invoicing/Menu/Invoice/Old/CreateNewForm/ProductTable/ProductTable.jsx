import React, { useEffect, useState } from "react";
import { Form, Tab, Table, Tabs } from "react-bootstrap";

export default function ProductTable(props) {
  // console.log("in product table", props);
  return (
    <>
      <div className="px-1">
        <Table striped className="table-data border">
          <thead className="tableHeaderBGColor">
            <tr>
              <th>SL No</th>
              <th>Description of Good</th>
              <th>Material</th>
              <th>Excise Classification</th>
              <th>Quantity</th>
              <th>Unit Weight</th>
              <th>Total Weight</th>
              <th>Unit Rate</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody className="tablebody">
            {props.invDetailsData?.map((tableData, key) => (
              <>
                <tr>
                  <td>{key + 1}</td>
                  <td>{tableData.Dwg_No}</td>
                  <td>{tableData.Material}</td>
                  <td>{tableData.Excise_CL_no}</td>
                  <td>{tableData.Qty}</td>
                  <td>{tableData.Unit_Wt}</td>
                  <td>{tableData.DC_Srl_Wt}</td>
                  <td>{tableData.Unit_Rate}</td>
                  <td>{tableData.DC_Srl_Amt}</td>
                </tr>
              </>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

// {props.secondary ? (
//   <tbody className="tablebody">
//     {props.secondary.map((val, i) => (
//       <tr>
//         <td>{i + 1}</td>
//         <td>{val.Dwg_No}</td>
//         <td>{val.Mtrl}</td>
//         <td>{val.Qty}</td>
//         <td>{val.Excise_CL_no}</td>
//         <td>{val.Unit_Wt}</td>
//         <td>{val.DC_Srl_Wt}</td>
//         <td>{val.Unit_Rate}</td>
//         <td>{val.DC_Srl_Amt}</td>
//       </tr>
//     ))}
//   </tbody>
// ) : props.tableRow.length === 0 ? (
//   <div>
//     <b>No Data Found...!</b>
//   </div>
// ) : (
//   <tbody className="tablebody">
//     {props.tableRow.map((val, i) => (
//       <tr>
//         <td>{val.desc}</td>
//         <td>{val.material}</td>
//         <td>{val.quantity}</td>
//         <td>{val.excise}</td>
//         <td>{val.unitWeight}</td>
//         <td>{val.totalWeight}</td>
//         <td>{val.unitRate}</td>
//         <td>{val.totalAmount}</td>
//       </tr>
//     ))}
//   </tbody>
// )}

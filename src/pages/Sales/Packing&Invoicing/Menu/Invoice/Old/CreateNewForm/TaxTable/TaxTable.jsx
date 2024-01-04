import React, { useEffect, useState } from "react";
import { Form, Tab, Table, Tabs } from "react-bootstrap";

export default function TaxTable(props) {
  // console.log("props", props);
  return (
    <>
      <div className="px-1">
        <Table striped className="table-data border" style={{ border: "1px" }}>
          <thead className="tableHeaderBGColor">
            <tr>
              <th>Tax Name</th>
              <th>Taxable Amount</th>
              <th>Tax Percentage</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody className="tablebody">
            {props.invTaxData?.map((taxValue, key) => (
              <tr>
                <td>{taxValue.Tax_Name}</td>
                <td>{parseFloat(taxValue.TaxableAmount).toFixed(2)}</td>
                <td>{parseFloat(taxValue.TaxPercent).toFixed(2)}</td>
                <td>{parseFloat(taxValue.TaxAmt).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

// <tbody className="tablebody">
//   {props?.secondary?.length > 0
//     ? props?.newSelectedTaxes?.map((val, i) => (
//         // <span>{val.taxAmount}</span>
//         <tr>
//           <td>{val.Tax_Name}</td>
//           <td>{parseFloat(val.TaxableAmount).toFixed(2)}</td>
//           <td>{parseFloat(val.TaxPercent).toFixed(2)}</td>
//           <td>{parseFloat(val.TaxAmt).toFixed(2)}</td>
//         </tr>
//         // <option value={i}>{val.TaxName}</option>
//       ))
//     : props?.SelectedTaxes?.map((val, i) => (
//         // <span>{val.taxAmount}</span>
//         <tr>
//           <td>{val.taxName}</td>
//           <td>{val.taxableAmount.toFixed(2)}</td>
//           <td>{parseFloat(val.taxPercentage).toFixed(2)}</td>
//           <td>{val.taxAmount.toFixed(2)}</td>
//         </tr>
//         // <option value={i}>{val.TaxName}</option>
//       ))}

//   {/* {props.SelectedTaxes.map((val, i) => (
//     <tr>
//       <td>{val.taxName}</td>
//       <td>test1</td>
//       <td>{val.taxPercentage}</td>
//       <td>{val.taxAmount}</td>
//     </tr>
//   ))} */}

//   {/*
//   <tr>
//     <td>test1</td>
//     <td>test1</td>
//     <td>test1</td>
//     <td>test1</td>
//   </tr>
//   <tr>
//     <td>test1</td>
//     <td>test1</td>
//     <td>test1</td>
//     <td>test1</td>
//   </tr>
//   <tr>
//     <td>test1</td>
//     <td>test1</td>
//     <td>test1</td>
//     <td>test1</td>
//   </tr> */}
// </tbody>

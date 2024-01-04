import React, { useEffect, useState } from "react";
import { Form, Tab, Table, Tabs } from "react-bootstrap";

export default function TaxTable(props) {
  return (
    <div>
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
          {props.invTaxData?.map((val) => (
            <>
              <tr>
                <td>{val.Tax_Name}</td>
                <td>{parseFloat(val.TaxableAmount).toFixed(2)}</td>
                <td>{parseFloat(val.TaxPercent).toFixed(2)}%</td>
                <td>{parseFloat(val.TaxAmt).toFixed(2)}</td>
              </tr>
            </>
          ))}

          {/* {props.selectedTax
            ? props.TaxDropDownData?.map((val) =>
                val.Tax_Percent === props.selectedTax ? (
                  <>
                    <tr>
                      <td>{val.TaxName}</td>
                      <td>{parseFloat(props.netAmount).toFixed(2)}</td>
                      <td>{parseFloat(val.Tax_Percent).toFixed(2)}%</td>
                      <td>
                        {parseFloat(
                          (props.netAmount / 100) * parseFloat(val.Tax_Percent)
                        ).toFixed(2)}
                      </td>
                    </tr>
                  </>
                ) : null
              )
            : props.taxDataFromDB?.map((val) => (
                <>
                  <tr>
                    <td>{val.Tax_Name}</td>
                    <td>{parseFloat(val.TaxableAmount).toFixed(2)}</td>
                    <td>{parseFloat(val.TaxPercent).toFixed(2)}%</td>
                    <td>{parseFloat(val.TaxAmt).toFixed(2)}</td>
                  </tr>
                </>
              ))} */}
        </tbody>
      </Table>
    </div>
  );
}

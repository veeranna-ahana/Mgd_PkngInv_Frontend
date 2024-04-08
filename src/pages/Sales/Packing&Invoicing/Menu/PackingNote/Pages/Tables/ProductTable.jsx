import React, { useState } from "react";
import { Form, Tab, Table, Tabs } from "react-bootstrap";

import { FaArrowUp } from "react-icons/fa";

export default function ProductTable(props) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const sortedData = () => {
    let dataCopy = [...props.invDetailsData];

    if (sortConfig.key) {
      dataCopy.sort((a, b) => {
        if (!parseFloat(a[sortConfig.key]) || !parseFloat(b[sortConfig.key])) {
          // console.log("string");
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "asc" ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "asc" ? 1 : -1;
          }
          return 0;
        } else {
          // console.log("number");
          if (parseFloat(a[sortConfig.key]) < parseFloat(b[sortConfig.key])) {
            return sortConfig.direction === "asc" ? -1 : 1;
          }
          if (parseFloat(a[sortConfig.key]) > parseFloat(b[sortConfig.key])) {
            return sortConfig.direction === "asc" ? 1 : -1;
          }
          return 0;
        }
      });
    }

    return dataCopy;
  };

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div>
      <Table striped className="table-data border" style={{ border: "1px" }}>
        <thead className="tableHeaderBGColor">
          <tr>
            <th>SL No</th>
            <th onClick={() => requestSort("Dwg_No")} className="cursor">
              Drawing Name
              <FaArrowUp
                className={
                  sortConfig.key === "Dwg_No"
                    ? sortConfig.direction === "desc"
                      ? "rotateClass"
                      : ""
                    : "displayNoneClass"
                }
              />
            </th>
            <th onClick={() => requestSort("Mtrl")} className="cursor">
              Material
              <FaArrowUp
                className={
                  sortConfig.key === "Mtrl"
                    ? sortConfig.direction === "desc"
                      ? "rotateClass"
                      : ""
                    : "displayNoneClass"
                }
              />
            </th>
            <th onClick={() => requestSort("Qty")} className="cursor">
              Quantity
              <FaArrowUp
                className={
                  sortConfig.key === "Qty"
                    ? sortConfig.direction === "desc"
                      ? "rotateClass"
                      : ""
                    : "displayNoneClass"
                }
              />
            </th>
            <th onClick={() => requestSort("Unit_Rate")} className="cursor">
              Unit Rate
              <FaArrowUp
                className={
                  sortConfig.key === "Unit_Rate"
                    ? sortConfig.direction === "desc"
                      ? "rotateClass"
                      : ""
                    : "displayNoneClass"
                }
              />
            </th>
            <th onClick={() => requestSort("DC_Srl_Amt")} className="cursor">
              Total
              <FaArrowUp
                className={
                  sortConfig.key === "DC_Srl_Amt"
                    ? sortConfig.direction === "desc"
                      ? "rotateClass"
                      : ""
                    : "displayNoneClass"
                }
              />
            </th>
          </tr>
        </thead>
        <tbody className="tablebody">
          {sortedData().map((data, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{data.Dwg_No}</td>
              <td>{data.Mtrl}</td>
              <td>{data.Qty}</td>
              {props.loadRateEvent || props.invRegisterData.Inv_No ? (
                // props.loadRateEvent ||
                // props.invRegisterData.Inv_No != "" ||
                // props.invRegisterData.Inv_No != undefined ||
                // props.invRegisterData.Inv_No != null

                <>
                  <td>{parseFloat(data.Unit_Rate).toFixed(2)}</td>
                  <td>{parseFloat(data.DC_Srl_Amt).toFixed(2)}</td>
                </>
              ) : (
                <>
                  <td>---</td>
                  <td>---</td>
                </>
              )}
            </tr>
          ))}
          {/* {props.invDetailsData.map((val, i) => (
            <tr>
              <td>{i+1}</td>
              <td>{val.Dwg_No}</td>
              <td>{val.Mtrl}</td>
              <td>{val.Qty}</td>
              {props.loadRateEvent || props.invRegisterData.Inv_No ? (
                // props.loadRateEvent ||
                // props.invRegisterData.Inv_No != "" ||
                // props.invRegisterData.Inv_No != undefined ||
                // props.invRegisterData.Inv_No != null

                <>
                  <td>
                    {(
                      parseFloat(val.JW_Rate) + parseFloat(val.Mtrl_rate)
                    ).toFixed(2)}
                  </td>
                  <td>
                    {(
                      parseFloat(val.Qty) *
                      (parseFloat(val.JW_Rate) + parseFloat(val.Mtrl_rate))
                    ).toFixed(2)}
                  </td>
                </>
              ) : (
                <>
                  <td>---</td>
                  <td>---</td>
                </>
              )}
            </tr>
          ))} */}
        </tbody>
      </Table>
    </div>
  );
}

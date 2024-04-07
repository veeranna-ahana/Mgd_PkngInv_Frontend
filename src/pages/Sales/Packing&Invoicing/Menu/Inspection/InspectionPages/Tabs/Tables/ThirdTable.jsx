import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

import { FaArrowUp } from "react-icons/fa";

export default function ThirdTable(props) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const modifyInvDetailsData = (e, key) => {
    const newArray = [];

    for (let i = 0; i < props.invDetailsData.length; i++) {
      const element = props.invDetailsData[i];

      if (i === key) {
        element[e.target.name] = parseFloat(e.target.value);
      }

      newArray.push(element);
    }

    props.setInvDetailsData(newArray);
  };

  const sortedData = () => {
    let dataCopy = [...props.invDetailsData];

    if (sortConfig.key) {
      dataCopy.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
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
    <>
      <Table striped className="table-data border" style={{ border: "1px" }}>
        <thead className="tableHeaderBGColor">
          <tr>
            <th onClick={() => requestSort("Dwg_No")} className="cursor">
              Dwg No
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
              Qty
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
            <th onClick={() => requestSort("Unit_Wt")} className="cursor">
              Unit Wt
              <FaArrowUp
                className={
                  sortConfig.key === "Unit_Wt"
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
          {sortedData().map((val, key) => (
            <tr>
              <td>{val.Dwg_No}</td>
              <td>{val.Mtrl}</td>
              <td>
                <input
                  type="number"
                  name="Qty"
                  disabled={val.DespStatus != "Draft"}
                  className={val.DespStatus != "Draft" ? "input-disabled" : ""}
                  style={{ background: "none", border: "none" }}
                  value={parseFloat(val.Qty)}
                  onChange={(e) => {
                    modifyInvDetailsData(e, key);
                  }}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="Unit_Wt"
                  disabled={val.DespStatus != "Draft"}
                  className={val.DespStatus != "Draft" ? "input-disabled" : ""}
                  style={{ background: "none", border: "none" }}
                  value={parseFloat(val.Unit_Wt)}
                  onChange={(e) => {
                    modifyInvDetailsData(e, key);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

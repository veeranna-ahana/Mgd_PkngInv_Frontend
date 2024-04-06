import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
import { apipoints } from "../../../../../api/PackInv_API/PackingNote/PackingNote";
import { FaArrowUp } from "react-icons/fa";

export default function ProfileOpenForm(props) {
  const [PNType, setPNType] = useState(props.PNType);
  const [Status, setStatus] = useState("Packed");
  const [custCode, setCustCode] = useState();
  const [selectRow, setSelectRow] = useState();

  const [tableData, setTableData] = useState([]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  useEffect(() => {
    Axios.post(apipoints.pnprofileinvoices, {
      PNType: PNType,
      Status: Status,
      custCode: custCode,
    }).then((res) => {
      setTableData(res.data);
    });
  }, []);

  const selectedRowFun = (val) => {
    setSelectRow(val);
  };

  const sortedData = () => {
    let dataCopy = [...tableData];

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
      <div className="">
        <h4 className="title">Packing Note List</h4>
      </div>
      <h5 className="mt-1" style={{ fontSize: "14px" }}>
        <b>
          PN List : {PNType} Status {Status}
        </b>
      </h5>
      <div className="row">
        <div
          className="col-md-8"
          style={{
            maxHeight: "450px",
            overflow: "auto",
          }}
        >
          <Table
            striped
            className="table-data border"
            style={{
              border: "1px",
            }}
          >
            <thead className="tableHeaderBGColor">
              <tr>
                <th onClick={() => requestSort("DC_InvType")}>
                  Inv Type
                  <FaArrowUp
                    className={
                      sortConfig.key === "DC_InvType"
                        ? sortConfig.direction === "desc"
                          ? "rotateClass"
                          : ""
                        : "displayNoneClass"
                    }
                  />
                </th>
                <th onClick={() => requestSort("DC_No")}>
                  PN No
                  <FaArrowUp
                    className={
                      sortConfig.key === "DC_No"
                        ? sortConfig.direction === "desc"
                          ? "rotateClass"
                          : ""
                        : "displayNoneClass"
                    }
                  />
                </th>
                <th onClick={() => requestSort("DC_Date")}>
                  PN Date
                  <FaArrowUp
                    className={
                      sortConfig.key === "DC_Date"
                        ? sortConfig.direction === "desc"
                          ? "rotateClass"
                          : ""
                        : "displayNoneClass"
                    }
                  />
                </th>
                <th onClick={() => requestSort("Cust_Name")}>
                  Customer Name
                  <FaArrowUp
                    className={
                      sortConfig.key === "Cust_Name"
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
                <tr
                  key={index}
                  onClick={() => selectedRowFun(data.DC_Inv_No)}
                  className={
                    data.DC_Inv_No === selectRow ? "selectedRowClr" : ""
                  }
                  style={{ cursor: "pointer" }}
                >
                  <td>{data.DC_InvType}</td>
                  <td>{data.DC_No}</td>
                  <td>{data.Printable_DC_Date}</td>
                  <td>{data.Cust_Name}</td>
                </tr>
              ))}

              {/* {tableData.map((val) => (
                <tr
                  onClick={() => selectedRowFun(val.DC_Inv_No)}
                  className={
                    val.DC_Inv_No === selectRow ? "selectedRowClr" : ""
                  }
                >
                  <td>{val.DC_InvType}</td>
                  <td>{val.DC_No}</td>
                  <td>{val.DC_Date}</td>
                  <td>{val.Cust_Name}</td>
                </tr>
              ))} */}
            </tbody>
          </Table>
        </div>

        <div className="col-md-4">
          <div className="d-flex flex-row justify-content-between">
            <div>
              {selectRow ? (
                PNType === "Misc" ? (
                  <Link
                    to={`/PackingAndInvoices/Invoice/InvoiceDetails`}
                    state={selectRow}
                  >
                    <button className="button-style group-button">Open</button>
                  </Link>
                ) : (
                  <Link
                    to={`/PackingAndInvoices/PackingNote/Description`}
                    state={selectRow}
                  >
                    <button className="button-style group-button">Open</button>
                  </Link>
                )
              ) : (
                <button className="button-style button-disabled" disabled>
                  Open
                </button>
              )}
            </div>
            <div style={{ width: "42%" }}>
              <Link to="/PackingAndInvoices">
                <button className="button-style" style={{ float: "right" }}>
                  Close
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

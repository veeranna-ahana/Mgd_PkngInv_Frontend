import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
import { apipoints } from "../../../../../api/PackInv_API/PackingNote/PackingNote";

export default function ProfileOpenForm(props) {
  const [PNType, setPNType] = useState(props.PNType);
  const [Status, setStatus] = useState("Packed");
  const [custCode, setCustCode] = useState();
  const [selectRow, setSelectRow] = useState();

  const [tableData, setTableData] = useState([]);

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
                <th>Inv Type</th>
                <th>PN No</th>
                <th>PN Date</th>
                <th>Customer Name</th>
              </tr>
            </thead>
            <tbody className="tablebody">
              {tableData.map((val) => (
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
              ))}
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

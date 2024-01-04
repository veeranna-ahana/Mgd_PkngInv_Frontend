import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { usePackAndInvContext } from "../../../../../../context/PackAndInvContext";
import { apipoints } from "../../../../../api/PackInv_API/ReturnableDC/ReturnableDC";
import Axios from "axios";

function DCList() {
  const { formData, updateFormData } = usePackAndInvContext();
  const [statusData, setStatusData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  console.log("selectedRow ", selectedRow);

  const handleRowSelect = (DcInvNo) => {
    setSelectedRow(selectedRow === DcInvNo ? null : DcInvNo);
  };

  useEffect(() => {
    console.log("Selected Customer from Context:", formData.selectedCustomer);
  }, [formData.selectedCustomer]);

  const handleCreatedStatusData = async () => {
    try {
      const response = await Axios.get(apipoints.draftData, {
        params: { status: "Created" },
      });
      setStatusData(response.data);
    } catch (error) {
      console.log("Error fetching Created status data", error);
    }
  };

  const handleDispachedStatusData = async () => {
    try {
      const response = await Axios.get(apipoints.dispatchedData, {
        params: { status: "Despatched" },
      });
      setStatusData(response.data);
    } catch (error) {
      console.log("Error fetching Created status data", error);
    }
  };

  const handleClosedStatusData = async () => {
    try {
      const response = await Axios.get(apipoints.closedData, {
        params: { status: "Closed" },
      });
      setStatusData(response.data);
    } catch (error) {
      console.log("Error fetching Created status data", error);
    }
  };

  const handleAllStatusData = async () => {
    try {
      const response = await Axios.get(apipoints.allData);
      setStatusData(response.data);
    } catch (error) {
      console.log("Error fetching Created status data", error);
    }
  };

  return (
    <div>
      <div className="col-md-12">
        <h4 className="title">Packing Note List</h4>
      </div>
      <h5 className="mt-3">
        <b>PN List : Returnable DC Status</b>
      </h5>

      <div className="p-2" style={{ backgroundColor: "#e6e6e6" }}>
        <h5>
          <b>Select Status</b>
        </h5>

        <div className="row mt-2">
          <div className="col-md-3">
            <div
              class="form-check form-check-inline align-items-center"
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              <input
                class="form-check-input "
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="Created"
                onChange={() => handleCreatedStatusData("Created")}
              />
              <label
                className="form-label "
                for="inlineRadio1"
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginLeft: "5px",
                }}
              >
                Created
              </label>
            </div>
          </div>
          <div className="col-md-3">
            <div
              class="form-check form-check-inline"
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="Dispatched"
                onChange={() => handleDispachedStatusData("Dispatched")}
              />
              <label
                className="form-label"
                for="inlineRadio2"
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginLeft: "5px",
                }}
              >
                Dispatched
              </label>
            </div>
          </div>
          <div className="col-md-3">
            <div
              class="form-check form-check-inline"
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio3"
                value="Closed"
                onChange={() => handleClosedStatusData("Closed")}
              />
              <label
                className="form-label"
                for="inlineRadio3"
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginLeft: "5px",
                }}
              >
                Closed
              </label>
            </div>
          </div>
          <div className="col-md-3">
            <div
              class="form-check form-check-inline"
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio4"
                value="All"
              />
              <label
                className="form-label"
                for="inlineRadio4"
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginLeft: "5px",
                }}
              >
                All
              </label>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <Link to={`/PackingAndInvoices/ReturnableDC/DCCreateNew`}>
            <button className="button-style" style={{ width: "150px" }}>
              Open
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-3">
        <Table
          striped
          className="table-data border"
          style={{ border: "1px", width: "600px" }}
        >
          <thead className="tableHeaderBGColor">
            <tr>
              <th>PN No</th>
              <th>PN Date</th>
              <th>Customer Name</th>
            </tr>
          </thead>

          <tbody className="tablebody">
            {statusData.map((data, index) => (
              <tr
                key={index}
                onClick={() => handleRowSelect(data.DC_Inv_No)}
                className={`${
                  data.DC_Inv_No === selectedRow ? "selected-row" : ""
                } ${data.DC_Inv_No === selectedRow ? "selectedRowClr" : ""}`}
                style={{ cursor: "pointer" }}
              >
                <td>{data.DC_No}</td>
                <td>{data.DC_Date}</td>
                <td>{data.Cust_Name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default DCList;

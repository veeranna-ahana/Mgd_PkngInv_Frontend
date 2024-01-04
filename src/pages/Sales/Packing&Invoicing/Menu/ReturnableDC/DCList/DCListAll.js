import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { apipoints } from "../../../../../api/PackInv_API/ReturnableDC/ReturnableDC";
import Axios from "axios";
import { toast } from "react-toastify";

function DCListAll() {
  const [allTable, setAllTable] = useState([]);
  const [dcSelectedRow, setDCSelectedRow] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const navigate = useNavigate();

  const handleRowSelect = (selectedRow) => {
    setDCSelectedRow((prevSelectedRow) =>
      prevSelectedRow === selectedRow ? null : selectedRow
    );
  };

  console.log("selected row", dcSelectedRow);

  useEffect(() => {
    Axios.get(apipoints.dcAll)
      .then((response) => {
        setAllTable(response.data);
      })
      .catch((error) => {
        console.error("Error fetching states", error);
      });
  }, []);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleOpenClick = () => {
    // if (!dcSelectedRow) {
    //   toast.error("Select a customer");
    // } else {
    //   navigate("/PackingAndInvoices/ReturnableDC/DCCreateNew", {
    //     state: { dcSelectedRow },
    //   });
    // }
  };

  const handleCloseClick = () => {
    navigate("/PackingAndInvoices");
  };

  const sortedData = () => {
    const dataCopy = [...allTable];
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

  return (
    <div>
      <div className="col-md-12">
        <h4 className="title">Returnable DC List</h4>
      </div>
      <h5 className="mt-3">
        <b>PN List : Returnable DC Status All</b>
      </h5>

      <div className="row p-2">
        <div className="col-md-2">
          <button
            className="button-style"
            style={{ width: "120px" }}
            onClick={handleOpenClick}
          >
            Open
          </button>
        </div>

        <div className="col-md-2">
          <button
            className="button-style"
            style={{ width: "120px" }}
            onClick={handleCloseClick}
          >
            Close
          </button>
        </div>
      </div>

      <div className="mt-3 row">
        <div className="col-md-7 col-sm-12">
          <div
            style={{
              overflowX: "scroll",
              overflowY: "scroll",
              height: "400px",
            }}
          >
            <Table
              striped
              className="table-data border"
              style={{ border: "1px" }}
            >
              <thead
                className="tableHeaderBGColor "
                style={{
                  position: "sticky",
                  top: "-1px",
                }}
              >
                <tr>
                  <th
                    style={{ whiteSpace: "nowrap" }}
                    onClick={() => requestSort("DC_No")}
                  >
                    PN No
                  </th>
                  <th
                    style={{ whiteSpace: "nowrap" }}
                    onClick={() => requestSort("DC_Date")}
                  >
                    PN Date
                  </th>
                  <th
                    style={{ whiteSpace: "nowrap" }}
                    onClick={() => requestSort("Cust_Name")}
                  >
                    Customer Name
                  </th>
                  <th
                    style={{ whiteSpace: "nowrap" }}
                    onClick={() => requestSort("DC_Status")}
                  >
                    DC Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {sortedData().map((data, index) => (
                  <tr
                    key={index}
                    // onClick={() => handleRowSelect(data.DC_Inv_No)}
                    onClick={() =>
                      handleRowSelect({
                        dcInvNo: data.DC_Inv_No,
                        custStateId: data.Cust_StateId,
                        delStateId: data.Del_StateId,
                        custName: data.Cust_Name,
                      })
                    }
                    className={`${
                      dcSelectedRow &&
                      dcSelectedRow.dcInvNo === data.DC_Inv_No &&
                      dcSelectedRow.custStateId === data.Cust_StateId &&
                      dcSelectedRow.delStateId === data.Del_StateId &&
                      dcSelectedRow.custName === data.Cust_Name
                        ? "selectedRowClr"
                        : ""
                    }`}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{data.DC_No}</td>
                    <td>
                      {" "}
                      {data.DC_Date
                        ? new Date(data.DC_Date).toLocaleDateString("en-GB")
                        : ""}
                    </td>
                    <td>{data.Cust_Name}</td>
                    <td>{data.DCStatus}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DCListAll;

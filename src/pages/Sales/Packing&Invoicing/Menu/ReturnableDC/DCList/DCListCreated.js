import React, { useState, useEffect } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { apipoints } from "../../../../../api/PackInv_API/ReturnableDC/ReturnableDC";
import Axios from "axios";
import { toast } from "react-toastify";

function DCListCreated() {
  const [draftTable, setDraftTable] = useState([]);
  const [dcSelectedRow, setDCSelectedRow] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [allCustomers, setAllCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const navigate = useNavigate();

  const handleRowSelect = (selectedRow) => {
    setDCSelectedRow((prevSelectedRow) =>
      prevSelectedRow === selectedRow ? null : selectedRow
    );
  };

  console.log("selected row", dcSelectedRow);

  useEffect(() => {
    async function fetchData() {
      try {
        const [dcResponse, customersResponse] = await Promise.all([
          Axios.get(apipoints.dcDraft),
          Axios.get(apipoints.getAllCust),
        ]);

        setDraftTable(dcResponse.data);

        const customerNames = customersResponse.data.map((customer) => ({
          label: customer.Cust_name,
          ...customer,
        }));
        setAllCustomers(customerNames);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleOpenClick = () => {
    if (!dcSelectedRow) {
      toast.error("Select a customer");
    } else {
      navigate("/PackingAndInvoices/ReturnableDC/DCCreateNew", {
        state: { dcSelectedRow },
      });
    }
  };

  const handleCloseClick = () => {
    navigate("/PackingAndInvoices");
  };

  const sortedData = () => {
    const dataCopy = [...draftTable];
    const filtered = selectedCustomer
      ? dataCopy.filter((data) => data.Cust_Name === selectedCustomer.label)
      : dataCopy;

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  };

  const handleCustomerSelect = (selected) => {
    setSelectedCustomer(selected && selected.length > 0 ? selected[0] : null);
  };

  return (
    <div>
      <div className="col-md-12">
        <h4 className="title">Returnable DC List</h4>
      </div>

      <div className="row">
        <h5>
          <b>PN List : Returnable DC Status Draft</b>
        </h5>
      </div>

      <div className="row">
        <div className="col-md-5">
          <label className="form-label">Customer</label>
          <Typeahead
            id="customerFilterTypeahead"
            labelKey="label"
            options={allCustomers}
            onChange={handleCustomerSelect}
            placeholder="Select a customer..."
          />
        </div>

        <button
          className="button-style"
          style={{ width: "120px", marginTop: "2%", marginLeft: "1%" }}
          onClick={handleOpenClick}
        >
          Open
        </button>

        <button
          className="button-style"
          style={{ width: "120px", marginTop: "2%", marginLeft: "2%" }}
          onClick={handleCloseClick}
        >
          Close
        </button>
      </div>

      <div className="mt-4 row">
        <div className="col-md-8 col-sm-12">
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
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="3">Loading...</td>
                  </tr>
                ) : sortedData().length === 0 ? (
                  <tr>
                    <td colSpan="3">No data found</td>
                  </tr>
                ) : (
                  sortedData().map((data, index) => (
                    <tr
                      key={index}
                      // onClick={() => handleRowSelect(data.DC_Inv_No)}
                      onClick={() =>
                        handleRowSelect({
                          dcInvNo: data.DC_Inv_No,
                          custStateId: data.Cust_StateId,
                          delStateId: data.Del_StateId,
                          custName: data.Cust_Name,
                          custCode: data.Cust_Code,
                          gstNo: data.GSTNo,
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
                      <td>{data.DC_Date}</td>
                      <td>{data.Cust_Name}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DCListCreated;

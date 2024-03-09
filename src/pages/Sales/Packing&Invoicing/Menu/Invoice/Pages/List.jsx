import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Axios from "axios";
import { apipoints } from "../../../../../api/PackInv_API/Invoice/Invoice";
import { Typeahead } from "react-bootstrap-typeahead";
import { Link } from "react-router-dom";

export default function List(props) {
  const [AllCust, setAllCust] = useState([]);

  const [tableData, setTableData] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});

  const [AllTableData, setAllTableData] = useState([]);

  useEffect(() => {
    Axios.post(apipoints.getListData, {
      PNList: props.PNList,
      Status: props.Status,
    }).then((res) => {
      setTableData(res.data);
      setAllTableData(res.data);

      Axios.post(apipoints.getCustAccnToListData, {
        PNList: props.PNList,
        Status: props.Status,
      }).then((res) => {
        let arr = [{ label: "All", Cust_Code: "All" }];
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].label = res.data[i].Cust_name;
          arr.push(res.data[i]);
        }
        setAllCust(arr);
      });
    });
  }, []);

  const handleCustomerChange = (e) => {
    setSelectedRow({});
    if (
      e[0]?.Cust_Code === undefined ||
      e[0]?.Cust_Code === null ||
      e[0]?.Cust_Code === "" ||
      e[0]?.Cust_Code.length === 0 ||
      e[0]?.Cust_Code === "All"
    ) {
      setTableData(AllTableData);
    } else {
      const newArray = AllTableData.filter(
        (obj) => obj.Cust_Code === e[0].Cust_Code
      );
      setTableData(newArray);
    }
  };

  return (
    <>
      <div>
        <h4 className="title m-0">{props.heading || "Invoice List"}</h4>

        {/* header.... */}
        <div className="row pt-2 pb-3">
          <div className="col-md-6 d-flex align-items-center">
            <h5 className="m-0 p-0">
              <b>PN List: </b>
              {props.PNList || "..."} | <b>Status: </b>
              {props.Status || "..."}
            </h5>
          </div>

          <div className="col-md-6 ">
            <b>Customer</b>

            <Typeahead
              id="basic-example"
              placeholder="Select a customer..."
              options={AllCust}
              onChange={handleCustomerChange}
              defaultSelected={[{ label: "All" }]}
            />
          </div>
        </div>

        {/* table... */}

        <div className="row">
          <div className="col-md-9">
            <div style={{ maxHeight: "60vh", overflow: "auto" }}>
              <Table striped className="table-data border">
                <thead className="tableHeaderBGColor">
                  <tr>
                    <th>SL No</th>

                    <th>Inv Type</th>
                    <th>PN No</th>
                    <th>PN Date</th>
                    <th>Customer Name</th>
                  </tr>
                </thead>

                <tbody>
                  {tableData.length > 0 ? (
                    tableData?.map((val, key) => (
                      <tr
                        key={key}
                        onClick={(e) => {
                          if (selectedRow?.DC_Inv_No === val.DC_Inv_No) {
                            setSelectedRow({});
                          } else {
                            setSelectedRow(val);
                          }
                        }}
                        className={
                          selectedRow?.DC_Inv_No === val.DC_Inv_No
                            ? "selectedRowClr"
                            : ""
                        }
                      >
                        <td>{key + 1}</td>
                        <td>{val.DC_InvType}</td>
                        <td>{val.DC_No}</td>
                        <td>{val.DC_Date}</td>
                        <td>{val.Cust_Name}</td>
                      </tr>
                    ))
                  ) : (
                    <div>
                      <b>No Data Found...!</b>
                    </div>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
          <div className="col-md-3">
            <div className="d-flex flex-row justify-content-between">
              <div style={{ width: "42%" }}>
                {!selectedRow?.DC_Inv_No ? (
                  <button
                    style={{ width: "-webkit-fill-available" }}
                    disabled
                    className={"button-style button-disabled m-0"}
                  >
                    Open
                  </button>
                ) : (props.PNList === "Profile" ||
                    props.PNList === "Service" ||
                    props.PNList === "Fabrication") &
                  (props.Status === "Dispatched") ? (
                  <Link
                    to={"/PackingAndInvoices/PackingNote/Description"}
                    state={selectedRow?.DC_Inv_No}
                  >
                    <button
                      style={{ width: "-webkit-fill-available" }}
                      className={"button-style m-0"}
                    >
                      Open
                    </button>
                  </Link>
                ) : (
                  <Link
                    to={"/PackingAndInvoices/Invoice/InvoiceDetails"}
                    state={selectedRow?.DC_Inv_No}
                  >
                    <button
                      style={{ width: "-webkit-fill-available" }}
                      className={"button-style m-0"}
                    >
                      Open
                    </button>
                  </Link>
                )}
              </div>
              <div style={{ width: "42%" }}>
                <Link to="/PackingAndInvoices">
                  <button
                    className="button-style m-0"
                    style={{ width: "-webkit-fill-available" }}
                  >
                    Close
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

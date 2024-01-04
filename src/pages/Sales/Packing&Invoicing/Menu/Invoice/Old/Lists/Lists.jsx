import React, { useRef, useState, useEffect } from "react";
import { apipoints } from "../../../../../api/PackInv_API/Invoice/Invoice";
import Axios from "axios";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

export default function PnInvList() {
  const [AllCust, setAllCust] = useState([]);
  const [SelectedCustomer, setSelectedCustomer] = useState();
  // list type
  const [AllListType, setAllListType] = useState([
    {
      header: "Packing Note",
      options: [
        {
          value: "Misc PN List",
          PNList: "Misc",
          Status: "Packed",
        },

        {
          value: "Material Scrap PN List",
          PNList: "Scrap",
          Status: "Packed",
        },
        {
          value: "Material PN List",
          PNList: "Material",
          Status: "Packed",
        },
      ],
    },
    {
      header: "Invoice",
      options: [
        {
          value: "Misc Invoice List",
          PNList: "Misc",
          Status: "Dispatched",
        },

        {
          value: "Material Invoice List",
          PNList: "Scrap",
          Status: "Dispatched",
        },

        {
          value: "Service Invoice List",
          PNList: "Service",
          Status: "Dispatched",
        },

        {
          value: "Sales Invoice List",
          PNList: "Profile",
          Status: "Dispatched",
        },

        {
          value: "Fabrication Invoice List",
          PNList: "Fabrication",
          Status: "Dispatched",
        },
      ],
    },

    // {
    //   value: "All",
    //   PNList: "All",
    //   Status: "All",
    // },
  ]);

  const [SelectedListType, setSelectedListType] = useState();

  const [InvoiceListData, setInvoiceListData] = useState([]);

  const [selectedTableRow, setSelectedTableRow] = useState();

  // get all cust
  useEffect(() => {
    Axios.post(apipoints.getAllCust, {}).then((res) => {
      setAllCust(res.data);
      // console.log("getAllCust", res.data);
    });
  }, []);

  const getListData = () => {
    // console.log("SelectedCustomer", SelectedCustomer);
    // console.log("SelectedListType", SelectedListType);

    Axios.post(apipoints.getListData, {
      SelectedCustomer: SelectedCustomer,
      SelectedListType: SelectedListType,
    }).then((res) => {
      // console.log("ressss", res);
      setInvoiceListData(res.data);
      if (res.data.length === 0) {
        toast.warning("Oops! No data found for selected options");
      }
    });
  };

  // console.log("selectedTableRow", selectedTableRow);
  // console.log("SelectedListType", SelectedListType);

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <b>Customer</b>
          <select
            id=""
            className="ip-select"
            style={{
              fontSize: "inherit",
            }}
            defaultValue="none"
            onChange={(e) => {
              setSelectedCustomer(e.target.value);
            }}
          >
            <option value="none" disabled hidden>
              Select the Customer
            </option>
            {/* <option value="All">All</option> */}

            {AllCust.map((val, i) => (
              <option value={val.Cust_Code}>{val.Cust_name}</option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <b>List Type</b>

          <select
            id=""
            className="ip-select"
            style={{
              fontSize: "inherit",
            }}
            defaultValue="none"
            onChange={(e) => {
              // console.log("list type.....", e.target.value);
              for (let i = 0; i < AllListType.length; i++) {
                const element0 = AllListType[i];

                // console.log("options", element0.options);

                for (let j = 0; j < element0.options.length; j++) {
                  const element1 = element0.options[j];

                  if (element1.value === e.target.value) {
                    // console.log("element", element);
                    setSelectedListType(element1);
                    break;
                  }
                }
              }
            }}
          >
            <option value="none" disabled hidden>
              Select the List Type
            </option>

            {/* {AllListType.map((val, i) => (
              <option value={val.value}>{val.value}</option>
            ))} */}

            {AllListType.map((listVal, i) => (
              <optgroup label={listVal.header}>
                {listVal.options.map((listOption, j) => (
                  <option value={listOption.value}>{listOption.value}</option>
                ))}
              </optgroup>
            ))}

            {/* <optgroup label="Packing Note">
              <option>Tyrannosaurus</option>
              <option>Velociraptor</option>
              <option>Deinonychus</option>
            </optgroup>
            <optgroup label="Invoice">
              <option>Diplodocus</option>
              <option>Saltasaurus</option>
              <option>Apatosaurus</option>
            </optgroup> */}
          </select>
        </div>
      </div>
      <div className="p-1"></div>
      <div className="row">
        <div className="d-flex justify-content-end">
          {SelectedListType && SelectedCustomer ? (
            <button className="button-style m-0" onClick={getListData}>
              Show List
            </button>
          ) : (
            <button
              className="button-style button-disabled m-0"
              disabled
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="Select Customer and List Type"
            >
              Show List
            </button>
          )}
        </div>
      </div>
      <div className="p-1"></div>
      <div className="col-md-12">
        <h4 className="title m-0">Invoice Lists</h4>
        <div className="border">
          <div>
            <div>
              {/* {selectRow ? (
            <Link
              to={`/PackingAndInvoices/PackingNote/Description`}
              state={selectRow}
            >
              <button className="button-style " style={{ width: "150px" }}>
                Open
              </button>
            </Link>
          ) : (
            <button
              className="button-style button-disabled"
              disabled
              style={{ width: "150px" }}
            >
              Open
            </button>
          )} */}
            </div>
            <h5 className="m-0 p-2">
              <b>PN List : Status</b>
            </h5>
            <div className="row">
              <div className="col-md-9">
                {/* <div className="p-1"></div> */}

                <div style={{ maxHeight: "300px", overflow: "auto" }}>
                  <Table striped className="table-data border">
                    <thead className="tableHeaderBGColor">
                      <tr>
                        <th>Inv Type</th>
                        <th>PN No</th>
                        <th>PN Date</th>
                        <th>Customer Name</th>
                      </tr>
                    </thead>

                    {InvoiceListData.length === 0 ? (
                      <div>
                        <b>No Data Found...!</b>
                      </div>
                    ) : (
                      <tbody className="tablebody">
                        {InvoiceListData.map((val, i) => (
                          <tr
                            onClick={() => setSelectedTableRow(val.DC_Inv_No)}
                            className={
                              val.DC_Inv_No === selectedTableRow
                                ? "selectedRowClr"
                                : ""
                            }
                          >
                            <td>{val.DC_InvType}</td>
                            <td>{val.DC_No}</td>
                            <td>{val.DC_Date}</td>
                            <td>{val.Cust_Name}</td>
                          </tr>
                        ))}
                      </tbody>
                    )}

                    {/* <tbody className="tablebody">
                      {InvoiceListData.map((val, i) => (
                        <tr
                          onClick={() => setSelectedTableRow(val.DC_Inv_No)}
                          className={
                            val.DC_Inv_No === selectedTableRow
                              ? "selectedRowClr"
                              : ""
                          }
                        >
                          <td>{val.DC_InvType}</td>
                          <td>{val.DC_No}</td>
                          <td>{val.DC_Date}</td>
                          <td>{val.Cust_Name}</td>
                        </tr>
                      ))}
                    </tbody> */}
                  </Table>
                </div>
              </div>
              <div className="col-md-3">
                <div className="d-flex align-items-end flex-column">
                  {selectedTableRow ? (
                    <Link
                      to={`/PackingAndInvoices/Invoice/InvoiceDetails`}
                      state={selectedTableRow}
                    >
                      <button className="button-style m-0">Open</button>
                    </Link>
                  ) : (
                    <button
                      className="button-style button-disabled m-0"
                      disabled
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      title="Select invoice first"
                    >
                      Open
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// <div>
//   <Table
//     striped
//     className="table-data border"
//     style={{ border: "1px", width: "600px" }}
//   >
//     <thead className="tableHeaderBGColor">
//       <tr>
//         <th>Inv Type</th>
//         <th>PN No</th>
//         <th>PN Date</th>
//         <th>Customer Name</th>
//       </tr>
//     </thead>
//     <tbody className="tablebody">
//       <tr>
//         <td>test1</td>
//         <td>test1</td>
//         <td>test1</td>
//         <td>test1</td>
//       </tr>
//       <tr>
//         <td>test1</td>
//         <td>test1</td>
//         <td>test1</td>
//         <td>test1</td>
//       </tr>
//       <tr>
//         <td>test1</td>
//         <td>test1</td>
//         <td>test1</td>
//         <td>test1</td>
//       </tr>
//       <tr>
//         <td>test1</td>
//         <td>test1</td>
//         <td>test1</td>
//         <td>test1</td>
//       </tr>
//       <tr>
//         <td>test1</td>
//         <td>test1</td>
//         <td>test1</td>
//         <td>test1</td>
//       </tr>
//       <tr>
//         <td>test1</td>
//         <td>test1</td>
//         <td>test1</td>
//         <td>test1</td>
//       </tr>
//       {/* {tableData.map((val) => (
//                 <tr
// onClick={() => selectedRowFun(val.DC_Inv_No)}
// className={
//   val.DC_Inv_No === selectRow ? "selectedRowClr" : ""
// }
//                 >
//                   <td>{val.DC_InvType}</td>
//                   <td>{val.DC_No}</td>
//                   <td>{val.Dc_inv_Date}</td>
//                   <td>{val.Cust_Name}</td>
//                 </tr>
//               ))} */}
//     </tbody>
//   </Table>
// </div>;

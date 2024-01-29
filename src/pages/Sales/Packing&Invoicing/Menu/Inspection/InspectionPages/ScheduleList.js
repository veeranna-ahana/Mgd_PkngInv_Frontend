import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { Typeahead } from "react-bootstrap-typeahead";
import {
  Table,
  // Row,
  // Col,
  Form,
  // FormLabel,
  // FormCheck,
  // Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
import { apipoints } from "../../../../../api/PackInv_API/Inspection/InspProfi";
// import OrderSchDetails from "./OrderSchDetails";

const {
  // getRequest,
  postRequest,
  // request,
} = require("../../../../../api/apiinstance");
const { endpoints } = require("../../../../../api/constants");

function ScheduleList(props) {
  // let navigate = useNavigate();
  const nav = useNavigate();
  console.log("props.Type....", props.Type);
  const [SchType, setSchType] = useState(props.Type);

  const [custdata, setCustData] = useState("");

  //form data
  let [custcode, setCustCode] = useState("");
  let [tableData, setTableData] = useState([]);

  const [selectedOption, setSelectedOption] = useState("");
  // const [ordschno, setOrdschno] = useState("");
  // const [selectRow, setSelectRow] = useState();
  // const [custname, setCustname] = useState();

  const [scheduleID, setScheduleID] = useState();

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
  };

  useEffect(() => {
    if (custcode && selectedOption) {
      Axios.post(apipoints.getOrderSchdata, {
        custCode: custcode,
        SchType: SchType,
        selectedOption: selectedOption,
      }).then((res) => {
        // //console.log("ordersdata", res.data);
        // //console.log("ordersdata", res.data[0].OrdSchNo);

        setTableData(res.data);
        // setOrdschno(res.data[0].OrdSchNo);
      });
    }
  }, [custcode, selectedOption]);

  // async function fetchCustomerNames() {
  //   try {
  //     const response = await Axios.get(apipoints.getCustomerdata);
  //     // //console.log("response", response);
  //     if (response.status === 200) {
  //       const customerNames = response.data.map((customer) => {
  //         //console.log("customerNames", response.data);
  //         return {
  //           label: customer.Cust_name,
  //           ...customer,
  //         };
  //       });
  //       setCustData((prevData) => ({
  //         ...prevData,
  //         customerNames,
  //         custData: response.data,
  //       }));
  //     } else {
  //       throw new Error("Failed");
  //     }
  //   } catch (error) {
  //     //console.error(error);
  //   }
  // }

  useEffect(() => {
    async function fetchData() {
      postRequest(endpoints.getCustomers, {}, (custdetdata) => {
        for (let i = 0; i < custdetdata.length; i++) {
          custdetdata[i].label = custdetdata[i].Cust_name;
        }
        setCustData(custdetdata);
        // //console.log("custdetdata", custdetdata);
        // setLoaded(true);
      });
    }
    fetchData();
  }, []);
  // //console.log("tableData", tableData);

  let selectCust = async (e) => {
    console.log("entering into customer selection");
    // //console.log("cust data = ", e);
    // //console.log("cust code = ", e[0].Cust_Code);
    // //console.log("cust code = ", e[0].Cust_name);
    // setCustname(e[0].Cust_name);
    // //console.log("table customer = ", custdata);
    let cust;
    for (let i = 0; i < custdata.length; i++) {
      if (custdata[i]["Cust_Code"] === e[0].Cust_Code) {
        cust = custdata[i];
        break;
      }
    }
    // //console.log(cust.Cust_Code);
    setCustCode(cust.Cust_Code);
    // Fetch data for the selected customer and update the tableData state

    Axios.post(apipoints.getOrderSchdata, {
      custCode: cust.Cust_Code,
      SchType: SchType,
      selectedOption: selectedOption,
    }).then((res) => {
      console.log(" getOrderSchdata", res.data);
      setTableData(res.data);
    });
  };

  const selectedRowFun = (val) => {
    // //console.log("val**************", val);
    // setSelectRow(val);
    setScheduleID(val.ScheduleId);
  };

  // //console.log("scheduleID", scheduleID);

  // const combinedStates = {
  //   selectRow: selectRow,
  //   custname: custname,
  // };
  // //console.log("selectedOption", selectedOption);
  // //console.log("code", custcode);
  // //console.log("custname", custname);

  // //console.log("selectRow", selectRow);
  return (
    <>
      <div>
        <h4 className="title">{props.Type} Schedule List</h4>

        <div className="row">
          <div className="col-md-4">
            <Form.Group controlId="CustName">
              <label className="form-label">Select Customer</label>
              <Form.Label
                style={{
                  color: "#f20707",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                *
              </Form.Label>
              {custdata.length > 0 ? (
                // <Typeahead
                //   className="mt-1"
                //   id="basic-example "
                //   options={custdata}
                //   placeholder="Select Customer"
                //   onChange={(label) => selectCust(label)}
                // />
                <Typeahead
                  className="mt-1"
                  id="basic-example "
                  options={custdata}
                  placeholder="Select Customer"
                  onChange={(selectedCustomer) => selectCust(selectedCustomer)}
                />
              ) : (
                ""
              )}
            </Form.Group>
          </div>

          <div className="col-md-4">
            <div className="d-flex flex-row justify-content-center mt-3">
              <Link
                to={`/PackingAndInvoices/Inspection/OrderScheduleDetails`}
                state={scheduleID}
              >
                <button
                  className={
                    scheduleID ? "button-style" : "button-style button-disabled"
                  }
                  // className="button-style button-disabled"
                  disabled={!scheduleID}
                  style={{ width: "120px" }}
                >
                  Open
                </button>
              </Link>
              <button
                className="button-style"
                id="btnclose"
                style={{ width: "120px", marginLeft: "4px" }}
                type="submit"
                onClick={() => nav("/PackingAndInvoices")}
              >
                Close
              </button>
              {/* {schId ? (
                <Link
                  to={`/PackingAndInvoices/Inspection/OrderScheduleDetails`}
                  state={schId}
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
          </div>
          {/* <div className="col-md-2">
            <div className="d-flex flex-row justify-content-end">
              {scheduleID ? (
                <Link
                  to={`/PackingAndInvoices/Inspection/OrderScheduleDetails`}
                  // state={combinedStates}
                  state={scheduleID}
                >
                  <button
                    className="button-style mt-2"
                    style={{ width: "120px" }}
                  >
                    Open
                  </button>
                </Link>
              ) : (
                <button
                  className="button-style button-disabled mt-3"
                  disabled
                  style={{ width: "120px" }}
                >
                  Open
                </button>
              )}
              <button
                className="button-style mt-3 "
                id="btnclose"
                style={{ width: "120px", marginLeft: "4px" }}
                type="submit"
                onClick={() => nav("/PackingAndInvoices")}
              >
                Close
              </button>
            </div>
          </div> */}
        </div>
        {/* table */}
        <div className="row">
          <div
            style={{
              maxHeight: "350px",
              width: "780px",
              overflow: "auto",
              marginTop: "25px",
            }}
          >
            <Table striped className="table-data border">
              <thead
                className="tableHeaderBGColor tablebody"
                style={{ textAlign: "center" }}
              >
                <tr>
                  <th>SL No</th>
                  <th>OrdSchNo</th>
                  <th>PO</th>
                </tr>
              </thead>

              <tbody className="tablebody" style={{ textAlign: "center" }}>
                {tableData?.map((val, i) => (
                  <>
                    <tr
                      onClick={() => selectedRowFun(val)}
                      className={
                        val.ScheduleId === scheduleID ? "selectedRowClr" : ""
                      }
                    >
                      <td>{i + 1}</td>
                      <td>{val.OrdSchNo}</td>
                      <td>{val.PO}</td>
                    </tr>
                  </>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      {/* old */}
      {/* <OrderSchDetails tableData={tableData} /> */}
      {/* <div>
        <h4 className="title">Schedule List</h4>
        <div className="row">
          <div className="col-md-4">
            <Form.Group controlId="CustName">
              <label className="form-label">Name</label>
              <Form.Label
                style={{
                  color: "#f20707",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                *
              </Form.Label>
              {custdata.length > 0 ? (
                <Typeahead
                  className="mt-1"
                  id="basic-example "
                  options={custdata}
                  placeholder="Select Customer"
                  onChange={(label) => selectCust(label)}
                />
              ) : (
                ""
              )}
            </Form.Group>
          </div>

          <div className="col-md-2 mt-3">
            {scheduleID ? (
              <Link
                to={`/PackingAndInvoices/Inspection/OrderScheduleDetails`}
                // state={combinedStates}
                state={scheduleID}
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
            )}
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-1">
            <div className="form-check form-check-inline">
              <input
                style={{ marginTop: "11px" }}
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="Profile"
                checked={selectedOption === "Profile"}
                onChange={handleOptionChange}
              />
              <label
                className="form-check-label form-label"
                htmlFor="inlineRadio1"
              >
                Profile
              </label>
            </div>
          </div>
          <div className="col-md-1">
            <div className="form-check form-check-inline">
              <input
                style={{ marginTop: "11px" }}
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="Fabrication"
                checked={selectedOption === "Fabrication"}
                onChange={handleOptionChange}
              />
              <label
                className="form-check-label form-label"
                htmlFor="inlineRadio2"
              >
                Fabrication
              </label>
            </div>
          </div>
          <div className="col-md-1" style={{ marginLeft: "40px" }}>
            <div className="form-check form-check-inline">
              <input
                style={{ marginTop: "11px" }}
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio3"
                value="Services"
                checked={selectedOption === "Services"}
                onChange={handleOptionChange}
              />
              <label
                className="form-check-label form-label"
                htmlFor="inlineRadio3"
              >
                Services
              </label>
            </div>
          </div>
        </div>

        <div className="row">
          <div
            style={{
              maxHeight: "350px",
              // width: "480px",
              overflow: "auto",
              marginTop: "25px",
            }}
          >
            <Table striped className="table-data border">
              <thead className="tableHeaderBGColor tablebody">
                <tr>
                  <th>SL No</th>
                  <th>OrdSchNo</th>
                  <th>PO</th>
                </tr>
              </thead>

              <tbody className="tablebody">
                {tableData?.map((val, i) => (
                  <>
                    <tr
                      onClick={() => selectedRowFun(val)}
                      className={
                        val.ScheduleId === scheduleID ? "selectedRowClr" : ""
                      }
                    >
                      <td>{i + 1}</td>
                      <td>{val.OrdSchNo}</td>
                      <td>{val.PO}</td>
                    </tr>
                  </>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default ScheduleList;

// <div className="col-md-4 d-flex flex-row align-items-center justify-content-center">
// <div className="row mt-3">
//   <div className="col-md-3">
//     <div className="form-check form-check-inline ">
//       <input
//         style={{ marginTop: "11px" }}
//         className="form-check-input"
//         type="radio"
//         name="inlineRadioOptions"
//         id="inlineRadio1"
//         value="Profile"
//         checked={selectedOption === "Profile"}
//         onChange={handleOptionChange}
//       />
//       <label
//         className="form-check-label form-label"
//         htmlFor="inlineRadio1"
//       >
//         Profile
//       </label>
//     </div>
//   </div>
//   <div className="col-md-4">
//     <div className="form-check form-check-inline ">
//       <input
//         style={{ marginTop: "11px" }}
//         className="form-check-input"
//         type="radio"
//         name="inlineRadioOptions"
//         id="inlineRadio2"
//         value="Fabrication"
//         checked={selectedOption === "Fabrication"}
//         onChange={handleOptionChange}
//       />
//       <label
//         className="form-check-label form-label"
//         htmlFor="inlineRadio2"
//       >
//         Fabrication
//       </label>
//     </div>
//   </div>
//   <div className="col-md-3">
//     <div className="form-check form-check-inline ">
//       <input
//         style={{ marginTop: "11px" }}
//         className="form-check-input"
//         type="radio"
//         name="inlineRadioOptions"
//         id="inlineRadio3"
//         value="Services"
//         checked={selectedOption === "Services"}
//         onChange={handleOptionChange}
//       />
//       <label
//         className="form-check-label form-label"
//         htmlFor="inlineRadio3"
//       >
//         Services
//       </label>
//     </div>
//   </div>
// </div>
// </div>

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { Typeahead } from "react-bootstrap-typeahead";
import { Table, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
import { apipoints } from "../../../../../api/PackInv_API/Inspection/InspProfi";

const { postRequest } = require("../../../../../api/apiinstance");
const { endpoints } = require("../../../../../api/constants");

function FindSchedule() {
  // let navigate = useNavigate();
  const nav = useNavigate();
  const [custdata, setCustData] = useState("");

  //form data
  let [schId, setSchId] = useState("");
  let [tableData, setTableData] = useState([]);

  const [selectedOption, setSelectedOption] = useState("");

  const [scheduleID, setScheduleID] = useState();

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
  };

  useEffect(() => {
    Axios.post(apipoints.getOrderDataforFindSchedule, {}).then((res) => {
      console.log("ordersdata", res.data);

      setTableData(res.data);
    });
  }, []);

  console.log("tableData", tableData);

  useEffect(() => {
    async function fetchData() {
      postRequest(endpoints.getCustomers, {}, (custdetdata) => {
        for (let i = 0; i < custdetdata.length; i++) {
          custdetdata[i].label = custdetdata[i].Cust_name;
        }
        setCustData(custdetdata);
      });
    }
    fetchData();
  }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await Axios.post(apipoints.getCustomerdata, {});
  //       const custdetdata = response.data;

  //       const updatedCustData = custdetdata.map((item) => ({
  //         ...item,
  //         label: item.Cust_name,
  //       }));

  //       setCustData(updatedCustData);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       // Handle error as needed
  //     }
  //   }

  //   fetchData();
  // }, []);

  return (
    <>
      <div>
        <h4 className="title">Find Schedule</h4>

        <div className="row">
          <div className="col-md-3">
            <Form.Group controlId="CustName">
              <label className="form-label">Find Schedule</label>
              {/* <Form.Label
                style={{
                  color: "#f20707",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                *
              </Form.Label> */}
              {custdata.length > 0 ? (
                <Typeahead
                  className="mt-1"
                  id="basic-example"
                  options={tableData.map((item) => ({
                    label: item.OrdSchNo,
                    value: item.ScheduleId,
                  }))}
                  placeholder="Select ..."
                  onChange={(selected) => {
                    // Handle the selected item
                    console.log("Selected SchduleId", selected[0]?.value);
                    setSchId(selected[0]?.value);
                  }}
                />
              ) : (
                ""
              )}
            </Form.Group>
          </div>
          {console.log("schId", schId)}

          <div className="col-md-3 mt-3">
            <div className="d-flex flex-row justify-content-end">
              <Link
                to={`/PackingAndInvoices/Inspection/OrderScheduleDetails`}
                state={schId}
              >
                <button
                  className={
                    schId ? "button-style" : "button-style button-disabled"
                  }
                  // className="button-style button-disabled"
                  disabled={!schId}
                  style={{ width: "120px" }}
                >
                  Open
                </button>
              </Link>
              <button
                className="button-style mt-2"
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
        </div>
        {/* table */}
        <div className="row">
          <div
            style={{
              maxHeight: "350px",
              // width: "480px",
              overflow: "auto",
              marginTop: "25px",
            }}
          ></div>
        </div>
      </div>
    </>
  );
}

export default FindSchedule;

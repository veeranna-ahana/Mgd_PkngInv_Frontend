import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Typeahead } from "react-bootstrap-typeahead";
import {
  Table,
  Row,
  Col,
  Form,
  FormLabel,
  FormCheck,
  Button,
} from "react-bootstrap";
const {
  getRequest,
  postRequest,
  request,
} = require("../../../../../api/apiinstance");
const { endpoints } = require("../../../../../api/constants");

function InspServiceScheduleList() {
  let navigate = useNavigate();

  const [custdata, setCustData] = useState("");

  //form data
  let [custcode, setCustCode] = useState("");

  useEffect(() => {
    async function fetchData() {
      postRequest(endpoints.getCustomers, {}, (custdetdata) => {
        for (let i = 0; i < custdetdata.length; i++) {
          custdetdata[i].label = custdetdata[i].Cust_name;
        }
        setCustData(custdetdata);
        console.log("custdetdata", custdetdata);
        // setLoaded(true);
      });
    }
    fetchData();
  }, []);

  let selectCust = async (e) => {
    console.log("cust data = ", e);
    console.log("cust code = ", e[0].Cust_Code);
    console.log("table customer = ", custdata);
    let cust;
    for (let i = 0; i < custdata.length; i++) {
      if (custdata[i]["Cust_Code"] === e[0].Cust_Code) {
        cust = custdata[i];
        break;
      }
    }
    setCustCode(cust.Cust_Code);

    // postRequest(
    //   endpoints.getCustomerDetails,
    //   {
    //     custcode: cust.Cust_Code,
    //   },
    //   (resp) => {
    //     console.log(resp);
    //     let excustdata = resp[0];
    //   }
    // );
  };

  return (
    <div>
      <h4 className="title">Packing Schedules</h4>
      {/* <hr className="horizontal-line" /> */}
      <div className="row">
        <div className="col-md-4">
          {" "}
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
                id="basic-example"
                options={custdata}
                placeholder="Select Customer"
                onChange={(label) => selectCust(label)}
              />
            ) : (
              ""
            )}
          </Form.Group>
        </div>

        <div className="col-md-4 mt-4">
          <button
            className="button-style"
            onClick={() => {
              navigate("/PackingAndInvoices/Service/FindSchedule");
            }}
          >
            {" "}
            Open
          </button>
        </div>
      </div>

      {/* <div className="col-md-4 col-sm-12">
        <div className="row mt-4">
          {" "}
          <div
            style={{ height: "300px", overflowY: "scroll", marginTop: "25px" }}
          >
            <Table bordered>
              <thead
                style={{
                  textAlign: "center",
                  position: "sticky",
                  top: "-1px",
                }}
              >
                <tr>
                  <th>OrdSchNo</th>
                  <th>PO</th>
                </tr>
              </thead>

              <tbody className="tablebody">
                <tr>
                  <td>asdfghj</td>
                  <td>asdfghj</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default InspServiceScheduleList;

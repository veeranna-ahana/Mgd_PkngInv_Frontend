import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function InspProfileFindSchedule() {
  let navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "http://localhost:3001/schedulelist/getallcustomers"
      );
      const data = await response.json();
      console.log("data", data);
      setData(data);
    }

    fetchData();
  }, []);

  return (
    <div>
      <div>
        <h4 className="title">Schedule Picker</h4>
        {/* <hr className="horizontal-line" /> */}

        <div className="row">
          <div className="col-md-4">
            <label className="form-label">Find Schedule</label>
            <select className="ip-select">
              <option value="option 1">a</option>
              <option value="option 1">b</option>
              <option value="option 1">c</option>
            </select>
          </div>
          <div className="col-md-4">
            <button
              className="button-style"
              onClick={() => {
                navigate("/PackingAndInvoices/Service/FindSchedule");
              }}
            >
              Open
            </button>
          </div>
        </div>
        <div className="row">
          <div className=" col-md-5 mt-5 mb-2">
            <h8>
              <label className="form-label">Select Type</label>
            </h8>
            <div className="row">
              <div
                className="col-md-3 mt-1"
                style={{ display: "flex", gap: "10px" }}
              >
                <label className="form-label" style={{ paddingRight: "2px" }}>
                  {" "}
                  Profile
                </label>
                <input
                  className="form-check-input"
                  style={{ marginTop: "12px" }}
                  type="radio"
                />
              </div>

              <div
                className="col-md-4 mt-1"
                style={{ display: "flex", gap: "10px" }}
              >
                <label className="form-label"> Fabrication</label>
                <input
                  className="form-check-input"
                  style={{ marginTop: "12px" }}
                  type="radio"
                />
              </div>

              <div
                className="col-md-3 mt-1"
                style={{ display: "flex", gap: "7px" }}
              >
                <label className="form-label" style={{ paddingRight: "3px" }}>
                  Services
                </label>
                <input
                  className="form-check-input"
                  style={{ marginTop: "12px" }}
                  type="radio"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InspProfileFindSchedule;

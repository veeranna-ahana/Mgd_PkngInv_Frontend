import React from "react";

export default function FormHeader(props) {
  //   console.log("props...", props);
  return (
    <>
      <div className="form-bg p-1">
        <div className="row">
          <div className="d-flex col-md-8 col-sm-8" style={{ gap: "28px" }}>
            <label className="form-label">Customer</label>
            <input
              //   type="text"
              disabled
              className="in-field mt-1"
              value={props.headerData?.Cust_name}
            />
          </div>
          <div className="d-flex col-md-4 col-sm-4" style={{ gap: "43px" }}>
            <label className="form-label" style={{ whiteSpace: "nowrap" }}>
              Sales contact
            </label>
            <input
              //   type="text"
              disabled
              className="in-field" // value={tbldata.selectRow.SalesContact}
              value={props.headerData?.SalesContact}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 col-sm-4">
            <div className="d-flex mt-1" style={{ gap: "10px" }}>
              <label className="form-label" style={{ whiteSpace: "nowrap" }}>
                Schedule No
              </label>
              <input
                // type="text"
                disabled
                className="in-field"
                value={props.headerData?.OrdSchNo}
                // value={tbldata.selectRow.ScheduleNo}
              />
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div className="d-flex mt-1" style={{ gap: "32px" }}>
              <label className="form-label" style={{ whiteSpace: "nowrap" }}>
                Schedule Type
              </label>
              <input
                //   type="text"
                disabled
                className="in-field"
                value={props.headerData?.ScheduleType}
                //  value={tbldata.selectRow.ScheduleType}
              />
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div className="d-flex" style={{ gap: "30px" }}>
              <label className="form-label" style={{ whiteSpace: "nowrap" }}>
                Schedule status
              </label>
              <input
                //   type="text"
                disabled
                className="in-field"
                value={props.headerData?.Schedule_Status}
                // value={tbldata.selectRow.Schedule_Status}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="d-flex col-md-4 col-sm-4" style={{ gap: "28px" }}>
            <label className="form-label">Clearance</label>
            <select
              //  className="ip-select"

              //   type="text"
              disabled
              className="ip-select"
              style={{ background: "#e6e6e6" }}
            >
              <option value=""></option>
              {/* <option value="option 1">a</option>
              <option value="option 1">b</option>
              <option value="option 1">c</option> */}
            </select>
          </div>

          <div className="d-flex col-md-4 col-sm-4" style={{ gap: "10px" }}>
            <label className="form-label" style={{ whiteSpace: "nowrap" }}>
              Program Engineer
            </label>
            <input
              //   type="text"
              disabled
              className="in-field"
              value={props.headerData?.Program_Engineer}
              // value={tbldata.selectRow.Program_Engineer}
            />
          </div>
          <div className="d-flex col-md-4 col-sm-4" style={{ gap: "80px" }}>
            <label className="form-label" style={{ whiteSpace: "nowrap" }}>
              PO No
            </label>
            <input
              //   type="text"
              disabled
              className="in-field"
              value={props.headerData?.PO}
              // value={tbldata.selectRow.PO}
            />
          </div>
        </div>

        <div className="row mb-1">
          <div className="d-flex col-md-4 col-sm-4" style={{ gap: "15px" }}>
            <label className="form-label" style={{ whiteSpace: "nowrap" }}>
              Target Date
            </label>
            <input
              //   type="text"
              disabled
              className="in-field"
              value={props.headerData?.schTgtDate}
              //  value={tbldata.selectRow.schTgtDate}
            />
          </div>
          <div className="d-flex col-md-4 col-sm-4" style={{ gap: "35px" }}>
            <label className="form-label" style={{ whiteSpace: "nowrap" }}>
              Delivery Date
            </label>
            <input
              //   type="text"
              disabled
              className="in-field"
              value={props.headerData?.Delivery_Date}
              // value={tbldata.selectRow.Delivery_Date}
            />
          </div>
          <div className="d-flex col-md-4 col-sm-4" style={{ gap: "10px" }}>
            <div>
              <label className="form-label" style={{ whiteSpace: "nowrap" }}>
                Special Instructions
              </label>
            </div>
            <div>
              <textarea
                style={{ width: "220px", height: "50px" }}
                //   className="form-control"
                disabled
                className="in-field"
                value={props.headerData?.Special_Instructions}
                // value={tbldata.selectRow.Special_Instructions}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

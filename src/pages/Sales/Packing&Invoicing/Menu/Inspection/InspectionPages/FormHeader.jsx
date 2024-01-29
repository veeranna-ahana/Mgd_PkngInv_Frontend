import React from "react";

export default function FormHeader(props) {
  //   console.log("props...", props);
  return (
    <>
      <div className="form-bg p-1">
        <div className="row">
          <div className="col-md-8">
            <label className="form-label">Customer</label>
            <input
              //   type="text"
              disabled
              className="input-disabled"
              value={props.headerData?.Cust_name}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Sales contact</label>
            <input
              //   type="text"
              disabled
              className="input-disabled" // value={tbldata.selectRow.SalesContact}
              value={props.headerData?.SalesContact}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div style={{ marginBottom: "9px" }}>
              <label className="form-label">Schedule No</label>
              <input
                // type="text"
                disabled
                className="input-disabled"
                value={props.headerData?.OrdSchNo}
                // value={tbldata.selectRow.ScheduleNo}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div style={{ marginBottom: "9px" }}>
              <label className="form-label">Schedule Type</label>
              <input
                //   type="text"
                disabled
                className="input-disabled"
                value={props.headerData?.ScheduleType}
                //  value={tbldata.selectRow.ScheduleType}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div style={{ marginBottom: "9px" }}>
              <label className="form-label">Schedule status</label>
              <input
                //   type="text"
                disabled
                className="input-disabled"
                value={props.headerData?.Schedule_Status}
                // value={tbldata.selectRow.Schedule_Status}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <label className="form-label">Clearance</label>
            <select
              //  className="ip-select"

              //   type="text"
              disabled
              className="ip-select input-disabled"
              style={{ background: "#e6e6e6" }}
            >
              <option value=""></option>
              {/* <option value="option 1">a</option>
              <option value="option 1">b</option>
              <option value="option 1">c</option> */}
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Program Engineer</label>
            <input
              //   type="text"
              disabled
              className="input-disabled"
              value={props.headerData?.Program_Engineer}
              // value={tbldata.selectRow.Program_Engineer}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">PO No</label>
            <input
              //   type="text"
              disabled
              className="input-disabled"
              value={props.headerData?.PO}
              // value={tbldata.selectRow.PO}
            />
          </div>
        </div>

        <div className="row mt-3 mb-4">
          <div className="col-md-4">
            <label className="form-label">Target Date</label>
            <input
              //   type="text"
              disabled
              className="input-disabled"
              value={props.headerData?.schTgtDate}
              //  value={tbldata.selectRow.schTgtDate}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Delivery Date</label>
            <input
              //   type="text"
              disabled
              className="input-disabled"
              value={props.headerData?.Delivery_Date}
              // value={tbldata.selectRow.Delivery_Date}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Special Instructions</label>
            <textarea
              style={{ width: "-webkit-fill-available" }}
              //   className="form-control"

              disabled
              className="for-control input-disabled"
              value={props.headerData?.Special_Instructions}
              // value={tbldata.selectRow.Special_Instructions}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
}

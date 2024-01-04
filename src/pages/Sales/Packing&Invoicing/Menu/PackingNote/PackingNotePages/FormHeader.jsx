import React from "react";

export default function FormHeader(props) {
  return (
    <>
      <div>
        {/* first row */}
        <div className="row">
          <div className="col-md-4">
            <b>Invoice Form:</b>
            <input
              value={props.invRegisterData?.DC_InvType}
              disabled
              className="input-disabled"
            />
          </div>
          <div className="col-md-4">
            <b>Status</b>
            <input
              value={props.invRegisterData?.DCStatus}
              disabled
              className="input-disabled"
            />
          </div>
          <div className="col-md-4"></div>
        </div>
        {/* second row */}
        <div className="row">
          <div className="col-md-4">
            <b>Invoice No</b>
            <input
              value={
                props.invRegisterData.Inv_No === "" ||
                props.invRegisterData.Inv_No === undefined ||
                props.invRegisterData.Inv_No === null
                  ? ""
                  : props.invRegisterData.Inv_No +
                    (props.invRegisterData?.Printable_Inv_Date
                      ? ` Date: ${props.invRegisterData?.Printable_Inv_Date}`
                      : "")
              }
              disabled
              className="input-disabled"
            />
          </div>
          <div className="col-md-4">
            <b>Order Ref.</b>
            <input
              value={props.invRegisterData?.OrderScheduleNo}
              disabled
              className="input-disabled"
            />
          </div>
          <div className="col-md-4">
            <b>PO No.</b>
            <input
              defaultValue={props.invRegisterData?.PO_No}
              disabled
              className="input-disabled"
            ></input>
          </div>
        </div>
        {/* third row */}
        <div className="row">
          <div className="col-md-4">
            <b>PN No.</b>
            <input
              value={
                props.invRegisterData?.DC_No +
                (props.invRegisterData?.Printable_DC_Date
                  ? ` Date: ${props.invRegisterData?.Printable_DC_Date}`
                  : "")
              }
              disabled
              className="input-disabled"
            />
          </div>
          <div className="col-md-8">
            <b>Consignee</b>
            <input
              value={props.invRegisterData?.Cust_Name}
              disabled
              className="input-disabled"
            />
          </div>
        </div>
      </div>
    </>
  );
}

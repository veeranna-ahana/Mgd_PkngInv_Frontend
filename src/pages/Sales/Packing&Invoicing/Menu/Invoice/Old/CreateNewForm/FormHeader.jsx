import React from "react";

export default function FormHeader(props) {
  return (
    <>
      <div>
        <div className="row">
          <div className="col-md-4">
            <b>Invoice Form</b>
            <input
              value={
                props.invRegisterData?.DC_InvType +
                " (" +
                props.invRegisterData?.InvoiceFor +
                ")"
              }
              disabled
              className="input-disabled"
            />
          </div>
          <div className="col-md-4">
            <b>Invoice No</b>
            <input
              value={
                props.invRegisterData.Inv_No?.length > 0
                  ? `${props.invRegisterData.Inv_No} Date: ${props.invRegisterData.Inv_Date}`
                  : ""
              }
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
          <div className="col-md-4">
            <b>PN No</b>

            <input
              value={
                props.invRegisterData.DC_No.length > 0
                  ? `${props.invRegisterData.DC_No} Date: ${props.invRegisterData.DC_Date}`
                  : "Draft"
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

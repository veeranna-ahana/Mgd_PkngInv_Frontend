import React, { useRef, useState, useEffect } from "react";
import Axios from "axios";
import { apipoints } from "../../../../../../../api/PackInv_API/Invoice/Invoice";
import { Typeahead } from "react-bootstrap-typeahead";

export default function ConsigneeInfo(props) {
  return (
    <>
      <div>
        {/* first row */}
        <div className="row">
          <div className="col-md-6">
            <b>Select Customer</b>

            {props.invRegisterData.DC_No.length > 0 ? (
              <input
                value={props.invRegisterData.Cust_Name}
                disabled
                className="input-disabled"
              />
            ) : (
              <>
                <Typeahead
                  id="basic-example"
                  placeholder={
                    props.AllCust ? "Select the Customer" : "Loading..."
                  }
                  options={props.AllCust}
                  className={props.AllCust ? "" : "input-disabled"}
                  disabled={!props.AllCust}
                  onChange={(e) => {
                    if (e.length > 0) {
                      const arr =
                        props.AllCust[e[0]?.varID]?.State?.toLowerCase().split(
                          " "
                        );

                      for (var i = 0; i < arr?.length; i++) {
                        arr[i] =
                          arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
                      }

                      const newState = arr?.join(" ");

                      props.setInvRegisterData({
                        ...props.invRegisterData,

                        Cust_Code: props.AllCust[e[0]?.varID]?.Cust_Code,
                        Cust_Name: props.AllCust[e[0]?.varID]?.Cust_name,
                        Cust_Address: props.AllCust[e[0]?.varID]?.Address,
                        Cust_Place: props.AllCust[e[0]?.varID]?.City,
                        Cust_State:
                          props.allStates.filter(
                            (obj) => obj.State === newState
                          ).length === 0
                            ? "Others"
                            : newState,
                        Cust_StateId: props.AllCust[e[0]?.varID]?.StateId,
                        PIN_Code: props.AllCust[e[0]?.varID]?.Pin_Code,
                        // Del_Address: props.AllCust[e[0]?.varID]?.Delivery,
                        Del_StateId: props.AllCust[e[0]?.varID]?.StateId,
                        GSTNo: props.AllCust[e[0]?.varID]?.GSTNo,
                        PAN_No: props.AllCust[e[0]?.varID]?.PAN_No,
                      });
                    } else {
                      props.setInvRegisterData({
                        ...props.invRegisterData,
                        Cust_Code: "",
                        Cust_Name: "",
                        Cust_Address: "",
                        Cust_Place: "",
                        Cust_State: "",
                        Cust_StateId: "",
                        PIN_Code: "",
                        // Del_Address: "",
                        GSTNo: "",
                        BillType: "",
                        PaymentTerms: "",
                      });
                    }
                  }}
                />
              </>
            )}
          </div>
          <div className="col-md-6">
            <b>PO No</b>
            <input
              name="PO_No"
              value={props.invRegisterData?.PO_No}
              onChange={props.inputHandler}
              disabled={
                props.invRegisterData.Inv_No?.length > 0 ||
                props.invRegisterData.DCStatus === "Cancelled"
              }
              className={
                props.invRegisterData.Inv_No?.length > 0 ||
                props.invRegisterData.DCStatus === "Cancelled"
                  ? "input-disabled"
                  : ""
              }
            />
          </div>
        </div>

        {/* second row */}
        <div className="row">
          <div className="col-md-6">
            <b>Address</b>
            <textarea
              rows="5"
              style={{ width: "100%" }}
              name="Cust_Address"
              value={props.invRegisterData?.Cust_Address}
              disabled
              className="input-disabled"
            ></textarea>
          </div>
          <div className="col-md-6">
            <b>Delivery</b>

            <textarea
              rows="5"
              style={{ width: "100%" }}
              name="Del_Address"
              value={
                props.invRegisterData?.Del_Address === null ||
                props.invRegisterData?.Del_Address === "null" ||
                props.invRegisterData?.Del_Address === undefined ||
                props.invRegisterData?.Del_Address === "undefined" ||
                props.invRegisterData?.Del_Address === ""
                  ? ""
                  : props.invRegisterData?.Del_Address
              }
              onChange={props.inputHandler}
              disabled={
                props.invRegisterData.Inv_No?.length > 0 ||
                props.invRegisterData.DCStatus === "Cancelled"
              }
              className={
                props.invRegisterData.Inv_No?.length > 0 ||
                props.invRegisterData.DCStatus === "Cancelled"
                  ? "input-disabled"
                  : ""
              }
            ></textarea>
          </div>
        </div>
        {/* third row */}
        <div className="row">
          <div className="col-md-3">
            <b>District</b>
            <input
              name="Cust_Place"
              value={props.invRegisterData?.Cust_Place}
              disabled
              className="input-disabled"
            />
          </div>
          <div className="col-md-3">
            <b>State</b>

            <input
              name="Cust_State"
              value={props.invRegisterData.Cust_State}
              disabled
              className="input-disabled"
            />
          </div>
          <div className="col-md-3">
            <b>Pin Code</b>
            <input
              value={props.invRegisterData?.PIN_Code}
              name="PIN_Code"
              disabled
              className="input-disabled"
            />
          </div>

          <div className="col-md-3">
            <b>GST No</b>
            <input
              value={props.invRegisterData?.GSTNo}
              name="GSTNo"
              disabled
              className="input-disabled"
            />
          </div>
        </div>
      </div>
    </>
  );
}

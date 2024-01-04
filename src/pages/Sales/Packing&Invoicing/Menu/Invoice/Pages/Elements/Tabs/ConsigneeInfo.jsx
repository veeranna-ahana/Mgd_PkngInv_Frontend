import React, { useRef, useState, useEffect } from "react";
import Axios from "axios";
import { apipoints } from "../../../../../../../api/PackInv_API/Invoice/Invoice";
import { Typeahead } from "react-bootstrap-typeahead";

export default function ConsigneeInfo(props) {
  // const [AllCust, setAllCust] = useState([]);
  // const [allStates, setAllStates] = useState([]);

  // // // get all cust
  // useEffect(() => {
  //   Axios.post(apipoints.getAllCust, {}).then((res) => {
  //     setAllCust(res.data);
  //   });
  // }, []);

  // // // get all states
  // useEffect(() => {
  //   Axios.get(apipoints.getAllStates, {}).then((res) => {
  //     setAllStates(res.data);
  //   });
  // }, []);

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
                  // style={{
                  //   fontSize: "inherit",
                  // }}
                  disabled={!props.AllCust}
                  onChange={(e) => {
                    // console.log("eee", e.length);
                    // console.log("props.AllCust", props.AllCust);
                    // console.log("selected cust...", props.AllCust[e[0]?.varID]);
                    if (e.length > 0) {
                      // console.log("if");
                      const arr =
                        props.AllCust[e[0]?.varID]?.State?.toLowerCase().split(
                          " "
                        );

                      for (var i = 0; i < arr?.length; i++) {
                        arr[i] =
                          arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
                      }

                      const newState = arr?.join(" ");

                      // console.log("newState", newState);
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
                        Del_Address: props.AllCust[e[0]?.varID]?.Delivery,
                        Del_StateId: props.AllCust[e[0]?.varID]?.StateId,
                        GSTNo: props.AllCust[e[0]?.varID]?.GSTNo,
                        // PaymentTerms: props.AllCust[e[0]?.varID]?.CreditTerms,
                        // BillType:
                        //   props.AllCust[e[0]?.varID]?.CreditTerms?.split(
                        //     " "
                        //   )?.reverse()[0] === "Credit"
                        //     ? "Credit"
                        //     : "Cash",
                      });
                    } else {
                      // console.log("else");
                      props.setInvRegisterData({
                        ...props.invRegisterData,

                        Cust_Code: "",
                        Cust_Name: "",
                        Cust_Address: "",
                        Cust_Place: "",
                        Cust_State: "",
                        Cust_StateId: "",
                        PIN_Code: "",
                        Del_Address: "",
                        GSTNo: "",
                        BillType: "",
                        PaymentTerms: "",
                      });
                    }
                  }}
                />

                {/* <select
                  className={
                    props.AllCust ? "ip-select" : "ip-select input-disabled"
                  }
                  style={{
                    fontSize: "inherit",
                  }}
                  disabled={!props.AllCust}
                  onChange={(e) => {
                    const arr =
                      props.AllCust[e.target.value].State?.toLowerCase().split(
                        " "
                      );

                    for (var i = 0; i < arr.length; i++) {
                      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
                    }

                    const newState = arr.join(" ");

                    props.setInvRegisterData({
                      ...props.invRegisterData,

                      Cust_Code: props.AllCust[e.target.value].Cust_Code,
                      Cust_Name: props.AllCust[e.target.value].Cust_name,
                      Cust_Address: props.AllCust[e.target.value].Address,
                      Cust_Place: props.AllCust[e.target.value].City,
                      Cust_State:
                        props.allStates.filter((obj) => obj.State === newState)
                          .length === 0
                          ? "Others"
                          : newState,
                      Cust_StateId: props.AllCust[e.target.value].StateId,
                      PIN_Code: props.AllCust[e.target.value].Pin_Code,
                      Del_Address: props.AllCust[e.target.value].Delivery,
                      Del_StateId: props.AllCust[e.target.value].StateId,
                      GSTNo: props.AllCust[e.target.value].GSTNo,
                      PaymentTerms: props.AllCust[e.target.value].CreditTerms,
                      BillType:
                        props.AllCust[e.target.value].CreditTerms?.split(
                          " "
                        )?.reverse()[0] === "Credit"
                          ? "Credit"
                          : "Cash",
                    });
                  }}
                >
                  <option value="none" selected disabled hidden>
                    {props.AllCust ? "Select the Customer" : "Loading..."}
                  </option>
                  {props.AllCust?.map((custVal, key) => (
                    <option value={key}>{custVal.Cust_name}</option>
                  ))}
                </select> */}
              </>
            )}
          </div>
          <div className="col-md-6">
            <b>PO No</b>

            <input
              name="PO_No"
              value={props.invRegisterData?.PO_No}
              onChange={props.inputHandler}
              disabled={props.invRegisterData.DC_No.length > 0}
              className={
                props.invRegisterData.DC_No.length > 0 ? "input-disabled" : ""
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
              onChange={props.inputHandler}
              maxLength="30"
            />
          </div>
          <div className="col-md-3">
            <b>State</b>

            <select
              style={{
                fontSize: "inherit",
              }}
              name="Cust_State"
              // className="ip-select"
              value={props.invRegisterData.Cust_State}
              onChange={props.inputHandler}
              disabled={
                props.invRegisterData.Inv_No?.length > 0 ||
                props.invRegisterData.DCStatus === "Cancelled"
              }
              className={
                props.invRegisterData.Inv_No?.length > 0 ||
                props.invRegisterData.DCStatus === "Cancelled"
                  ? "input-disabled ip-select"
                  : "ip-select"
              }
            >
              <option value="" selected disabled hidden>
                Select any option
              </option>
              {props.allStates.map((state, key) => (
                <option value={state.State}>{state.State}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <b>Pin Code</b>
            <input
              maxLength="15"
              name="PIN_Code"
              // className="input-disabled"
              value={props.invRegisterData?.PIN_Code}
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

          <div className="col-md-3">
            <b>GST No</b>
            <input
              name="GSTNo"
              value={props.invRegisterData?.GSTNo}
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
      </div>
    </>
  );
}

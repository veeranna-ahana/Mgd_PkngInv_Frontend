import React, { useRef, useState, useEffect } from "react";
import Axios from "axios";
import { apipoints } from "../../../../../../api/PackInv_API/Invoice/Invoice";
export default function ConsigneeInfo(props) {
  const [AllCust, setAllCust] = useState([]);
  const [allStates, setAllStates] = useState([]);

  // get all cust
  useEffect(() => {
    Axios.post(apipoints.getAllCust, {}).then((res) => {
      setAllCust(res.data);
      // console.log("getAllCust", res.data);
    });
  }, []);

  // get all states
  useEffect(() => {
    Axios.get(apipoints.getAllStates, {}).then((res) => {
      setAllStates(res.data);
    });
  }, []);
  const blockInvalidChar = (e) => {
    const charCode = e.which || e.keyCode;
    // Check if the pressed key is a letter

    if (
      (charCode >= 65 && charCode <= 90) ||
      (charCode >= 97 && charCode <= 122)
    ) {
      return;
    }
    e.preventDefault();
  };
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
              <select
                className={AllCust ? "ip-select" : "ip-select input-disabled"}
                style={{
                  fontSize: "inherit",
                }}
                disabled={!AllCust}
                onChange={(e) => {
                  console.log("State", AllCust[e.target.value].State);
                  // console.log(
                  //   "AllCust[e.target.value].State",
                  //   AllCust[e.target.value].State
                  // );
                  const arr =
                    AllCust[e.target.value].State?.toLowerCase().split(" ");

                  for (var i = 0; i < arr.length; i++) {
                    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
                  }

                  const newState = arr.join(" ");

                  props.setInvRegisterData({
                    ...props.invRegisterData,

                    Cust_Code: AllCust[e.target.value].Cust_Code,
                    Cust_Name: AllCust[e.target.value].Cust_name,
                    Cust_Address: AllCust[e.target.value].Address,
                    Cust_Place: AllCust[e.target.value].City,
                    Cust_State:
                      allStates.filter((obj) => obj.State === newState)
                        .length === 0
                        ? "Others"
                        : newState,
                    Cust_StateId: AllCust[e.target.value].StateId,
                    PIN_Code: AllCust[e.target.value].Pin_Code,
                    Del_Address: AllCust[e.target.value].Delivery,
                    Del_StateId: AllCust[e.target.value].StateId,
                    GSTNo: AllCust[e.target.value].GSTNo,
                    PaymentTerms: AllCust[e.target.value].CreditTerms,
                  });
                }}
              >
                <option value="none" selected disabled hidden>
                  {AllCust ? "Select the Customer" : "Loading..."}
                </option>
                {AllCust?.map((custVal, key) => (
                  <option value={key}>{custVal.Cust_name}</option>
                ))}
              </select>
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
              // onKeyDown={blockInvalidChar}
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
              value={
                props.invRegisterData.Cust_State
                // allStates.filter(
                //   (obj) => obj.State === props.invRegisterData.Cust_State
                // ).length === 0
                //   ? ""
                //   : props.invRegisterData.Cust_State
              }
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
              {allStates.map((state, key) => (
                <option value={state.State}>{state.State}</option>
              ))}
            </select>
            {/* <input
              name="Cust_State"
              value={props.invRegisterData?.Cust_State}
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
            /> */}
          </div>
          <div className="col-md-3">
            <b>Pin Code</b>
            <input
              // type="number"
              // min="0"
              maxLength="15"
              name="PIN_Code"
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
              // disabled
              // className="input-disabled"
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

// <div className="col-md-6 p-0">
//   <div className="row ">

//   </div>
// </div>
// <div className="col-md-6 p-0">
//   <div className="row">

//     {/* <div className="col-md-6">
//       <b>GST State</b>
//       <input
//         disabled
//         className="input-disabled"
//         name="Cust_State"
//         defaultValue={props.invRegisterData?.Cust_State}
//         onChange={props.inputHandler}
//       />
//     </div> */}
//   </div>
// </div>

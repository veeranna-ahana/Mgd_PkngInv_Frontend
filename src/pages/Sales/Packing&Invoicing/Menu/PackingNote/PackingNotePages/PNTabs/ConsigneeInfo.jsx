import React from "react";

export default function ConsigneeInfo(props) {
  // const inputHandler = (e) => {
  //   const { name, value } = e.target;
  //   props.setInvRegisterData({ ...props.invRegisterData, [name]: value });
  // };

  return (
    <>
      <div>
        {/* first row */}
        <div className="row">
          <div className="col-md-6">
            <b>Address</b>
            <textarea
              rows="5"
              style={{ width: "100%" }}
              // className=""
              value={
                props.invRegisterData?.Cust_Address === null ||
                props.invRegisterData?.Cust_Address === "null" ||
                props.invRegisterData?.Cust_Address === undefined ||
                props.invRegisterData?.Cust_Address === "undefined" ||
                props.invRegisterData?.Cust_Address === ""
                  ? ""
                  : props.invRegisterData?.Cust_Address
              }
              name="Cust_Address"
              onChange={props.inputHandler}
              // disabled={props.INVData[0]?.Inv_No || props.NewINVNo.length > 0}
              // className={
              //   props.INVData[0]?.Inv_No || props.NewINVNo.length > 0
              //     ? "input-disabled"
              //     : ""
              // }

              disabled={
                props.invRegisterData.Inv_No ||
                props.invRegisterData.DCStatus === "Cancelled"
              }
              className={
                props.invRegisterData.Inv_No ||
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
              value={
                props.invRegisterData?.Del_Address === null ||
                props.invRegisterData?.Del_Address === "null" ||
                props.invRegisterData?.Del_Address === undefined ||
                props.invRegisterData?.Del_Address === "undefined" ||
                props.invRegisterData?.Del_Address === ""
                  ? ""
                  : props.invRegisterData?.Del_Address
              }
              name="Del_Address"
              onChange={props.inputHandler}
              disabled={
                props.invRegisterData.Inv_No ||
                props.invRegisterData.DCStatus === "Cancelled"
              }
              className={
                props.invRegisterData.Inv_No ||
                props.invRegisterData.DCStatus === "Cancelled"
                  ? "input-disabled"
                  : ""
              }
              // onChange={(e) => {
              //   props.setNewDelivery(e.target.value);
              // }}
              // disabled={props.INVData[0]?.Inv_No || props.NewINVNo.length > 0}
              // className={
              //   props.INVData[0]?.Inv_No || props.NewINVNo.length > 0
              //     ? "input-disabled"
              //     : ""
              // }
            ></textarea>
          </div>
        </div>
        {/* second row */}
        <div className="row">
          <div className="col-md-6 p-0">
            <div className="row ">
              <div className="col-md-4">
                <b>District</b>
                <input
                  // type="text"
                  value={props.invRegisterData?.Cust_Place}
                  name="Cust_Place"
                  onChange={props.inputHandler}
                  disabled={
                    props.invRegisterData.Inv_No ||
                    props.invRegisterData.DCStatus === "Cancelled"
                  }
                  className={
                    props.invRegisterData.Inv_No ||
                    props.invRegisterData.DCStatus === "Cancelled"
                      ? "input-disabled"
                      : ""
                  }
                  // onChange={(e) => {
                  //   props.setNewDistrict(e.target.value);
                  // }}
                  // disabled={
                  //   props.INVData[0]?.Inv_No || props.NewINVNo.length > 0
                  // }
                  // className={
                  //   props.INVData[0]?.Inv_No || props.NewINVNo.length > 0
                  //     ? "input-disabled"
                  //     : ""
                  // }
                />
              </div>
              <div className="col-md-4">
                <b>State</b>
                {/* <input
                  // type="text"
                  value={props.invRegisterData?.Cust_State}
                  name="Cust_State"
                  onChange={props.inputHandler}
                  disabled={
                    props.invRegisterData.Inv_No ||
                    props.invRegisterData.DCStatus === "Cancelled"
                  }
                  className={
                    props.invRegisterData.Inv_No ||
                    props.invRegisterData.DCStatus === "Cancelled"
                      ? "input-disabled"
                      : ""
                  }
                  // onChange={(e) => {
                  //   props.setNewState(e.target.value);
                  // }}
                  // disabled={
                  //   props.INVData[0]?.Inv_No || props.NewINVNo.length > 0
                  // }
                  // className={
                  //   props.INVData[0]?.Inv_No || props.NewINVNo.length > 0
                  //     ? "input-disabled"
                  //     : ""
                  // }
                /> */}

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
              <div className="col-md-4">
                <b>Pin Code</b>
                <input
                  type="number"
                  min="0"
                  // max="999999"
                  // maxlength="6"
                  value={
                    props.invRegisterData?.PIN_Code === null ||
                    props.invRegisterData?.PIN_Code === "null" ||
                    props.invRegisterData?.PIN_Code === undefined ||
                    props.invRegisterData?.PIN_Code === "undefined" ||
                    props.invRegisterData?.PIN_Code === ""
                      ? ""
                      : props.invRegisterData?.PIN_Code
                  }
                  name="PIN_Code"
                  onChange={props.inputHandler}
                  disabled={
                    props.invRegisterData.Inv_No ||
                    props.invRegisterData.DCStatus === "Cancelled"
                  }
                  className={
                    props.invRegisterData.Inv_No ||
                    props.invRegisterData.DCStatus === "Cancelled"
                      ? "input-disabled"
                      : ""
                  }
                  // onChange={(e) => {
                  //   props.setNewPinCode(e.target.value);
                  // }}
                  // disabled={
                  //   props.INVData[0]?.Inv_No || props.NewINVNo.length > 0
                  // }
                  // className={
                  //   props.INVData[0]?.Inv_No || props.NewINVNo.length > 0
                  //     ? "input-disabled"
                  //     : ""
                  // }
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-6 p-0">
                <b>GST No</b>
                <input
                  // type="text"
                  value={
                    props.invRegisterData?.GSTNo === null ||
                    props.invRegisterData?.GSTNo === "null" ||
                    props.invRegisterData?.GSTNo === undefined ||
                    props.invRegisterData?.GSTNo === "undefined" ||
                    props.invRegisterData?.GSTNo === ""
                      ? ""
                      : props.invRegisterData?.GSTNo
                  }
                  disabled
                  className="input-disabled"

                  // disabled={props.INVData[0]?.Inv_No || props.NewINVNo.length>0}
                  // className={props.INVData[0]?.Inv_No || props.NewINVNo.length>0?'input-disabled':''}
                />
              </div>
              <div className="col-md-6">
                <b>GST State</b>
                <input
                  // type="text"
                  value={
                    props.invRegisterData?.Cust_State === null ||
                    props.invRegisterData?.Cust_State === "null" ||
                    props.invRegisterData?.Cust_State === undefined ||
                    props.invRegisterData?.Cust_State === "undefined" ||
                    props.invRegisterData?.Cust_State === ""
                      ? ""
                      : props.invRegisterData?.Cust_State
                  }
                  disabled
                  className="input-disabled"

                  // disabled={props.INVData[0]?.Inv_No || props.NewINVNo.length>0}
                  // className={props.INVData[0]?.Inv_No || props.NewINVNo.length>0?'input-disabled':''}
                />
              </div>
            </div>
          </div>
        </div>
        {/* third row */}
        <div className="row">
          <b>Schedule Intructions</b>
          <div className="col-md-12">
            <textarea
              id=""
              style={{ width: "100%" }}
              name="sch_ins"
              onChange={props.inputHandler}
              disabled={
                props.invRegisterData.Inv_No ||
                props.invRegisterData.DCStatus === "Cancelled"
              }
              className={
                props.invRegisterData.Inv_No ||
                props.invRegisterData.DCStatus === "Cancelled"
                  ? "input-disabled"
                  : ""
              }
              // onChange={(e) => {
              //   props.setNewScheduleIntructions(e.target.value);
              // }}
              // disabled={props.INVData[0]?.Inv_No || props.NewINVNo.length > 0}
              // className={
              //   props.INVData[0]?.Inv_No || props.NewINVNo.length > 0
              //     ? "input-disabled"
              //     : ""
              // }
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
}

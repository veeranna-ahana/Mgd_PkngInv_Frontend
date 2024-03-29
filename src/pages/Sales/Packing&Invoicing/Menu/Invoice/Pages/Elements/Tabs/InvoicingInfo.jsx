import React, { useState, useEffect, useRef } from "react";

import Axios from "axios";
import { toast } from "react-toastify";

export default function InvoicingInfo(props) {
  const trnsMode = ["By Road", "By Hand", "By Air", "By Courier"];

  const billType = ["Cash", "Credit"];

  const creditDays = [
    "7 Days Credit",
    "15 Days Credit",
    "30 Days Credit",
    "45 Days Credit",
    "60 Days Credit",
    "90 Days Credit",
  ];
  const cashMode = [
    "Cash on Delivery",
    "Cheque on Delivery",
    "Demand Draft on Delivery",
    "QR Code and RTGS",
  ];

  const createInvoiceWorkFunc = () => {
    props.setButtonClicked("Create Invoice");
    props.setConfirmModalOpen(true);
  };
  const createInvoiceValidationFunc = (e) => {
    const checkForZero = props.invDetailsData.filter(
      (obj) =>
        obj.Unit_Rate === 0 ||
        obj.Unit_Rate === 0.0 ||
        obj.Unit_Rate === "0" ||
        obj.Unit_Rate === "0.0" ||
        obj.Unit_Rate === "0.00" ||
        obj.Unit_Rate === null ||
        obj.Unit_Rate === "null" ||
        obj.Unit_Rate === "" ||
        obj.Qty === 0 ||
        obj.Qty === 0.0 ||
        obj.Qty === "0" ||
        obj.Qty === "0.0" ||
        obj.Qty === "0.00" ||
        obj.Qty === "null" ||
        obj.Qty === null ||
        obj.Qty === ""
    );

    if (checkForZero.length > 0) {
      toast.warning(
        "Check for zero value for quantity or rate, Correct and try again"
      );
      e.preventDefault();
    } else {
      // if (props.invRegisterData.Cust_Address.length === 0) {
      //   toast.warning("Please enter customer address");
      //   e.preventDefault();
      // } else if (props.invRegisterData.Cust_Place.length === 0) {
      //   toast.warning("Please enter customer district");
      //   e.preventDefault();
      // } else if (props.invRegisterData.Cust_State.length === 0) {
      //   toast.warning("Please enter customer state");
      //   e.preventDefault();
      // } else if (props.invRegisterData.PIN_Code.length === 0) {
      //   toast.warning("Please enter customer pincode");
      //   e.preventDefault();
      // }
      if (props.TaxDropDownData?.length > 0 && props.invTaxData.length === 0) {
        toast.warning("Please select SGST and CST for Tax");
        e.preventDefault();
      } else if (
        props.invRegisterData.Del_Address.length === 0 ||
        props.invRegisterData.Del_Address === null ||
        props.invRegisterData.Del_Address === "null" ||
        props.invRegisterData.Del_Address === undefined ||
        props.invRegisterData.Del_Address === "undefined" ||
        props.invRegisterData.Del_Address === ""
      ) {
        toast.warning("Please enter customer delivery address");
        e.preventDefault();
      }
      // else if (props.invRegisterData.GSTNo.length === 0) {
      //   toast.warning("Please enter customer GST");
      //   e.preventDefault();
      // }
      else if (
        props.invRegisterData.DespatchDate === null ||
        props.invRegisterData.DespatchDate === undefined ||
        props.invRegisterData.DespatchDate === "" ||
        props.invRegisterData.DespatchDate === "null" ||
        props.invRegisterData.DespatchDate === "undefined" ||
        props.invRegisterData.DespatchDate.length === 0
      ) {
        toast.warning("Please enter Dispatch Date");
        e.preventDefault();
      } else if (
        props.invRegisterData.TptMode === null ||
        props.invRegisterData.TptMode === undefined ||
        props.invRegisterData.TptMode === "" ||
        props.invRegisterData.TptMode === "null" ||
        props.invRegisterData.TptMode === "undefined" ||
        props.invRegisterData.TptMode.length === 0
      ) {
        toast.warning("Please select Dispatch Mode");
        e.preventDefault();
      } else if (
        props.invRegisterData.TptMode === "By Road" &&
        (props.invRegisterData.VehNo === null ||
          props.invRegisterData.VehNo === undefined ||
          props.invRegisterData.VehNo === "" ||
          props.invRegisterData.VehNo === "null" ||
          props.invRegisterData.VehNo === "undefined" ||
          props.invRegisterData.VehNo.length === 0)
      ) {
        toast.warning("Please enter Vehicle Number");
        e.preventDefault();
      } else if (
        (props.invRegisterData.Del_ContactName === null ||
          props.invRegisterData.Del_ContactName === undefined ||
          props.invRegisterData.Del_ContactName === "" ||
          props.invRegisterData.Del_ContactName === "null" ||
          props.invRegisterData.Del_ContactName === "undefined" ||
          props.invRegisterData.Del_ContactName.length === 0) &&
        props.invRegisterData.DC_InvType === "Services"
      ) {
        toast.warning("Please enter delivery person name");
        e.preventDefault();
      } else if (
        (props.invRegisterData.Del_ContactNo === null ||
          props.invRegisterData.Del_ContactNo === undefined ||
          props.invRegisterData.Del_ContactNo === "" ||
          props.invRegisterData.Del_ContactNo === "null" ||
          props.invRegisterData.Del_ContactNo.length === 0) &&
        props.invRegisterData.DC_InvType === "Services"
      ) {
        toast.warning("Please enter delivery person conatct number");
        e.preventDefault();
      } else if (
        props.invRegisterData?.BillType === "Cash" &&
        props.invRegisterData.PaymentTerms.length === 0
      ) {
        toast.warning("Please select the Cash Mode");
      } else if (
        props.invRegisterData?.BillType === "Credit" &&
        props.invRegisterData.PaymentTerms.length === 0
      ) {
        toast.warning("Please select the Credit Days");
      } else if (props.invRegisterData.BillType.length === 0) {
        toast.warning("Please select Bill Type");
        e.preventDefault();
      } else if (
        parseFloat(props.invRegisterData.GrandTotal).toFixed(2) < 0.0
      ) {
        toast.warning("Can't create the invoice with negative amount");
      } else if (props.invRegisterData.BillType.length > 0) {
        if (props.invRegisterData.BillType === "Cash") {
          if (
            props.invRegisterData.PaymentTerms === cashMode[0] ||
            props.invRegisterData.PaymentTerms === cashMode[3]
          ) {
            if (
              props.invRegisterData.PaymentReceiptDetails === null ||
              props.invRegisterData.PaymentReceiptDetails === undefined ||
              props.invRegisterData.PaymentReceiptDetails === "" ||
              props.invRegisterData.PaymentReceiptDetails === "null" ||
              props.invRegisterData.PaymentReceiptDetails.length < 8 ||
              props.invRegisterData.PymtAmtRecd.length === 0 ||
              parseFloat(props.invRegisterData.PymtAmtRecd).toFixed(1) === 0.0
            ) {
              toast.warning("Please enter the Cash Reciept No and Details");
              e.preventDefault();
            } else {
              if (
                parseFloat(props.invRegisterData.PymtAmtRecd).toFixed(2) <
                parseFloat(props.invRegisterData.GrandTotal).toFixed(2)
              ) {
                toast.warning("Amount collected is less then Invoice Amount");
                e.preventDefault();
              } else {
                createInvoiceWorkFunc();
              }
            }
          } else if (props.invRegisterData.PaymentTerms === cashMode[1]) {
            if (
              props.invRegisterData.PaymentReceiptDetails === null ||
              props.invRegisterData.PaymentReceiptDetails === undefined ||
              props.invRegisterData.PaymentReceiptDetails === "" ||
              props.invRegisterData.PaymentReceiptDetails === "null" ||
              props.invRegisterData.PaymentReceiptDetails.length < 8 ||
              props.invRegisterData.PymtAmtRecd.length === 0 ||
              parseFloat(props.invRegisterData.PymtAmtRecd).toFixed(1) === 0.0
            ) {
              toast.warning("Please enter the Cheque Details");
              e.preventDefault();
            } else {
              if (
                parseFloat(props.invRegisterData.PymtAmtRecd) <
                parseFloat(props.invRegisterData.GrandTotal)
              ) {
                toast.warning("Amount collected is less then Invoice Amount");
                e.preventDefault();
              } else {
                createInvoiceWorkFunc();
              }
            }
          } else if (props.invRegisterData.PaymentTerms === cashMode[2]) {
            if (
              props.invRegisterData.PaymentReceiptDetails === null ||
              props.invRegisterData.PaymentReceiptDetails === undefined ||
              props.invRegisterData.PaymentReceiptDetails === "" ||
              props.invRegisterData.PaymentReceiptDetails === "null" ||
              props.invRegisterData.PaymentReceiptDetails.length < 8 ||
              props.invRegisterData.PymtAmtRecd.length === 0 ||
              parseFloat(props.invRegisterData.PymtAmtRecd).toFixed(1) === 0.0
            ) {
              toast.warning("Please enter the DD Details");
              e.preventDefault();
            } else {
              if (
                parseFloat(props.invRegisterData.PymtAmtRecd).toFixed(2) <
                parseFloat(props.invRegisterData.GrandTotal).toFixed(2)
              ) {
                toast.warning("Amount collected is less then Invoice Amount");
                e.preventDefault();
              } else {
                createInvoiceWorkFunc();
              }
            }
          }
        } else {
          createInvoiceWorkFunc();
        }
      } else {
        createInvoiceWorkFunc();
      }
    }
  };

  return (
    <>
      <div>
        <div className="row">
          <div className="col-md-7">
            <div className="col">
              {/* dispatch details */}
              <div>
                <label className="form-label">Dispatch Details</label>
                <div
                  className="p-1 row pb-2"
                  style={{ border: "1px solid lightgray", borderRadius: "5px" }}
                >
                  <div className="d-flex col-md-4" style={{ gap: "10px" }}>
                    <label
                      className="form-label"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Dispatch Date
                    </label>
                    <input
                      type="datetime-local"
                      name="DespatchDate"
                      value={
                        props.invRegisterData?.DespatchDate || ""
                        // props.invRegisterData?.DespatchDate?.split("T")[0]
                        //   ? props.invRegisterData.DespatchDate.split("T")[0]
                        //   : null
                      }
                      min={props.formatedTodayDate}
                      onChange={props.inputHandler}
                      disabled={
                        props.invRegisterData.Inv_No?.length > 0 ||
                        props.invRegisterData.DCStatus === "Cancelled"
                      }
                      className={
                        props.invRegisterData.Inv_No?.length > 0 ||
                        props.invRegisterData.DCStatus === "Cancelled"
                          ? "input-disabled"
                          : "in-field"
                      }
                    />
                  </div>
                  <div className=" d-flex col-md-4" style={{ gap: "10px" }}>
                    <label
                      className="form-label"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Dispatch Mode
                    </label>
                    <select
                      name="TptMode"
                      value={props.invRegisterData?.TptMode}
                      onChange={props.inputHandler}
                      disabled={
                        props.invRegisterData.Inv_No?.length > 0 ||
                        props.invRegisterData.DCStatus === "Cancelled"
                      }
                      className={
                        props.invRegisterData.Inv_No?.length > 0 ||
                        props.invRegisterData.DCStatus === "Cancelled"
                          ? "ip-select input-disabled"
                          : "ip-select"
                      }
                    >
                      <option value="" selected disabled hidden>
                        Select Dispatch Mode
                      </option>
                      {trnsMode.map((val, key) => (
                        <option value={val}>{val}</option>
                      ))}
                    </select>
                  </div>
                  <div className="d-flex col-md-4" style={{ gap: "10px" }}>
                    <label
                      className="form-label"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Vehicle No
                    </label>
                    <input
                      type="text"
                      name="VehNo"
                      value={props.invRegisterData?.VehNo}
                      onChange={props.inputHandler}
                      disabled={
                        props.invRegisterData?.TptMode === "By Hand" ||
                        props.invRegisterData.Inv_No?.length > 0 ||
                        props.invRegisterData.DCStatus === "Cancelled"
                      }
                      className={
                        props.invRegisterData?.TptMode === "By Hand" ||
                        props.invRegisterData.Inv_No?.length > 0 ||
                        props.invRegisterData.DCStatus === "Cancelled"
                          ? "input-disabled"
                          : "in-field"
                      }
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="form-label">Invoice Summary</label>
                <div
                  className="p-1 row pb-2"
                  style={{ border: "1px solid lightgray", borderRadius: "5px" }}
                >
                  <div className="d-flex col-md-4" style={{ gap: "25px" }}>
                    <label
                      className="form-label"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Net Total
                    </label>
                    <input
                      disabled
                      className="input-disabled"
                      name="Net_Total"
                      value={props.invRegisterData?.Net_Total}
                      onChange={props.inputHandler}
                    />
                  </div>
                  <div className="d-flex col-md-4" style={{ gap: "30px" }}>
                    <label className="form-label">Discount</label>
                    <input
                      type="number"
                      min="0"
                      name="Discount"
                      value={props.invRegisterData?.Discount}
                      onChange={props.handleChangeDiscountDelivery}
                      disabled={
                        props.invRegisterData.Inv_No?.length > 0 ||
                        props.invRegisterData.DCStatus === "Cancelled"
                      }
                      className={
                        props.invRegisterData.Inv_No?.length > 0 ||
                        props.invRegisterData.DCStatus === "Cancelled"
                          ? "input-disabled"
                          : "in-field"
                      }
                    />
                  </div>
                  <div className=" d-flex col-md-4" style={{ gap: "10px" }}>
                    <label
                      className="form-label"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Delivery Charges
                    </label>
                    <input
                      type="number"
                      min="0"
                      name="Del_Chg"
                      value={props.invRegisterData?.Del_Chg}
                      onChange={props.handleChangeDiscountDelivery}
                      disabled={
                        props.invRegisterData.Inv_No?.length > 0 ||
                        props.invRegisterData.DCStatus === "Cancelled"
                      }
                      className={
                        props.invRegisterData.Inv_No?.length > 0 ||
                        props.invRegisterData.DCStatus === "Cancelled"
                          ? "input-disabled"
                          : "in-field"
                      }
                    />
                  </div>
                  <div className="d-flex col-md-4" style={{ gap: "10px" }}>
                    <label
                      className="form-label"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Tax Amount
                    </label>
                    <input
                      disabled
                      className="input-disabled"
                      name="TaxAmount"
                      value={parseFloat(
                        props.invRegisterData?.TaxAmount
                      ).toFixed(2)}
                      onChange={props.inputHandler}
                    />
                  </div>
                  <div className="d-flex col-md-4" style={{ gap: "10px" }}>
                    <label
                      className="form-label"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Invoice Total
                    </label>
                    <input
                      disabled
                      className="input-disabled"
                      name="InvTotal"
                      value={parseFloat(
                        props.invRegisterData?.InvTotal
                      ).toFixed(2)}
                      onChange={props.inputHandler}
                    />
                  </div>
                  <div className="d-flex col-md-4" style={{ gap: "45px" }}>
                    <label
                      className="form-label"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Round Off
                    </label>
                    <input
                      disabled
                      className="input-disabled"
                      name="Round_Off"
                      value={parseFloat(
                        props.invRegisterData?.Round_Off
                      ).toFixed(2)}
                      onChange={props.inputHandler}
                    />
                  </div>
                  <div className="d-flex col-md-4" style={{ gap: "10px" }}>
                    <label
                      className="form-label"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Grand Total
                    </label>
                    <input
                      disabled
                      className="input-disabled"
                      name="GrandTotal"
                      value={parseFloat(
                        props.invRegisterData?.GrandTotal
                      ).toFixed(2)}
                      onChange={props.inputHandler}
                    />
                  </div>
                </div>
              </div>
              {/* remarks */}
              <div>
                <label className="form-label">Remarks</label>
                <textarea
                  // rows="2"
                  style={{
                    border: "1px solid lightgray",
                    borderRadius: "5px",
                    width: "100%",
                    height: "50px",
                  }}
                  maxLength={"190"}
                  name="Remarks"
                  // className="p-1 pb-2"
                  value={props.invRegisterData?.Remarks}
                  onChange={props.inputHandler}
                  disabled={
                    props.invRegisterData.Inv_No?.length > 0 ||
                    props.invRegisterData.DCStatus === "Cancelled"
                  }
                  className={
                    props.invRegisterData.Inv_No?.length > 0 ||
                    props.invRegisterData.DCStatus === "Cancelled"
                      ? "input-disabled p-1 pb-2"
                      : "in-field p-1 pb-2"
                  }
                ></textarea>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            {/* delivery details */}
            <div>
              <label className="form-label">Delivery Details</label>
              <div
                className="p-1 pb-2"
                style={{ border: "1px solid lightgray", borderRadius: "5px" }}
              >
                <div className="row">
                  <div className="d-flex col-md-6" style={{ gap: "10px" }}>
                    <label
                      className="form-label"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Person Name
                    </label>
                    <input
                      name="Del_ContactName"
                      value={props.invRegisterData.Del_ContactName}
                      onChange={props.inputHandler}
                      disabled={
                        props.invRegisterData.Inv_No ||
                        props.invRegisterData.DCStatus === "Cancelled"
                      }
                      className={
                        props.invRegisterData.Inv_No ||
                        props.invRegisterData.DCStatus === "Cancelled"
                          ? "input-disabled"
                          : "in-field"
                      }
                    />
                  </div>
                  <div className="d-flex col-md-6" style={{ gap: "10px" }}>
                    <label
                      className="form-label"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Person Contact No
                    </label>
                    <input
                      name="Del_ContactNo"
                      value={props.invRegisterData.Del_ContactNo}
                      onChange={props.inputHandler}
                      disabled={
                        props.invRegisterData.Inv_No ||
                        props.invRegisterData.DCStatus === "Cancelled"
                      }
                      className={
                        props.invRegisterData.Inv_No ||
                        props.invRegisterData.DCStatus === "Cancelled"
                          ? "input-disabled"
                          : "in-field"
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Payment details */}
            <div>
              <label className="form-label">Payment Details</label>
              <div
                className="p-1 pb-2"
                style={{ border: "1px solid lightgray", borderRadius: "5px" }}
              >
                <div className="row">
                  <div className="d-flex col-md-6" style={{ gap: "28px" }}>
                    <label
                      className="form-label"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Bill Type
                    </label>
                    <select
                      name="BillType"
                      value={props.invRegisterData.BillType}
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
                        Select Bill Type
                      </option>
                      {billType.map((val, key) => (
                        <option value={val}>{val}</option>
                      ))}
                    </select>
                  </div>
                  <div className="d-flex col-md-6" style={{ gap: "45px" }}>
                    <label
                      className="form-label"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {props.invRegisterData?.BillType === "Cash"
                        ? "Cash Mode"
                        : "Credit Days"}
                    </label>
                    <select
                      name="PaymentTerms"
                      value={props.invRegisterData?.PaymentTerms}
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
                        {props.invRegisterData?.BillType === "Cash"
                          ? "Select Cash Mode"
                          : "Select Credit Days"}
                      </option>
                      {(props.invRegisterData?.BillType === "Cash"
                        ? cashMode
                        : creditDays
                      ).map((val, key) => (
                        <option value={val}>{val}</option>
                      ))}
                    </select>
                  </div>
                  <div className="d-flex col-md-6 mt-1" style={{ gap: "10px" }}>
                    <label
                      className="form-label"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Grand Total
                    </label>
                    <input
                      disabled
                      className="input-disabled"
                      name="GrandTotal"
                      value={props.invRegisterData?.GrandTotal}
                      onChange={props.inputHandler}
                    />
                  </div>
                  <div className="d-flex col-md-6 mt-1" style={{ gap: "10px" }}>
                    <label
                      className="form-label"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Amount Recieved
                    </label>
                    <input
                      type="number"
                      min={"0"}
                      name="PymtAmtRecd"
                      value={props.invRegisterData?.PymtAmtRecd}
                      onChange={props.inputHandler}
                      disabled={
                        props.invRegisterData?.BillType === "Credit" ||
                        props.invRegisterData.Inv_No?.length > 0 ||
                        props.invRegisterData.DCStatus === "Cancelled"
                      }
                      className={
                        props.invRegisterData?.BillType === "Credit" ||
                        props.invRegisterData.Inv_No?.length > 0 ||
                        props.invRegisterData.DCStatus === "Cancelled"
                          ? "input-disabled"
                          : "in-field"
                      }
                    />
                  </div>
                  {props.invRegisterData?.BillType === "Cash" ? (
                    <div className="col-md-12">
                      <b>Description</b>
                      <textarea
                        rows="4"
                        style={{ width: "100%" }}
                        name="PaymentReceiptDetails"
                        value={props.invRegisterData?.PaymentReceiptDetails}
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
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <button
              // className="button-style"
              disabled={
                !(props.invRegisterData.DC_No.length > 0) ||
                props.invRegisterData.Inv_No?.length > 0 ||
                props.invRegisterData.DCStatus === "Cancelled"
              }
              className={
                !(props.invRegisterData.DC_No.length > 0) ||
                props.invRegisterData.Inv_No?.length > 0 ||
                props.invRegisterData.DCStatus === "Cancelled"
                  ? "button-style button-disabled"
                  : "button-style"
              }
              onClick={createInvoiceValidationFunc}
            >
              Create Invoice
            </button>
          </div>
          <div className="col-md-6 p-0">
            <div className="d-flex justify-content-end">
              <button
                disabled={
                  !(props.invRegisterData.Inv_No?.length > 0) ||
                  props.invRegisterData.DCStatus === "Cancelled"
                }
                className={
                  !(props.invRegisterData.Inv_No?.length > 0) ||
                  props.invRegisterData.DCStatus === "Cancelled"
                    ? "button-style button-disabled"
                    : "button-style"
                }
                onClick={
                  props.invDetailsData?.length > props.rowLimit
                    ? props.printAnnexure
                    : props.printInvoice
                }
              >
                {props.invDetailsData?.length > props.rowLimit
                  ? "Print Annexure"
                  : "Print Invoice"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

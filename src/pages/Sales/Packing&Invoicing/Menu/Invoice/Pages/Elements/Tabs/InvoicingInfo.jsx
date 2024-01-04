import React, { useState, useEffect, useRef } from "react";

import Axios from "axios";
import { toast } from "react-toastify";
// import { apipoints } from "../../../../../../../api/PackInv_API/Invoice/Invoice";
// import ModalInvoiceAndAnnexure from "../../../../../PDFs/InvoiceAndAnnexure/ModalInvoiceAndAnnexure";

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
        obj.Qty === 0 ||
        obj.Qty === 0.0 ||
        obj.Qty === "0" ||
        obj.Qty === "0.0" ||
        obj.Qty === "0.00"
    );

    if (checkForZero.length > 0) {
      toast.warning(
        "Check for zero value for quantity or rate, Correct and try again"
      );
      e.preventDefault();
    } else {
      if (props.invRegisterData.Cust_Address.length === 0) {
        toast.warning("Please enter customer address");
        e.preventDefault();
      } else if (props.invRegisterData.Cust_Place.length === 0) {
        toast.warning("Please enter customer district");
        e.preventDefault();
      } else if (props.invRegisterData.Cust_State.length === 0) {
        toast.warning("Please enter customer state");
        e.preventDefault();
      } else if (props.invRegisterData.PIN_Code.length === 0) {
        toast.warning("Please enter customer pincode");
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
      else if (props.invRegisterData.DespatchDate.length === 0) {
        toast.warning("Please enter Dispatch Date");
        e.preventDefault();
      } else if (props.invRegisterData.TptMode.length === 0) {
        toast.warning("Please select Dispatch Mode");
        e.preventDefault();
      } else if (props.invRegisterData.VehNo.length === 0) {
        toast.warning("Please enter Vehicle Number");
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
        toast.warning("Can't create the invoice with negative grand total");
      } else if (props.invRegisterData.BillType.length > 0) {
        // console.log("jfsdhkjlk");
        if (props.invRegisterData.BillType === "Cash") {
          if (
            (props.invRegisterData.PaymentTerms === cashMode[0] &&
              props.invRegisterData.PaymentReceiptDetails?.length === 0) ||
            (props.invRegisterData.PaymentTerms === cashMode[3] &&
              props.invRegisterData.PaymentReceiptDetails?.length === 0)
          ) {
            toast.warning("Please enter the Cash Reciept No and Details");
            e.preventDefault();
          } else if (
            props.invRegisterData.PaymentTerms === cashMode[1] &&
            props.invRegisterData.PaymentReceiptDetails?.length === 0
          ) {
            toast.warning("Please enter the Cheque Details");
            e.preventDefault();
          } else if (
            props.invRegisterData.PaymentTerms === cashMode[2] &&
            props.invRegisterData.PaymentReceiptDetails?.length === 0
          ) {
            toast.warning("Please enter the DD Details");
            e.preventDefault();
          } else {
            createInvoiceWorkFunc();
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
          <div className="col-md-9">
            <div className="col">
              {/* dispatch details */}
              <div>
                <b>Dispatch Details</b>
                <div
                  className="p-1 row pb-2"
                  style={{ border: "1px solid lightgray", borderRadius: "5px" }}
                >
                  <div className="col-md-4">
                    <b>Dispatch Date</b>
                    <input
                      type="date"
                      name="DespatchDate"
                      value={props.invRegisterData?.DespatchDate?.split("T")[0]}
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
                  <div className="col-md-4">
                    <b>Dispatch Mode</b>
                    <select
                      style={{
                        fontSize: "inherit",
                      }}
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
                  <div className="col-md-4">
                    <b>Vehicle No</b>
                    <input
                      type="text"
                      name="VehNo"
                      value={props.invRegisterData?.VehNo}
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
              <div>
                <b>Invoice Summary</b>
                <div
                  className="p-1 row pb-2"
                  style={{ border: "1px solid lightgray", borderRadius: "5px" }}
                >
                  <div className="col-md-4">
                    <b>Net Total</b>
                    <input
                      disabled
                      className="input-disabled"
                      name="Net_Total"
                      value={props.invRegisterData?.Net_Total}
                      onChange={props.inputHandler}
                    />
                  </div>
                  <div className="col-md-4">
                    <b>Discount</b>
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
                          : ""
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <b>Delivery Charges</b>
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
                          : ""
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <b>Tax Amount</b>
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
                  <div className="col-md-4">
                    <b>Invoice Total</b>
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
                  <div className="col-md-4">
                    <b>Round Off</b>
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
                  <div className="col-md-4">
                    <b>Grand Total</b>
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
                <b>Remarks</b>
                <textarea
                  rows="2"
                  style={{
                    border: "1px solid lightgray",
                    borderRadius: "5px",
                    width: "100%",
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
                      : "p-1 pb-2"
                  }
                ></textarea>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            {/* Payment details */}
            <div>
              <b>Payment Details</b>
              <div
                className="p-1 pb-2"
                style={{ border: "1px solid lightgray", borderRadius: "5px" }}
              >
                <div className="row">
                  <div className="col-md-12">
                    <div className="">
                      <b>Bill Type</b>
                      <select
                        style={{
                          fontSize: "inherit",
                        }}
                        name="BillType"
                        value={props.invRegisterData.BillType}
                        onChange={props.inputHandler}
                        // onChange={(e) => {
                        //   props.inputHandler(e);
                        //   props.invRegisterData.PaymentTerms =
                        //     e.target.value === "Cash"
                        //       ? cashMode[0]
                        //       : creditDays[0];
                        //   props.setInvRegisterData(props.invRegisterData);
                        // }}
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
                    <div className="">
                      <b>
                        {props.invRegisterData?.BillType === "Cash"
                          ? "Cash Mode"
                          : "Credit Days"}
                      </b>
                      <select
                        style={{
                          fontSize: "inherit",
                        }}
                        name="PaymentTerms"
                        // className="ip-select"
                        value={
                          props.invRegisterData?.PaymentTerms
                          // props.invRegisterData.BillType === "Cash"
                          //   ? props.invRegisterData?.PaymentTerms || cashMode[0]
                          //   : props.invRegisterData?.PaymentTerms
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
                    <div className="">
                      <b>Grand Total</b>
                      <input
                        disabled
                        className="input-disabled"
                        name="GrandTotal"
                        value={props.invRegisterData?.GrandTotal}
                        onChange={props.inputHandler}
                      />
                    </div>
                    <div className="">
                      <b>Amount Recieved</b>
                      <input
                        type="number"
                        min={"0"}
                        name="PymtAmtRecd"
                        value={props.invRegisterData?.PymtAmtRecd}
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
                    {props.invRegisterData?.BillType === "Cash" ? (
                      <div className="">
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
                // className="button-style"

                disabled={
                  !(props.invRegisterData.Inv_No?.length > 0) ||
                  props.invDetailsData?.length > 20 ||
                  props.invRegisterData.DCStatus === "Cancelled"
                }
                className={
                  !(props.invRegisterData.Inv_No?.length > 0) ||
                  props.invDetailsData?.length > 20 ||
                  props.invRegisterData.DCStatus === "Cancelled"
                    ? "button-style button-disabled"
                    : "button-style"
                }
                onClick={props.printPackingNoteAnnexure}
              >
                Print Copy
              </button>
              <button
                // className="button-disabled"
                disabled={
                  !(props.invRegisterData.Inv_No?.length > 0) ||
                  !(props.invDetailsData?.length > 20)
                }
                className={
                  !(props.invRegisterData.Inv_No?.length > 0) ||
                  !(props.invDetailsData?.length > 20)
                    ? "button-style button-disabled"
                    : "button-style"
                }
                onClick={props.printPackingNoteAnnexure}
              >
                Print Annexure
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useState, useRef } from "react";

import { toast } from "react-toastify";
import Axios from "axios";

import ModalPackingNote from "../../../../PDFs/PackingNote/ModalPackingNote";
import ModalAnnexure from "../../../../PDFs/Annexure/ModalAnnexure";
import ModalInvoice from "../../../../PDFs/Invoice/ModalInvoice";
import { apipoints } from "../../../../../../api/PackInv_API/Invoice/Invoice";

export default function InvoicingInfo(props) {
  const layoutForInvoicingInfo = "border row rounded p-1 pb-3";

  const trnsMode = ["By Road", "By Hand", "By Air", "By Courier"];

  const cashMode = [
    "Cash on Delivery",
    "Cheque on Delivery",
    "Demand Draft on Delivery",
    "QR Code and RTGS",
  ];

  const getDCNo = async () => {
    // console.log("todayDate", todayDate);

    let finYear = `${
      (props.todayDate.getMonth() + 1 < 4
        ? props.todayDate.getFullYear() - 1
        : props.todayDate.getFullYear()
      )
        .toString()
        .slice(-2) +
      "/" +
      (props.todayDate.getMonth() + 1 < 4
        ? props.todayDate.getFullYear()
        : props.todayDate.getFullYear() + 1
      )
        .toString()
        .slice(-2)
    }`;

    // console.log("finYear", finYear);

    let srlType = "";

    if (props.invRegisterData.InvoiceFor === "Profile") {
      srlType = "GST_Goods";
    } else if (props.invRegisterData.InvoiceFor === "Service") {
      srlType = "GST_Services";
    } else if (props.invRegisterData.InvoiceFor === "Misc") {
      srlType = "GST_GoodsAndSerivce";
    } else if (props.invRegisterData.InvoiceFor === "Fabrication") {
      srlType = "GST_Goods";
    } else {
      srlType = "GST_GoodsAndSerivce";
    }

    const ResetPeriod = "FinanceYear";
    const ResetValue = 0;
    const Length = 4;
    // const prefix = "";

    Axios.post(apipoints.insertAndGetRunningNo, {
      finYear: finYear,
      unitName: props?.formData.unitName,
      srlType: srlType,
      ResetPeriod: ResetPeriod,
      ResetValue: ResetValue,
      Length: Length,
      // prefix: prefix,
    }).then((res) => {
      props.setRunningNoData(res.data.runningNoData);
      console.log("getDCNo Response", res.data);
    });
  };

  const createInvoiceWorkFunc = () => {
    getDCNo();
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
        props.invRegisterData.InvoiceFor != "Profile" &&
        (props.invRegisterData.Del_Address.length === 0 ||
          props.invRegisterData.Del_Address === null ||
          props.invRegisterData.Del_Address === "null" ||
          props.invRegisterData.Del_Address === undefined ||
          props.invRegisterData.Del_Address === "undefined" ||
          props.invRegisterData.Del_Address === "")
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
        (props.invRegisterData.DC_InvType === "Services" ||
          props.invRegisterData.DC_InvType === "Service") &&
        (props.invRegisterData.Del_ContactName === null ||
          props.invRegisterData.Del_ContactName === undefined ||
          props.invRegisterData.Del_ContactName === "" ||
          props.invRegisterData.Del_ContactName === "null" ||
          props.invRegisterData.Del_ContactName === "undefined" ||
          props.invRegisterData.Del_ContactName.length === 0)

        // ((props.invRegisterData.Del_ContactName === null ||
        //   props.invRegisterData.Del_ContactName === undefined ||
        //   props.invRegisterData.Del_ContactName === "" ||
        //   props.invRegisterData.Del_ContactName === "null" ||
        //   props.invRegisterData.Del_ContactName === "undefined" ||
        //   props.invRegisterData.Del_ContactName.length === 0) &&
        //   props.invRegisterData.DC_InvType === "Services") ||
        // props.invRegisterData.DC_InvType === "Service"
      ) {
        toast.warning("Please enter delivery person name");
        e.preventDefault();
      } else if (
        (props.invRegisterData.DC_InvType === "Services" ||
          props.invRegisterData.DC_InvType === "Service") &&
        (props.invRegisterData.Del_ContactNo === null ||
          props.invRegisterData.Del_ContactNo === undefined ||
          props.invRegisterData.Del_ContactNo === "" ||
          props.invRegisterData.Del_ContactNo === "null" ||
          props.invRegisterData.Del_ContactNo === "undefined" ||
          props.invRegisterData.Del_ContactNo.length === 0)
        // ((props.invRegisterData.Del_ContactNo === null ||
        //   props.invRegisterData.Del_ContactNo === undefined ||
        //   props.invRegisterData.Del_ContactNo === "" ||
        //   props.invRegisterData.Del_ContactNo === "null" ||
        //   props.invRegisterData.Del_ContactNo.length === 0) &&
        //   props.invRegisterData.DC_InvType === "Services") ||
        // props.invRegisterData.DC_InvType === "Service"
      ) {
        toast.warning("Please enter delivery person contact number");
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
        {/* first row */}
        <div className="row">
          <div className="col-md-7">
            <label className="form-label">Dispatch Info</label>
            <div className={layoutForInvoicingInfo}>
              <div className="d-flex col-md-4 mt-1" style={{ gap: "10px" }}>
                <label className="form-label" style={{ whiteSpace: "nowrap" }}>
                  Dispatch Date
                </label>
                <input
                  type="datetime-local"
                  value={
                    props.invRegisterData?.DespatchDate || ""
                    // props.invRegisterData?.DespatchDate?.split("T")[0]
                    //   ? props.invRegisterData.DespatchDate.split("T")[0]
                    //   : null
                  }
                  min={props.formatedTodayDate}
                  name="DespatchDate"
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
              <div className="d-flex col-md-4 mt-1" style={{ gap: "10px" }}>
                <label className="form-label" style={{ whiteSpace: "nowrap" }}>
                  Dispatch Mode
                </label>

                {props.invRegisterData?.TptMode ? (
                  <select
                    name="TptMode"
                    onChange={props.inputHandler}
                    disabled={
                      props.invRegisterData.Inv_No ||
                      props.invRegisterData.DCStatus === "Cancelled"
                    }
                    className={
                      props.invRegisterData.Inv_No ||
                      props.invRegisterData.DCStatus === "Cancelled"
                        ? "ip-select input-disabled"
                        : "ip-select"
                    }
                  >
                    {trnsMode.map((val) =>
                      props.invRegisterData?.TptMode === val ? (
                        <option value={val} selected>
                          {val}
                        </option>
                      ) : (
                        <option value={val}>{val}</option>
                      )
                    )}
                  </select>
                ) : (
                  <select
                    style={{
                      fontSize: "inherit",
                    }}
                    name="TptMode"
                    onChange={props.inputHandler}
                    disabled={
                      props.invRegisterData.Inv_No ||
                      props.invRegisterData.DCStatus === "Cancelled"
                    }
                    className={
                      props.invRegisterData.Inv_No ||
                      props.invRegisterData.DCStatus === "Cancelled"
                        ? "ip-select input-disabled"
                        : "ip-select"
                    }
                  >
                    <option value="none" selected disabled hidden>
                      Select an Option
                    </option>
                    {trnsMode.map((val) => (
                      <option value={val}>{val}</option>
                    ))}
                  </select>
                )}
              </div>
              <div className="d-flex col-md-4 mt-1" style={{ gap: "10px" }}>
                <label className="form-label" style={{ whiteSpace: "nowrap" }}>
                  Vehicle No.
                </label>
                <input
                  // type="text"
                  value={props.invRegisterData?.VehNo}
                  name="VehNo"
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
          {/* delivery details */}
          <div className="col-md-5 mt-1">
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
          </div>
        </div>
        {/* second row */}
        <div className="row">
          <div className="col-md-7">
            <div>
              <label className="form-label">Invoice Summary</label>

              <div className={layoutForInvoicingInfo}>
                <div className="d-flex col-md-4" style={{ gap: "25px" }}>
                  <label
                    className="form-label"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Net Total
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={parseFloat(props.invRegisterData?.Net_Total).toFixed(
                      2
                    )}
                    disabled
                    className="input-disabled"
                  />
                </div>
                <div className="d-flex col-md-4" style={{ gap: "33px" }}>
                  <label className="form-label">Discount</label>
                  <input
                    type="number"
                    min="0"
                    value={props.invRegisterData?.Discount}
                    name="Discount"
                    onChange={props.handleChangeDiscountDelivery}
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
                <div className="d-flex col-md-4" style={{ gap: "10px" }}>
                  <label
                    className="form-label"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Delivery Charges
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={props.invRegisterData?.Del_Chg}
                    name="Del_Chg"
                    onChange={props.handleChangeDiscountDelivery}
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
                <div className="d-flex col-md-4" style={{ gap: "10px" }}>
                  <label
                    className="form-label"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Tax Amount
                  </label>
                  {/* if net amount and tax amount is calculated then this ither wise that */}
                  <input
                    type="number"
                    name=""
                    id=""
                    value={parseFloat(props.invRegisterData?.TaxAmount).toFixed(
                      2
                    )}
                    disabled
                    className="in-field mt-1"
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
                    type="number"
                    min="0"
                    value={parseFloat(props.invRegisterData?.InvTotal).toFixed(
                      2
                    )}
                    // value={parseFloat(NewInvoiceTotal).toFixed(2)}
                    disabled
                    className="input-disabled mt-1"
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
                    type="number"
                    min="0"
                    value={props.invRegisterData?.Round_Off}
                    disabled
                    className="input-disabled mt-1"
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
                    type="number"
                    min="0"
                    value={parseFloat(
                      props.invRegisterData?.GrandTotal
                    ).toFixed(2)}
                    disabled
                    className="input-disabled mt-1"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="form-label">Remarks</label>
              <div>
                <textarea
                  id=""
                  style={{
                    border: "1px solid lightgray",
                    borderRadius: "5px",
                    width: "100%",
                    height: "50px",
                  }}
                  value={props.invRegisterData?.Remarks}
                  name="Remarks"
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
                ></textarea>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div>
              <label className="form-label">Payment Details</label>
              <div className={layoutForInvoicingInfo}>
                <div className="d-flex col-md-6" style={{ gap: "27px" }}>
                  <label
                    className="form-label"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Bill Type
                  </label>
                  <input
                    type="text"
                    value={props.invRegisterData?.BillType}
                    disabled
                    className="input-disabled"
                  />
                </div>
                <div className="d-flex col-md-6" style={{ gap: "20px" }}>
                  <label
                    className="form-label"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Payment Terms
                  </label>
                  <input
                    type="text"
                    value={props.invRegisterData?.PaymentTerms}
                    disabled
                    className="input-disabled"
                  />
                </div>
                <div className="d-flex col-md-6" style={{ gap: "10px" }}>
                  <label
                    className="form-label"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Grand Total
                  </label>
                  <input
                    type="text"
                    value={parseFloat(
                      props.invRegisterData?.GrandTotal
                    ).toFixed(2)}
                    disabled
                    className="input-disabled mt-1"
                  />
                </div>
                <div className="d-flex col-md-6" style={{ gap: "10px" }}>
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
                        ? "input-disabled mt-1"
                        : "in-field mt-1"
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
        {/* third row */}
      </div>
      {/* forth row */}
      <div className="row ">
        <div className="col-md-6">
          <button
            onClick={props.onSave}
            disabled={
              props.invRegisterData.Inv_No ||
              props.invRegisterData.DCStatus === "Cancelled"
            }
            className={
              props.invRegisterData.Inv_No ||
              props.invRegisterData.DCStatus === "Cancelled"
                ? "button-style button-disabled"
                : "button-style"
            }
          >
            Save Invoice
          </button>
          <span className="p-1"></span>
          <button
            disabled={
              props.invRegisterData.Inv_No ||
              props.invRegisterData.DCStatus === "Cancelled"
            }
            className={
              props.invRegisterData.Inv_No ||
              props.invRegisterData.DCStatus === "Cancelled"
                ? "button-style button-disabled"
                : "button-style"
            }
            onClick={createInvoiceValidationFunc}
          >
            Create Invoice
          </button>
          <span className="p-1"></span>
        </div>

        <div className="col-md-6">
          <div className="d-flex flex-row justify-content-end">
            <div className="col-md-3 p-0 d-flex justify-content-end">
              <button className="button-style " onClick={props.printPN}>
                Print PN
              </button>
            </div>
            {/* Print invoice */}
            <span className="p-1"></span>

            <div className="col-md-3 p-0 d-flex justify-content-end">
              <button
                disabled={!props.invRegisterData.Inv_No}
                className={
                  !props.invRegisterData.Inv_No
                    ? "button-style  button-disabled"
                    : "button-style "
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
      {/* printable content */}

      <ModalPackingNote
        setPrintCopyModal={props.setPrintCopyModal}
        printCopyModal={props.printCopyModal}
        // data...
        invRegisterData={props.invRegisterData}
        invDetailsData={props.invDetailsData}
        invTaxData={props.invTaxData}
      />

      <ModalAnnexure
        setPrintAnneureModal={props.setPrintAnneureModal}
        printAnneureModal={props.printAnneureModal}
        // data...
        invRegisterData={props.invRegisterData}
        invDetailsData={props.invDetailsData}
        invTaxData={props.invTaxData}
      />

      <ModalInvoice
        setPrintInvoiceModal={props.setPrintInvoiceModal}
        printInvoiceModal={props.printInvoiceModal}
        rowLimit={props.rowLimit}
        // data...
        invRegisterData={props.invRegisterData}
        invDetailsData={props.invDetailsData}
        invTaxData={props.invTaxData}
      />
    </>
  );
}

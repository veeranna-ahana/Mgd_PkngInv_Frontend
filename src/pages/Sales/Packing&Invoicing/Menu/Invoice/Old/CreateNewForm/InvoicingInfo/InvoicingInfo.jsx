import React, { useState, useEffect, useRef } from "react";

import Axios from "axios";
// import { apipoints } from "../../../../../../api/PackInv_API/PackingNote/PackingNote";
import { toast } from "react-toastify";
// import ReactPdfPrint from "../PDFs/ReactPdfPrint";
import { useReactToPrint } from "react-to-print";
import ModalInvoiceAndAnnexure from "../../../../PDFs/InvoiceAndAnnexure/ModalInvoiceAndAnnexure";
import { apipoints } from "../../../../../../api/PackInv_API/Invoice/Invoice";

// apipoints
// ModalInvoiceAndAnnexure
// import

// const componentRef = useRef();
// const printCopy = useReactToPrint({
//   content: () => componentRef.current,
//   documentTitle: "PackingNote-Invoice",
//   onAfterPrint: () => {
//     //  console.log("print pn clicked");
//     toast.success("Print Packing Note Successfull");
//   },
// });

export default function InvoicingInfo(props) {
  // const [InvoiceModalOpen, setInvoiceModalOpen] = useState(false);

  // const layoutForInvoicingInfo = "border row rounded p-1 pb-3";

  // var netTotal = 0;

  // console.log("invoiceing info", props);

  // console.log("porps, in invoicing info", props.tableRow);

  // {
  //   props.tableRow.map((val, i) => {
  //     // console.log("inside mapppp..", val.totalAmount);
  //     netTotal = netTotal + val.totalAmount;
  //     // props.setNetTotal(...props.netTotal + val.totalAmount)
  //   });
  // }

  // props.setNetTotal(netTotal);

  // props.setInvoiceTotal(
  //   parseFloat(props.netTotal) -
  //     (props.discount.length > 0 ? parseFloat(props.discount) : 0) +
  //     (props.deliveryCharge.length > 0 ? parseFloat(props.deliveryCharge) : 0) +
  //     parseFloat(props.taxAmount)
  // );

  // props.setRoundOff(
  //   props.grandTotal -
  //     (parseFloat(props.netTotal) -
  //       (props.discount.length > 0 ? parseFloat(props.discount) : 0) +
  //       (props.deliveryCharge.length > 0
  //         ? parseFloat(props.deliveryCharge)
  //         : 0) +
  //       parseFloat(props.taxAmount))
  // );

  // props.setGrandTotal(
  //   Math.round(
  //     parseFloat(props.netTotal) -
  //       parseFloat(props.discount) +
  //       parseFloat(props.deliveryCharge) +
  //       parseFloat(props.taxAmount)
  //   )
  // );

  // // new  variables calculations

  // props.setNewInvoiceTotal(
  //   parseFloat(props.newNetTotal) -
  //     (props.newDiscount.length > 0 ? parseFloat(props.newDiscount) : 0) +
  //     (props.newDeliveryCharge.length > 0
  //       ? parseFloat(props.newDeliveryCharge)
  //       : 0) +
  //     parseFloat(props.newTaxAmountVar)
  // );

  // props.setNewGrandTotal(Math.round(parseFloat(props.newInvoiceTotal)));

  // props.setNewRoundOff(
  //   (props.newGrandTotal - props.newInvoiceTotal).toFixed(2)
  // );

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
  const cashMode = ["Cheque on Delivery", "Cash on Delivery"];

  // const printCopy = (e) => {
  //   setInvoiceModalOpen(true);
  // };

  // console.log("dataatatatata", props.newDispatchDate?.split("T")[0]);

  const createInvoiceValidationFunc = (e) => {
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
    } else if (props.invRegisterData.GSTNo.length === 0) {
      toast.warning("Please enter customer GST");
      e.preventDefault();
    } else if (props.invRegisterData.DespatchDate.length === 0) {
      toast.warning("Please enter Dispatch Date");
      e.preventDefault();
    } else if (props.invRegisterData.TptMode.length === 0) {
      toast.warning("Please select Dispatch Mode");
      e.preventDefault();
    } else if (props.invRegisterData.VehNo.length === 0) {
      toast.warning("Please enter Vehicle Number");
      e.preventDefault();
    } else if (props.invRegisterData.PaymentTerms.length === 0) {
      toast.warning("Please select Payment Terms");
      e.preventDefault();
    } else if (props.invRegisterData.BillType.length === 0) {
      toast.warning("Please select Bill Type");
      e.preventDefault();
    } else if (props.invTaxData.length === 0) {
      toast.warning("Please select Tax");
      e.preventDefault();
    } else {
      props.setButtonClicked("Create Invoice");
      props.setConfirmModalOpen(true);
    }
  };
  return (
    <>
      <div>
        {/* inputs */}
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
                        Select any option
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
              {/* Invoice Summary */}
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
                  // disabled
                  // className="input-disabled"
                  name="Remarks"
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
            {/* <div className="col"> */}
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
                        // className="ip-select"
                        style={{
                          fontSize: "inherit",
                        }}
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
                          Select any option
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
                    <div className="">
                      <b>Description</b>
                      {/* <input type="text" name="" id="" /> */}
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
                  </div>
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
        {/* button */}

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
              // onClick={props.createInvoice}
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
                disabled={
                  !(props.invRegisterData.Inv_No?.length > 0) ||
                  !(props.invDetailsData?.length > 20)

                  // props.invRegisterData.DCStatus === "Cancelled"
                }
                className={
                  !(props.invRegisterData.Inv_No?.length > 0) ||
                  !(props.invDetailsData?.length > 20)
                    ? // props.invRegisterData.DCStatus === "Cancelled"
                      "button-style button-disabled"
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
      <div>
        <ModalInvoiceAndAnnexure
          setPrintAnneureModal={props.setPrintAnneureModal}
          printAnneureModal={props.printAnneureModal}
          // data...
          invRegisterData={props.invRegisterData}
          invDetailsData={props.invDetailsData}
          invTaxData={props.invTaxData}
        />
      </div>
    </>
  );
}

// <ModalInvoiceAndAnnexure
//   InvoiceModalOpen={InvoiceModalOpen}
//   setInvoiceModalOpen={setInvoiceModalOpen}
//   secondary={props.secondary}
//   taxDetails={props.newSelectedTaxes}
// />

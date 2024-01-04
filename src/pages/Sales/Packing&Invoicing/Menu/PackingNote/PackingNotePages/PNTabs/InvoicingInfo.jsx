import React, { useState, useRef } from "react";

import Axios from "axios";
import { apipoints } from "../../../../../../api/PackInv_API/PackingNote/PackingNote";
import { toast } from "react-toastify";
// import ReactPdfPrint from "../PDFs/ReactPdfPrint";
// import { useReactToPrint } from "react-to-print";
import ModalPackingNote from "../../../../PDFs/PackingNote/ModalPackingNote";
import ModalInvoiceAndAnnexure from "../../../../PDFs/InvoiceAndAnnexure/ModalInvoiceAndAnnexure";

// ModalInvoiceAndAnnexure

// ModalPackingNote

export default function InvoicingInfo(props) {
  // console.log("printAnnexureData", props.printAnnexureData);
  const [printCopyModal, setPrintCopyModal] = useState(false);
  const [printAnneureModal, setPrintAnneureModal] = useState(false);

  // const [checkbox, setCheckbox] = useState(false);
  const layoutForInvoicingInfo = "border row rounded p-1 pb-3";

  // var NewInvoiceTotal =
  //   parseFloat(props.taxAmount) +
  //   parseFloat(props.netAmount) -
  //   parseFloat(props.NewDiscount);
  // var NewGrandTotal =
  //   parseFloat(props.taxAmount) +
  //   parseFloat(props.netAmount) -
  //   parseFloat(props.NewDiscount) +
  //   parseFloat(props.NewDeliveryCharge) +
  //   parseFloat(props.NewRoundOff);

  const trnsMode = ["By Road", "By Hand", "By Air", "By Courier"];

  // const onSave = () => {
  //   Axios.post(apipoints.updatePNProfileData, {
  //     invRegisterData: props.invRegisterData,
  //     invTaxData: props.invTaxData,
  //     // DC_Inv_No: props.INVData[0].DC_Inv_No,
  //     // NewAddress: props.NewAddress,
  //     // NewDelivery: props.NewDelivery,
  //     // NewDistrict: props.NewDistrict,
  //     // NewState: props.NewState,
  //     // NewPinCode: props.NewPinCode,
  //     // NewScheduleIntructions: props.NewScheduleIntructions,
  //     // // ..................
  //     // NewDispatchDate: props.NewDispatchDate
  //     //   ? `${props.NewDispatchDate?.slice(
  //     //       0,
  //     //       10
  //     //     )} ${props.NewDispatchDate?.slice(11, 19)}`
  //     //   : "",
  //     // NewDispatchMode: props.NewDispatchMode,
  //     // NewVehicleNo: props.NewVehicleNo,
  //     // netTotal: props.netAmount,
  //     // taxAmount: props.taxAmount,
  //     // NewDiscount: props.NewDiscount,
  //     // NewDeliveryCharge: props.NewDeliveryCharge,
  //     // NewRoundOff: props.NewRoundOff,
  //     // NewGrandTotal:
  //     //   parseFloat(props.taxAmount) +
  //     //   parseFloat(props.netAmount) -
  //     //   parseFloat(props.NewDiscount) +
  //     //   parseFloat(props.NewDeliveryCharge) +
  //     //   parseFloat(props.NewRoundOff),
  //     // NewInvoiceTotal:
  //     //   parseFloat(props.taxAmount) +
  //     //   parseFloat(props.netAmount) -
  //     //   parseFloat(props.NewDiscount),
  //     // NewRemarks: props.NewRemarks,
  //     // selectedTaxTable: props.selectedTaxTable,
  //   }).then((res) => {
  //     if (res) {
  //       if (res.data.status === 1) {
  //         toast.success(res.data.comment);
  //       } else if (res.data.status === 0) {
  //         toast.error(res.data.comment);
  //       } else {
  //         toast.error("Uncaught Error");
  //       }
  //     }
  //   });
  // };
  // const componentRef = useRef();
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  //   documentTitle: "PNProfile",
  //   onAfterPrint: () =>
  //     toast.success("Creating and Printing Invoice Successfull"),
  // });

  const printPackingNoteCopy = () => {
    setPrintCopyModal(true);
  };
  const printPackingNoteAnnexure = () => {
    setPrintAnneureModal(true);
  };

  // console.log("propssss", props);

  // const handleCreateInvoice = () => {
  //   onSave();
  //   // console.log("cretae invoeice");
  //   // alert("cretae invoeice");
  //   Axios.post(apipoints.createInvoice, {
  //     invRegisterData: props.invRegisterData,
  //   }).then((res) => {
  //     if (res.data.flag === 1) {
  //       // console.log("resssssssssss", res.data);
  //       // props.setNewINVNo(res.data.selectData[0].Inv_No);
  //       // props.setNewINVDate(res.data.selectData[0].Inv_Date);
  //       // props.setTaxDataFromDB(res.data.taxData);

  //       toast.success(res.data.message);
  //       // printPackingNoteCopy();
  //       props.setInvRegisterData(res.data.registerData[0]);
  //       // console.log("resssss", res);
  //     } else if (res.data.flag === 0) {
  //       toast.error(res.data.message);
  //     } else {
  //       toast.warning("Uncaught error in frontend");
  //     }
  //   });
  // };

  const createInvoiceWorkFunc = () => {
    props.setButtonClicked("Create Invoice");
    props.setConfirmModalOpen(true);
  };
  const createInvoiceValidationFunc = (e) => {
    // console.log("invvvv", props.invRegisterData);
    if (props.invTaxData.length === 0) {
      toast.warning("Please select SGST and CST for Tax");
      e.preventDefault();
    } else if (props.invRegisterData.Cust_Address.length === 0) {
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
    } else if (props.invRegisterData.DespatchDate?.length === 0) {
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
    }
    // else if (props.invRegisterData.BillType.length > 0) {
    //   // console.log("jfsdhkjlk");
    //   if (props.invRegisterData.BillType === "Cash") {
    //     if (
    //       (props.invRegisterData.PaymentTerms === cashMode[0] &&
    //         props.invRegisterData.PaymentReceiptDetails?.length === 0) ||
    //       (props.invRegisterData.PaymentTerms === cashMode[3] &&
    //         props.invRegisterData.PaymentReceiptDetails?.length === 0)
    //     ) {
    //       toast.warning("Please enter the Cash Reciept No and Details");
    //       e.preventDefault();
    //     } else if (
    //       props.invRegisterData.PaymentTerms === cashMode[1] &&
    //       props.invRegisterData.PaymentReceiptDetails?.length === 0
    //     ) {
    //       toast.warning("Please enter the Cheque Details");
    //       e.preventDefault();
    //     } else if (
    //       props.invRegisterData.PaymentTerms === cashMode[2] &&
    //       props.invRegisterData.PaymentReceiptDetails?.length === 0
    //     ) {
    //       toast.warning("Please enter the DD Details");
    //       e.preventDefault();
    //     } else {
    //       createInvoiceWorkFunc();
    //     }
    //   } else {
    //     createInvoiceWorkFunc();
    //   }
    // }
    // else if (props.invTaxData.length === 0) {
    //   toast.warning("Please select Tax");
    //   e.preventDefault();
    // }
    else {
      createInvoiceWorkFunc();
    }
  };

  return (
    <>
      <div>
        {/* first row */}
        <div className="row">
          <div className="col-md-9 ">
            <b>Dispatch Info</b>
            <div className={layoutForInvoicingInfo}>
              <div className="col-md-4">
                <b>Dispatch Date</b>
                <input
                  type="date"
                  value={
                    props.invRegisterData?.DespatchDate?.split("T")[0]
                      ? props.invRegisterData.DespatchDate.split("T")[0]
                      : null
                  }
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
                      : ""
                  }
                  // onChange={(e) => {
                  //   props.setNewDispatchDate(e.target.value);
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
                <b>Dispatch Mode</b>
                {/* <select name="" id="" className="ip-select ">
                  <option value=""></option>
                </select> */}
                {props.invRegisterData?.TptMode ? (
                  <select
                    style={{
                      fontSize: "inherit",
                    }}
                    name="TptMode"
                    onChange={props.inputHandler}
                    // onChange={(e) => {
                    //   props.setNewDispatchMode(e.target.value);
                    // }}
                    // className="ip-select "
                    // disabled={
                    //   props.INVData[0]?.Inv_No || props.NewINVNo.length > 0
                    // }
                    // className={
                    //   props.INVData[0]?.Inv_No || props.NewINVNo.length > 0
                    //     ? "input-disabled ip-select"
                    //     : "ip-select"
                    // }

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
                    // className="ip-select "
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
                    // onChange={(e) => {
                    //   props.setNewDispatchMode(e.target.value);
                    // }}
                    // disabled={
                    //   props.INVData[0]?.Inv_No || props.NewINVNo.length > 0
                    // }
                    // className={
                    //   props.INVData[0]?.Inv_No || props.NewINVNo.length > 0
                    //     ? "input-disabled ip-select"
                    //     : "ip-select"
                    // }
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
              <div className="col-md-4">
                <b>Vehicle No.</b>
                <input
                  // type="text"
                  value={props.invRegisterData?.VehNo}
                  name="VehNo"
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
                  //   props.setNewVehicleNo(e.target.value);
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
          <div className="col-md-3 ">
            <b>Payment</b>
            <div className={layoutForInvoicingInfo}>
              <div className="col-md-6">
                <b>Terms</b>
                <input
                  type="text"
                  value={props.invRegisterData?.PaymentTerms}
                  disabled
                  className="input-disabled"
                />
              </div>
              <div className="col-md-6">
                <b>Grand Total</b>
                <input
                  type="text"
                  value={parseFloat(props.invRegisterData?.GrandTotal).toFixed(
                    2
                  )}
                  // value={parseFloat(
                  //   props.taxAmount +
                  //     props.netAmount -
                  //     props.NewDiscount +
                  //     props.NewDeliveryCharge +
                  //     props.NewRoundOff
                  // ).toFixed(2)}
                  disabled
                  className="input-disabled"
                />
              </div>
            </div>
          </div>
        </div>
        {/* second row */}
        <div className="row">
          <b>Invoice Summary</b>
          <div className="col-md-12">
            <div className={layoutForInvoicingInfo}>
              <div className="col-md-3">
                <b>Net Total</b>
                <input
                  type="number"
                  min="0"
                  value={parseFloat(props.invRegisterData?.Net_Total).toFixed(
                    2
                  )}
                  // value={parseFloat(props.netAmount).toFixed(2)}
                  disabled
                  className="input-disabled"
                />
              </div>
              <div className="col-md-3">
                <b>Discount</b>
                <input
                  type="number"
                  min="0"
                  value={props.invRegisterData?.Discount}
                  name="Discount"
                  // onChange={props.inputHandler}
                  // onChange={(e) => {
                  //   console.log(
                  //     "valueueueu",
                  //     e.target.value.length > 0 ? e.target.value : 0
                  //   );
                  //   // props.setInvRegisterData({
                  //   //   ...props.invRegisterData,
                  //   //   Discount: e.target.value.length > 0 ? e.target.value : 0,
                  //   // });
                  //   console.log(
                  //     "invvvv total...",
                  //     parseFloat(props.invRegisterData.Net_Total) -
                  //       parseFloat(
                  //         e.target.value.length > 0 ? e.target.value : 0
                  //       )
                  //   );
                  //   props.setInvTaxData([]);
                  //   document.getElementById("taxDropdown").value = "none";
                  //   let newInvTotal =
                  //     parseFloat(props.invRegisterData?.Net_Total) -
                  //     parseFloat(
                  //       e.target.value.length > 0 ? e.target.value : 0
                  //     ) +
                  //     parseFloat(props.invRegisterData?.Del_Chg);

                  //   props.setInvRegisterData({
                  //     ...props.invRegisterData,
                  //     Discount: e.target.value.length > 0 ? e.target.value : 0,
                  //     TaxAmount: 0.0,
                  //     InvTotal: newInvTotal.toFixed(2),
                  //   });
                  //   // props.setInvRegisterData({
                  //   //   ...props.invRegisterData,
                  //   //   TaxAmount: 0.0,
                  //   //   InvTotal: newInvTotal.toFixed(2),
                  //   // });
                  //   // props.deleteTaxFunc();
                  // }}

                  onChange={props.handleChangeDiscountDelivery}
                  //
                  // onChange={(e) => {
                  //   {
                  //     e.target.value.length > 0
                  //       ? props.setNewDiscount(
                  //           parseFloat(e.target.value).toFixed(2)
                  //         )
                  //       : props.setNewDiscount(parseFloat(0).toFixed(2));
                  //   }

                  //   props.setSelectedTax();
                  //   document.getElementById("taxDropdown").value = "none";
                  // }}
                  // disabled={
                  //   props.INVData[0]?.Inv_No || props.NewINVNo.length > 0
                  // }
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
                />
              </div>
              <div className="col-md-3">
                <b>Delivery Charges</b>
                <input
                  type="number"
                  min="0"
                  value={props.invRegisterData?.Del_Chg}
                  name="Del_Chg"
                  // onChange={props.inputHandler}
                  onChange={props.handleChangeDiscountDelivery}
                  // onChange={(e) => {
                  //   {
                  //     e.target.value.length > 0
                  //       ? props.setNewDeliveryCharge(
                  //           parseFloat(e.target.value).toFixed(2)
                  //         )
                  //       : props.setNewDeliveryCharge(parseFloat(0).toFixed(2));
                  //   }
                  //   props.setSelectedTax();
                  //   document.getElementById("taxDropdown").value = "none";
                  // }}
                  // disabled={
                  //   props.INVData[0]?.Inv_No || props.NewINVNo.length > 0
                  // }
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
                />
              </div>
              <div className="col-md-3">
                <b>Tax Amount</b>
                {/* if net amount and tax amount is calculated then this ither wise that */}
                <input
                  type="number"
                  name=""
                  id=""
                  value={parseFloat(props.invRegisterData?.TaxAmount).toFixed(
                    2
                  )}
                  disabled
                />
                {/* {props.netAmount && props.taxAmount > 0 ? (
                  <input
                    type="number"
                    min="0"
                    value={parseFloat(props.taxAmount).toFixed(2)}
                    disabled
                    className="input-disabled"
                  />
                ) : (
                  <input
                    type="number"
                    min="0"
                    value={parseFloat(props.INVData[0]?.TaxAmount).toFixed(2)}
                    disabled
                    className="input-disabled"
                  />
                )} */}
              </div>

              <div className="col-md-3">
                <b>Invoice Total</b>
                <input
                  type="number"
                  min="0"
                  value={parseFloat(props.invRegisterData?.InvTotal).toFixed(2)}
                  // value={parseFloat(NewInvoiceTotal).toFixed(2)}
                  disabled
                  className="input-disabled"
                />
              </div>

              <div className="col-md-3">
                <b>Round Off</b>
                <input
                  type="number"
                  min="0"
                  value={props.invRegisterData?.Round_Off}
                  disabled
                  // onChange={(e) => {
                  //   {
                  //     e.target.value.length > 0
                  //       ? props.setNewRoundOff(
                  //           parseFloat(e.target.value).toFixed(2)
                  //         )
                  //       : props.setNewRoundOff(parseFloat(0).toFixed(2));
                  //   }
                  // }}
                  // disabled
                  className="input-disabled"
                />
              </div>
              <div className="col-md-3">
                <b>Grand Total</b>
                <input
                  type="number"
                  min="0"
                  value={parseFloat(props.invRegisterData?.GrandTotal).toFixed(
                    2
                  )}
                  // value={parseFloat(NewGrandTotal).toFixed(2)}
                  disabled
                  className="input-disabled"
                />
              </div>
            </div>
          </div>
        </div>
        {/* third row */}
        <div className="row">
          <b>Remarks</b>
          <div className="col-md-12">
            <textarea
              id=""
              style={{ width: "100%" }}
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
                  : ""
              }
              // onChange={(e) => {
              //   props.setNewRemarks(e.target.value);
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
      {/* forth row */}
      <div className="row ">
        <div className="col-md-6">
          <button
            onClick={props.onSave}
            // className="button-style"
            // disabled={props.INVData[0]?.Inv_No || props.NewINVNo.length > 0}
            // className={
            //   props.INVData[0]?.Inv_No || props.NewINVNo.length > 0
            //     ? "button-style button-disabled m-0"
            //     : "button-style m-0"
            // }
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
            // className="button-style"
            // onClick={handlePrint}
            // onClick={props.handleCreateInvoice}
            // disabled={props.INVData[0]?.Inv_No || props.NewINVNo.length > 0}
            // className={
            //   props.INVData[0]?.Inv_No || props.NewINVNo.length > 0
            //     ? "button-style button-disabled m-0"
            //     : "button-style m-0"
            // }
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
            onClick={
              createInvoiceValidationFunc
              //   (e) => {
              //   props.setButtonClicked("Create Invoice");
              //   props.setConfirmModalOpen(true);
              // }
            }
          >
            Create Invoice
          </button>
          <span className="p-1"></span>
        </div>

        <div className="col-md-6">
          <div className="d-flex flex-row justify-content-end">
            <div className="col-md-3 p-0 d-flex justify-content-end">
              <button
                onClick={printPackingNoteCopy}
                className="button-style m-0"
              >
                Print Copy
              </button>
            </div>
            <span className="p-1"></span>

            <div className="col-md-3 p-0 d-flex justify-content-end">
              <button
                onClick={printPackingNoteAnnexure}
                // className="button-style m-0"
                disabled={!props.invRegisterData.Inv_No}
                className={
                  !props.invRegisterData.Inv_No
                    ? "button-style m-0 button-disabled"
                    : "button-style m-0"
                }
                // disabled={
                //   props?.invoiceDetailsTableData.length < 20
                //     ? true
                //     : props.INVData[0]?.Inv_No || props.NewINVNo.length > 0
                //     ? false
                //     : true
                // }
                // className={
                //   props?.invoiceDetailsTableData.length < 20
                //     ? "button-style button-disabled m-0"
                //     : props.INVData[0]?.Inv_No || props.NewINVNo.length > 0
                //     ? "button-style m-0"
                //     : "button-style button-disabled m-0"
                // }
              >
                Print Annexure
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* printable content */}
      {/* <ReactPdfPrint
        // style={{ display: "none" }}
        componentRef={componentRef}

        // DC_Inv_no={props.INVData[0]?.DC_Inv_No}
      /> */}
      <ModalPackingNote
        setPrintCopyModal={setPrintCopyModal}
        printCopyModal={printCopyModal}
        // data...
        invRegisterData={props.invRegisterData}
        invDetailsData={props.invDetailsData}
        invTaxData={props.invTaxData}
        // printCopyTableData={props.printCopyTableData}

        // data
        // PN_No={props.INVData[0]?.DC_No}
        // DCInvNo={props.DCInvNo}
        // checkbox={checkbox}
      />

      <ModalInvoiceAndAnnexure
        setPrintAnneureModal={setPrintAnneureModal}
        printAnneureModal={printAnneureModal}
        // data...
        invRegisterData={props.invRegisterData}
        invDetailsData={props.invDetailsData}
        invTaxData={props.invTaxData}
      />
    </>
  );
}

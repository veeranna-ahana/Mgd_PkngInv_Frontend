import React, { useState, useRef } from "react";

import Axios from "axios";
import { apipoints } from "../../../../../../api/PackInv_API/PackingNote/PackingNote";
import { toast } from "react-toastify";
// import ReactPdfPrint from "../PDFs/ReactPdfPrint";
// import { useReactToPrint } from "react-to-print";
import ModalPackingNote from "../../../../PDFs/PackingNote/ModalPackingNote";
import ModalAnnexure from "../../../../PDFs/Annexure/ModalAnnexure";
import ModalInvoice from "../../../../PDFs/Invoice/ModalInvoice";

// ModalAnnexure

// ModalPackingNote

export default function InvoicingInfo(props) {
  // // console.log("printAnnexureData", props.printAnnexureData);
  // const [printCopyModal, setPrintCopyModal] = useState(false);
  // const [printAnneureModal, setPrintAnneureModal] = useState(false);
  // const [printInvoiceModal, setPrintInvoiceModal] = useState(false);

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

  const cashMode = [
    "Cash on Delivery",
    "Cheque on Delivery",
    "Demand Draft on Delivery",
    "QR Code and RTGS",
  ];

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

  // const printPN = () => {
  //   setPrintCopyModal(true);
  // };
  // const printAnnexure = () => {
  //   setPrintAnneureModal(true);
  // };
  // const printInvoice = () => {
  //   setPrintInvoiceModal(true);
  // };

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
  //       // printPN();
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
          // if (
          //   (props.invRegisterData.PaymentTerms === cashMode[0] &&
          //     props.invRegisterData.PaymentReceiptDetails?.length <8) ||
          //   (props.invRegisterData.PaymentTerms === cashMode[3] &&
          //     props.invRegisterData.PaymentReceiptDetails?.length <8)
          // ) {
          //   toast.warning("Please enter the Cash Reciept No and Details");
          //   e.preventDefault();
          // } else if (
          //   props.invRegisterData.PaymentTerms === cashMode[1] &&
          //   props.invRegisterData.PaymentReceiptDetails?.length <8
          // ) {
          //   toast.warning("Please enter the Cheque Details");
          //   e.preventDefault();
          // } else if (
          //   props.invRegisterData.PaymentTerms === cashMode[2] &&
          //   props.invRegisterData.PaymentReceiptDetails?.length <8
          // ) {
          //   toast.warning("Please enter the DD Details");
          //   e.preventDefault();
          // } else {
          //   createInvoiceWorkFunc();
          // }
        } else {
          createInvoiceWorkFunc();
        }
      } else {
        createInvoiceWorkFunc();
      }
    }
  };

  const today = new Date();
  const todayDateforDispatch =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1 < 10 ? "0" : "") +
    (today.getMonth() + 1) +
    "-" +
    (today.getDate() + 1 < 10 ? "0" : "") +
    today.getDate();

  // console.log("inv", props.invRegisterData);
  return (
    <>
      <div>
        {/* first row */}
        <div className="row">
          <div className="col-md-8">
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
                  min={todayDateforDispatch}
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
          {/* delivery details */}
          <div className="col-md-4">
            <div>
              <b>Delivery Details</b>
              <div
                className="p-1 pb-2"
                style={{ border: "1px solid lightgray", borderRadius: "5px" }}
              >
                <div className="row">
                  <div className="col-md-6">
                    <b>Person Name</b>
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
                          : ""
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <b>Person Contact No</b>
                    <input
                      // type="number"
                      // min={"0"}
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
                          : ""
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
          <div className="col-md-8">
            <div>
              <b>Invoice Summary</b>

              <div className={layoutForInvoicingInfo}>
                <div className="col-md-4">
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
                <div className="col-md-4">
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
                <div className="col-md-4">
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
                <div className="col-md-4">
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
                <div className="col-md-4">
                  <b>Invoice Total</b>
                  <input
                    type="number"
                    min="0"
                    value={parseFloat(props.invRegisterData?.InvTotal).toFixed(
                      2
                    )}
                    // value={parseFloat(NewInvoiceTotal).toFixed(2)}
                    disabled
                    className="input-disabled"
                  />
                </div>
                <div className="col-md-4">
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
                <div className="col-md-4">
                  <b>Grand Total</b>
                  <input
                    type="number"
                    min="0"
                    value={parseFloat(
                      props.invRegisterData?.GrandTotal
                    ).toFixed(2)}
                    // value={parseFloat(NewGrandTotal).toFixed(2)}
                    disabled
                    className="input-disabled"
                  />
                </div>
              </div>
            </div>
            <div>
              <b>Remarks</b>
              <div>
                <textarea
                  id=""
                  style={{
                    border: "1px solid lightgray",
                    borderRadius: "5px",
                    width: "100%",
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
          <div className="col-md-4 ">
            <div>
              <b>Payment Details</b>
              <div className={layoutForInvoicingInfo}>
                <div className="col-md-6">
                  <b>Bill Type</b>
                  <input
                    type="text"
                    value={props.invRegisterData?.BillType}
                    disabled
                    className="input-disabled"
                  />
                </div>
                <div className="col-md-6">
                  <b>Payment Terms</b>
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
                    value={parseFloat(
                      props.invRegisterData?.GrandTotal
                    ).toFixed(2)}
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
                <div className="col-md-6">
                  <b>Amount Recieved</b>
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
                        : ""
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

        {/* <div className="row">
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
        </div> */}
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
              <button className="button-style " onClick={props.printPN}>
                Print PN
              </button>
            </div>
            {/* Print invoice */}
            <span className="p-1"></span>

            <div className="col-md-3 p-0 d-flex justify-content-end">
              <button
                // className="button-style m-0"
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
      {/* <ReactPdfPrint
        // style={{ display: "none" }}
        componentRef={componentRef}

        // DC_Inv_no={props.INVData[0]?.DC_Inv_No}
      /> */}
      <ModalPackingNote
        setPrintCopyModal={props.setPrintCopyModal}
        printCopyModal={props.printCopyModal}
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

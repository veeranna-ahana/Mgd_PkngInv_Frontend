import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";

import { Form, Tab, Table, Tabs } from "react-bootstrap";
import ConsigneeInfo from "./ConsigneeInfo/ConsigneeInfo";
import InvoicingInfo from "./InvoicingInfo/InvoicingInfo";
import TaxTable from "./TaxTable/TaxTable";
import ProductTable from "./ProductTable/ProductTable";
// AddGoods
// FormHeader
import PrintPN from "../PDFs/PrintPN";
import PrintCopy from "../PDFs/PrintCopy";

import Axios from "axios";
import { apipoints } from "../../../../../api/PackInv_API/Invoice/Invoice";
import FormHeader from "./FormHeader";
import AddGoods from "../Modals/AddGoods";
import ModalPackingNote from "../../../PDFs/PackingNote/ModalPackingNote";
import ImportFromIV from "../Modals/ImportFromIV";
import ConfirmationModal from "../Modals/ConfirmationModals/ConfirmationModal";

// import { apipoints } from "../../../../../api/PackInv_API/Invoice/Invoice";
// import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// apipoints

// ModalPackingNote

export default function CreateNewForm(props) {
  const [addGoodsModal, setAddGoodsModal] = useState(false);

  const [printCopyModal, setPrintCopyModal] = useState(false);

  const [printAnneureModal, setPrintAnneureModal] = useState(false);

  const [selectIV, setSelectIV] = useState(false);

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const [buttonClicked, setButtonClicked] = useState("");

  // const postInvoiceData = () => {
  //   Axios.post(apipoints.postInvoiceData, {
  //     primary: props.primary,
  //     tableRow: props.tableRow,
  //     netTotal: props.netTotal,
  //     discount: props.discount,
  //     deliveryCharge: props.deliveryCharge,
  //     taxAmount: props.taxAmount,
  //     invoiceTotal: props.invoiceTotal,
  //     roundOff: props.roundOff,
  //     grandTotal: props.grandTotal,
  //     SelectedTaxes: props.SelectedTaxes,
  //   }).then((res) => {
  //     if (res.data.flag === 1) {
  //       toast.success(res.data.message);
  //     } else if (res.data.flag === 0) {
  //       toast.error(res.data.message);
  //     } else {
  //       toast.warning("Uncaught error in frontend");
  //     }

  //     props.setSecondary(res.data.selectData);
  //     props.setNewSelectedTaxes(res.data.taxData);

  //     props.setNewDispatchDate(
  //       res.data.selectData[0].DespatchDate?.split("T")[0]
  //     );
  //     props.setNewDispatchMode(res.data.selectData[0].TptMode);
  //     props.setNewVehicleNo(res.data.selectData[0].VehNo);
  //     props.setNewNetTotal(res.data.selectData[0].Net_Total);
  //     props.setNewDiscount(res.data.selectData[0].Discount);
  //     props.setNewDeliveryCharge(res.data.selectData[0].Del_Chg);
  //     // props.setnewTaxAmount(res.data.selectData[0].TaxAmount);
  //     props.setNewInvoiceTotal(res.data.selectData[0].InvTotal);
  //     props.setNewRoundOff(res.data.selectData[0].Round_Off);
  //     props.setNewGrandTotal(res.data.selectData[0].GrandTotal);
  //     props.setNewRemarks(res.data.selectData[0].Remarks);

  //     props.setNewBillType(res.data.selectData[0].BillType);
  //     props.setNewAmountRecieved(res.data.selectData[0].PymtAmtRecd);
  //     props.setNewCreditDays(res.data.selectData[0].PaymentTerms);
  //     props.setNewPaymentDescription(
  //       res.data.selectData[0].PaymentReceiptDetails
  //     );
  //   });
  // };

  const deleteTaxes = () => {
    props.setInvTaxData([]);
    // props.setNewSelectedTaxes([]);
    document.getElementById("taxDropdown").value = "none";

    props.setInvRegisterData({
      ...props.invRegisterData,
      TaxAmount: "0.00",
      InvTotal:
        parseFloat(props.invRegisterData?.Net_Total) -
        parseFloat(props.invRegisterData?.Discount) +
        parseFloat(props.invRegisterData?.Del_Chg),
      GrandTotal: Math.round(
        parseFloat(props.invRegisterData?.Net_Total) -
          parseFloat(props.invRegisterData?.Discount) +
          parseFloat(props.invRegisterData?.Del_Chg)
      ),
      Round_Off:
        Math.round(
          parseFloat(props.invRegisterData?.Net_Total) -
            parseFloat(props.invRegisterData?.Discount) +
            parseFloat(props.invRegisterData?.Del_Chg)
        ) -
        (parseFloat(props.invRegisterData?.Net_Total) -
          parseFloat(props.invRegisterData?.Discount) +
          parseFloat(props.invRegisterData?.Del_Chg)),
    });
  };

  // const updateInvoice = () => {
  //   Axios.post(apipoints.updateInvoice, {
  //     secondary: props.secondary,
  //     newDelivery: props.newDelivery,
  //     newDispatchDate: props.newDispatchDate,
  //     newDispatchMode: props.newDispatchMode,
  //     newVehicleNo: props.newVehicleNo,
  //     newNetTotal: props.newNetTotal,
  //     newDiscount: props.newDiscount,
  //     newDeliveryCharge: props.newDeliveryCharge,
  //     newTaxAmountVar: props.newTaxAmountVar,
  //     newInvoiceTotal: props.newInvoiceTotal,
  //     newRoundOff: props.newRoundOff,
  //     newGrandTotal: props.newGrandTotal,
  //     newBillType: props.newBillType,
  //     newRemarks: props.newRemarks,
  //     newAmountRecieved: props.newAmountRecieved,
  //     newCreditDays: props.newCreditDays,
  //     newPaymentDescription: props.newPaymentDescription,
  //     newSelectedTaxes: props.newSelectedTaxes,
  //     assessableValue: 0.0,
  //   }).then((res) => {
  //     if (res.data.status === 1) {
  //       toast.success(res.data.message);
  //     } else if (res.data.status === 0) {
  //       toast.error(res.data.message);
  //     } else {
  //       toast.error("Frontend Error");
  //     }
  //   });
  // };

  // const createInvoice = () => {
  //   Axios.post(apipoints.createInvoice, {
  //     DC_Inv_No: props.secondary[0].DC_Inv_No,
  //   }).then((res) => {
  //     if (res.data.flag === 1) {
  //       toast.success(res.data.message);
  //     } else if (res.data.flag === 0) {
  //       toast.error(res.data.message);
  //     } else {
  //       toast.warning("Uncaught error in frontend");
  //     }
  //     props.setSecondary(res.data.selectData);
  //     props.setNewSelectedTaxes(res.data.taxData);
  //     props.setNewDispatchDate(
  //       res.data.selectData[0].DespatchDate?.split("T")[0]
  //     );
  //     props.setNewDispatchMode(res.data.selectData[0].TptMode);
  //     props.setNewVehicleNo(res.data.selectData[0].VehNo);
  //     props.setNewNetTotal(res.data.selectData[0].Net_Total);
  //     props.setNewDiscount(res.data.selectData[0].Discount);
  //     props.setNewDeliveryCharge(res.data.selectData[0].Del_Chg);
  //     // props.setnewTaxAmount(res.data.selectData[0].TaxAmount);
  //     props.setNewInvoiceTotal(res.data.selectData[0].InvTotal);
  //     props.setNewRoundOff(res.data.selectData[0].Round_Off);
  //     props.setNewGrandTotal(res.data.selectData[0].GrandTotal);
  //     props.setNewRemarks(res.data.selectData[0].Remarks);

  //     props.setNewBillType(res.data.selectData[0].BillType);
  //     props.setNewAmountRecieved(res.data.selectData[0].PymtAmtRecd);
  //     props.setNewCreditDays(res.data.selectData[0].PaymentTerms);
  //     props.setNewPaymentDescription(
  //       res.data.selectData[0].PaymentReceiptDetails
  //     );
  //   });
  // };

  // const componentRef = useRef();
  // const printPN = useReactToPrint({
  //   content: () => componentRef.current,
  //   documentTitle: "PackingNote",
  //   onAfterPrint: () => {
  //     toast.success("Print Packing Note Successfull");
  //   },
  // });

  // const printCopytRef = useRef();
  // const printCopy = useReactToPrint({
  //   content: () => printCopytRef.current,
  //   documentTitle: "Invoice",
  //   onAfterPrint: () => {
  //     toast.success("Printing Copy Successfull");
  //   },
  // });

  const inputHandler = (e) => {
    props.setInvRegisterData({
      ...props.invRegisterData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeDiscountDelivery = (e) => {
    // console.log("valueueueu", e.target.value.length > 0 ? e.target.value : 0);
    // props.setInvRegisterData({
    //   ...props.invRegisterData,
    //   Discount: e.target.value.length > 0 ? e.target.value : 0,
    // });
    // console.log(
    //   "invvvv total...",
    //   parseFloat(invRegisterData.Net_Total) -
    //     parseFloat(e.target.value.length > 0 ? e.target.value : 0)
    // );
    props.setInvTaxData([]);
    document.getElementById("taxDropdown").value = "none";
    let newInvTotal;
    let newGrandTotal;
    let newRoundOff;
    if (e.target.name === "Discount") {
      newInvTotal =
        parseFloat(props.invRegisterData?.Net_Total) -
        parseFloat(e.target.value.length > 0 ? e.target.value : 0) +
        parseFloat(props.invRegisterData?.Del_Chg);

      newGrandTotal = Math.round(newInvTotal);

      newRoundOff = newGrandTotal - newInvTotal;

      props.setInvRegisterData({
        ...props.invRegisterData,
        Discount: e.target.value.length > 0 ? e.target.value : 0,
        TaxAmount: 0.0,
        InvTotal: newInvTotal.toFixed(2),

        GrandTotal: newGrandTotal.toFixed(2),
        Round_Off: newRoundOff.toFixed(2),
        AssessableValue:
          parseFloat(props.invRegisterData.Net_Total) -
          parseFloat(e.target.value.length > 0 ? e.target.value : 0) +
          parseFloat(props.invRegisterData.Del_Chg),
      });
    } else if (e.target.name === "Del_Chg") {
      newInvTotal =
        parseFloat(props.invRegisterData?.Net_Total) -
        parseFloat(props.invRegisterData?.Discount) +
        parseFloat(e.target.value.length > 0 ? e.target.value : 0);

      newGrandTotal = Math.round(newInvTotal);

      newRoundOff = newGrandTotal - newInvTotal;

      props.setInvRegisterData({
        ...props.invRegisterData,
        Del_Chg: e.target.value.length > 0 ? e.target.value : 0,
        TaxAmount: 0.0,
        InvTotal: newInvTotal.toFixed(2),
        GrandTotal: newGrandTotal.toFixed(2),
        Round_Off: newRoundOff.toFixed(2),
        AssessableValue:
          parseFloat(props.invRegisterData.Net_Total) -
          parseFloat(props.invRegisterData.Discount) +
          parseFloat(e.target.value.length > 0 ? e.target.value : 0),
      });
    }
  };

  const createPN = () => {
    if (props.invRegisterData.PO_No.length > 0) {
      Axios.post(apipoints.createPN, {
        invRegisterData: props.invRegisterData,
        invDetailsData: props.invDetailsData,
        invTaxData: props.invTaxData,
      }).then((res) => {
        // console.log("res.data", res.data);
        if (res.data.flag === 1) {
          toast.success(res.data.message);
          // console.log('data', );

          // console.log("response", res.data.invRegisterData[0]);
          props.setInvRegisterData(res.data.invRegisterData[0]);
        } else if (res.data.flag === 0) {
          toast.error(res.data.message);
        } else {
          toast.warning("Uncaught error in frontend");
        }
      });
    } else {
      toast.warning("Please enter PO No");
    }
  };
  const cancelPN = () => {
    // console.log("cancel pn clicked");
    Axios.post(apipoints.cancelPN, {
      invRegisterData: props.invRegisterData,
    }).then((res) => {
      // console.log("resssssssssss", res.data);
      if (res.data.flag === 1) {
        toast.success(res.data.message);
        props.setInvRegisterData({
          ...props.invRegisterData,
          DCStatus: "Cancelled",
        });
      } else if (res.data.flag === 0) {
        toast.error(res.data.message);
      } else {
        toast.warning("Uncaught error in frontend");
      }
    });
  };

  const savePN = () => {
    Axios.post(apipoints.updateInvoice, {
      invRegisterData: props.invRegisterData,
      invDetailsData: props.invDetailsData,
      invTaxData: props.invTaxData,
    }).then((res) => {
      // console.log("update,,,", res.data);
      if (res.data.flag === 1) {
        toast.success(res.data.message);
      } else if (res.data.flag === 0) {
        toast.error(res.data.message);
      } else {
        toast.error("Frontend Error");
      }
    });
  };

  const createInvoice = () => {
    savePN();
    Axios.post(apipoints.createInvoice, {
      invRegisterData: props.invRegisterData,
    }).then((res) => {
      // console.log("rereer", res.data.registerData[0]);

      props.setInvRegisterData(res.data.registerData[0]);
      if (res.data.flag === 1) {
        toast.success(res.data.message);
      } else if (res.data.flag === 0) {
        toast.error(res.data.message);
      } else {
        toast.error("Frontend Error");
      }
      // setTaxDropDownData(res.data);
      // console.log("tax dropdown data", res.data);
      // console.log("getAllCust", res.data);
    });
  };

  const printPackingNoteCopy = () => {
    setPrintCopyModal(true);
  };

  const printPackingNoteAnnexure = () => {
    setPrintAnneureModal(true);
  };

  const importFromIV = () => {
    // console.log("import from iv clicked....");

    setSelectIV(true);
  };

  return (
    <>
      <div>
        <FormHeader invRegisterData={props.invRegisterData} />

        <Tabs className="mt-3 p-2">
          <Tab eventKey="consigneeInfo" title="Consignee Info">
            <ConsigneeInfo
              invRegisterData={props.invRegisterData}
              setInvRegisterData={props.setInvRegisterData}
              inputHandler={inputHandler} //func

              // AllCust={props.AllCust}
              // CreateNewType={props.CreateNewType}
              // setSelectedCustomer={props.setSelectedCustomer}
              // SelectedCustomer={props.SelectedCustomer}
              // setPrimary={props.setPrimary}
              // primary={props.primary}
              // secondary={props.secondary}
              // newDelivery={props.newDelivery}
              // setNewDelivery={props.setNewDelivery}
            />
          </Tab>
          <Tab eventKey="Invoicing Info" title="Invoicing Info">
            <InvoicingInfo
              invRegisterData={props.invRegisterData}
              setInvRegisterData={props.setInvRegisterData}
              inputHandler={inputHandler} //func
              // func
              handleChangeDiscountDelivery={handleChangeDiscountDelivery}
              createInvoice={createInvoice}
              // print inv and annexure
              printPackingNoteAnnexure={printPackingNoteAnnexure} //func
              // invRegisterData={props.invRegisterData}
              invDetailsData={props.invDetailsData}
              invTaxData={props.invTaxData}
              printAnneureModal={printAnneureModal}
              setPrintAnneureModal={setPrintAnneureModal}
              buttonClicked={buttonClicked}
              setButtonClicked={setButtonClicked}
              setConfirmModalOpen={setConfirmModalOpen}
              // setPrimary={props.setPrimary}
              // primary={props.primary}
              // secondary={props.secondary}
              // tableRow={props.tableRow}
              // setNetTotal={props.setNetTotal}
              // netTotal={props.netTotal}
              // setDeliveryCharge={props.setDeliveryCharge}
              // deliveryCharge={props.deliveryCharge}
              // setDiscount={props.setDiscount}
              // discount={props.discount}
              // SelectedTaxes={props.SelectedTaxes}
              // taxAmount={props.taxAmount}
              // setGrandTotal={props.setGrandTotal}
              // grandTotal={props.grandTotal}
              // setRoundOff={props.setRoundOff}
              // roundOff={props.roundOff}
              // invoiceTotal={props.invoiceTotal}
              // setInvoiceTotal={props.setInvoiceTotal}
              // // new variables

              // newDispatchDate={props.newDispatchDate}
              // setNewDispatchDate={props.setNewDispatchDate}
              // newDispatchMode={props.newDispatchMode}
              // setNewDispatchMode={props.setNewDispatchMode}
              // newVehicleNo={props.newVehicleNo}
              // setNewVehicleNo={props.setNewVehicleNo}
              // newNetTotal={props.newNetTotal}
              // setNewNetTotal={props.setNewNetTotal}
              // newDiscount={props.newDiscount}
              // setNewDiscount={props.setNewDiscount}
              // newDeliveryCharge={props.newDeliveryCharge}
              // setNewDeliveryCharge={props.setNewDeliveryCharge}
              // // newTaxAmount={props.newTaxAmount}
              // // setnewTaxAmount={props.setnewTaxAmount}
              // newInvoiceTotal={props.newInvoiceTotal}
              // setNewInvoiceTotal={props.setNewInvoiceTotal}
              // newRoundOff={props.newRoundOff}
              // setNewRoundOff={props.setNewRoundOff}
              // newGrandTotal={props.newGrandTotal}
              // setNewGrandTotal={props.setNewGrandTotal}
              // newRemarks={props.newRemarks}
              // setNewRemarks={props.setNewRemarks}
              // // setNewSelectedTaxes = {props.setNewSelectedTaxes}
              // newSelectedTaxes={props.newSelectedTaxes}
              // newTaxAmountVar={props.newTaxAmountVar}
              // deleteTaxes={deleteTaxes} //function
              // setNewBillType={props.setNewBillType}
              // newBillType={props.newBillType}
              // newCreditDays={props.newCreditDays}
              // setNewCreditDays={props.setNewCreditDays}
              // newAmountRecieved={props.newAmountRecieved}
              // setNewAmountRecieved={props.setNewAmountRecieved}
              // newPaymentDescription={props.newPaymentDescription}
              // setNewPaymentDescription={props.setNewPaymentDescription}
              // createInvoice={createInvoice}
              // // print funciton
              // printCopy={printCopy}
            />
          </Tab>
        </Tabs>

        <div className="m-3 border-top"></div>
        {/* button start here */}
        <div className="row">
          <div className="col-md-6">
            <div className="d-flex justify-content-space">
              <button
                // className="button-style m-0"
                disabled={
                  props.invRegisterData.DC_No.length > 0 ||
                  props.invRegisterData.Cust_Code.length === 0 ||
                  props.invRegisterData.Cust_Name.length === 0 ||
                  props.invDetailsData.length === 0
                }
                className={
                  props.invRegisterData.DC_No.length > 0 ||
                  props.invRegisterData.Cust_Code.length === 0 ||
                  props.invRegisterData.Cust_Name.length === 0 ||
                  props.invDetailsData.length === 0
                    ? "button-style button-disabled m-0"
                    : "button-style m-0"
                }
                // onClick={
                //   createPN

                //   //   (e) => {
                //   //   console.log("invRegisterData", props.invRegisterData);
                //   //   console.log("invDetailsData", props.invDetailsData);
                //   //   console.log("invTaxData", props.invTaxData);
                //   // }
                // }
                onClick={(e) => {
                  if (props.invRegisterData.PO_No.length === 0) {
                    toast.warning("Enter the PO No");
                  } else {
                    setButtonClicked("Create PN");
                    setConfirmModalOpen(true);
                  }
                }}
              >
                Create PN
              </button>
              {/* {props.tableRow.length === 0 || props.secondary ? (
              <button
                className="button-style button-disabled m-0"
                disabled
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Add the Goods to Create PN"
              >
                Create PN
              </button>
            ) : (
              <button className="button-style m-0" onClick={postInvoiceData}>
                Create PN
              </button>
            )} */}

              <div className="p-1"></div>

              <button
                //  className="button-style m-0"

                disabled={!props.invRegisterData.DC_No.length > 0}
                className={
                  !props.invRegisterData.DC_No.length > 0
                    ? "button-style button-disabled m-0"
                    : "button-style m-0"
                }
                onClick={printPackingNoteCopy}
              >
                Print PN
              </button>
              {/* {!props.secondary ? (
              <button disabled className="button-style button-disabled m-0 p-0">
                Print PN
              </button>
            ) : (
              <button className="button-style m-0" onClick={printPN}>
                Print PN
              </button>
            )} */}

              <div className="p-1"></div>
              <button
                // className="button-style m-0"

                disabled={
                  !(props.invRegisterData.DC_No.length > 0) ||
                  props.invRegisterData.Inv_No?.length > 0 ||
                  props.invRegisterData.DCStatus === "Cancelled"
                }
                className={
                  !(props.invRegisterData.DC_No.length > 0) ||
                  props.invRegisterData.Inv_No?.length > 0 ||
                  props.invRegisterData.DCStatus === "Cancelled"
                    ? "button-style button-disabled m-0"
                    : "button-style m-0"
                }
                // disabled={props.invRegisterData.Inv_No?.length > 0}
                // className={props.invRegisterData.Inv_No?.length > 0?'button-style button-disabled':'button-style'}

                onClick={savePN}
              >
                Save
              </button>

              {/* {!props.secondary || props.secondary[0]?.Inv_No ? (
              <button disabled className="button-style button-disabled m-0 p-0">
                Save
              </button>
            ) : (
              <button className="button-style m-0" onClick={updateInvoice}>
                Save
              </button>
            )} */}
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex justify-content-end">
              <div className="d-flex justify-content-space">
                <button
                  //  className="button-style m-0"

                  disabled={
                    !(props.invRegisterData.DC_No.length > 0) ||
                    props.invRegisterData.Inv_No?.length > 0 ||
                    props.invRegisterData.DCStatus === "Cancelled"
                  }
                  className={
                    !(props.invRegisterData.DC_No.length > 0) ||
                    props.invRegisterData.Inv_No?.length > 0 ||
                    props.invRegisterData.DCStatus === "Cancelled"
                      ? "button-style button-disabled m-0"
                      : "button-style m-0"
                  }
                  // onClick={cancelPN}
                  onClick={(e) => {
                    setButtonClicked("Cancel PN");
                    setConfirmModalOpen(true);
                  }}
                >
                  Cancel PN
                </button>

                {/* {!props.secondary || props.secondary[0]?.Inv_No ? (
                <button
                  disabled
                  className="button-style button-disabled m-0 p-0"
                >
                  Cancel PN
                </button>
              ) : (
                <button className="button-style m-0">Cancel PN</button>
              )} */}

                <div className="p-1"></div>
                <button
                  onClick={importFromIV}
                  disabled={
                    props.invDetailsData?.length > 0 ||
                    props.invRegisterData.DC_No.length > 0
                  }
                  // className="button-style m-0"
                  className={
                    props.invDetailsData?.length > 0 ||
                    props.invRegisterData.DC_No.length > 0
                      ? "button-style button-disabled m-0"
                      : "button-style m-0"
                  }
                >
                  Import from IV
                </button>
                <div className="p-1"></div>
                <button
                  // className="button-style m-0"
                  onClick={() => {
                    // props.setShow(true);
                    setAddGoodsModal(true);
                  }}
                  disabled={
                    props.invRegisterData.Iv_Id > 0 ||
                    props.invRegisterData.DC_No.length > 0
                  }
                  className={
                    props.invRegisterData.Iv_Id > 0 ||
                    props.invRegisterData.DC_No.length > 0
                      ? "button-style button-disabled m-0"
                      : "button-style m-0"
                  }
                >
                  Add Goods
                </button>

                {/* {!props.SelectedCustomer || props.secondary ? (
                <button className="button-style m-0 button-disabled" disabled>
                  Add Goods
                </button>
              ) : (
                <button
                  className="button-style m-0"
                  onClick={() => {
                    props.setShow(true);
                  }}
                >
                  Add Goods
                </button>
              )} */}
              </div>
            </div>
          </div>
        </div>
        <div className="m-3 border-top"></div>
        {/* table starts here */}
        <div>
          {/* product table */}
          <div className="row col-md-12">
            <div
              className="px-2"
              style={{ maxHeight: "50vh", overflow: "auto" }}
            >
              <ProductTable
                invDetailsData={props.invDetailsData}
                // setTableRow={props.setTableRow}
                // tableRow={props.tableRow}
                // secondary={props.secondary}
              />
            </div>
          </div>
        </div>
        <div className="m-3 mt-2 border-top"></div>

        <div className="row">
          <div className="col-md-6"></div>
          <div className="col-md-6">
            <div className="d-flex flex-row justify-content-end">
              <div className="col-md-3 p-0 ">
                <b>Assessable Value</b>
                <input
                  disabled
                  className="input-disabled"
                  value={
                    parseFloat(props.invRegisterData?.AssessableValue).toFixed(
                      2
                    )

                    //   (
                    //   parseFloat(props.invRegisterData?.Net_Total) -
                    //   parseFloat(props.invRegisterData?.Discount) +
                    //   parseFloat(props.invRegisterData?.Del_Chg)
                    // ).toFixed(2)
                  }
                />
                {/* {parseFloat(props.newNetTotal) -
                (props.newDiscount.length > 0
                  ? parseFloat(props.newDiscount)
                  : 0) +
                (props.newDeliveryCharge.length > 0
                  ? parseFloat(props.newDeliveryCharge)
                  : 0) >
              0 ? (
                <input
                  type="number"
                  min="0"
                  value={
                    parseFloat(props.newNetTotal) -
                    (props.newDiscount.length > 0
                      ? parseFloat(props.newDiscount)
                      : 0) +
                    (props.newDeliveryCharge.length > 0
                      ? parseFloat(props.newDeliveryCharge)
                      : 0)
                  }
                  disabled
                  className="input-disabled"
                />
              ) : (
                <input
                  type="number"
                  min="0"
                  value={(
                    parseFloat(props.netTotal) -
                    (props.discount.length > 0
                      ? parseFloat(props.discount)
                      : 0) +
                    (props.deliveryCharge.length > 0
                      ? // parseFloat(props.discount)
                        parseFloat(props.deliveryCharge)
                      : 0)
                  ).toFixed(2)}
                  disabled
                  className="input-disabled"
                />
              )} */}
              </div>
              <span className="p-1"></span>
              <div className="col-md-3 p-0 ">
                <b>Select Tax</b>
                <select
                  id="taxDropdown"
                  style={{
                    fontSize: "inherit",
                  }}
                  //                   onChange={((e)=>{

                  //                     props.setInvTaxData([])
                  //                     for (let i = 0; i < props.TaxDropDownData.length; i++) {
                  //                       const element = props.TaxDropDownData[i];
                  //                       if(
                  //                         element.Tax_Percent
                  //                           === e.target.value){

                  //                           props.setInvTaxData(

                  // [...props.invTaxData,

                  // ]

                  //                           )

                  //                           }
                  //                     }

                  //                   })}

                  onChange={(e) => {
                    // console.log("tax drop", TaxDropDownData);

                    const newTaxArray = props.TaxDropDownData.filter(
                      (obj) =>
                        parseFloat(obj.Tax_Percent).toFixed(2) ===
                        parseFloat(e.target.value).toFixed(2)
                    );
                    // console.log("newTaxArray", newTaxArray);
                    // setInvTaxData([]);

                    let arr = [];
                    let taxAmountVal = 0;
                    let TaxableAmount = parseFloat(
                      props.invRegisterData?.AssessableValue
                    )
                      //  -
                      // parseFloat(props.invRegisterData?.Discount) +
                      // parseFloat(props.invRegisterData?.Del_Chg)
                      .toFixed(2);
                    for (let i = 0; i < newTaxArray.length; i++) {
                      const element = newTaxArray[i];

                      let TaxAmt = (
                        (TaxableAmount * parseFloat(element.Tax_Percent)) /
                        100
                      ).toFixed(2);

                      // console.log("TaxableAmount", TaxableAmount);
                      // console.log("TaxAmt", TaxAmt);
                      if (arr.length > 0) {
                        arr = [
                          ...arr,
                          {
                            TaxID: element.TaxID,
                            TaxOn: element.TaxOn,
                            TaxPercent: element.Tax_Percent,
                            Tax_Name: element.TaxName,
                            TaxableAmount: TaxableAmount,
                            TaxAmt: TaxAmt,
                          },
                        ];
                        taxAmountVal =
                          parseFloat(taxAmountVal) + parseFloat(TaxAmt);
                      } else {
                        arr = [
                          {
                            TaxID: element.TaxID,
                            TaxOn: element.TaxOn,
                            TaxPercent: element.Tax_Percent,
                            Tax_Name: element.TaxName,
                            TaxableAmount: TaxableAmount,
                            TaxAmt: TaxAmt,
                          },
                        ];
                        taxAmountVal =
                          parseFloat(taxAmountVal) + parseFloat(TaxAmt);
                      }
                    }

                    props.setInvTaxData(arr);

                    // console.log(
                    //   "TaxableAmount",
                    //   TaxableAmount,
                    //   "taxAmountVal",
                    //   taxAmountVal,
                    //   "inv",
                    //   (
                    //     parseFloat(TaxableAmount) + parseFloat(taxAmountVal)
                    //   ).toFixed(2)
                    // );

                    let newInvTotal =
                      parseFloat(TaxableAmount) + parseFloat(taxAmountVal);

                    let newGrandTotal = Math.round(newInvTotal);
                    let newRoundOff = newGrandTotal - newInvTotal;

                    props.setInvRegisterData({
                      ...props.invRegisterData,
                      TaxAmount: parseFloat(taxAmountVal).toFixed(2),
                      InvTotal: newInvTotal.toFixed(2),
                      GrandTotal: newGrandTotal.toFixed(2),
                      Round_Off: newRoundOff.toFixed(2),
                    });

                    // console.log("arr", arr);
                  }}
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
                  <option value="none" selected disabled hidden>
                    Select any option
                  </option>
                  {props.TaxDropDownData?.map((taxVal, key) => (
                    <option value={taxVal.Tax_Percent}>{taxVal.TaxName}</option>
                  ))}
                  {/* <option value="">2</option>
                  <option value="">3</option> */}
                </select>
                {/* {props?.secondary ? (
                props.secondary[0].Inv_No ? (
                  <select
                    disabled
                    className="ip-select input-disabled"
                    style={{
                      fontSize: "inherit",
                    }}
                    value="none"
                  >
                    <option value="none" disabled>
                      Select an Option
                    </option>
                  </select>
                ) : (
                  // <select name="" id="" value={"none"}>
                  //   <option value="none">test</option>
                  // </select>
                  <select
                    id="taxDropdown"
                    className="ip-select"
                    style={{
                      fontSize: "inherit",
                    }}
                    defaultValue="none"
                    onChange={(e) => {
                      // console.log("in dropdown", e.target.value);

                      for (
                        let index = 0;
                        index < props.TaxData.length;
                        index++
                      ) {
                        const element = props.TaxData[index];
                        // console.log("element", element);

                        if (index == e.target.value) {
                          // console.log("if", element);

                          props.setSelectedTaxes([
                            ...props.SelectedTaxes,
                            {
                              taxID: element.TaxID,
                              taxOn: element.TaxOn,
                              taxPercentage: element.Tax_Percent,
                              taxName: element.TaxName,
                              taxAmount:
                                ((parseFloat(props?.netTotal) -
                                  parseFloat(props?.discount) +
                                  parseFloat(props?.deliveryCharge)) *
                                  parseFloat(element.Tax_Percent)) /
                                100,
                              taxableAmount:
                                parseFloat(props?.netTotal) -
                                parseFloat(props?.discount) +
                                parseFloat(props?.deliveryCharge),
                            },
                          ]);

                          props.setNewSelectedTaxes([
                            ...props?.newSelectedTaxes,
                            {
                              TaxID: element.TaxID,
                              TaxOn: element.TaxOn,
                              TaxPercent: element.Tax_Percent,
                              Tax_Name: element.TaxName,
                              TaxAmt:
                                ((parseFloat(props?.newNetTotal) -
                                  parseFloat(props?.newDiscount) +
                                  parseFloat(props?.newDeliveryCharge)) *
                                  parseFloat(element.Tax_Percent)) /
                                100,
                              TaxableAmount:
                                parseFloat(props?.newNetTotal) -
                                parseFloat(props?.newDiscount) +
                                parseFloat(props?.newDeliveryCharge),
                            },
                          ]);
                        }
                        // if (index === e.target.value) {
                        // //  console.log("whole row", element[index]);
                        // }
                      }
                    }}
                  >
                    <option value="none" disabled hidden>
                      Select an Option
                    </option>

                    {props?.TaxData?.map((val, i) => (
                      <option value={i}>{val.TaxName}</option>
                    ))}

                    
                  </select>
                )
              ) : (
                <select
                  id="taxDropdown"
                  className="ip-select"
                  style={{
                    fontSize: "inherit",
                  }}
                  defaultValue="none"
                  onChange={(e) => {
                    // console.log("in dropdown", e.target.value);

                    for (let index = 0; index < props.TaxData.length; index++) {
                      const element = props.TaxData[index];
                      // console.log("element", element);

                      if (index == e.target.value) {
                        // console.log("if", element);

                        props.setSelectedTaxes([
                          ...props.SelectedTaxes,
                          {
                            taxID: element.TaxID,
                            taxOn: element.TaxOn,
                            taxPercentage: element.Tax_Percent,
                            taxName: element.TaxName,
                            taxAmount:
                              ((parseFloat(props?.netTotal) -
                                parseFloat(props?.discount) +
                                parseFloat(props?.deliveryCharge)) *
                                parseFloat(element.Tax_Percent)) /
                              100,
                            taxableAmount:
                              parseFloat(props?.netTotal) -
                              parseFloat(props?.discount) +
                              parseFloat(props?.deliveryCharge),
                          },
                        ]);

                        props.setNewSelectedTaxes([
                          ...props?.newSelectedTaxes,
                          {
                            TaxID: element.TaxID,
                            TaxOn: element.TaxOn,
                            TaxPercent: element.Tax_Percent,
                            Tax_Name: element.TaxName,
                            TaxAmt:
                              ((parseFloat(props?.newNetTotal) -
                                parseFloat(props?.newDiscount) +
                                parseFloat(props?.newDeliveryCharge)) *
                                parseFloat(element.Tax_Percent)) /
                              100,
                            TaxableAmount:
                              parseFloat(props?.newNetTotal) -
                              parseFloat(props?.newDiscount) +
                              parseFloat(props?.newDeliveryCharge),
                          },
                        ]);
                      }
                      // if (index === e.target.value) {
                      // //  console.log("whole row", element[index]);
                      // }
                    }
                  }}
                >
                  <option value="none" disabled hidden>
                    Select an Option
                  </option>

                  {props?.TaxData?.map((val, i) => (
                    <option value={i}>{val.TaxName}</option>
                  ))}

                 
                </select>
              )} */}

                {/* )} */}
              </div>
              <span className="p-1"></span>
              <div className="col-md-3 p-0 d-flex justify-content-end">
                <button
                  // className="button-style"
                  onClick={deleteTaxes}
                  disabled={
                    props.invRegisterData.Inv_No?.length > 0 ||
                    props.invRegisterData.DCStatus === "Cancelled"
                  }
                  className={
                    props.invRegisterData.Inv_No?.length > 0 ||
                    props.invRegisterData.DCStatus === "Cancelled"
                      ? "button-style button-disabled"
                      : "button-style"
                  }
                >
                  Delete Taxes
                </button>
                {/* {props.SelectedTaxes?.length > 0 ||
              props.newSelectedTaxes?.length > 0 ? (
                props?.secondary ? (
                  props.secondary[0].Inv_No ? (
                    <button
                      disabled
                      className="button-style m-0 p-0 button-disabled"
                    >
                      Delete Taxes
                    </button>
                  ) : (
                    <button className="button-style me-0" onClick={deleteTaxes}>
                      Delete Taxes
                    </button>
                  )
                ) : (
                  <button className="button-style me-0" onClick={deleteTaxes}>
                    Delete Taxes
                  </button>
                )
              ) : (
                <button disabled className="button-style me-0 button-disabled">
                  Delete Taxes
                </button>
              )} */}
              </div>
            </div>
          </div>
        </div>

        <div className="m-3 border-top"></div>

        {/* tax table */}
        <div className="px-2">
          <TaxTable
            invTaxData={props.invTaxData}
            setInvTaxData={props.setInvTaxData}
            // SelectedTaxes={props?.SelectedTaxes}
            // taxableAmount={
            //   parseFloat(props?.netTotal) -
            //   parseFloat(props?.discount) +
            //   parseFloat(props?.deliveryCharge)
            // }
            // secondary={props.secondary}
            // // newTaxableAmount={
            // //   parseFloat(props.newNetTotal) -
            // //   (props.newDiscount.length > 0 ? parseFloat(props.newDiscount) : 0) +
            // //   (props.newDeliveryCharge.length > 0
            // //     ? parseFloat(props.newDeliveryCharge)
            // //     : 0)
            // // }
            // setNewSelectedTaxes={props.setNewSelectedTaxes}
            // newSelectedTaxes={props.newSelectedTaxes}
          />
        </div>
        <div className="p-2"></div>
      </div>
      <div>
        <AddGoods
          setAddGoodsModal={setAddGoodsModal}
          addGoodsModal={addGoodsModal}
          // register
          invRegisterData={props.invRegisterData}
          setInvRegisterData={props.setInvRegisterData}
          // details
          invDetailsData={props.invDetailsData}
          setInvDetailsData={props.setInvDetailsData}
          // tax table
          setInvTaxData={props.setInvTaxData}
          invTaxData={props.invTaxData}
        />
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
        <ImportFromIV
          selectIV={selectIV}
          setSelectIV={setSelectIV}
          // register
          invRegisterData={props.invRegisterData}
          setInvRegisterData={props.setInvRegisterData}
          // details
          invDetailsData={props.invDetailsData}
          setInvDetailsData={props.setInvDetailsData}
        />
        <ConfirmationModal
          setConfirmModalOpen={setConfirmModalOpen}
          confirmModalOpen={confirmModalOpen}
          message={
            buttonClicked === "Create PN"
              ? "Are you sure to create the PN ?"
              : buttonClicked === "Cancel PN"
              ? "Are you sure to cancel the PN ?"
              : buttonClicked === "Create Invoice"
              ? "Are you sure to create the Invoice for the selected PN ?"
              : ""

            // buttonClicked === "Create PN"
            //   ? "Are you sure to create the PN"
            //   :
            //   (buttonClicked === "Cancel PN"
            //   ? "Are you sure to cancel the PN": buttonClicked === "Create Invoice")

            //   ? "Are you sure to create the Invoice for the selected PN"
          }
          yesClickedFunc={
            buttonClicked === "Create PN"
              ? createPN
              : buttonClicked === "Cancel PN"
              ? cancelPN
              : buttonClicked === "Create Invoice"
              ? createInvoice
              : ""

            // buttonClicked === "Create PN" ? createPN : cancelPN
          }
        />{" "}
      </div>
    </>
  );
}

// {/* PrintPN */}
// <PrintPN
//   // style={{ display: "none" }}
//   componentRef={componentRef}
//   DCInvNo={props.secondary ? props.secondary[0]?.DC_Inv_No : null}
//   // PN_No={props.INVData[0]?.DC_No}
//   // DCInvNo={props.DCInvNo}
// />

// {/* PrintCopy */}
// <PrintCopy
//   // style={{ display: "none" }}
//   printCopytRef={printCopytRef}
//   DCInvNo={props.secondary ? props.secondary[0]?.DC_Inv_No : null}
//   // PN_No={props.INVData[0]?.DC_No}
//   // DCInvNo={props.DCInvNo}
// />

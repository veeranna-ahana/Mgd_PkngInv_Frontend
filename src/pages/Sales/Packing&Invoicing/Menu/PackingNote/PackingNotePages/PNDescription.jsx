import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Axios from "axios";
import { Form, Tab, Table, Tabs } from "react-bootstrap";
import { apipoints } from "../../../../../api/PackInv_API/PackingNote/PackingNote";
import { toast } from "react-toastify";

import FormHeader from "./FormHeader";
import ConsigneeInfo from "./PNTabs/ConsigneeInfo";
import InvoicingInfo from "./PNTabs/InvoicingInfo";

import ProductTable from "./Tables/ProductTable";
import TaxTable from "./Tables/TaxTable";

import SetRateModal from "./Modals/SetRateModal";
import ConfirmationModal from "./Modals/ConfirmationModal";

import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// toast

export default function Profile() {
  const location = useLocation();

  const [DCInvNo, setDCInvNo] = useState(location.state);
  const [invRegisterData, setInvRegisterData] = useState([]);
  const [invDetailsData, setInvDetailsData] = useState([]);
  const [invTaxData, setInvTaxData] = useState([]);
  const [loadRateEvent, setLoadRateEvent] = useState(false);

  const [setRateConsumerData, setSetRateConsumerData] = useState([]);
  const [showSetRateModal, setShowSetRateModal] = useState(false);

  const [TaxDropDownData, setTaxDropDownData] = useState([]);

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const [buttonClicked, setButtonClicked] = useState("");

  const [allStates, setAllStates] = useState([]);

  const [printCopyModal, setPrintCopyModal] = useState(false);
  const [printAnneureModal, setPrintAnneureModal] = useState(false);
  const [printInvoiceModal, setPrintInvoiceModal] = useState(false);
  // const [printCopyTableData, setPrintCopyTableData] = useState([]);

  // function* chunks(arr, n) {
  //   for (let i = 0; i < arr.length; i += n) {
  //     yield arr.slice(i, i + n);
  //   }
  // }

  // const rowLimit = 20;

  const fetchData = () => {
    Axios.post(apipoints.aboutInvoicePN, {
      DCInvNo: DCInvNo,
    }).then((res) => {
      res.data.registerData[0].TptMode =
        res.data.registerData[0].TptMode || "By Hand";

      setInvRegisterData(res.data.registerData[0]);
      setInvDetailsData(res.data.detailsData);
      setInvTaxData(res.data.taxData);
      Axios.post(apipoints.getSetRateConsumerData, {
        scheduleId: res.data.registerData[0].ScheduleId,
      }).then((sechRes) => {
        setSetRateConsumerData(sechRes.data);
      });
      Axios.post(apipoints.getTaxData, {
        Cust_Code: res.data.registerData[0].Cust_Code,
        unitStateID: "29",
        unitGST: "29AABCM1970H1ZE",
      }).then((res) => {
        setTaxDropDownData(res.data);
        // console.log("tax dataaaaa", res.data);
      });
    });
    // get all states
    Axios.get(apipoints.getAllStates, {}).then((res) => {
      setAllStates(res.data);
    });
  };
  // UseEffects...................
  useEffect(() => {
    fetchData();
  }, []);

  // console.log("data", invRegisterData);
  // useEffect(() => {
  //   Axios.post(apipoints.invoiceDetailTableData, {
  //     DCInvNo: DCInvNo,
  //   }).then((res) => {
  //     console.log("InvDetailsData", res.data);

  //     setInvDetailsData(res.data);
  //   });
  // }, []);

  // useEffect(() => {
  //   Axios.post(apipoints.getPrintData, {
  //     DCInvNo: DCInvNo,
  //   }).then((res) => {
  //     console.log("response from BE in profile", res);
  //     // setInvoiceDetailsTableData(res.data);
  //     setPrintableData(res.data);
  //   });
  // }, []);

  // useEffect(() => {
  //   Axios.post(apipoints.getTaxData, {}).then((res) => {
  //     setTaxDropDownData(res.data);
  //     // console.log("tax dataaaaa", res.data);
  //   });
  // }, []);

  const printPN = () => {
    setPrintCopyModal(true);
  };
  const printAnnexure = () => {
    setPrintAnneureModal(true);
  };
  const printInvoice = () => {
    setPrintInvoiceModal(true);
  };
  const rowLimit = 20;

  const deleteTaxFunc = () => {
    setInvTaxData([]);
    document.getElementById("taxDropdown").value = "none";
    let newInvTotal =
      parseFloat(invRegisterData?.Net_Total) -
      parseFloat(invRegisterData?.Discount) +
      parseFloat(invRegisterData?.Del_Chg);

    setInvRegisterData({
      ...invRegisterData,
      TaxAmount: 0.0,
      InvTotal: newInvTotal.toFixed(2),
    });
  };

  // console.log("registrer data...", invRegisterData.DespatchDate?.split("T")[0]);

  const inputHandler = (e) => {
    // debugger;
    // console.log("eeeeeee", e.target.value);
    // if (e.target.type === "number") {
    //   setInvRegisterData({
    //     ...invRegisterData,
    //     [e.target.name]:
    //       e.target.value.length <= 0 ||
    //       e.target.value === undefined ||
    //       e.target.value === null ||
    //       e.target.value === ""
    //         ? 0
    //         : e.target.value,
    //   });
    //   // deleteTaxFunc();
    // } else {
    // }
    setInvRegisterData({
      ...invRegisterData,
      [e.target.name]: e.target.value,
    });
    // console.log("111111111111", invRegisterData.Discount);
    // console.log(object);
  };

  // const calOnChangeInput = () => {
  //   // console.log('discount',)
  //   // console.log(name, "...", value);
  //   // deleteTaxFunc;
  //   // let amountBeforeTax;
  //   // let value = 0;
  //   // if (
  //   //   e.target.value.length <= 0 ||
  //   //   e.target.value === undefined ||
  //   //   e.target.value === null ||
  //   //   parseFloat(e.target.value).toFixed(1) === 0.0
  //   // ) {
  //   //   value = 0;
  //   // } else {
  //   //   value = parseFloat(e.target.value).toFixed(2);
  //   // }
  //   // // console.log("name", e.target.name, ".......", e.target.value);
  //   // // console.log("value", e.target.value);
  //   // // console.log("valu", value);
  //   // let calculatedInvoiceTotal = 0;
  //   // if (name === "Discount") {
  //   //   calculatedInvoiceTotal =
  //   //     parseFloat(invRegisterData.Net_Total) -
  //   //     parseFloat(value) +
  //   //     parseFloat(invRegisterData.Del_Chg);
  //   //   // setInvRegisterData({
  //   //   //   ...invRegisterData,
  //   //   //   InvTotal: calculatedInvoiceTotal.toFixed(2),
  //   //   // });
  //   //   console.log("calculatedInvoiceTotal", calculatedInvoiceTotal);
  //   // } else if (name === "Del_Chg") {
  //   //   // calculatedInvoiceTotal =
  //   //   //   parseFloat(invRegisterData.Net_Total) -
  //   //   //   parseFloat(invRegisterData.Discount) +
  //   //   //   parseFloat(value);
  //   //   // setInvRegisterData({
  //   //   //   ...invRegisterData,
  //   //   //   InvTotal: calculatedInvoiceTotal.toFixed(2),
  //   //   // });
  //   // }
  // };

  // console.log("invvvvv", invRegisterData.Discount);

  // console.log("discounttttt main", invRegisterData.Discount);

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
    setInvTaxData([]);
    document.getElementById("taxDropdown").value = "none";
    let newInvTotal;
    let newGrandTotal;
    let newRoundOff;
    if (e.target.name === "Discount") {
      newInvTotal =
        parseFloat(invRegisterData?.Net_Total) -
        parseFloat(e.target.value.length > 0 ? e.target.value : 0) +
        parseFloat(invRegisterData?.Del_Chg);

      newGrandTotal = Math.round(newInvTotal);

      newRoundOff = newGrandTotal - newInvTotal;

      setInvRegisterData({
        ...invRegisterData,
        Discount: e.target.value.length > 0 ? e.target.value : 0,
        TaxAmount: 0.0,
        InvTotal: newInvTotal.toFixed(2),

        GrandTotal: newGrandTotal.toFixed(2),
        Round_Off: newRoundOff.toFixed(2),
      });
    } else if (e.target.name === "Del_Chg") {
      newInvTotal =
        parseFloat(invRegisterData?.Net_Total) -
        parseFloat(invRegisterData?.Discount) +
        parseFloat(e.target.value.length > 0 ? e.target.value : 0);

      newGrandTotal = Math.round(newInvTotal);

      newRoundOff = newGrandTotal - newInvTotal;

      setInvRegisterData({
        ...invRegisterData,
        Del_Chg: e.target.value.length > 0 ? e.target.value : 0,
        TaxAmount: 0.0,
        InvTotal: newInvTotal.toFixed(2),
        GrandTotal: newGrandTotal.toFixed(2),
        Round_Off: newRoundOff.toFixed(2),
      });
    }
  };

  const cancelPN = () => {
    // console.log("cancel pn clicked");
    Axios.post(apipoints.cancelPN, {
      invRegisterData: invRegisterData,
    }).then((res) => {
      // console.log("resssssssssss", res.data);
      if (res.data.flag === 1) {
        toast.success(res.data.message);
        setInvRegisterData({ ...invRegisterData, DCStatus: "Cancelled" });
      } else if (res.data.flag === 0) {
        toast.error(res.data.message);
      } else {
        toast.warning("Uncaught error in frontend");
      }
    });
  };

  const onSave = () => {
    Axios.post(apipoints.updatePNProfileData, {
      invRegisterData: invRegisterData,
      invTaxData: invTaxData,
    }).then((res) => {
      if (res) {
        if (res.data.status === 1) {
          fetchData();
          toast.success(res.data.comment);
        } else if (res.data.status === 0) {
          toast.error(res.data.comment);
        } else {
          toast.error("Uncaught Error");
        }
      }
    });
  };

  const handleCreateInvoice = () => {
    onSave();
    // console.log("cretae invoeice");
    // alert("cretae invoeice");
    Axios.post(apipoints.createInvoice, {
      invRegisterData: invRegisterData,
    }).then((res) => {
      setInvRegisterData(res.data.registerData[0]);
      if (res.data.flag === 1) {
        // console.log("resssssssssss", res.data);
        // props.setNewINVNo(res.data.selectData[0].Inv_No);
        // props.setNewINVDate(res.data.selectData[0].Inv_Date);
        // props.setTaxDataFromDB(res.data.taxData);

        toast.success(res.data.message);

        if (invDetailsData.length > rowLimit) {
          printAnnexure();
        } else {
          printInvoice();
        }
        // printPN();
        // console.log("resssss", res);
      } else if (res.data.flag === 0) {
        toast.error(res.data.message);
      } else {
        toast.warning("Uncaught error in frontend");
      }
    });
  };

  return (
    <>
      <div className="col-md-12">
        <h4 className="title">Packing Note Description Form</h4>
      </div>
      <div className="p-1"></div>
      <div className="border rounded">
        <FormHeader
          invRegisterData={invRegisterData}
          setInvRegisterData={setInvRegisterData}
          inputHandler={inputHandler}
        />

        <Tabs className="mt-3 p-2">
          <Tab eventKey="consigneeInfo" title="Consignee Info">
            <ConsigneeInfo
              invRegisterData={invRegisterData}
              setInvRegisterData={setInvRegisterData}
              inputHandler={inputHandler}
              setAllStates={setAllStates}
              allStates={allStates}
              // INVData={INVData}
              // NewINVNo={NewINVNo}
              // NewAddress={NewAddress}
              // setNewAddress={setNewAddress}
              // NewDelivery={NewDelivery}
              // setNewDelivery={setNewDelivery}
              // NewDistrict={NewDistrict}
              // setNewDistrict={setNewDistrict}
              // NewState={NewState}
              // setNewState={setNewState}
              // NewPinCode={NewPinCode}
              // setNewPinCode={setNewPinCode}
              // NewScheduleIntructions={NewScheduleIntructions}
              // setNewScheduleIntructions={setNewScheduleIntructions}
            />
          </Tab>
          <Tab eventKey="Invoicing Info" title="Invoicing Info">
            <InvoicingInfo
              invRegisterData={invRegisterData}
              setInvRegisterData={setInvRegisterData}
              invDetailsData={invDetailsData}
              setInvDetailsData={setInvDetailsData}
              invTaxData={invTaxData}
              setInvTaxData={setInvTaxData}
              inputHandler={inputHandler} //func
              // calOnChangeInput={calOnChangeInput}
              deleteTaxFunc={deleteTaxFunc} //func
              handleChangeDiscountDelivery={handleChangeDiscountDelivery}
              handleCreateInvoice={handleCreateInvoice}
              onSave={onSave}
              setButtonClicked={setButtonClicked}
              setConfirmModalOpen={setConfirmModalOpen}
              confirmModalOpen={confirmModalOpen}
              printInvoice={printInvoice}
              printAnnexure={printAnnexure}
              printPN={printPN}
              setPrintInvoiceModal={setPrintInvoiceModal}
              setPrintAnneureModal={setPrintAnneureModal}
              setPrintCopyModal={setPrintCopyModal}
              printInvoiceModal={printInvoiceModal}
              printAnneureModal={printAnneureModal}
              printCopyModal={printCopyModal}
              rowLimit={rowLimit}
              TaxDropDownData={TaxDropDownData}

              // printCopyTableData={printCopyTableData}
              //
              // INVData={INVData}
              // setINVData={setINVData}
              // NewINVNo={NewINVNo}
              // setNewINVNo={setNewINVNo}
              // NewINVDate={NewINVDate}
              // setNewINVDate={setNewINVDate}
              // netAmount={netAmount}
              // taxAmount={taxAmount}
              // NewAddress={NewAddress}
              // setNewAddress={setNewAddress}
              // NewDelivery={NewDelivery}
              // setNewDelivery={setNewDelivery}
              // NewDistrict={NewDistrict}
              // setNewDistrict={setNewDistrict}
              // NewState={NewState}
              // setNewState={setNewState}
              // NewPinCode={NewPinCode}
              // setNewPinCode={setNewPinCode}
              // NewScheduleIntructions={NewScheduleIntructions}
              // setNewScheduleIntructions={setNewScheduleIntructions}
              // NewDispatchDate={NewDispatchDate}
              // setNewDispatchDate={setNewDispatchDate}
              // NewDispatchMode={NewDispatchMode}
              // setNewDispatchMode={setNewDispatchMode}
              // NewVehicleNo={NewVehicleNo}
              // setNewVehicleNo={setNewVehicleNo}
              // NewDiscount={NewDiscount}
              // setNewDiscount={setNewDiscount}
              // NewDeliveryCharge={NewDeliveryCharge}
              // setNewDeliveryCharge={setNewDeliveryCharge}
              // NewRoundOff={NewRoundOff}
              // setNewRoundOff={setNewRoundOff}
              // NewRemarks={NewRemarks}
              // setNewRemarks={setNewRemarks}
              // // PrintableData={PrintableData}
              // DCInvNo={DCInvNo}
              // setSelectedTax={setSelectedTax}
              // selectedTax={selectedTax}
              // invoiceDetailsTableData={invoiceDetailsTableData}
              // selectedTaxTable={selectedTaxTable}
              // setTaxDataFromDB={setTaxDataFromDB}
              // printAnnexureData={[
              //   INVData,
              //   invoiceDetailsTableData,
              //   NewAddress,
              //   NewDelivery,
              //   NewDistrict,
              //   NewState,
              //   NewPinCode,
              //   NewScheduleIntructions,
              //   NewDispatchDate,
              //   NewDispatchMode,
              //   NewVehicleNo,
              //   NewDiscount,
              //   NewDeliveryCharge,
              //   NewRoundOff,
              //   NewRemarks,
              //   NewINVNo,
              //   NewINVDate,
              // ]}
            />
          </Tab>
        </Tabs>
        <div className="m-3 border-top mb-2"></div>
        {/* button start here */}

        <div className="row">
          <div className="col-md-6 ">
            <div className="d-flex justify-content-space mt-3">
              <button
                // className="button-style  m-0"
                onClick={() => {
                  setLoadRateEvent(true);
                }}
                disabled={
                  invRegisterData.Inv_No ||
                  invRegisterData.DCStatus === "Cancelled"
                }
                className={
                  invRegisterData.Inv_No ||
                  invRegisterData.DCStatus === "Cancelled"
                    ? "button-style button-disabled m-0"
                    : "button-style m-0"
                }
              >
                Load Rates
              </button>
              <div className="p-1"></div>

              <button
                onClick={() => setShowSetRateModal(true)}
                disabled={
                  invRegisterData.Inv_No ||
                  invRegisterData.DCStatus === "Cancelled"
                }
                className={
                  invRegisterData.Inv_No ||
                  invRegisterData.DCStatus === "Cancelled"
                    ? "button-style button-disabled m-0"
                    : "button-style m-0"
                }
              >
                Set Rates
              </button>
              <div className="p-1"></div>
              <button
                disabled={
                  invRegisterData.Inv_No ||
                  invRegisterData.DCStatus === "Cancelled"
                }
                className={
                  invRegisterData.Inv_No ||
                  invRegisterData.DCStatus === "Cancelled"
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
              <div className="p-1"></div>

              <Link to="/PackingAndInvoices">
                <button
                  className="button-style m-0"
                  // style={{ width: "-webkit-fill-available" }}
                >
                  Close
                </button>
              </Link>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex justify-content-end">
              <div className="d-flex justify-content-space">
                <div>
                  <b>Assessable Value</b>
                  <input
                    type="number"
                    min="0"
                    value={(
                      parseFloat(invRegisterData?.Net_Total) -
                      parseFloat(invRegisterData?.Discount) +
                      parseFloat(invRegisterData?.Del_Chg)
                    ).toFixed(2)}
                    disabled
                    className="input-disabled"
                  />
                </div>

                <div className="p-1"></div>
                <div>
                  <b>Select Tax</b>
                  <select
                    id="taxDropdown"
                    style={{
                      fontSize: "inherit",
                    }}
                    onChange={(e) => {
                      // console.log("eee", TaxDropDownData[e.target.value]);

                      // console.log(
                      //   "amount",
                      //   parseFloat(invRegisterData?.Net_Total) -
                      //     parseFloat(invRegisterData?.Discount) +
                      //     parseFloat(invRegisterData?.Del_Chg)
                      // );
                      const newTaxOn = TaxDropDownData[
                        e.target.value
                      ].TaxOn.replace("(", "")
                        .replace(")", "")
                        .split("+");

                      // console.log("newTaxOn", newTaxOn);
                      let applicableTaxes = [];
                      let arr = [];
                      if (
                        TaxDropDownData[
                          e.target.value
                        ].UnderGroup.toUpperCase() === "INCOMETAX" ||
                        TaxDropDownData[
                          e.target.value
                        ].UnderGroup.toUpperCase() === "INCOME TAX"
                      ) {
                        // console.log("tcs");

                        for (let i = 1; i < newTaxOn.length; i++) {
                          const element = newTaxOn[i];
                          TaxDropDownData.filter(
                            (obj) => obj.TaxID === parseInt(element)
                          ).map((value, key) => applicableTaxes.push(value));
                        }
                        applicableTaxes.push(TaxDropDownData[e.target.value]);

                        // console.log("applicableTaxes", applicableTaxes);

                        let TaxableAmount = (
                          parseFloat(invRegisterData?.Net_Total) -
                          parseFloat(invRegisterData?.Discount) +
                          parseFloat(invRegisterData?.Del_Chg)
                        ).toFixed(2);

                        // console.log("TaxableAmount", TaxableAmount);
                        let TotalTaxAmount = 0;

                        for (let i = 0; i < applicableTaxes.length; i++) {
                          const element = applicableTaxes[i];
                          if (
                            element.UnderGroup.toUpperCase() === "INCOMETAX" ||
                            element.UnderGroup.toUpperCase() === "INCOME TAX"
                          ) {
                            // console.log("tcs");
                            let TaxableAmntForTCS =
                              parseFloat(TaxableAmount) +
                              parseFloat(TotalTaxAmount);
                            let TaxAmtForRow = (
                              (TaxableAmntForTCS *
                                parseFloat(element.Tax_Percent)) /
                              100
                            ).toFixed(2);
                            TotalTaxAmount =
                              parseFloat(TotalTaxAmount) +
                              parseFloat(TaxAmtForRow);

                            arr = [
                              ...arr,
                              {
                                TaxID: element.TaxID,
                                TaxOn: element.TaxOn,
                                TaxPercent: element.Tax_Percent,
                                Tax_Name: element.TaxName,
                                TaxableAmount: TaxableAmntForTCS,
                                TaxAmt: TaxAmtForRow,
                              },
                            ];
                          } else {
                            let TaxAmtForRow = (
                              (TaxableAmount *
                                parseFloat(element.Tax_Percent)) /
                              100
                            ).toFixed(2);
                            TotalTaxAmount =
                              parseFloat(TotalTaxAmount) +
                              parseFloat(TaxAmtForRow);

                            if (arr.length > 0) {
                              arr = [
                                ...arr,
                                {
                                  TaxID: element.TaxID,
                                  TaxOn: element.TaxOn,
                                  TaxPercent: element.Tax_Percent,
                                  Tax_Name: element.TaxName,
                                  TaxableAmount: TaxableAmount,
                                  TaxAmt: TaxAmtForRow,
                                },
                              ];
                            } else {
                              arr = [
                                {
                                  TaxID: element.TaxID,
                                  TaxOn: element.TaxOn,
                                  TaxPercent: element.Tax_Percent,
                                  Tax_Name: element.TaxName,
                                  TaxableAmount: TaxableAmount,
                                  TaxAmt: TaxAmtForRow,
                                },
                              ];
                            }
                          }
                        }

                        setInvTaxData(arr);

                        let newInvTotal =
                          parseFloat(TaxableAmount) +
                          parseFloat(TotalTaxAmount);

                        let newGrandTotal = Math.round(newInvTotal);
                        let newRoundOff = newGrandTotal - newInvTotal;

                        setInvRegisterData({
                          ...invRegisterData,
                          TaxAmount: parseFloat(TotalTaxAmount).toFixed(2),
                          InvTotal: newInvTotal.toFixed(2),
                          GrandTotal: newGrandTotal.toFixed(2),
                          Round_Off: newRoundOff.toFixed(2),
                        });
                      } else {
                        // console.log("normal");

                        for (let i = 0; i < newTaxOn.length; i++) {
                          const element = newTaxOn[i];
                          if (parseInt(element) === 1) {
                            // console.log("self", TaxDropDownData[e.target.value]);
                            applicableTaxes.push(
                              TaxDropDownData[e.target.value]
                            );
                          } else {
                            // console.log(
                            //   "row no",

                            //   TaxDropDownData.filter(
                            //     (obj) => obj.TaxID === parseInt(element)
                            //   )

                            // );
                            // filter gets the data in array, there may be more then 1 rows, so mappppp....
                            TaxDropDownData.filter(
                              (obj) => obj.TaxID === parseInt(element)
                            ).map((value, key) => applicableTaxes.push(value));
                          }
                        }

                        // console.log("applicableTaxes", applicableTaxes);

                        let TaxableAmount = (
                          parseFloat(invRegisterData?.Net_Total) -
                          parseFloat(invRegisterData?.Discount) +
                          parseFloat(invRegisterData?.Del_Chg)
                        ).toFixed(2);
                        let TotalTaxAmount = 0;
                        for (let i = 0; i < applicableTaxes.length; i++) {
                          const element = applicableTaxes[i];

                          let TaxAmtForRow = (
                            (TaxableAmount * parseFloat(element.Tax_Percent)) /
                            100
                          ).toFixed(2);
                          TotalTaxAmount =
                            parseFloat(TotalTaxAmount) +
                            parseFloat(TaxAmtForRow);
                          if (arr.length > 0) {
                            arr = [
                              ...arr,
                              {
                                TaxID: element.TaxID,
                                TaxOn: element.TaxOn,
                                TaxPercent: element.Tax_Percent,
                                Tax_Name: element.TaxName,
                                TaxableAmount: TaxableAmount,
                                TaxAmt: TaxAmtForRow,
                              },
                            ];
                          } else {
                            arr = [
                              {
                                TaxID: element.TaxID,
                                TaxOn: element.TaxOn,
                                TaxPercent: element.Tax_Percent,
                                Tax_Name: element.TaxName,
                                TaxableAmount: TaxableAmount,
                                TaxAmt: TaxAmtForRow,
                              },
                            ];
                          }
                        }

                        // console.log("arr", arr);
                        setInvTaxData(arr);
                        let newInvTotal =
                          parseFloat(TaxableAmount) +
                          parseFloat(TotalTaxAmount);

                        let newGrandTotal = Math.round(newInvTotal);
                        let newRoundOff = newGrandTotal - newInvTotal;

                        setInvRegisterData({
                          ...invRegisterData,
                          TaxAmount: parseFloat(TotalTaxAmount).toFixed(2),
                          InvTotal: newInvTotal.toFixed(2),
                          GrandTotal: newGrandTotal.toFixed(2),
                          Round_Off: newRoundOff.toFixed(2),
                        });
                      }

                      //   const newTaxArray = TaxDropDownData.filter(
                      //     (obj) =>
                      //       parseFloat(obj.Tax_Percent).toFixed(2) ===
                      //       parseFloat(e.target.value).toFixed(2)
                      //   );
                      //   let arr = [];
                      //   let taxAmountVal = 0;
                      //   let TaxableAmount = (
                      //     parseFloat(invRegisterData?.Net_Total) -
                      //     parseFloat(invRegisterData?.Discount) +
                      //     parseFloat(invRegisterData?.Del_Chg)
                      //   ).toFixed(2);
                      //   for (let i = 0; i < newTaxArray.length; i++) {
                      //     const element = newTaxArray[i];

                      //     let TaxAmt = (
                      //       (TaxableAmount * parseFloat(element.Tax_Percent)) /
                      //       100
                      //     ).toFixed(2);
                      //     if (arr.length > 0) {
                      //       arr = [
                      //         ...arr,
                      //         {
                      //           TaxID: element.TaxID,
                      //           TaxOn: element.TaxOn,
                      //           TaxPercent: element.Tax_Percent,
                      //           Tax_Name: element.TaxName,
                      //           TaxableAmount: TaxableAmount,
                      //           TaxAmt: TaxAmt,
                      //         },
                      //       ];
                      //       taxAmountVal =
                      //         parseFloat(taxAmountVal) + parseFloat(TaxAmt);
                      //     } else {
                      //       arr = [
                      //         {
                      //           TaxID: element.TaxID,
                      //           TaxOn: element.TaxOn,
                      //           TaxPercent: element.Tax_Percent,
                      //           Tax_Name: element.TaxName,
                      //           TaxableAmount: TaxableAmount,
                      //           TaxAmt: TaxAmt,
                      //         },
                      //       ];
                      //       taxAmountVal =
                      //         parseFloat(taxAmountVal) + parseFloat(TaxAmt);
                      //     }
                      //   }

                      //   setInvTaxData(arr);
                      //   let newInvTotal =
                      //     parseFloat(TaxableAmount) + parseFloat(taxAmountVal);

                      //   let newGrandTotal = Math.round(newInvTotal);
                      //   let newRoundOff = newGrandTotal - newInvTotal;

                      //   setInvRegisterData({
                      //     ...invRegisterData,
                      //     TaxAmount: parseFloat(taxAmountVal).toFixed(2),
                      //     InvTotal: newInvTotal.toFixed(2),
                      //     GrandTotal: newGrandTotal.toFixed(2),
                      //     Round_Off: newRoundOff.toFixed(2),
                      //   });
                    }}
                    disabled={
                      invRegisterData.Inv_No ||
                      invRegisterData.DCStatus === "Cancelled"
                    }
                    className={
                      invRegisterData.Inv_No ||
                      invRegisterData.DCStatus === "Cancelled"
                        ? "ip-select mt-1 input-disabled"
                        : "ip-select mt-1"
                    }
                  >
                    <option value="none" selected disabled hidden>
                      Select an Option
                    </option>
                    {TaxDropDownData?.map((taxVal, key) => (
                      <option value={key}>{taxVal.TaxName}</option>
                    ))}
                  </select>
                </div>
                <div className="p-1"></div>
                <button
                  onClick={deleteTaxFunc}
                  disabled={
                    invRegisterData.Inv_No ||
                    invRegisterData.DCStatus === "Cancelled"
                  }
                  className={
                    invRegisterData.Inv_No ||
                    invRegisterData.DCStatus === "Cancelled"
                      ? "button-style button-disabled m-0"
                      : "button-style m-0"
                  }
                >
                  Delete Taxes
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="m-3 border-top"></div>
        {/* table starts here */}
        <div className="row">
          {/* product table */}
          <div
            className="col-md-6"
            style={{ maxHeight: "50vh", overflow: "auto" }}
          >
            <ProductTable
              invDetailsData={invDetailsData}
              // invoiceDetailsTableData={invoiceDetailsTableData}
              loadRateEvent={loadRateEvent}
            />
          </div>
          {/* tax table */}
          <div className="col-md-6">
            <TaxTable
              invTaxData={invTaxData}
              // invoiceDetailsTableData={invoiceDetailsTableData}
              // netAmount={netAmount}
              // selectedTax={selectedTax}
              // TaxDropDownData={TaxDropDownData}
              // taxDataFromDB={taxDataFromDB}
            />
          </div>
        </div>
        <div className="p-3"></div>
      </div>
      <div>
        <SetRateModal
          showSetRateModal={showSetRateModal}
          setShowSetRateModal={setShowSetRateModal}
          DCInvNo={DCInvNo}
          // INVData={INVData}
          // INVData={[]}
          invDetailsData={invDetailsData}
          setRateConsumerData={setRateConsumerData}
          setInvRegisterData={setInvRegisterData}
          invRegisterData={invRegisterData}
          setInvTaxData={setInvTaxData}
          deleteTaxFunc={deleteTaxFunc}
          onSave={onSave}
        />
        <ConfirmationModal
          confirmModalOpen={confirmModalOpen}
          setConfirmModalOpen={setConfirmModalOpen}
          // yesClickedFunc={cancelPN}
          yesClickedFunc={
            buttonClicked === "Cancel PN"
              ? cancelPN
              : buttonClicked === "Create Invoice"
              ? handleCreateInvoice
              : ""
          }
          message={
            buttonClicked === "Cancel PN"
              ? "Are you sure to cancel the PN ?"
              : buttonClicked === "Create Invoice"
              ? "Are you sure to create invoice ?"
              : ""
          }
        />
      </div>
    </>
  );
}

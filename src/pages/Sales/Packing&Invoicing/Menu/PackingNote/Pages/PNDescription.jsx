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

export default function Profile() {
  const location = useLocation();

  const todayDate = new Date();

  let year = todayDate.getFullYear();
  let month = todayDate.getMonth() + 1;
  let datee = todayDate.getDate();
  let hour = todayDate.getHours();
  let mins = todayDate.getMinutes();

  let formatedTodayDate = `${year}-${month < 10 ? "0" + month : month}-${
    datee < 10 ? "0" + datee : datee
  }T${hour < 10 ? "0" + hour : hour}:${mins < 10 ? "0" + mins : mins}`;

  const [DCInvNo, setDCInvNo] = useState(location.state);
  const [invRegisterData, setInvRegisterData] = useState({});
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

  const [runningNoData, setRunningNoData] = useState({});
  const [formData, setFormData] = useState({
    unitName: "Jigani",
  });

  const rowLimit = 20;

  const fetchData = () => {
    Axios.post(apipoints.aboutInvoicePN, {
      DCInvNo: DCInvNo,
    }).then((res) => {
      res.data.registerData[0].TptMode =
        res.data.registerData[0].TptMode || "By Hand";

      res.data.registerData[0].DespatchDate =
        res.data.registerData[0].DespatchDate || formatedTodayDate;
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

  const printPN = () => {
    setPrintCopyModal(true);
  };

  const printAnnexure = () => {
    setPrintAnneureModal(true);
  };

  const printInvoice = () => {
    setPrintInvoiceModal(true);
  };

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

  const inputHandler = (e) => {
    if (e.target.name === "TptMode") {
      setInvRegisterData({
        ...invRegisterData,
        [e.target.name]: e.target.value,
        VehNo: "",
      });
    } else {
      setInvRegisterData({
        ...invRegisterData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleChangeDiscountDelivery = (e) => {
    setInvTaxData([]);
    document.getElementById("taxDropdown").value = "none";
    let newInvTotal;
    let newGrandTotal;
    let newRoundOff;
    if (e.target.name === "Discount") {
      newInvTotal =
        parseFloat(invRegisterData?.Net_Total) -
        parseFloat(e.target.value || 0) +
        parseFloat(invRegisterData?.Del_Chg);
      newGrandTotal = Math.round(newInvTotal);
      newRoundOff = newGrandTotal - newInvTotal;

      setInvRegisterData({
        ...invRegisterData,
        Discount: e.target.value || 0,
        TaxAmount: 0.0,
        InvTotal: newInvTotal.toFixed(2),
        GrandTotal: newGrandTotal.toFixed(2),
        Round_Off: newRoundOff.toFixed(2),
      });
    } else if (e.target.name === "Del_Chg") {
      newInvTotal =
        parseFloat(invRegisterData?.Net_Total) -
        parseFloat(invRegisterData?.Discount) +
        parseFloat(e.target.value || 0);
      newGrandTotal = Math.round(newInvTotal);
      newRoundOff = newGrandTotal - newInvTotal;

      setInvRegisterData({
        ...invRegisterData,
        Del_Chg: e.target.value || 0,
        TaxAmount: 0.0,
        InvTotal: newInvTotal.toFixed(2),
        GrandTotal: newGrandTotal.toFixed(2),
        Round_Off: newRoundOff.toFixed(2),
      });
    }
  };

  const cancelPN = () => {
    Axios.post(apipoints.cancelPN, {
      invRegisterData: invRegisterData,
    }).then((res) => {
      if (res.data.flag === 1) {
        fetchData();
        toast.success(res.data.message);
        // setInvRegisterData({ ...invRegisterData, DCStatus: "Cancelled" });
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
    Axios.post(apipoints.createInvoice, {
      invRegisterData: invRegisterData,
      runningNoData: runningNoData,
    }).then((res) => {
      setInvRegisterData(res.data.registerData[0]);
      if (res.data.flag === 1) {
        toast.success(res.data.message);
        if (invDetailsData.length > rowLimit) {
          printAnnexure();
        } else {
          printInvoice();
        }
      } else if (res.data.flag === 0) {
        toast.error(res.data.message);
      } else {
        toast.warning("Uncaught error in frontend");
      }
    });
  };

  return (
    <>
      <div className="">
        <h4 className="title">Packing Note Invoice Form</h4>
      </div>
      <div className="p-1"></div>
      <div className="border rounded">
        <FormHeader
          invRegisterData={invRegisterData}
          setInvRegisterData={setInvRegisterData}
          inputHandler={inputHandler}
        />

        <Tabs className="tab_font nav-tabs mt-3 p-2">
          <Tab eventKey="consigneeInfo" title="Consignee Info">
            <ConsigneeInfo
              invRegisterData={invRegisterData}
              setInvRegisterData={setInvRegisterData}
              inputHandler={inputHandler}
              setAllStates={setAllStates}
              allStates={allStates}
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
              formatedTodayDate={formatedTodayDate}
              inputHandler={inputHandler} //func
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
              setRunningNoData={setRunningNoData}
              runningNoData={runningNoData}
              todayDate={todayDate}
              formData={formData}
            />
          </Tab>
        </Tabs>
        <div className="m-3 border-top mb-2"></div>
        {/* button start here */}

        <div className="row">
          <div className="col-md-6" style={{ gap: "10px" }}>
            <button
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
                  ? "button-style button-disabled"
                  : "button-style"
              }
            >
              Load Rates
            </button>

            <button
              onClick={() => setShowSetRateModal(true)}
              disabled={
                invRegisterData.Inv_No ||
                invRegisterData.DCStatus === "Cancelled"
              }
              className={
                invRegisterData.Inv_No ||
                invRegisterData.DCStatus === "Cancelled"
                  ? "button-style button-disabled"
                  : "button-style"
              }
            >
              Set Rates
            </button>

            <button
              disabled={
                invRegisterData.Inv_No ||
                invRegisterData.DCStatus === "Cancelled"
              }
              className={
                invRegisterData.Inv_No ||
                invRegisterData.DCStatus === "Cancelled"
                  ? "button-style button-disabled"
                  : "button-style"
              }
              onClick={(e) => {
                setButtonClicked("Cancel PN");
                setConfirmModalOpen(true);
              }}
            >
              Cancel PN
            </button>

            <Link to="/PackingAndInvoices">
              <button className="button-style">Close</button>
            </Link>
          </div>
          <div className="d-flex col-md-6" style={{ gap: "10px" }}>
            <div className="d-flex mt-2" style={{ gap: "10px" }}>
              <label className="form-label" style={{ whiteSpace: "nowrap" }}>
                Assessable Value
              </label>
              <input
                type="number"
                min="0"
                value={(
                  parseFloat(invRegisterData?.Net_Total) -
                  parseFloat(invRegisterData?.Discount) +
                  parseFloat(invRegisterData?.Del_Chg)
                ).toFixed(2)}
                disabled
                className="in-field"
              />
            </div>

            <div className="d-flex mt-1" style={{ gap: "10px" }}>
              <label className="form-label" style={{ whiteSpace: "nowrap" }}>
                Select Tax
              </label>
              <select
                id="taxDropdown"
                onChange={(e) => {
                  const newTaxOn = TaxDropDownData[
                    e.target.value
                  ].TaxOn.replace("(", "")
                    .replace(")", "")
                    .split("+");
                  let applicableTaxes = [];
                  let arr = [];
                  if (
                    TaxDropDownData[e.target.value].UnderGroup.toUpperCase() ===
                      "INCOMETAX" ||
                    TaxDropDownData[e.target.value].UnderGroup.toUpperCase() ===
                      "INCOME TAX"
                  ) {
                    for (let i = 1; i < newTaxOn.length; i++) {
                      const element = newTaxOn[i];
                      TaxDropDownData.filter(
                        (obj) => obj.TaxID === parseInt(element)
                      ).map((value, key) => applicableTaxes.push(value));
                    }
                    applicableTaxes.push(TaxDropDownData[e.target.value]);
                    let TaxableAmount = (
                      parseFloat(invRegisterData?.Net_Total) -
                      parseFloat(invRegisterData?.Discount) +
                      parseFloat(invRegisterData?.Del_Chg)
                    ).toFixed(2);
                    let TotalTaxAmount = 0;

                    for (let i = 0; i < applicableTaxes.length; i++) {
                      const element = applicableTaxes[i];
                      if (
                        element.UnderGroup.toUpperCase() === "INCOMETAX" ||
                        element.UnderGroup.toUpperCase() === "INCOME TAX"
                      ) {
                        let TaxableAmntForTCS =
                          parseFloat(TaxableAmount) +
                          parseFloat(TotalTaxAmount);
                        let TaxAmtForRow = (
                          (TaxableAmntForTCS *
                            parseFloat(element.Tax_Percent)) /
                          100
                        ).toFixed(2);
                        TotalTaxAmount =
                          parseFloat(TotalTaxAmount) + parseFloat(TaxAmtForRow);

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
                          (TaxableAmount * parseFloat(element.Tax_Percent)) /
                          100
                        ).toFixed(2);
                        TotalTaxAmount =
                          parseFloat(TotalTaxAmount) + parseFloat(TaxAmtForRow);

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
                      parseFloat(TaxableAmount) + parseFloat(TotalTaxAmount);

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
                        applicableTaxes.push(TaxDropDownData[e.target.value]);
                      } else {
                        // filter gets the data in array, there may be more then 1 rows, so mappppp....
                        TaxDropDownData.filter(
                          (obj) => obj.TaxID === parseInt(element)
                        ).map((value, key) => applicableTaxes.push(value));
                      }
                    }

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
                        parseFloat(TotalTaxAmount) + parseFloat(TaxAmtForRow);
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
                    setInvTaxData(arr);
                    let newInvTotal =
                      parseFloat(TaxableAmount) + parseFloat(TotalTaxAmount);

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
                }}
                disabled={
                  invRegisterData.Inv_No ||
                  invRegisterData.DCStatus === "Cancelled"
                }
                className={
                  invRegisterData.Inv_No ||
                  invRegisterData.DCStatus === "Cancelled"
                    ? "ip-select input-disabled"
                    : "ip-select in-field mt-1"
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

            <button
              onClick={deleteTaxFunc}
              disabled={
                invRegisterData.Inv_No ||
                invRegisterData.DCStatus === "Cancelled"
              }
              className={
                invRegisterData.Inv_No ||
                invRegisterData.DCStatus === "Cancelled"
                  ? "button-style button-disabled"
                  : "button-style"
              }
            >
              Delete Taxes
            </button>
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
              loadRateEvent={loadRateEvent}
              invRegisterData={invRegisterData}
            />
          </div>
          {/* tax table */}
          <div className="col-md-6">
            <TaxTable invTaxData={invTaxData} />
          </div>
        </div>
        <div className="p-3"></div>
      </div>
      <div>
        <SetRateModal
          showSetRateModal={showSetRateModal}
          setShowSetRateModal={setShowSetRateModal}
          DCInvNo={DCInvNo}
          invDetailsData={invDetailsData}
          setRateConsumerData={setRateConsumerData}
          setInvRegisterData={setInvRegisterData}
          invRegisterData={invRegisterData}
          setInvTaxData={setInvTaxData}
          deleteTaxFunc={deleteTaxFunc}
          fetchData={fetchData}
        />
        <ConfirmationModal
          confirmModalOpen={confirmModalOpen}
          setConfirmModalOpen={setConfirmModalOpen}
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

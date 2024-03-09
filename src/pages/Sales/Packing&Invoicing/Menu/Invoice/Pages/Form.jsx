import React, { useRef, useState, useEffect } from "react";
import Axios from "axios";
import FormHeader from "./Elements/FormHeader";
import ConsigneeInfo from "./Elements/Tabs/ConsigneeInfo";
import InvoicingInfo from "./Elements/Tabs/InvoicingInfo";
import ProductTable from "./Elements/Tables/ProductTable";
import TaxTable from "./Elements/Tables/TaxTable";
import { Tabs, Tab } from "react-bootstrap";
import { apipoints } from "../../../../../api/PackInv_API/Invoice/Invoice";
import { toast } from "react-toastify";
import AddGoods from "./Modals/AddGoods";
import ConfirmationModal from "./Modals/ConfirmationModals/ConfirmationModal";
import ImportFromIV from "./Modals/ImportFromIV";
import ModalPackingNote from "../../../PDFs/PackingNote/ModalPackingNote";
import ModalAnnexure from "../../../PDFs/Annexure/ModalAnnexure";
import ModalInvoice from "../../../PDFs/Invoice/ModalInvoice";

import { Link, useLocation } from "react-router-dom";

export default function Form(props) {
  const todayDate = new Date();

  let year = todayDate.getFullYear();
  let month = todayDate.getMonth() + 1;
  let datee = todayDate.getDate();

  let formatedTodayDate = `${year}-${month < 10 ? "0" + month : month}-${
    datee < 10 ? "0" + datee : datee
  }`;

  const [TaxDropDownData, setTaxDropDownData] = useState([]);

  const [invRegisterData, setInvRegisterData] = useState({
    Iv_Id: "",
    DC_InvType: props?.DC_InvType || "",
    InvoiceFor: props?.InvoiceFor || "",
    DC_No: "",
    DC_Date: "",
    DC_Fin_Year: "",
    Inv_No: "",
    Inv_Date: "",
    Inv_Fin_Year: "",
    PymtAmtRecd: 0.0,
    PaymentMode: "",
    PaymentReceiptDetails: "",
    Cust_Code: "",
    Cust_Name: "",
    Cust_Address: "",
    Cust_Place: "",
    Cust_State: "",
    Cust_StateId: "",
    PIN_Code: "",
    Del_Address: "",
    GSTNo: "",
    PO_No: "",
    PO_Date: "",
    Net_Total: 0.0,
    TptCharges: 0.0,
    Discount: 0.0,
    AssessableValue: 0.0,
    TaxAmount: 0.0,
    Del_Chg: 0.0,
    InvTotal: 0.0,
    Round_Off: 0.0,
    GrandTotal: 0.0,
    Total_Wt: 0.0,
    DCStatus: "Created",
    DespatchDate: formatedTodayDate,
    TptMode: "",
    VehNo: "",
    Remarks: "",
    PO_Value: 0.0,
    PAN_No: "",
    Del_ContactName: "",
    Del_ContactNo: "",
    // BillType: "Cash",
    // PaymentTerms: "Cash on Delivery",
  });

  const [invDetailsData, setInvDetailsData] = useState([
    {
      SL_No: "",
      Dwg_No: "",
      Material: "",
      Excise_CL_no: "",
      Qty: "0",
      Unit_Wt: "0.00",
      DC_Srl_Wt: "0.00",
      Unit_Rate: "0.00",
      DC_Srl_Amt: "0.00",
      PkngLevel: "Pkng1",
      InspLevel: "Insp1",
    },
  ]);

  const [invTaxData, setInvTaxData] = useState([]);
  const [AllCust, setAllCust] = useState([]);

  const [allStates, setAllStates] = useState([]);

  const [addGoodsModal, setAddGoodsModal] = useState(false);

  const [printCopyModal, setPrintCopyModal] = useState(false);

  const [printAnneureModal, setPrintAnneureModal] = useState(false);
  const [printInvoiceModal, setPrintInvoiceModal] = useState(false);

  const [selectIV, setSelectIV] = useState(false);

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const [buttonClicked, setButtonClicked] = useState("");

  const [formData, setFormData] = useState({
    unitName: "Jigani",
  });

  const rowLimit = 20;

  useEffect(() => {
    // // get all cust
    Axios.post(apipoints.getAllCust, {}).then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].label = res.data[i].Cust_name;
        res.data[i].varID = i;
      }
      setAllCust(res.data);
    });

    // get all states
    Axios.get(apipoints.getAllStates, {}).then((res) => {
      setAllStates(res.data);
    });
    // inv details
    Axios.post(apipoints.invoiceDetails, {
      DCInvNo: props?.DCInvNo,
    }).then((res) => {
      const arr = res.data.registerData[0].Cust_State?.toLowerCase().split(" ");

      for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
      }

      let newState = arr.join(" ");

      res.data.registerData[0].Cust_State = newState;

      setInvRegisterData(res.data.registerData[0]);
      setInvDetailsData(res.data.detailsData);
      setInvTaxData(res.data.taxData);
    });

    // get tax dropdown data
    Axios.post(apipoints.getTaxDataInvoice, {}).then((res) => {
      setTaxDropDownData(res.data);
    });
  }, []);

  const deleteTaxes = () => {
    setInvTaxData([]);
    document.getElementById("taxDropdown").value = "none";

    setInvRegisterData({
      ...invRegisterData,
      TaxAmount: "0.00",
      InvTotal:
        parseFloat(invRegisterData?.Net_Total) -
        parseFloat(invRegisterData?.Discount) +
        parseFloat(invRegisterData?.Del_Chg),
      GrandTotal: Math.round(
        parseFloat(invRegisterData?.Net_Total) -
          parseFloat(invRegisterData?.Discount) +
          parseFloat(invRegisterData?.Del_Chg)
      ),
      Round_Off:
        Math.round(
          parseFloat(invRegisterData?.Net_Total) -
            parseFloat(invRegisterData?.Discount) +
            parseFloat(invRegisterData?.Del_Chg)
        ) -
        (parseFloat(invRegisterData?.Net_Total) -
          parseFloat(invRegisterData?.Discount) +
          parseFloat(invRegisterData?.Del_Chg)),
    });
  };

  const inputHandler = (e) => {
    setInvRegisterData({
      ...invRegisterData,
      [e.target.name]: e.target.value,
    });
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
        AssessableValue:
          parseFloat(invRegisterData.Net_Total) -
          parseFloat(e.target.value.length > 0 ? e.target.value : 0) +
          parseFloat(invRegisterData.Del_Chg),
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
        AssessableValue:
          parseFloat(invRegisterData.Net_Total) -
          parseFloat(invRegisterData.Discount) +
          parseFloat(e.target.value.length > 0 ? e.target.value : 0),
      });
    }
  };

  const printPackingNoteCopy = () => {
    setPrintCopyModal(true);
  };

  const printAnnexure = () => {
    setPrintAnneureModal(true);
  };

  const printInvoice = () => {
    setPrintInvoiceModal(true);
  };

  const cancelPN = () => {
    Axios.post(apipoints.cancelPN, {
      invRegisterData: invRegisterData,
    }).then((res) => {
      if (res.data.flag === 1) {
        toast.success(res.data.message);
        setInvRegisterData({
          ...invRegisterData,
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
      invRegisterData: invRegisterData,
      invDetailsData: invDetailsData,
      invTaxData: invTaxData,
    }).then((res) => {
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
      invRegisterData: invRegisterData,
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
        toast.error("Frontend Error");
      }
    });
  };

  const importFromIV = () => {
    setSelectIV(true);
  };

  const createPNValidationFunc = () => {
    if (
      (invRegisterData.Iv_Id && invDetailsData.length === 0) ||
      (!invRegisterData.Iv_Id && invDetailsData.length <= 1)
    ) {
      toast.warning("There are no Srls for creating the Packing Note");
      setInvDetailsData([
        {
          SL_No: "",
          Dwg_No: "",
          Material: "",
          Excise_CL_no: "",
          Qty: "0",
          Unit_Wt: "0.00",
          DC_Srl_Wt: "0.00",
          Unit_Rate: "0.00",
          DC_Srl_Amt: "0.00",
          PkngLevel: "Pkng1",
          InspLevel: "Insp1",
        },
      ]);
      setInvRegisterData({ ...invRegisterData, Iv_Id: "" });
      return { result: false, data: [{}] };
    } else {
      const detailsDataToPost = invDetailsData.filter(
        (obj) =>
          !(
            obj.Dwg_No === "" ||
            obj.Dwg_No === null ||
            obj.Dwg_No === "null" ||
            obj.Dwg_No === "NaN" ||
            obj.Dwg_No === undefined ||
            obj.Material === "" ||
            obj.Material === null ||
            obj.Material === "null" ||
            obj.Material === "NaN" ||
            obj.Material === undefined ||
            parseInt(obj.Qty) === 0 ||
            obj.Qty === "" ||
            obj.Qty === null ||
            obj.Qty === "null" ||
            obj.Qty === "NaN" ||
            obj.Qty === undefined
          )
      );

      setInvDetailsData(detailsDataToPost);
      if (
        (invRegisterData.Iv_Id && detailsDataToPost.length === 0) ||
        (!invRegisterData.Iv_Id &&
          detailsDataToPost.length < invDetailsData.length - 1)
      ) {
        toast.warning("Deleting Srl without basic information");

        if (detailsDataToPost.length === 0) {
          setTimeout(() => {
            toast.warning("There are no Srls for creating the Packing Note");
          }, 150);
          setInvDetailsData([
            {
              SL_No: "",
              Dwg_No: "",
              Material: "",
              Excise_CL_no: "",
              Qty: "0",
              Unit_Wt: "0.00",
              DC_Srl_Wt: "0.00",
              Unit_Rate: "0.00",
              DC_Srl_Amt: "0.00",
              PkngLevel: "Pkng1",
              InspLevel: "Insp1",
            },
          ]);
          setInvRegisterData({ ...invRegisterData, Iv_Id: "" });

          document.getElementById("materialDropdown").value = "";
          return { result: false, data: [{}] };
        } else {
          return { result: true, data: detailsDataToPost };
        }
      } else {
        return { result: true, data: detailsDataToPost };
      }
    }
  };

  const getDCNo = async () => {
    const srlType = "PkngNoteNo";
    const ResetPeriod = "FinanceYear";
    const ResetValue = 0;
    const VoucherNoLength = 5;
    const prefix = "";
    try {
      const response = await Axios.post(apipoints.insertRunNoRow, {
        unit: formData.unitName,
        srlType: srlType,
        ResetPeriod: ResetPeriod,
        ResetValue: ResetValue,
        VoucherNoLength: VoucherNoLength,
        prefix: prefix,
      });

      console.log("getDCNo Response", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const createPNFunc = () => {
    getDCNo();
    setButtonClicked("Create PN");
    setConfirmModalOpen(true);
  };
  const createPN = () => {
    const srlType = "PkngNoteNo";
    const prefix = "";
    const VoucherNoLength = 5;
    const resp = createPNValidationFunc();

    if (resp.result) {
      Axios.post(apipoints.createPN, {
        invRegisterData: invRegisterData,
        invDetailsData: resp.data,
        invTaxData: invTaxData,
        srlType: srlType,
        prefix: prefix,
        unit: formData.unitName,
        VoucherNoLength: VoucherNoLength,
      }).then((res) => {
        if (res.data.flag === 1) {
          toast.success(res.data.message);
          setInvRegisterData(res.data.invRegisterData[0]);
          printPackingNoteCopy();
        } else if (res.data.flag === 0) {
          toast.error(res.data.message);
        } else {
          toast.warning("Uncaught error in frontend");
        }
      });
    } else {
      // toast.warning("unexpected error found");
    }
  };

  return (
    <>
      <div>
        <h4 className="title">{props?.heading || "Create New"}</h4>
        <FormHeader invRegisterData={invRegisterData} />

        <Tabs className="mt-3 p-2">
          <Tab eventKey="consigneeInfo" title="Consignee Info">
            <ConsigneeInfo
              invRegisterData={invRegisterData}
              setInvRegisterData={setInvRegisterData}
              inputHandler={inputHandler}
              setAllStates={setAllStates}
              allStates={allStates}
              AllCust={AllCust}
              setAllCust={setAllCust}
            />
          </Tab>
          <Tab eventKey="Invoicing Info" title="Invoicing Info">
            <InvoicingInfo
              invRegisterData={invRegisterData}
              setInvRegisterData={setInvRegisterData}
              inputHandler={inputHandler} //func
              handleChangeDiscountDelivery={handleChangeDiscountDelivery} // func
              createInvoice={createInvoice} // func
              printAnnexure={printAnnexure} //func
              printInvoice={printInvoice} //func
              rowLimit={rowLimit}
              formatedTodayDate={formatedTodayDate}
              invDetailsData={invDetailsData}
              invTaxData={invTaxData}
              printAnneureModal={printAnneureModal}
              setPrintAnneureModal={setPrintAnneureModal}
              buttonClicked={buttonClicked}
              setButtonClicked={setButtonClicked}
              setConfirmModalOpen={setConfirmModalOpen}
              TaxDropDownData={TaxDropDownData}
            />
          </Tab>
        </Tabs>

        <div className="m-3 border-top"></div>
        <div className="row">
          <div className="col-md-6">
            <div className="d-flex justify-content-space">
              <button
                disabled={
                  invRegisterData.DC_No.length > 0 ||
                  invRegisterData.Cust_Code?.length === 0 ||
                  invRegisterData.Cust_Name?.length === 0 ||
                  (invRegisterData.Iv_Id
                    ? invDetailsData.length === 0
                    : invDetailsData.length <= 1)
                }
                className={
                  invRegisterData.DC_No.length > 0 ||
                  invRegisterData.Cust_Code?.length === 0 ||
                  invRegisterData.Cust_Name?.length === 0 ||
                  (invRegisterData.Iv_Id
                    ? invDetailsData.length === 0
                    : invDetailsData.length <= 1)
                    ? "button-style button-disabled m-0"
                    : "button-style m-0"
                }
                onClick={(e) => {
                  if (invRegisterData.PO_No.length === 0) {
                    toast.warning("Enter the PO No");
                  } else {
                    createPNFunc();
                  }
                }}
              >
                Create PN
              </button>
              <div className="p-1"></div>
              <button
                disabled={!invRegisterData.DC_No.length > 0}
                className={
                  !invRegisterData.DC_No.length > 0
                    ? "button-style button-disabled m-0"
                    : "button-style m-0"
                }
                onClick={printPackingNoteCopy}
              >
                Print PN
              </button>
              <div className="p-1"></div>
              <button
                disabled={
                  !(invRegisterData.DC_No.length > 0) ||
                  invRegisterData.Inv_No?.length > 0 ||
                  invRegisterData.DCStatus === "Cancelled"
                }
                className={
                  !(invRegisterData.DC_No.length > 0) ||
                  invRegisterData.Inv_No?.length > 0 ||
                  invRegisterData.DCStatus === "Cancelled"
                    ? "button-style button-disabled m-0"
                    : "button-style m-0"
                }
                onClick={savePN}
              >
                Save
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
                <button
                  disabled={
                    !(invRegisterData.DC_No.length > 0) ||
                    invRegisterData.Inv_No?.length > 0 ||
                    invRegisterData.DCStatus === "Cancelled"
                  }
                  className={
                    !(invRegisterData.DC_No.length > 0) ||
                    invRegisterData.Inv_No?.length > 0 ||
                    invRegisterData.DCStatus === "Cancelled"
                      ? "button-style button-disabled m-0"
                      : "button-style m-0"
                  }
                  onClick={(e) => {
                    setButtonClicked("Cancel PN");
                    setConfirmModalOpen(true);
                  }}
                >
                  Cancel PN
                </button>

                <div className="p-1"></div>
                {props.InvoiceFor === "Misc" ? (
                  <></>
                ) : (
                  <>
                    <button
                      onClick={importFromIV}
                      disabled={
                        invDetailsData?.length > 1 ||
                        invRegisterData.Iv_Id ||
                        invRegisterData.DC_No.length > 0
                      }
                      className={
                        invDetailsData?.length > 1 ||
                        invRegisterData.Iv_Id ||
                        invRegisterData.DC_No.length > 0
                          ? "button-style button-disabled m-0"
                          : "button-style m-0"
                      }
                    >
                      Import from IV
                    </button>
                    <div className="p-1"></div>
                  </>
                )}
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
                invDetailsData={invDetailsData}
                setInvDetailsData={setInvDetailsData}
                invRegisterData={invRegisterData}
                setInvRegisterData={setInvRegisterData}
                deleteTaxes={deleteTaxes}
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
                  value={parseFloat(invRegisterData?.AssessableValue).toFixed(
                    2
                  )}
                />
              </div>
              <span className="p-1"></span>
              <div className="col-md-3 p-0 ">
                <b>Tax</b>
                <select
                  id="taxDropdown"
                  style={{
                    fontSize: "inherit",
                  }}
                  onChange={(e) => {
                    const newTaxOn = TaxDropDownData[
                      e.target.value
                    ].TaxOn.replace("(", "")
                      .replace(")", "")
                      .split("+");

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

                      let TaxableAmount = parseFloat(
                        invRegisterData?.AssessableValue
                      ).toFixed(2);

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
                      // let taxAmountVal = 0;
                      let TaxableAmount = parseFloat(
                        invRegisterData?.AssessableValue
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
                    invRegisterData.Inv_No?.length > 0 ||
                    invRegisterData.DCStatus === "Cancelled"
                  }
                  className={
                    invRegisterData.Inv_No?.length > 0 ||
                    invRegisterData.DCStatus === "Cancelled"
                      ? "ip-select input-disabled"
                      : "ip-select"
                  }
                >
                  <option value="none" selected disabled hidden>
                    Select Tax
                  </option>
                  {TaxDropDownData?.map((taxVal, key) => (
                    <option value={key}>{taxVal.TaxName}</option>
                  ))}
                </select>
              </div>
              <span className="p-1"></span>
              <div className="col-md-3 p-0 d-flex justify-content-end">
                <button
                  onClick={deleteTaxes}
                  disabled={
                    invRegisterData.Inv_No?.length > 0 ||
                    invRegisterData.DCStatus === "Cancelled"
                  }
                  className={
                    invRegisterData.Inv_No?.length > 0 ||
                    invRegisterData.DCStatus === "Cancelled"
                      ? "button-style button-disabled"
                      : "button-style"
                  }
                >
                  Delete Taxes
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="m-3 border-top"></div>

        {/* tax table */}
        <div className="px-2">
          <TaxTable invTaxData={invTaxData} setInvTaxData={setInvTaxData} />
        </div>
        <div className="p-2"></div>
      </div>
      <div>
        <AddGoods
          setAddGoodsModal={setAddGoodsModal}
          addGoodsModal={addGoodsModal}
          // register
          invRegisterData={invRegisterData}
          setInvRegisterData={setInvRegisterData}
          // details
          invDetailsData={invDetailsData}
          setInvDetailsData={setInvDetailsData}
          // tax table
          setInvTaxData={setInvTaxData}
          invTaxData={invTaxData}
        />
        <ModalPackingNote
          setPrintCopyModal={setPrintCopyModal}
          printCopyModal={printCopyModal}
          // data...
          invRegisterData={invRegisterData}
          invDetailsData={invDetailsData}
          invTaxData={invTaxData}
        />
        <ModalAnnexure
          setPrintAnneureModal={setPrintAnneureModal}
          printAnneureModal={printAnneureModal}
          // data...
          invRegisterData={invRegisterData}
          invDetailsData={invDetailsData}
          invTaxData={invTaxData}
        />
        <ModalInvoice
          setPrintInvoiceModal={setPrintInvoiceModal}
          printInvoiceModal={printInvoiceModal}
          rowLimit={rowLimit}
          // data...
          invRegisterData={invRegisterData}
          invDetailsData={invDetailsData}
          invTaxData={invTaxData}
        />
        <ImportFromIV
          selectIV={selectIV}
          setSelectIV={setSelectIV}
          // register
          invRegisterData={invRegisterData}
          setInvRegisterData={setInvRegisterData}
          // details
          invDetailsData={invDetailsData}
          setInvDetailsData={setInvDetailsData}
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
          }
          yesClickedFunc={
            buttonClicked === "Create PN"
              ? createPN
              : buttonClicked === "Cancel PN"
              ? cancelPN
              : buttonClicked === "Create Invoice"
              ? createInvoice
              : ""
          }
        />
      </div>
    </>
  );
}

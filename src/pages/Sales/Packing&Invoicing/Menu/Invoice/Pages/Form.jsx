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
import ModalInvoiceAndAnnexure from "../../../PDFs/InvoiceAndAnnexure/ModalInvoiceAndAnnexure";
import { Link, useLocation } from "react-router-dom";

export default function Form(props) {
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
    DespatchDate: "",
    TptMode: "",
    VehNo: "",
    Remarks: "",
    PO_Value: 0.0,
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

  const [selectIV, setSelectIV] = useState(false);

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const [buttonClicked, setButtonClicked] = useState("");

  // const [detailsDataToPost, setDetailsDataToPost] = useState([])

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
      // setInvRegisterData(res.data.registerData[0]);

      // console.log(
      //   "res.data.registerData[0].Cust_State",
      //   res.data.registerData[0].Cust_State
      // );
      const arr = res.data.registerData[0].Cust_State?.toLowerCase().split(" ");

      for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
      }

      let newState = arr.join(" ");

      // console.log("newState", newState);
      // console.log("all", allStates);
      // console.log(
      //   "filter",
      //   allStates.filter((obj) => obj.State === newState)
      // );

      res.data.registerData[0].Cust_State = newState;
      // allStates.filter((obj) => obj.State === newState)?.length > 0
      //   ? newState
      //   : "Others";
      // console.log("ressss", res.data.registerData[0]);
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
    // if (e.target.name === "BillType") {
    //   setInvRegisterData({
    //     ...invRegisterData,
    //     BillType: e.target.value,
    //     PaymentTerms:
    //       e.target.value === "Cash" ? "Cash on Delivery" : "7 Days Credit",
    //   });
    // } else {
    setInvRegisterData({
      ...invRegisterData,
      [e.target.name]: e.target.value,
    });
    // }
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
    toast.success("PN Created");
    setPrintCopyModal(true);
  };

  const printPackingNoteAnnexure = () => {
    setPrintAnneureModal(true);
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
        printPackingNoteAnnexure();
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

  // useEffect(() => {
  //   // console.log("changeee");
  //   let newNetTotal = 0;
  //   let newTotalWeight = 0;
  //   for (let i = 0; i < invDetailsData.length; i++) {
  //     const element = invDetailsData[i];
  //     newTotalWeight =
  //       parseFloat(newTotalWeight) + parseFloat(element.DC_Srl_Wt);
  //     newNetTotal = parseFloat(newNetTotal) + parseFloat(element.DC_Srl_Amt);
  //   }

  // setInvRegisterData({
  //   ...invRegisterData,
  //   Total_Wt: parseFloat(newTotalWeight).toFixed(2),
  //   Net_Total: parseFloat(newNetTotal).toFixed(2),
  //   Discount: 0.0,
  //   Del_Chg: 0.0,
  //   TaxAmount: "0.00",
  //   InvTotal: parseFloat(newNetTotal).toFixed(2),
  //   GrandTotal: Math.round(parseFloat(newNetTotal)).toFixed(2),
  //   Round_Off: (
  //     Math.round(parseFloat(newNetTotal)) - parseFloat(newNetTotal)
  //   ).toFixed(2),
  //   AssessableValue: parseFloat(newNetTotal).toFixed(2),
  // });
  //   setInvTaxData([]);
  //   document.getElementById("taxDropdown").value = "none";

  //   // console.log("newnettotal", newNetTotal);
  // }, [invDetailsData]);

  const createPNValidationFunc = () => {
    if (invRegisterData.PO_No.length === 0) {
      toast.warning("Enter the PO No");
    } else {
      if (invDetailsData.length <= 1) {
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

        // const detailsDataToRemove = invDetailsData.filter(
        //   (obj) =>
        //     (
        //       obj.Dwg_No === "" ||
        //       obj.Dwg_No === null ||
        //       obj.Dwg_No === "null" ||
        //       obj.Dwg_No === "NaN" ||
        //       obj.Dwg_No === undefined ||
        //       obj.Material === "" ||
        //       obj.Material === null ||
        //       obj.Material === "null" ||
        //       obj.Material === "NaN" ||
        //       obj.Material === undefined ||
        //       parseInt(obj.Qty) === 0 ||
        //       obj.Qty === "" ||
        //       obj.Qty === null ||
        //       obj.Qty === "null" ||
        //       obj.Qty === "NaN" ||
        //       obj.Qty === undefined
        //     )
        // );

        setInvDetailsData(detailsDataToPost);
        if (detailsDataToPost.length < invDetailsData.length - 1) {
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
            document.getElementById("materialDropdown").value = "";
            return { result: false, data: [{}] };
          } else {
            // post
            return { result: true, data: detailsDataToPost };
            // setTimeout(() => {
            //   createPNFunc();
            // }, 600);
          }
        } else {
          // post
          return { result: true, data: detailsDataToPost };
          // createPNFunc();
        }

        // console.log("detailsDataToPost", detailsDataToPost);
        // setButtonClicked("Create PN");
        // setConfirmModalOpen(true);
      }
    }
  };

  const createPNFunc = () => {
    // console.log('details data', invDetailsData)
    setButtonClicked("Create PN");
    setConfirmModalOpen(true);
  };
  const createPN = () => {
    // console.log("detais", invDetailsData);

    const resp = createPNValidationFunc();
    // setTimeout(() => {

    // console.log("resqqq", resp);
    if (resp.result) {
      Axios.post(apipoints.createPN, {
        invRegisterData: invRegisterData,
        invDetailsData: resp.data,
        invTaxData: invTaxData,
      }).then((res) => {
        if (res.data.flag === 1) {
          // toast.success(res.data.message);
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
    // }, 300);
  };
  // console.log("invDetailsData", invDetailsData);
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
              // func
              handleChangeDiscountDelivery={handleChangeDiscountDelivery}
              createInvoice={createInvoice}
              // print
              // inv
              // and
              // annexure
              printPackingNoteAnnexure={printPackingNoteAnnexure} //func
              invDetailsData={invDetailsData}
              invTaxData={invTaxData}
              printAnneureModal={printAnneureModal}
              setPrintAnneureModal={setPrintAnneureModal}
              buttonClicked={buttonClicked}
              setButtonClicked={setButtonClicked}
              setConfirmModalOpen={setConfirmModalOpen}
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
                onClick={
                  // createPNValidationFunc
                  (e) => {
                    if (invRegisterData.PO_No.length === 0) {
                      toast.warning("Enter the PO No");
                    } else {
                      createPNFunc();
                    }
                  }
                }
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
                {/* <button
                  onClick={() => {
                    setAddGoodsModal(true);
                  }}
                  disabled={
                    invRegisterData.Iv_Id > 0 ||
                    invRegisterData.DC_No.length > 0
                  }
                  className={
                    invRegisterData.Iv_Id > 0 ||
                    invRegisterData.DC_No.length > 0
                      ? "button-style button-disabled m-0"
                      : "button-style m-0"
                  }
                >
                  Add Goods
                </button> */}
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
                    // console.log("eee", TaxDropDownData[e.target.value]);

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
                          // console.log("self", TaxDropDownData[e.target.value]);
                          applicableTaxes.push(TaxDropDownData[e.target.value]);
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

                      // console.log("arr", arr);
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

                    // const newTaxArray = TaxDropDownData.filter(
                    //   (obj) =>
                    //     parseFloat(obj.Tax_Percent).toFixed(2) ===
                    //     parseFloat(e.target.value).toFixed(2)
                    // );
                    // // let arr = [];
                    // let taxAmountVal = 0;
                    // let TaxableAmount = parseFloat(
                    //   invRegisterData?.AssessableValue
                    // ).toFixed(2);
                    // for (let i = 0; i < newTaxArray.length; i++) {
                    //   const element = newTaxArray[i];

                    //   let TaxAmt = (
                    //     (TaxableAmount * parseFloat(element.Tax_Percent)) /
                    //     100
                    //   ).toFixed(2);
                    //   if (arr.length > 0) {
                    //     arr = [
                    //       ...arr,
                    //       {
                    //         TaxID: element.TaxID,
                    //         TaxOn: element.TaxOn,
                    //         TaxPercent: element.Tax_Percent,
                    //         Tax_Name: element.TaxName,
                    //         TaxableAmount: TaxableAmount,
                    //         TaxAmt: TaxAmt,
                    //       },
                    //     ];
                    //     taxAmountVal =
                    //       parseFloat(taxAmountVal) + parseFloat(TaxAmt);
                    //   } else {
                    //     arr = [
                    //       {
                    //         TaxID: element.TaxID,
                    //         TaxOn: element.TaxOn,
                    //         TaxPercent: element.Tax_Percent,
                    //         Tax_Name: element.TaxName,
                    //         TaxableAmount: TaxableAmount,
                    //         TaxAmt: TaxAmt,
                    //       },
                    //     ];
                    //     taxAmountVal =
                    //       parseFloat(taxAmountVal) + parseFloat(TaxAmt);
                    //   }
                    // }

                    // setInvTaxData(arr);

                    // let newInvTotal =
                    //   parseFloat(TaxableAmount) + parseFloat(taxAmountVal);

                    // let newGrandTotal = Math.round(newInvTotal);
                    // let newRoundOff = newGrandTotal - newInvTotal;

                    // setInvRegisterData({
                    //   ...invRegisterData,
                    //   TaxAmount: parseFloat(taxAmountVal).toFixed(2),
                    //   InvTotal: newInvTotal.toFixed(2),
                    //   GrandTotal: newGrandTotal.toFixed(2),
                    //   Round_Off: newRoundOff.toFixed(2),
                    // });
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
        <ModalInvoiceAndAnnexure
          setPrintAnneureModal={setPrintAnneureModal}
          printAnneureModal={printAnneureModal}
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

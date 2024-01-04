import React, { useRef, useState, useEffect } from "react";
import CreateNewForm from "../CreateNewForm/CreateNewForm";
import Axios from "axios";
import { apipoints } from "../../../../../api/PackInv_API/Invoice/Invoice";
import AddGoods from "../Modals/AddGoods";

export default function CreateNew(props) {
  // const section1 = useRef();
  // const scrollHandler = (elmRef) => {
  //   window.scrollTo({ top: elmRef.current.offsetTop, behavior: "smooth" });
  // };

  // const [CreateNewType, setCreateNewType] = useState();
  // const [CreateNewBtnClicked, setCreateNewBtnClicked] = useState(1);
  // const [show, setShow] = useState(false);
  // const [AllCust, setAllCust] = useState();
  // const [SelectedCustomer, setSelectedCustomer] = useState();

  // const [primary, setPrimary] = useState({
  //   address: "",
  //   amountReceived: 0,
  //   billType: "",
  //   consignee: "",
  //   creditDays: "",
  //   custNo: "",
  //   delivery: "",
  //   deliveryCharges: 0,
  //   discount: 0,
  //   dispatchDate: "",
  //   dispatchMode: "",
  //   district: "",
  //   grandTotal: 0,
  //   gst: "",
  //   invoiceForm: "",
  //   invoiceTotal: 0,
  //   netTotal: 0,
  //   paymentDescription: "",
  //   pinCode: "",
  //   poNo: "",
  //   remarks: "",
  //   roundOff: 0,
  //   state: "",
  //   taxAmount: 0,
  //   vehicleNo: "",
  //   assessableValue: 0.0,
  // });

  // const [tableRow, setTableRow] = useState([]);

  // const [netTotal, setNetTotal] = useState(0);
  // const [discount, setDiscount] = useState(0);
  // const [deliveryCharge, setDeliveryCharge] = useState(0);
  // let taxAmount = 0;
  // const [invoiceTotal, setInvoiceTotal] = useState(0);
  // const [roundOff, setRoundOff] = useState(0);
  // const [grandTotal, setGrandTotal] = useState(0);

  // const [SelectedTaxes, setSelectedTaxes] = useState([]);
  // const [TaxData, setTaxDropDownData] = useState();
  // const [TaxDropDownData, setTaxDropDownData] = useState([]);
  // // new variables
  // const [secondary, setSecondary] = useState();
  // const [newDelivery, setNewDelivery] = useState();
  // const [newDispatchDate, setNewDispatchDate] = useState("");
  // const [newDispatchMode, setNewDispatchMode] = useState("");
  // const [newVehicleNo, setNewVehicleNo] = useState("");
  // const [newNetTotal, setNewNetTotal] = useState(0);
  // const [newDiscount, setNewDiscount] = useState(0);
  // const [newDeliveryCharge, setNewDeliveryCharge] = useState(0);
  // // let newTaxAmount = 0;
  // let newTaxAmountVar = 0;

  // // const [newTaxAmount, setnewTaxAmount] = useState(0);
  // const [newInvoiceTotal, setNewInvoiceTotal] = useState(0);
  // const [newRoundOff, setNewRoundOff] = useState(0);
  // const [newGrandTotal, setNewGrandTotal] = useState(0);
  // const [newRemarks, setNewRemarks] = useState("");
  // const [newSelectedTaxes, setNewSelectedTaxes] = useState();
  // const [newBillType, setNewBillType] = useState("DC");
  // const [newAmountRecieved, setNewAmountRecieved] = useState();
  // const [newCreditDays, setNewCreditDays] = useState("");
  // const [newPaymentDescription, setNewPaymentDescription] = useState("");

  // const [invoiceType, setInvoiceType] = useState('')
  const [TaxDropDownData, setTaxDropDownData] = useState([]);

  const [invRegisterData, setInvRegisterData] = useState({
    Iv_Id: "",
    DC_InvType: "",
    InvoiceFor: "",
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
    PaymentTerms: "",
    BillType: "",

    // DCStatus: "Created",
    // DCStatus: "Draft",
  });

  const [invDetailsData, setInvDetailsData] = useState([]);

  const [invTaxData, setInvTaxData] = useState([]);

  useEffect(() => {
    Axios.post(apipoints.invoiceDetails, {
      DCInvNo: props?.DCInvNo,
    }).then((res) => {
      setInvRegisterData(res.data.registerData[0]);
      setInvDetailsData(res.data.detailsData);
      setInvTaxData(res.data.taxData);

      // // console.log("ressssssssssssss", res);
      // setSecondary(res.data.selectData);
      // setNewDelivery(res.data.selectData[0].Del_Address);
      // setNewSelectedTaxes(res.data.taxData);
      // // console.log("res.data in create new", res.data);
      // setNewDispatchDate(res.data.selectData[0].DespatchDate?.split("T")[0]);
      // setNewDispatchMode(res.data.selectData[0].TptMode);
      // setNewVehicleNo(res.data.selectData[0].VehNo);
      // setNewNetTotal(res.data.selectData[0].Net_Total);
      // setNewDiscount(res.data.selectData[0].Discount);
      // setNewDeliveryCharge(res.data.selectData[0].Del_Chg);
      // // setnewTaxAmount(res.data.selectData[0].TaxAmount);
      // setNewInvoiceTotal(res.data.selectData[0].InvTotal);
      // setNewRoundOff(res.data.selectData[0].Round_Off);
      // setNewGrandTotal(res.data.selectData[0].GrandTotal);
      // setNewRemarks(res.data.selectData[0].Remarks);
      // setNewBillType(res.data.selectData[0].BillType);
      // setNewAmountRecieved(res.data.selectData[0].PymtAmtRecd);
      // setNewCreditDays(res.data.selectData[0].PaymentTerms);
      // setNewPaymentDescription(res.data.selectData[0].PaymentReceiptDetails);
      // // console.log("secondary...", res.data);
      // // console.log("getAllCust", res.data);
    });
  }, []);

  // // get all cust
  // useEffect(() => {
  //   Axios.post(apipoints.getAllCust, {}).then((res) => {
  //     setAllCust(res.data);
  //     // console.log("getAllCust", res.data);
  //   });
  // }, []);

  //get tax data
  useEffect(() => {
    Axios.post(apipoints.getTaxData, {}).then((res) => {
      setTaxDropDownData(res.data);
      // console.log("tax dropdown data", res.data);
      // console.log("getAllCust", res.data);
    });
  }, []);

  // console.log("TaxData", TaxData);

  // console.log("seconday", secondary);

  // console.log("SelectedTaxes", SelectedTaxes);
  // console.log("deliveryCharge...", deliveryCharge, "discount...", discount);

  // for (let i = 0; i < SelectedTaxes.length; i++) {
  //   const element = SelectedTaxes[i];
  //   // console.log('element', element);
  //   taxAmount = taxAmount + element.taxAmount;
  //   // taxAmount = taxAmount.toFixed(2);
  // }

  // for (let i = 0; i < newSelectedTaxes?.length; i++) {
  //   const element = newSelectedTaxes[i];
  //   // console.log("element", element.TaxAmt);
  //   // console.log("newtaxAmount", newTaxAmount);
  //   // console.log(
  //   //   "addition",
  //   //   parseFloat(element.TaxAmt) + parseFloat(newTaxAmount)
  //   // );
  //   newTaxAmountVar = parseFloat(element.TaxAmt) + parseFloat(newTaxAmountVar);
  //   // setnewTaxAmount(parseFloat(element.TaxAmt) + parseFloat(newTaxAmount));
  //   // taxAmount = taxAmount + element.taxAmount;
  //   // taxAmount = taxAmount.toFixed(2);
  //   // setnewTaxAmount(newTaxAmount+element.taxAmount)
  //   newTaxAmountVar = newTaxAmountVar.toFixed(2);
  // }
  // console.log("newTaxAmountVar", newTaxAmountVar);

  // setnewTaxAmount(newTaxAmountVar);

  // setnewTaxAmount(taxAmount);

  // console.log(
  //   "newDispatchDate",
  //   newDispatchDate,
  //   "newDispatchMode",
  //   newDispatchMode,
  //   "newVehicleNo",
  //   newVehicleNo,
  //   "newNetTotal",
  //   newNetTotal,
  //   "newDiscount",
  //   newDiscount,
  //   "newDeliveryCharge",
  //   newDeliveryCharge,
  //   "newTaxAmount",
  //   newTaxAmount,
  //   "newInvoiceTotal",
  //   newInvoiceTotal,
  //   "newRoundOff",
  //   newRoundOff,
  //   "newGrandTotal",
  //   newGrandTotal
  // );

  // console.log("invRegisterData", invRegisterData);
  // console.log("invDetailsData", invDetailsData);

  const invoiceTypes = [
    {
      DC_InvType: "Misc Sales",
      InvoiceFor: "Misc",
    },
    {
      DC_InvType: "Material Scrap",
      InvoiceFor: "Scrap",
    },
    {
      DC_InvType: "Material Scrap Return",
      InvoiceFor: "Material",
    },
    {
      DC_InvType: "Material Scrap Invoice",
      InvoiceFor: "Scrap",
    },
  ];
  // console.log("invoiceTypes", invoiceTypes);

  // const handleChangeDiscountDelivery = (e) => {
  //   // console.log("valueueueu", e.target.value.length > 0 ? e.target.value : 0);
  //   // props.setInvRegisterData({
  //   //   ...props.invRegisterData,
  //   //   Discount: e.target.value.length > 0 ? e.target.value : 0,
  //   // });
  //   // console.log(
  //   //   "invvvv total...",
  //   //   parseFloat(invRegisterData.Net_Total) -
  //   //     parseFloat(e.target.value.length > 0 ? e.target.value : 0)
  //   // );
  //   setInvTaxData([]);
  //   document.getElementById("taxDropdown").value = "none";
  //   let newInvTotal;
  //   let newGrandTotal;
  //   let newRoundOff;
  //   if (e.target.name === "Discount") {
  //     newInvTotal =
  //       parseFloat(invRegisterData?.Net_Total) -
  //       parseFloat(e.target.value.length > 0 ? e.target.value : 0) +
  //       parseFloat(invRegisterData?.Del_Chg);

  //     newGrandTotal = Math.round(newInvTotal);

  //     newRoundOff = newGrandTotal - newInvTotal;

  //     setInvRegisterData({
  //       ...invRegisterData,
  //       Discount: e.target.value.length > 0 ? e.target.value : 0,
  //       TaxAmount: 0.0,
  //       InvTotal: newInvTotal.toFixed(2),

  //       GrandTotal: newGrandTotal.toFixed(2),
  //       Round_Off: newRoundOff.toFixed(2),
  //     });
  //   } else if (e.target.name === "Del_Chg") {
  //     newInvTotal =
  //       parseFloat(invRegisterData?.Net_Total) -
  //       parseFloat(invRegisterData?.Discount) +
  //       parseFloat(e.target.value.length > 0 ? e.target.value : 0);

  //     newGrandTotal = Math.round(newInvTotal);

  //     newRoundOff = newGrandTotal - newInvTotal;

  //     setInvRegisterData({
  //       ...invRegisterData,
  //       Del_Chg: e.target.value.length > 0 ? e.target.value : 0,
  //       TaxAmount: 0.0,
  //       InvTotal: newInvTotal.toFixed(2),
  //       GrandTotal: newGrandTotal.toFixed(2),
  //       Round_Off: newRoundOff.toFixed(2),
  //     });
  //   }
  // };

  // console.log("Inv_Date", invRegisterData.Inv_Date);
  // console.log(
  //   "credit days...",
  //   parseInt(invRegisterData.PaymentTerms.split(" Days Credit")[0])
  // );

  return (
    <>
      <h4 className="title">
        {props?.DCInvNo ? "Invoice Details" : "Create New"}
      </h4>

      {/* select type */}

      {props?.DCInvNo ? (
        <></>
      ) : (
        <div
          className="p-2"
          style={{ backgroundColor: "#e6e6e6", borderRadius: "5px" }}
        >
          <h5 className="ps-3 pb-2">
            <b>Select Type</b>
          </h5>

          <div className="row d-flex justify-content-around">
            {invoiceTypes.map((invType, k) => (
              <button
                disabled={invRegisterData.DC_No.length > 0}
                // className={
                //     invRegisterData?.DC_InvType === invType.DC_InvType &&
                //     invRegisterData?.InvoiceFor === invType.InvoiceFor
                //       ? "col-md-2 p-2 m-0 button-style"
                //       : "col-md-2 p-2 m-0 bg-transparent"
                //   }

                className={
                  invRegisterData.DC_No.length > 0
                    ? // dc created

                      invRegisterData?.DC_InvType === invType.DC_InvType &&
                      invRegisterData?.InvoiceFor === invType.InvoiceFor
                      ? "col-md-2 p-2 m-0 button-disabled button-style text-dark"
                      : "col-md-2 p-2 m-0 button-disabled bg-transparent text-dark"
                    : // dc not created

                    invRegisterData?.DC_InvType === invType.DC_InvType &&
                      invRegisterData?.InvoiceFor === invType.InvoiceFor
                    ? "col-md-2 p-2 m-0 button-style"
                    : "col-md-2 p-2 m-0 bg-transparent"
                }
                style={{
                  // background: "rgb(173, 173, 173)",
                  border: "1px solid gray",
                  borderRadius: "5px",
                  height: "50px",
                }}
                onClick={(e) => {
                  setInvRegisterData({
                    ...invRegisterData,
                    DC_InvType: invType.DC_InvType,
                    InvoiceFor: invType.InvoiceFor,
                  });
                }}
              >
                {invType.DC_InvType}
              </button>
            ))}
          </div>
          <div className="p-1 "></div>
        </div>
      )}

      {/* space */}
      <div className="p-1 "></div>

      <div>
        {invRegisterData?.DC_InvType && invRegisterData?.InvoiceFor ? (
          <CreateNewForm
            // register
            invRegisterData={invRegisterData}
            setInvRegisterData={setInvRegisterData}
            // details
            invDetailsData={invDetailsData}
            setInvDetailsData={setInvDetailsData}
            // tax dropdown
            TaxDropDownData={TaxDropDownData}
            setTaxDropDownData={setTaxDropDownData}
            // tax table

            invTaxData={invTaxData}
            setInvTaxData={setInvTaxData}
            // // func
            //             handleChangeDiscountDelivery={handleChangeDiscountDelivery}
          />
        ) : (
          <div
            className="d-flex justify-content-center align-items-center bg-light border rounded"
            style={{ height: "300px" }}
          >
            <span>Select Invoice Type to move further</span>
          </div>
        )}
      </div>
    </>
  );
}

// <div ref={section1}>
//   {CreateNewBtnClicked === 3 || secondary ? (
//     <div className="border rounded">
//       <CreateNewForm
//         CreateNewType={CreateNewType}
//         AllCust={AllCust}
//         setSelectedCustomer={setSelectedCustomer}
//         SelectedCustomer={SelectedCustomer}
//         show={show}
//         setShow={setShow}
//         setTableRow={setTableRow}
//         tableRow={tableRow}
//         primary={primary}
//         setPrimary={setPrimary}
//         secondary={secondary}
//         setSecondary={setSecondary}
//         setNetTotal={setNetTotal}
//         netTotal={netTotal}
//         TaxData={TaxData}
//         SelectedTaxes={SelectedTaxes}
//         setSelectedTaxes={setSelectedTaxes}
//         setDeliveryCharge={setDeliveryCharge}
//         deliveryCharge={deliveryCharge}
//         setDiscount={setDiscount}
//         discount={discount}
//         taxAmount={taxAmount}
//         setGrandTotal={setGrandTotal}
//         grandTotal={grandTotal}
//         setRoundOff={setRoundOff}
//         roundOff={roundOff}
//         invoiceTotal={invoiceTotal}
//         setInvoiceTotal={setInvoiceTotal}
//         newDelivery={newDelivery}
//         setNewDelivery={setNewDelivery}
//         newDispatchDate={newDispatchDate}
//         setNewDispatchDate={setNewDispatchDate}
//         newDispatchMode={newDispatchMode}
//         setNewDispatchMode={setNewDispatchMode}
//         newVehicleNo={newVehicleNo}
//         setNewVehicleNo={setNewVehicleNo}
//         newNetTotal={newNetTotal}
//         setNewNetTotal={setNewNetTotal}
//         newDiscount={newDiscount}
//         setNewDiscount={setNewDiscount}
//         newDeliveryCharge={newDeliveryCharge}
//         setNewDeliveryCharge={setNewDeliveryCharge}
//         // newTaxAmount={newTaxAmount}
//         // setnewTaxAmount={setnewTaxAmount}
//         newInvoiceTotal={newInvoiceTotal}
//         setNewInvoiceTotal={setNewInvoiceTotal}
//         newRoundOff={newRoundOff}
//         setNewRoundOff={setNewRoundOff}
//         newGrandTotal={newGrandTotal}
//         setNewGrandTotal={setNewGrandTotal}
//         newRemarks={newRemarks}
//         setNewRemarks={setNewRemarks}
//         setNewSelectedTaxes={setNewSelectedTaxes}
//         newSelectedTaxes={newSelectedTaxes}
//         newTaxAmountVar={newTaxAmountVar}
//         setNewBillType={setNewBillType}
//         newBillType={newBillType}
//         newAmountRecieved={newAmountRecieved}
//         setNewAmountRecieved={setNewAmountRecieved}
//         newCreditDays={newCreditDays}
//         setNewCreditDays={setNewCreditDays}
//         setNewPaymentDescription={setNewPaymentDescription}
//         newPaymentDescription={newPaymentDescription}
//       />
//     </div>
//   ) : null}

//   {/* {secondary ? (
//     <div className="border rounded">
//       <CreateNewForm
//         CreateNewType={CreateNewType}
//         AllCust={AllCust}
//         setSelectedCustomer={setSelectedCustomer}
//         SelectedCustomer={SelectedCustomer}
//         show={show}
//         setShow={setShow}
//         setTableRow={setTableRow}
//         tableRow={tableRow}
//         primary={primary}
//         setPrimary={setPrimary}
//         secondary={secondary}
//         setSecondary={setSecondary}
//         setNetTotal={setNetTotal}
//         netTotal={netTotal}
//         TaxData={TaxData}

//       />
//     </div>
//   ) : null} */}
// </div>
// <div className="p-4"></div>
// <AddGoods
//   show={show}
//   setShow={setShow}
//   setTableRow={setTableRow}
//   tableRow={tableRow}
// />

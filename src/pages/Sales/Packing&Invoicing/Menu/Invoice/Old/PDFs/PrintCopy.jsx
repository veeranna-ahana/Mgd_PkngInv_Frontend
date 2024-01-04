import React, { useRef, useEffect, useState } from "react";
import { Form, Tab, Table, Tabs } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import Axios from "axios";
// import { apipoints } from "../../../../../api/PackInv_API/Invoice/Invoice";

import { apipoints } from "../../../../../api/PackInv_API/Invoice/Invoice";

// import MLLogo from "../../../../../../../ML-LOGO.png";

import MLLogo from "../../../../../../ML-LOGO.png";
import QRCode from "../../../../../../QRCode.jpeg";

const style = {
  heading: {
    fontSize: "90%",
    fontWeight: "bold",
  },
  text: {
    alignSelf: "center",
  },
};
const rowLimit = 20;

// const rowBorderBottomCondition = (innerKey) => {
//   innerKey + 1 === rowLimit
//     ? "col-md-1 border-dark border-end"
//     : "col-md-1 border-dark border-end border-bottom";
// };
const copiesNames = [
  "Original for Recipient",
  "Transporter Copy",
  "Accounts Copy",
  "Extra Copy",
];
// const copiesNames = ["Original for Recipient"];

// rupees num to word
const wordify = (num) => {
  const single = [
    "Zero",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  const double = [
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "Ten",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  const formatTenth = (digit, prev) => {
    return 0 == digit ? "" : " " + (1 == digit ? double[prev] : tens[digit]);
  };
  const formatOther = (digit, next, denom) => {
    return (
      (0 != digit && 1 != next ? " " + single[digit] : "") +
      (0 != next || digit > 0 ? " " + denom : "")
    );
  };
  let res = "";
  let index = 0;
  let digit = 0;
  let next = 0;
  let words = [];
  if (((num += ""), isNaN(parseInt(num)))) {
    res = "";
  } else if (parseInt(num) > 0 && num.length <= 10) {
    for (index = num.length - 1; index >= 0; index--)
      switch (
        ((digit = num[index] - 0),
        (next = index > 0 ? num[index - 1] - 0 : 0),
        num.length - index - 1)
      ) {
        case 0:
          words.push(formatOther(digit, next, ""));
          break;
        case 1:
          words.push(formatTenth(digit, num[index + 1]));
          break;
        case 2:
          words.push(
            0 != digit
              ? " " +
                  single[digit] +
                  " Hundred" +
                  (0 != num[index + 1] && 0 != num[index + 2] ? " and" : "")
              : ""
          );
          break;
        case 3:
          words.push(formatOther(digit, next, "Thousand"));
          break;
        case 4:
          words.push(formatTenth(digit, num[index + 1]));
          break;
        case 5:
          words.push(formatOther(digit, next, "Lakh"));
          break;
        case 6:
          words.push(formatTenth(digit, num[index + 1]));
          break;
        case 7:
          words.push(formatOther(digit, next, "Crore"));
          break;
        case 8:
          words.push(formatTenth(digit, num[index + 1]));
          break;
        case 9:
          words.push(
            0 != digit
              ? " " +
                  single[digit] +
                  " Hundred" +
                  (0 != num[index + 1] || 0 != num[index + 2]
                    ? " and"
                    : " Crore")
              : ""
          );
      }
    res = words.reverse().join("");
  } else res = "";
  return res;
};

// console.log("wordify...", wordify(43454798));

export default function PrintCopy(props) {
  const [PrintableData, setPrintableData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [taxData, setTaxData] = useState([]);

  function* chunks(arr, n) {
    for (let i = 0; i < arr.length; i += n) {
      yield arr.slice(i, i + n);
    }
  }

  useEffect(() => {
    Axios.post(apipoints.getWholePrintData, {
      DCInvNo: props?.DCInvNo,
    }).then((res) => {
      // console.log("resssssssssss", res.data);
      // console.log("chunkssssss", [
      //   ...chunks(res.data[0].detailsAndRegisterData, 12),
      // ]);
      setPrintableData(res.data[0].detailsAndRegisterData);
      setTableData([...chunks(res.data[0]?.detailsAndRegisterData, rowLimit)]);
      setTaxData(res.data[0]?.taxData);
    });
  }, []);

  // console.log("print..", PrintableData);
  // console.log("tableData", tableData);
  // {
  //   tableData.map((outerVal, outerKey) =>
  //     outerVal.map((innerVal, innerKey) =>
  //       console.log("inside innerr val mapping....", innerVal)
  //     )
  //   );
  // }
  return (
    <>
      <div className="" style={{ display: "none" }}>
        {/* <div className="" > */}
        <div
          ref={props.printCopytRef}
          style={{
            width: "100%",
            // display: "none",
            // height: window.innerHeight,
          }}
        >
          {/* <span>invoice print</span> */}
          {/* <div className="p-3"></div> */}
          {copiesNames.map((copiesVal) => (
            <>
              {tableData.map((outerVal, outerKey) => (
                <div>
                  <div className="wholePage p-3" style={{ fontSize: "70%" }}>
                    {/* header */}
                    <div className="d-flex justify-content-between">
                      <div className="col-md-1 d-flex justify-content-center">
                        <img
                          src={MLLogo}
                          alt="ML logo"
                          style={{ width: "80%" }}
                        />
                        {/* <span>logo</span> */}
                      </div>
                      <div className="companyName col-md-9">
                        <span className="d-flex flex-column align-items-center">
                          <span style={style.heading}>
                            <u>Packing Note / Delivery Challan</u>
                          </span>
                          <span style={style.heading}>
                            Magod Laser Machining Pvt. Ltd.
                          </span>
                          <span style={style.heading}>
                            GSTIN: 29AABCM1970H1ZE, CIN: U28900KA1995PTC018437
                          </span>
                          <span className="p-0 m-0">
                            #71 & 72, Phase II, KIADB Indl Area, Jigani, Anekal
                            Taluk, Bengaluru - 560105
                          </span>
                          <span className="p-0 m-0">
                            +91-80-42291005, +91-8110-414313,
                            info@magodlaser.in, https://www.magodlaser.in/
                          </span>
                          {/* <span className="p-0 m-0">
                    +91-80-42291005, +91-8110-414313, info@magodlaser.in,
                    https://www.magodlaser.in/
                  </span> */}
                        </span>
                      </div>
                      <div className="col-md-1" style={style.text}>
                        <span style={style.heading}>{copiesVal}</span>
                      </div>
                    </div>
                    <div className="p-1"></div>
                    <div className="border border-dark">
                      {/* billing address details */}
                      <div className="row" style={{ minHeight: "120px" }}>
                        <div className="col-md-8 border-bottom border-dark">
                          <div className="row">
                            <span style={style.heading}>Billing Address:</span>
                            <span style={style.heading}>
                              {PrintableData[0]?.Cust_Name}
                            </span>
                            <span className="col">
                              <span style={style.heading}>GSTIN: </span>
                              <span>{PrintableData[0]?.GSTNo}</span>
                            </span>
                            <span>
                              {PrintableData[0]?.Cust_Address},{" "}
                              {PrintableData[0]?.Cust_Place},{" "}
                              {PrintableData[0]?.Cust_State} -{" "}
                              {PrintableData[0]?.PIN_Code}
                            </span>
                          </div>
                        </div>
                        <div className="col-md-4 border-start border-bottom border-dark">
                          <span className="row">
                            <span style={style.heading}>Shipping Address:</span>
                            <span style={style.heading}>
                              {PrintableData[0]?.Del_Address}
                            </span>
                          </span>
                        </div>
                      </div>
                      {/* billing details */}
                      <div className="row" style={{ height: "200px" }}>
                        <div className="col-md-8 p-0 m-0 border-bottom border-dark">
                          <div className="col">
                            <div className="row">
                              <div className="col-md-3  border-bottom border-dark">
                                <span style={style.heading}>PO No</span>
                              </div>
                              <div className="col-md-9 border-start border-bottom border-dark">
                                <span>{PrintableData[0]?.PO_No}</span>
                              </div>
                            </div>
                            {/* <div className="row">
                              <div className="col-md-3  border-bottom border-dark">
                                <span style={style.heading}>Invoice Type</span>
                              </div>
                              <div className="col-md-9 border-start border-bottom border-dark">
                                <span style={style.heading}>
                                  {PrintableData[0]?.DC_InvType}
                                </span>
                              </div>
                            </div> */}
                            <div className="row">
                              <div className="col-md-3  border-bottom border-dark">
                                <span style={style.heading}>Invoice Type</span>
                              </div>
                              <div className="col-md-3 border-start border-bottom border-dark">
                                <span style={style.heading}>
                                  {PrintableData[0]?.DC_InvType}
                                </span>
                              </div>
                              <div className="col-md-3 border-start border-bottom border-dark">
                                <span style={style.heading}>Page</span>
                              </div>
                              <div className="col-md-3 border-start border-bottom border-dark">
                                <span style={style.heading}>
                                  {outerKey + 1} of {tableData.length}
                                </span>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-3  border-bottom border-dark">
                                <span style={style.heading}>Invoice No</span>
                              </div>
                              <div className="col-md-3 border-start border-bottom border-dark">
                                <span style={style.heading}>
                                  {PrintableData[0]?.Inv_No}
                                </span>
                              </div>
                              <div className="col-md-3 border-start border-bottom border-dark">
                                <span style={style.heading}>Invoice Date</span>
                              </div>
                              <div className="col-md-3 border-start border-bottom border-dark">
                                <span>{PrintableData[0]?.Inv_Date}</span>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-3  border-bottom border-dark">
                                <span style={style.heading}>
                                  Packing Note No
                                </span>
                              </div>
                              <div className="col-md-3 border-start border-bottom border-dark">
                                <span>{PrintableData[0]?.DC_No}</span>
                              </div>
                              <div className="col-md-3 border-start border-bottom border-dark">
                                <span style={style.heading}>Packing Date</span>
                              </div>
                              <div className="col-md-3 border-start border-bottom border-dark">
                                <span>{PrintableData[0]?.Dc_inv_Date}</span>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-3  border-bottom border-dark">
                                <span style={style.heading}>Eway Bill No</span>
                              </div>
                              <div className="col-md-3 border-start border-bottom border-dark">
                                <span>{PrintableData[0]?.EWayBillRef}</span>
                              </div>
                              <div className="col-md-3 border-start border-bottom border-dark">
                                <span style={style.heading}>Pay on Before</span>
                              </div>
                              <div className="col-md-3 border-start border-bottom border-dark">
                                <span>data...</span>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-3  border-bottom border-dark">
                                <span style={style.heading}>IRN No</span>
                              </div>
                              <div className="col-md-9 border-start border-bottom border-dark">
                                data.....
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-3  border-bottom border-dark">
                                <span style={style.heading}>PAN No</span>
                              </div>
                              <div className="col-md-2 border-start border-bottom border-dark">
                                <span>{PrintableData[0]?.PAN_No}</span>
                              </div>
                              <div className="col-md-3 border-start border-bottom border-dark">
                                <span style={style.heading}>MSME No</span>
                              </div>
                              <div className="col-md-4 border-start border-bottom border-dark">
                                data.....
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-12  border-bottom border-dark">
                                <span>
                                  Whether the Tax is payable on Reverse Charge
                                  Basis: NO
                                </span>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-12">
                                <span>
                                  {/* Whether the Tax is payable on Reverse Charge Basis: NO */}
                                </span>
                              </div>
                            </div>
                            {/* <div className="row">
                      <div className="col-md-12 border-bottom border-dark"></div>
                    </div> */}
                          </div>
                        </div>
                        <div className="col-md-4 border-start border-bottom border-dark d-flex align-items-center justify-content-center">
                          <img src={QRCode} alt="QR" style={{ width: "84%" }} />
                          {/* <span>qr</span> */}
                        </div>
                      </div>
                      {/* table */}
                      {/* table header */}
                      <div className="border-bottom border-dark">
                        <div className="row">
                          <div className="col-md-12 d-flex align-items-center justify-content-center">
                            <span style={style.heading}>
                              Invoice Items Details
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* table column header */}
                      <div>
                        <div
                          className=" border-dark border-bottom"
                          style={{ minHeight: "330px" }}
                        >
                          {/* table header */}
                          <div className="row">
                            <div
                              className="col-md-1 border-dark border-end border-bottom"
                              style={style.heading}
                            >
                              SL No
                            </div>
                            <div
                              className="col-md-4 border-dark border-end border-bottom"
                              style={style.heading}
                            >
                              Description of goods / Drawing No
                            </div>
                            <div
                              className="col-md-2 border-dark border-end border-bottom"
                              style={style.heading}
                            >
                              Material
                            </div>
                            <div
                              className="col-md-2 border-dark border-end border-bottom"
                              style={style.heading}
                            >
                              Qty
                            </div>
                            <div
                              className="col-md-2 border-dark border-end border-bottom"
                              style={style.heading}
                            >
                              Unit Rate
                            </div>
                            <div
                              className="col-md-1 border-dark border-bottom"
                              style={style.heading}
                            >
                              Amount
                            </div>
                          </div>

                          {/* table contents */}

                          {outerVal.map((innerVal, innerKey) => (
                            <div className="row">
                              <div
                                className={
                                  innerKey + 1 === rowLimit
                                    ? "col-md-1 border-dark border-end"
                                    : "col-md-1 border-dark border-end border-bottom"
                                }
                              >
                                {/* <div
                                  className={
                                    innerKey + 1 === rowLimit
                                      ? "col-md-1 border-dark border-end"
                                      : "col-md-1 border-dark border-end border-bottom"
                                  }
                                ></div> */}
                                {outerKey * rowLimit + innerKey + 1}
                              </div>
                              <div
                                className={
                                  innerKey + 1 === rowLimit
                                    ? "col-md-4 border-dark border-end"
                                    : "col-md-4 border-dark border-end border-bottom"
                                }
                              >
                                {/* Rt Angle Detachable Lever - 01 03 2023-T5MS-Q300 */}
                                {innerVal.Dwg_No}
                              </div>
                              <div
                                className={
                                  innerKey + 1 === rowLimit
                                    ? "col-md-2 border-dark border-end"
                                    : "col-md-2 border-dark border-end border-bottom"
                                }
                              >
                                {/* Sheet MS HR 5 */}
                                {innerVal.Mtrl}
                              </div>
                              <div
                                className={
                                  innerKey + 1 === rowLimit
                                    ? "col-md-2 border-dark border-end"
                                    : "col-md-2 border-dark border-end border-bottom"
                                }
                              >
                                {innerVal.Qty}
                                {/* Pkng1 */}
                              </div>
                              <div
                                className={
                                  innerKey + 1 === rowLimit
                                    ? "col-md-2 border-dark border-end"
                                    : "col-md-2 border-dark border-end border-bottom"
                                }
                              >
                                {/* Insp1 */}
                                {innerVal.Unit_Rate}
                              </div>
                              <div
                                className={
                                  innerKey + 1 === rowLimit
                                    ? "col-md-1 border-dark"
                                    : "col-md-1 border-dark border-bottom"
                                }
                              >
                                {/* 300 */}
                                {innerVal.DC_Srl_Amt}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* footer starts here */}

                      <div className="row">
                        {/* left */}
                        <div className="col-md-9 p-0 border-dark border-end border-bottom">
                          {/* first row */}
                          <div className="row">
                            <div className="col-md-2 border-bottom border-dark border-end">
                              <span style={style.heading}>Remarks</span>
                            </div>
                            <div className="col-md-10 border-bottom border-dark">
                              {PrintableData[0]?.Remarks}{" "}
                            </div>
                          </div>
                          {/* second row */}
                          <div className="row">
                            <div className="col-md-2 border-bottom border-dark border-end">
                              <span style={style.heading}>
                                Tax Name
                                {/* Remarks */}
                              </span>
                            </div>
                            <div className="col-md-2 border-bottom border-dark border-end">
                              <span style={style.heading}>
                                Taxable
                                {/* Remarks */}
                              </span>
                            </div>
                            <div className="col-md-2 border-bottom border-dark border-end">
                              <span style={style.heading}>
                                Tax %{/* Remarks */}
                              </span>
                            </div>
                            <div className="col-md-2 border-bottom border-dark border-end">
                              <span style={style.heading}>
                                TaxAmt
                                {/* Remarks */}
                              </span>
                            </div>
                            <div className="col-md-4 border-bottom border-dark">
                              <span style={style.heading}>
                                Goods Under HSN Class
                                {/* Remarks */}
                              </span>
                            </div>
                          </div>
                          {/* tax data- third row */}

                          {taxData.length > 0 ? (
                            taxData.map((taxVal) => (
                              <div className="row">
                                <div className="col-md-2 border-bottom border-dark border-end">
                                  {taxVal.Tax_Name}
                                </div>
                                <div className="col-md-2 border-bottom border-dark border-end">
                                  {taxVal.TaxableAmount}
                                </div>
                                <div className="col-md-2 border-bottom border-dark border-end">
                                  {taxVal.TaxPercent}
                                </div>
                                <div className="col-md-2 border-bottom border-dark border-end">
                                  {taxVal.TaxAmt}
                                </div>
                                <div className="col-md-4 border-bottom border-dark"></div>
                              </div>
                            ))
                          ) : (
                            <div className="row">
                              <div className="col-md-2 border-bottom border-dark border-end">
                                NA
                              </div>
                              <div className="col-md-2 border-bottom border-dark border-end">
                                NA
                              </div>
                              <div className="col-md-2 border-bottom border-dark border-end">
                                NA
                              </div>
                              <div className="col-md-2 border-bottom border-dark border-end">
                                NA
                              </div>
                              <div className="col-md-4 border-bottom border-dark">
                                NA
                              </div>
                            </div>
                          )}

                          {/* fifth row */}
                          <div className="row">
                            <div className="col-md-4 border-bottom border-dark border-end">
                              <span style={style.heading}>
                                {/* Remarks */}
                                Goods removed on
                              </span>
                            </div>
                            <div className="col-md-8 border-bottom border-dark">
                              {PrintableData[0]?.DespatchDate},{" "}
                              {PrintableData[0]?.TptMode},{" "}
                              {PrintableData[0]?.VehNo}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12 border-bottom border-dark">
                              Cleared Under Service Tariff Code 998898 - Laser
                              Cutting/Welding Services
                            </div>
                          </div>
                          {/* <div className="row">
                            <div className="col-md-3 border-bottom border-dark border-end">
                              left
                            </div>
                            <div className="col-md-9 border-bottom border-dark">
                              right
                            </div>
                          </div >
                          <div className="row">
                            <div className="col-md-3 border-bottom border-dark border-end">
                              left
                            </div>
                            <div className="col-md-9 border-bottom border-dark">
                              right
                            </div>
                          </div > */}
                        </div>
                        {/* right */}
                        <div className="col-md-3 p-0 border-dark border-bottom">
                          <div className="row">
                            <div className="col-md-6 border-dark border-end border-bottom">
                              <span style={style.heading}>Net Total</span>
                            </div>
                            <div className="col-md-6 border-dark border-bottom">
                              {/* data... */}
                              {PrintableData[0]?.Net_Total}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6 border-dark border-bottom">
                              <span style={{ opacity: 0 }}>test</span>
                            </div>
                            <div className="col-md-6 border-dark border-bottom">
                              <span style={{ opacity: 0 }}>test</span>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6 border-dark border-end border-bottom">
                              <span style={style.heading}>Discount</span>
                            </div>
                            <div className="col-md-6 border-dark border-bottom">
                              {PrintableData[0]?.Discount}{" "}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6 border-dark border-end border-bottom">
                              <span style={style.heading}>Total Taxes</span>
                            </div>
                            <div className="col-md-6 border-dark border-bottom">
                              {PrintableData[0]?.TaxAmount}{" "}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6 border-dark border-end border-bottom">
                              <span style={style.heading}>Invoice Total</span>
                            </div>
                            <div className="col-md-6 border-dark border-bottom">
                              {PrintableData[0]?.InvTotal}{" "}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6 border-dark border-end border-bottom">
                              <span style={style.heading}>Round Off</span>
                            </div>
                            <div className="col-md-6 border-dark border-bottom">
                              {PrintableData[0]?.Round_Off}{" "}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6 border-dark border-end">
                              <span style={style.heading}>Grand Total</span>
                            </div>
                            <div className="col-md-6">
                              {PrintableData[0]?.GrandTotal}{" "}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* eigth row */}
                      <div className="row">
                        <div className="col-md-12 border-bottom border-dark">
                          <div className="d-flex justify-content-end">
                            {/* rupess in words */}
                            {/* {PrintableData[0]?.GrandTotal.split(".")[0]} */}
                            <span style={style.heading}>
                              {wordify(
                                PrintableData[0]?.GrandTotal.split(".")[0]
                              ) + " Rupees Only."}
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* nine row */}
                      <div className="row">
                        <div className="col-md-11 p-0">
                          <div className="row">
                            <div className="col-md-2 border-bottom border-dark">
                              <span style={style.heading}>Bank Details</span>
                            </div>
                            <div className="col-md-10 border-start border-bottom border-dark">
                              <span>
                                State Bank of India - Jigani Branch, Current
                                Account, A/C NO: 33664104046, IFSC: SBIN0011355
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-1 p-0 border-bottom border-dark">
                          {/* sads */}
                        </div>
                      </div>
                      {/* ten row */}
                      <div className="row" style={{ height: "100px" }}>
                        <div className="col-md-7 d-flex flex-column justify-content-around">
                          <span>
                            Certified that the particulars given above are true
                            & correct and the amount indicated represents the
                            price actually charged and that there is no flow of
                            additional consideration directly or indirectly from
                            the buyer.
                          </span>
                          <span>SUBJECT TO BANGALORE JURISDICTION.</span>
                        </div>
                        <div className="col-md-5 border-start border-dark d-flex flex-column justify-content-around align-items-end">
                          <span>For, Magod Laser Machining Pvt. Ltd.</span>
                          <span style={style.heading}>
                            Authorised Signatory.
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="p-1"></div>
                      <span className="text-center">
                        Registered office: #72, Phase II, KIADB Indl Area,
                        Jigani, Anekal Taluk, Bengaluru - 560105.
                      </span>
                    </div>
                  </div>

                  {/* space at the end of the page */}
                  {/* <div className="p-3"></div> */}
                </div>
              ))}
            </>
          ))}
        </div>
      </div>
    </>
  );
}

{
  /* <div className="p-4"></div>
<div className="p-4"></div>
<div className="p-4"></div>
<div className="p-4"></div>
<div className="p-4"></div>
<div className="p-4"></div>
<div className="p-4"></div>
<div className="p-4"></div>
<div className="p-4"></div> <div className="p-4"></div>
<div className="p-4"></div>
<div className="p-4"></div>
<div className="p-4"></div>
<div className="p-4"></div>
<div className="p-4"></div>
<div className="p-4"></div>
<div className="p-4"></div>
<div className="p-4"></div> <div className="p-4"></div>
<div className="p-4"></div>
<div className="p-4"></div>
<div className="p-4"></div>
<div className="p-4"></div>
<div className="p-4"></div>
<div className="p-4"></div>
<div className="p-4"></div>
<div className="p-4"></div> */
}

// //
// <tr>
// <td className="border-bottom border-dark">1</td>
// <td className="border-start border-bottom border-dark">
//   MOVEABLE JAW POWER JAW
// </td>
// <td className="border-start border-bottom border-dark">
//   Sheet AL 0.2
// </td>
// <td className="border-start border-bottom border-dark">
//   559
// </td>
// <td className="border-start border-bottom border-dark">
//   78.00
// </td>
// <td className="border-start border-bottom border-dark">
//   43602.00
// </td>
// </tr>
// <tr>
// <td className="border-bottom border-dark">1</td>
// <td className="border-start border-bottom border-dark">
//   MOVEABLE JAW POWER JAW
// </td>
// <td className="border-start border-bottom border-dark">
//   Sheet AL 0.2
// </td>
// <td className="border-start border-bottom border-dark">
//   559
// </td>
// <td className="border-start border-bottom border-dark">
//   78.00
// </td>
// <td className="border-start border-bottom border-dark">
//   43602.00
// </td>
// </tr>
// <tr>
// <td className="border-bottom border-dark">1</td>
// <td className="border-start border-bottom border-dark">
//   MOVEABLE JAW POWER JAW
// </td>
// <td className="border-start border-bottom border-dark">
//   Sheet AL 0.2
// </td>
// <td className="border-start border-bottom border-dark">
//   559
// </td>
// <td className="border-start border-bottom border-dark">
//   78.00
// </td>
// <td className="border-start border-bottom border-dark">
//   43602.00
// </td>
// </tr>
// <tr>
// <td className="border-bottom border-dark">1</td>
// <td className="border-start border-bottom border-dark">
//   MOVEABLE JAW POWER JAW
// </td>
// <td className="border-start border-bottom border-dark">
//   Sheet AL 0.2
// </td>
// <td className="border-start border-bottom border-dark">
//   559
// </td>
// <td className="border-start border-bottom border-dark">
//   78.00
// </td>
// <td className="border-start border-bottom border-dark">
//   43602.00
// </td>
// </tr>
// <tr>
// <td className="border-bottom border-dark">1</td>
// <td className="border-start border-bottom border-dark">
//   MOVEABLE JAW POWER JAW
// </td>
// <td className="border-start border-bottom border-dark">
//   Sheet AL 0.2
// </td>
// <td className="border-start border-bottom border-dark">
//   559
// </td>
// <td className="border-start border-bottom border-dark">
//   78.00
// </td>
// <td className="border-start border-bottom border-dark">
//   43602.00
// </td>
// </tr>
// <tr>
// <td className="border-bottom border-dark">1</td>
// <td className="border-start border-bottom border-dark">
//   MOVEABLE JAW POWER JAW
// </td>
// <td className="border-start border-bottom border-dark">
//   Sheet AL 0.2
// </td>
// <td className="border-start border-bottom border-dark">
//   559
// </td>
// <td className="border-start border-bottom border-dark">
//   78.00
// </td>
// <td className="border-start border-bottom border-dark">
//   43602.00
// </td>
// </tr>
// <tr>
// <td className="border-bottom border-dark">1</td>
// <td className="border-start border-bottom border-dark">
//   MOVEABLE JAW POWER JAW
// </td>
// <td className="border-start border-bottom border-dark">
//   Sheet AL 0.2
// </td>
// <td className="border-start border-bottom border-dark">
//   559
// </td>
// <td className="border-start border-bottom border-dark">
//   78.00
// </td>
// <td className="border-start border-bottom border-dark">
//   43602.00
// </td>
// </tr>
// <tr>
// <td className="border-bottom border-dark">1</td>
// <td className="border-start border-bottom border-dark">
//   MOVEABLE JAW POWER JAW
// </td>
// <td className="border-start border-bottom border-dark">
//   Sheet AL 0.2
// </td>
// <td className="border-start border-bottom border-dark">
//   559
// </td>
// <td className="border-start border-bottom border-dark">
//   78.00
// </td>
// <td className="border-start border-bottom border-dark">
//   43602.00
// </td>
// </tr>
// <tr>
// <td className="border-bottom border-dark">1</td>
// <td className="border-start border-bottom border-dark">
//   MOVEABLE JAW POWER JAW
// </td>
// <td className="border-start border-bottom border-dark">
//   Sheet AL 0.2
// </td>
// <td className="border-start border-bottom border-dark">
//   559
// </td>
// <td className="border-start border-bottom border-dark">
//   78.00
// </td>
// <td className="border-start border-bottom border-dark">
//   43602.00
// </td>
// </tr>
// <tr>
// <td className="border-bottom border-dark">1</td>
// <td className="border-start border-bottom border-dark">
//   MOVEABLE JAW POWER JAW
// </td>
// <td className="border-start border-bottom border-dark">
//   Sheet AL 0.2
// </td>
// <td className="border-start border-bottom border-dark">
//   559
// </td>
// <td className="border-start border-bottom border-dark">
//   78.00
// </td>
// <td className="border-start border-bottom border-dark">
//   43602.00
// </td>
// </tr>
// <tr>
// <td className="border-bottom border-dark">1</td>
// <td className="border-start border-bottom border-dark">
//   MOVEABLE JAW POWER JAW
// </td>
// <td className="border-start border-bottom border-dark">
//   Sheet AL 0.2
// </td>
// <td className="border-start border-bottom border-dark">
//   559
// </td>
// <td className="border-start border-bottom border-dark">
//   78.00
// </td>
// <td className="border-start border-bottom border-dark">
//   43602.00
// </td>
// </tr>

// //
//   {/* first row */}
//   <div className="row">
//   <div className="col-md-9 p-0">
//     <div className="row">
//       <div className="col-md-2 border-bottom border-dark">
//         <span style={style.heading}>Remarks</span>
//       </div>
//       <div className="col-md-10 border-start border-bottom border-dark">
//         <span>{PrintableData[0]?.Remarks}</span>
//       </div>
//     </div>
//   </div>
//   <div className="col-md-3 p-0">
//     <div className="row">
//       <div className="col-md-6 border-start border-bottom border-dark">
//         <span style={style.heading}>Net Total</span>
//       </div>
//       <div className="col-md-6 border-start border-bottom border-dark">
//         <span>{PrintableData[0]?.Net_Total}</span>
//       </div>
//     </div>
//   </div>
// </div>
// {/* second row */}
// <div className="row">
//   <div className="col-md-9 p-0">
//     <div className="row">
//       <div className="col-md-2 border-bottom border-dark">
//         <span style={style.heading}>Tax Name</span>
//       </div>
//       <div className="col-md-10 p-0">
//         <div className="row">
//           <div className="col-md-2 border-start border-bottom border-dark">
//             <span style={style.heading}>Taxable</span>
//           </div>
//           <div className="col-md-2 border-start border-bottom border-dark">
//             <span style={style.heading}>Tax %</span>
//           </div>
//           <div className="col-md-2 border-start border-bottom border-dark">
//             <span style={style.heading}>Tax Amnt</span>
//           </div>
//           <div className="col-md-6 border-start border-bottom border-dark">
//             <span style={style.heading}>
//               Goods Under HSN Class
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
//   <div className="col-md-3 p-0 border-start border-bottom border-dark">
//     {/* <div className="row">
// <div className="col-md-6 border-start border-bottom border-dark">
// <span>Net Total</span>
// </div>
// <div className="col-md-6 border-start border-bottom border-dark">
// <span>data...</span>
// </div>
// </div> */}
//   </div>
// </div>
// {/* third row */}
// <div className="row">
//   <div className="col-md-9 p-0">
//     <div className="row">
//       <div className="col-md-2 border-bottom border-dark">
//         <span>IGST 18%</span>
//       </div>
//       <div className="col-md-10 p-0">
//         <div className="row">
//           <div className="col-md-2 border-start border-bottom border-dark">
//             <span>28200.00</span>
//           </div>
//           <div className="col-md-2 border-start border-bottom border-dark">
//             <span>18.000</span>
//           </div>
//           <div className="col-md-2 border-start border-bottom border-dark">
//             <span>5076.00</span>
//           </div>
//           <div className="col-md-6 border-start border-bottom border-dark">
//             <span></span>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
//   <div className="col-md-3 p-0">
//     <div className="row">
//       <div className="col-md-6 border-start border-bottom border-dark">
//         <span style={style.heading}>Discount</span>
//       </div>
//       <div className="col-md-6 border-start border-bottom border-dark">
//         <span>data...</span>
//       </div>
//     </div>
//   </div>
// </div>
// {/* fourth row */}
// <div className="row">
//   <div className="col-md-9 p-0">
//     <div className="row">
//       <div className="col-md-2 border-bottom border-dark">
//         <span>IGST 18%</span>
//       </div>
//       <div className="col-md-10 p-0">
//         <div className="row">
//           <div className="col-md-2 border-start border-bottom border-dark">
//             <span>28200.00</span>
//           </div>
//           <div className="col-md-2 border-start border-bottom border-dark">
//             <span>18.000</span>
//           </div>
//           <div className="col-md-2 border-start border-bottom border-dark">
//             <span>5076.00</span>
//           </div>
//           <div className="col-md-6 border-start border-bottom border-dark">
//             <span></span>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
//   <div className="col-md-3 p-0">
//     <div className="row">
//       <div className="col-md-6 border-start border-bottom border-dark">
//         <span style={style.heading}>Total Taxes</span>
//       </div>
//       <div className="col-md-6 border-start border-bottom border-dark">
//         <span>data...</span>
//       </div>
//     </div>
//   </div>
// </div>
// {/* five row */}
// <div className="row">
//   <div className="col-md-9 p-0">
//     <div className="row">
//       <div className="col-md-3 border-bottom border-dark">
//         <span style={style.heading}>
//           Goods removed on
//         </span>
//       </div>
//       <div className="col-md-9 border-start border-bottom border-dark">
//         <span>data...</span>
//       </div>
//     </div>
//   </div>
//   <div className="col-md-3 p-0">
//     <div className="row">
//       <div className="col-md-6 border-start border-bottom border-dark">
//         <span style={style.heading}>Invoice Total</span>
//       </div>
//       <div className="col-md-6 border-start border-bottom border-dark">
//         <span>data...</span>
//       </div>
//     </div>
//   </div>
// </div>
// {/* six row */}
// <div className="row">
//   <div className="col-md-9 p-0">
//     <div className="row">
//       <div className="col-md-12 border-bottom border-dark">
//         <span>
//           Cleared Under Service Tariff Code 998898 - Laser
//           Cutting/Welding Services
//         </span>
//       </div>
//       {/* <div className="col-md-10 border-start border-bottom border-dark">
// <span>data...</span>
// </div> */}
//     </div>
//   </div>
//   <div className="col-md-3 p-0">
//     <div className="row">
//       <div className="col-md-6 border-start border-bottom border-dark">
//         <span style={style.heading}>Round Off</span>
//       </div>
//       <div className="col-md-6 border-start border-bottom border-dark">
//         <span>data...</span>
//       </div>
//     </div>
//   </div>
// </div>
// {/* seven row */}
// <div className="row">
//   <div className="col-md-9 p-0 border-bottom border-dark">
//     {/* <div className="row">
// <div className="col-md-12 border-bottom border-dark">
// <span>Remarks</span>
// </div>
// <div className="col-md-10 border-start border-bottom border-dark">
// <span>data...</span>
// </div>
// </div> */}
//   </div>
//   <div className="col-md-3 p-0">
//     <div className="row">
//       <div className="col-md-6 border-start border-bottom border-dark">
//         <span style={style.heading}>Grand Total</span>
//       </div>
//       <div className="col-md-6 border-start border-bottom border-dark">
//         <span>data...</span>
//       </div>
//     </div>
//   </div>
// </div>

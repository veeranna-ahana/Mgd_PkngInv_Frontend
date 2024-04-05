import React from "react";
import {
  Page,
  Document,
  StyleSheet,
  View,
  Text,
  Image,
} from "@react-pdf/renderer";
import MLLogo from "../../../../../ML-LOGO.png";

export default function PrintInvoiceAndAnnexure(props) {
  let headerFontSize = "13px";
  let subheaderFontsize = "11px";
  let fontSize = "9px";

  const style = {
    pageStyling: {
      padding: "2%",
      // paddingTop: "3%",
      fontSize: fontSize,
      fontFamily: "Helvetica",
    },
    globalPadding: { padding: "0.6%" },
    footerRowPadding: { padding: "3px" },
    // globalPadding: { padding: "0.6%" },
    fontBold: {
      //   fontWeight: "bold",
      fontSize: fontSize,
      fontFamily: "Helvetica-Bold",
    },
  };

  // amount num to word
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
  // console.log("props in invoice and annexure...", props);

  const copiesNames = [
    { copyName: "Original for Recipient" },
    { copyName: "Transporter Copy" },
    { copyName: "Accounts Copy" },
    { copyName: "Extra Copy" },
  ];

  // payonBefore
  let payOnBefore = "";
  if (
    props.invRegisterData?.BillType === "Credit" &&
    props.invRegisterData.Inv_No?.length > 0 &&
    // finding int in payment terms
    props.invRegisterData.PaymentTerms?.match(/\d+/g)
  ) {
    let newInvDate = new Date(
      props.invRegisterData.Printable_Inv_Date?.split("/")[1] +
        "/" +
        props.invRegisterData.Printable_Inv_Date?.split("/")[0] +
        "/" +
        props.invRegisterData.Printable_Inv_Date?.split("/")[2]
    );

    newInvDate.setDate(
      newInvDate.getDate() +
        parseInt(props.invRegisterData.PaymentTerms?.split(" Days Credit")[0])
    );
    payOnBefore =
      (parseInt(newInvDate.getDate()) < 10
        ? "0" + newInvDate.getDate()
        : newInvDate.getDate()) +
      "/" +
      (parseInt(newInvDate.getMonth()) + 1 < 10
        ? "0" + (parseInt(newInvDate.getMonth()) + 1)
        : parseInt(newInvDate.getMonth()) + 1) +
      "/" +
      newInvDate.getFullYear();
    // console.log("payon before...", payOnBefore);
  } else {
  }

  // finyear

  let pnDate = new Date(
    `${props.invRegisterData.Printable_DC_Date?.split("/")[1]}-${
      props.invRegisterData.Printable_DC_Date?.split("/")[0]
    }-${props.invRegisterData.Printable_DC_Date?.split("/")[2]}`
  );
  let InvDate = new Date(
    `${props.invRegisterData.Printable_Inv_Date?.split("/")[1]}-${
      props.invRegisterData.Printable_Inv_Date?.split("/")[0]
    }-${props.invRegisterData.Printable_Inv_Date?.split("/")[2]}`
  );

  let PNFinYear = "";
  let InvFinYear = "";

  // calculating PNFinYear
  if (pnDate.getMonth() + 1 <= 3) {
    PNFinYear = `${String(pnDate.getFullYear() - 1).substring(2)}/${String(
      pnDate.getFullYear()
    ).substring(2)}`;
  } else {
    PNFinYear = `${String(pnDate.getFullYear()).substring(2)}/${String(
      parseInt(pnDate.getFullYear()) + 1
    ).substring(2)}`;
  }

  // calculating InvFinYear
  if (InvDate.getMonth() + 1 <= 3) {
    InvFinYear = `${String(InvDate.getFullYear() - 1).substring(2)}/${String(
      InvDate.getFullYear()
    ).substring(2)}`;
  } else {
    InvFinYear = `${String(InvDate.getFullYear()).substring(2)}/${String(
      parseInt(InvDate.getFullYear()) + 1
    ).substring(2)}`;
  }

  // console.log("props...", props);
  return (
    <>
      <Document>
        {copiesNames.map((copyVal, copyKey) => (
          <>
            <Page size="A4" style={{ ...style.pageStyling }}>
              <View>
                {/* top heading */}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View style={{ width: "7%" }}>
                    <Image
                      // src={props.PDFData.Logo?.data}
                      src={MLLogo}
                      // style={{ width: "7%" }}
                    />
                  </View>
                  {/* </View> */}
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      //   justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          borderBottom: "1px",
                          ...style.fontBold,
                          fontSize: headerFontSize,
                        }}
                      >
                        TAX INVOICE
                      </Text>
                    </View>
                    <Text
                      style={{ ...style.fontBold, fontSize: subheaderFontsize }}
                    >
                      {props.PDFData.RegisteredName}
                    </Text>
                    <Text style={{ ...style.fontBold }}>
                      GST: {props.PDFData.GST_No} CIN: {props.PDFData.CIN_No}
                    </Text>
                    <Text>{props.PDFData.RegistredOfficeAddress}</Text>
                    <Text>
                      {props.PDFData.PhonePrimary},{" "}
                      {props.PDFData.PhoneSecondary}, {props.PDFData.Email},{" "}
                      {props.PDFData.URL}
                    </Text>
                  </View>
                  {/* <View> */}
                  <Text style={{ width: "10%" }}>{copyVal.copyName}</Text>
                  {/* </View> */}
                </View>
                <View style={{ padding: "0.3%" }}></View>
                {/* main content starts */}
                <View style={{ border: "1px" }}>
                  {/* address section */}
                  <View
                    style={{
                      borderBottom: "1px",
                      display: "flex",
                      flexDirection: "row",
                      maxHeight: "90px",
                    }}
                  >
                    <View
                      style={{
                        width: "65%",
                        borderRight: "1px",
                        ...style.globalPadding,
                      }}
                    >
                      <Text style={{ ...style.fontBold }}>
                        Billing Address :
                      </Text>
                      <View style={{ ...style.globalPadding }}>
                        <Text style={{ ...style.fontBold }}>
                          {props.invRegisterData.Cust_Name}
                        </Text>

                        <Text>
                          {props.invRegisterData.Cust_Address},{" "}
                          {props.invRegisterData.Cust_Place},{" "}
                          {props.invRegisterData.Cust_State} -{" "}
                          {props.invRegisterData.PIN_Code}
                        </Text>

                        <View style={{ display: "flex", flexDirection: "row" }}>
                          <Text style={{ ...style.fontBold }}>GSTIN : </Text>
                          <Text>{props.invRegisterData.GSTNo}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={{ width: "35%", ...style.globalPadding }}>
                      <Text style={{ ...style.fontBold }}>
                        Shipping Address :
                      </Text>
                      <View style={{ ...style.globalPadding }}>
                        <Text>{props.invRegisterData.Del_Address}</Text>
                      </View>
                    </View>
                  </View>
                  {/* other details */}
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      borderBottom: "1px",
                      //   minHeight: "180px",
                    }}
                  >
                    <View style={{ width: "70%", borderRight: "1px" }}>
                      {/* PO */}
                      <View
                        style={{
                          borderBottom: "1px",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <View
                          style={{
                            width: "25%",
                            borderRight: "1px",
                            ...style.globalPadding,
                          }}
                        >
                          <Text style={{ ...style.fontBold }}>PO No</Text>
                        </View>
                        <View style={{ width: "75%", ...style.globalPadding }}>
                          <Text>
                            {props.invRegisterData.PO_No}{" "}
                            {props.invRegisterData.Printable_PO_Date}
                            {/* {monthNames[props.invRegisterData.PO_Date?.getMonth()]} */}
                          </Text>
                        </View>
                      </View>

                      {/* Invoice type */}
                      <View
                        style={{
                          borderBottom: "1px",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <View
                          style={{
                            width: "25%",
                            borderRight: "1px",
                            ...style.globalPadding,
                          }}
                        >
                          <Text style={{ ...style.fontBold }}>
                            Invoice Type
                          </Text>
                        </View>
                        <View style={{ width: "75%", ...style.globalPadding }}>
                          <Text>{props.invRegisterData.DC_InvType}</Text>
                        </View>
                      </View>

                      {/* Invoice num and Invoice date */}
                      <View
                        style={{
                          borderBottom: "1px",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <View
                          style={{
                            width: "25%",
                            borderRight: "1px",
                            ...style.globalPadding,
                          }}
                        >
                          <Text style={{ ...style.fontBold }}>Invoice No</Text>
                        </View>
                        <View
                          style={{
                            width: "25%",
                            borderRight: "1px",
                            ...style.globalPadding,
                          }}
                        >
                          <Text>
                            {props.invRegisterData?.Inv_No
                              ? `${props.invRegisterData?.Inv_No} - ${InvFinYear}`
                              : ""}
                            {/* {`${props.invRegisterData?.Inv_No} - ${InvFinYear}`} */}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: "25%",
                            borderRight: "1px",
                            ...style.globalPadding,
                          }}
                        >
                          <Text style={{ ...style.fontBold }}>
                            Invoice Date
                          </Text>
                        </View>
                        <View style={{ width: "25%", ...style.globalPadding }}>
                          <Text>
                            {props.invRegisterData.Printable_Inv_Date}
                          </Text>
                        </View>
                      </View>

                      {/* packingnote num and packing date */}
                      <View
                        style={{
                          borderBottom: "1px",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <View
                          style={{
                            width: "25%",
                            borderRight: "1px",
                            ...style.globalPadding,
                          }}
                        >
                          <Text style={{ ...style.fontBold }}>
                            Packing Note No
                          </Text>
                        </View>
                        <View
                          style={{
                            width: "25%",
                            borderRight: "1px",
                            ...style.globalPadding,
                          }}
                        >
                          <Text>
                            {props.invRegisterData?.DC_No
                              ? `${PNFinYear}/${props.invRegisterData?.DC_No}`
                              : props.invRegisterData?.DCStatus}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: "25%",
                            borderRight: "1px",
                            ...style.globalPadding,
                          }}
                        >
                          <Text style={{ ...style.fontBold }}>
                            Packing Date
                          </Text>
                        </View>
                        <View style={{ width: "25%", ...style.globalPadding }}>
                          <Text>{props.invRegisterData.Printable_DC_Date}</Text>
                        </View>
                      </View>

                      {/* eway bill No and pay on before */}
                      <View
                        style={{
                          borderBottom: "1px",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <View
                          style={{
                            width: "25%",
                            borderRight: "1px",
                            ...style.globalPadding,
                          }}
                        >
                          <Text style={{ ...style.fontBold }}>
                            EWay Bill No
                          </Text>
                        </View>
                        <View
                          style={{
                            width: "25%",
                            borderRight: "1px",
                            ...style.globalPadding,
                          }}
                        >
                          <Text>
                            {props.invRegisterData.EWayBillRef === "" ||
                            props.invRegisterData.EWayBillRef === undefined ||
                            props.invRegisterData.EWayBillRef === null
                              ? ""
                              : props.invRegisterData.EWayBillRef}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: "25%",
                            borderRight: "1px",
                            ...style.globalPadding,
                          }}
                        >
                          <Text style={{ ...style.fontBold }}>
                            Pay on Before
                          </Text>
                        </View>
                        <View style={{ width: "25%", ...style.globalPadding }}>
                          <Text>{payOnBefore}</Text>
                        </View>
                      </View>

                      {/* irn No */}
                      <View
                        style={{
                          borderBottom: "1px",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <View
                          style={{
                            width: "25%",
                            borderRight: "1px",
                            ...style.globalPadding,
                          }}
                        >
                          <Text style={{ ...style.fontBold }}>IRN No</Text>
                        </View>
                        <View style={{ width: "75%", ...style.globalPadding }}>
                          <Text></Text>
                        </View>
                      </View>

                      {/* pan and msme No */}
                      <View
                        style={{
                          borderBottom: "1px",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <View
                          style={{
                            width: "25%",
                            borderRight: "1px",
                            ...style.globalPadding,
                          }}
                        >
                          <Text style={{ ...style.fontBold }}>PAN No</Text>
                        </View>
                        <View
                          style={{
                            width: "20%",
                            borderRight: "1px",
                            ...style.globalPadding,
                          }}
                        >
                          <Text>
                            {props.PDFData.PAN_No}
                            {/* {props.invRegisterData.PAN_No === "" ||
                            props.invRegisterData.PAN_No === undefined ||
                            props.invRegisterData.PAN_No === null
                              ? ""
                              : props.invRegisterData.PAN_No} */}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: "15%",
                            borderRight: "1px",
                            ...style.globalPadding,
                          }}
                        >
                          <Text style={{ ...style.fontBold }}>MSME No</Text>
                        </View>
                        <View style={{ width: "40%", ...style.globalPadding }}>
                          <Text>{props.PDFData.MSMENo}</Text>
                        </View>
                      </View>

                      {/* extra comment - Whether the Tax is payable on Reverse Charge Basis: No */}
                      <View
                        style={{
                          //   borderBottom: "1px",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <View
                          style={{
                            ...style.globalPadding,
                          }}
                        >
                          <Text>{props.PDFData.ReverseChargeNote}</Text>
                        </View>
                      </View>
                    </View>
                    {/* qr */}
                    <View
                      style={{
                        width: "30%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ ...style.fontBold }}></Text>
                    </View>
                  </View>
                  {/*   Invoice Item Details  */}

                  <View>
                    <View
                      style={{
                        ...style.globalPadding,
                        borderBottom: "1px",
                        display: "flex",
                        alignContent: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                      }}
                    >
                      <Text style={{ ...style.fontBold }}>
                        Invoice Item Details
                      </Text>
                    </View>

                    <View>
                      {/* table header... */}
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          ...style.fontBold,
                          borderBottom: "1px",
                        }}
                      >
                        {/* sl */}
                        <View
                          style={{
                            ...style.globalPadding,
                            width: "6.5%",
                            borderRight: "1px",
                          }}
                        >
                          <Text>SL No</Text>
                        </View>

                        {/* description of goods or drawing no  */}

                        <View
                          style={{
                            ...style.globalPadding,
                            width: "46%",
                            borderRight: "1px",
                          }}
                        >
                          <Text>Description of goods / Drawing No</Text>
                        </View>

                        {/* Material */}
                        <View
                          style={{
                            ...style.globalPadding,
                            width: "18.5%",
                            borderRight: "1px",
                          }}
                        >
                          <Text>Material</Text>
                        </View>

                        {/* Quantity */}

                        <View
                          style={{
                            ...style.globalPadding,
                            width: "9%",
                            borderRight: "1px",
                          }}
                        >
                          <Text>Qty(Kg)</Text>
                        </View>

                        {/* Unit Price */}

                        <View
                          style={{
                            ...style.globalPadding,
                            width: "10%",
                            borderRight: "1px",
                          }}
                        >
                          <Text>Unit Price</Text>
                        </View>

                        {/* amount */}

                        <View style={{ ...style.globalPadding, width: "10%" }}>
                          <Text>Amount</Text>
                        </View>
                      </View>
                      {/* table content */}
                      <View
                        style={{
                          minHeight: "250px",
                          maxHeight: "291px",
                        }}
                      >
                        <View>
                          {props.invDetailsData?.map((val, key) => (
                            <View
                              // style={{

                              //   display: "flex",
                              //   flexDirection: "row",
                              //   // ...style.fontBold,
                              //   borderBottom: "1px",
                              // }}

                              style={
                                key + 1 === props.rowLimit
                                  ? { display: "flex", flexDirection: "row" }
                                  : {
                                      display: "flex",
                                      flexDirection: "row",
                                      borderBottom: "1px",
                                    }
                              }
                            >
                              {/* sl */}
                              <View
                                style={{
                                  ...style.globalPadding,
                                  width: "6.5%",
                                  borderRight: "1px",
                                }}
                              >
                                <Text>{key + 1}</Text>
                              </View>

                              {/* description of goods or drawing No  */}

                              <View
                                style={{
                                  ...style.globalPadding,
                                  width: "46%",
                                  borderRight: "1px",
                                }}
                              >
                                <Text>{val.Dwg_No}</Text>
                              </View>

                              {/* Material */}
                              <View
                                style={{
                                  ...style.globalPadding,
                                  width: "18.5%",
                                  borderRight: "1px",
                                }}
                              >
                                <Text>{val.Mtrl}</Text>
                              </View>

                              {/* Quantity */}

                              <View
                                style={{
                                  ...style.globalPadding,
                                  width: "9%",
                                  borderRight: "1px",
                                }}
                              >
                                <Text>{val.Qty}</Text>
                              </View>

                              {/* Unit Price */}

                              <View
                                style={{
                                  ...style.globalPadding,
                                  width: "10%",
                                  borderRight: "1px",
                                }}
                              >
                                <Text>{val.Unit_Rate}</Text>
                              </View>

                              {/* amount */}

                              <View
                                style={{
                                  ...style.globalPadding,
                                  width: "10%",
                                }}
                              >
                                <Text>{val.DC_Srl_Amt}</Text>
                              </View>
                            </View>
                          ))}
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* footer starts */}

                  <View style={{ borderTop: "1px" }}>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      {/* left */}
                      <View style={{ width: "73%", borderRight: "1px" }}>
                        <View
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          {/* remarks */}
                          <View style={{ borderBottom: "1px" }}>
                            <View
                              style={{ display: "flex", flexDirection: "row" }}
                            >
                              <View
                                style={{
                                  width: "15%",
                                  ...style.fontBold,
                                  ...style.footerRowPadding,
                                  borderRight: "1px",
                                }}
                              >
                                <Text>Remarks</Text>
                              </View>
                              <View
                                style={{
                                  width: "85%",
                                  ...style.footerRowPadding,
                                }}
                              >
                                <Text>{props.invRegisterData.Remarks}</Text>
                              </View>
                            </View>
                          </View>
                          {/* tax and hsn heading */}
                          <View style={{ borderBottom: "1px" }}>
                            <View
                              style={{ display: "flex", flexDirection: "row" }}
                            >
                              <View
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  borderRight: "1px",
                                  width: "60.5%",
                                }}
                              >
                                <View
                                  style={{
                                    width: "25%",
                                    ...style.fontBold,
                                    ...style.footerRowPadding,
                                    borderRight: "1px",
                                  }}
                                >
                                  <Text>Tax Name</Text>
                                </View>
                                <View
                                  style={{
                                    width: "25%",
                                    ...style.fontBold,
                                    ...style.footerRowPadding,
                                    borderRight: "1px",
                                  }}
                                >
                                  <Text>Taxable</Text>
                                </View>
                                <View
                                  style={{
                                    width: "25%",
                                    ...style.fontBold,
                                    ...style.footerRowPadding,
                                    borderRight: "1px",
                                  }}
                                >
                                  <Text>Tax %</Text>
                                </View>
                                <View
                                  style={{
                                    width: "25%",
                                    ...style.fontBold,
                                    ...style.footerRowPadding,
                                    // borderRight: "1px",
                                  }}
                                >
                                  <Text>Tax Amt</Text>
                                </View>
                              </View>
                              <View
                                style={{
                                  width: "39%",
                                  ...style.fontBold,
                                  ...style.footerRowPadding,
                                  // borderRight: "1px",
                                }}
                              >
                                <Text>Goods Under HSN Class</Text>
                              </View>
                            </View>
                          </View>
                          {/* tax and hsn data */}
                          <View style={{ borderBottom: "1px" }}>
                            <View
                              style={{ display: "flex", flexDirection: "row" }}
                            >
                              <View
                                style={{
                                  width: "60.5%",
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                {props.invTaxData?.map((taxVal, key) => (
                                  <View
                                    style={
                                      key + 1 != props.invTaxData.length
                                        ? {
                                            borderBottom: "1px",
                                            display: "flex",
                                            flexDirection: "row",
                                            borderRight: "1px",
                                          }
                                        : {
                                            display: "flex",
                                            flexDirection: "row",
                                            borderRight: "1px",
                                          }
                                    }
                                  >
                                    <View
                                      style={{
                                        width: "25%",
                                        // ...style.fontBold,
                                        ...style.footerRowPadding,
                                        borderRight: "1px",
                                      }}
                                    >
                                      <Text>{taxVal.Tax_Name}</Text>
                                    </View>
                                    <View
                                      style={{
                                        width: "25%",
                                        // ...style.fontBold,
                                        ...style.footerRowPadding,
                                        borderRight: "1px",
                                      }}
                                    >
                                      <Text>{taxVal.TaxableAmount}</Text>
                                    </View>
                                    <View
                                      style={{
                                        width: "25%",
                                        // ...style.fontBold,
                                        ...style.footerRowPadding,
                                        borderRight: "1px",
                                      }}
                                    >
                                      <Text>
                                        {parseFloat(taxVal.TaxPercent).toFixed(
                                          2
                                        )}{" "}
                                        %
                                      </Text>
                                    </View>
                                    <View
                                      style={{
                                        width: "25%",
                                        // ...style.fontBold,
                                        ...style.footerRowPadding,
                                        // borderRight: "1px",
                                      }}
                                    >
                                      <Text>
                                        {parseFloat(taxVal.TaxAmt).toFixed(2)}
                                      </Text>
                                    </View>
                                  </View>
                                ))}
                              </View>
                              <View
                                style={{
                                  width: "39%",
                                  // ...style.fontBold,
                                  ...style.footerRowPadding,
                                  // borderRight: "1px",
                                }}
                              >
                                <Text>
                                  {props.exciseArr?.map((exciseVal, key) => (
                                    <>
                                      {exciseVal}
                                      {key + 1 != props.exciseArr.length
                                        ? ", "
                                        : " "}
                                    </>
                                  ))}
                                </Text>
                              </View>
                            </View>
                          </View>
                          {/* goods removed on  */}
                          <View style={{ borderBottom: "1px" }}>
                            <View
                              style={{ display: "flex", flexDirection: "row" }}
                            >
                              <View
                                style={{
                                  width: "23%",
                                  ...style.fontBold,
                                  ...style.footerRowPadding,
                                  borderRight: "1px",
                                }}
                              >
                                <Text>Goods removed on </Text>
                              </View>
                              <View
                                style={{
                                  width: "77%",
                                  ...style.footerRowPadding,
                                }}
                              >
                                <Text>
                                  {props.invRegisterData.Printable_DespatchDate}
                                  , {props.invRegisterData.TptMode},{" "}
                                  {props.invRegisterData.VehNo},{" "}
                                  {props.invRegisterData.Del_ContactName},{" "}
                                  {props.invRegisterData.Del_ContactNo}
                                </Text>
                              </View>
                            </View>
                          </View>
                          {/* delivery person */}
                          {/* <View style={{ borderBottom: "1px" }}>
                            <View
                              style={{ display: "flex", flexDirection: "row" }}
                            >
                              <View
                                style={{
                                  width: "21%",
                                  ...style.fontBold,
                                  ...style.footerRowPadding,
                                  borderRight: "1px",
                                }}
                              >
                                <Text>Delivery Person</Text>
                              </View>
                              <View
                                style={{
                                  width: "79%",
                                  ...style.footerRowPadding,
                                }}
                              >
                                <Text>data...</Text>
                              </View>
                            </View>
                          </View> */}
                          {/* cleared under */}
                          <View
                            style={
                              props.invTaxData?.length < 3
                                ? { borderBottom: "1px" }
                                : ""
                            }
                          >
                            <View
                              style={{
                                ...style.footerRowPadding,
                              }}
                            >
                              <Text>{props.PDFData.ServiceTariffInfo}</Text>
                            </View>
                          </View>
                        </View>
                      </View>

                      {/* right */}
                      <View style={{ width: "27%" }}>
                        <View
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          {/* net total */}
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              borderBottom: "1px",
                            }}
                          >
                            <View
                              style={{
                                width: "42%",
                                ...style.fontBold,
                                ...style.footerRowPadding,
                                borderRight: "1px",
                              }}
                            >
                              <Text>Net Total</Text>
                            </View>
                            <View
                              style={{
                                width: "58%",
                                ...style.footerRowPadding,
                              }}
                            >
                              <Text>
                                {parseFloat(
                                  props.invRegisterData.Net_Total
                                ).toFixed(2)}
                              </Text>
                            </View>
                          </View>
                          {/* del charge */}
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              borderBottom: "1px",
                            }}
                          >
                            <View
                              style={{
                                width: "42%",
                                ...style.fontBold,
                                ...style.footerRowPadding,
                                borderRight: "1px",
                              }}
                            >
                              <Text>Del. Charge</Text>
                            </View>
                            <View
                              style={{
                                width: "58%",
                                ...style.footerRowPadding,
                              }}
                            >
                              <Text>
                                {parseFloat(
                                  props.invRegisterData.Del_Chg
                                ).toFixed(2)}
                              </Text>
                            </View>
                          </View>
                          {/* discount */}
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              borderBottom: "1px",
                            }}
                          >
                            <View
                              style={{
                                width: "42%",
                                ...style.fontBold,
                                ...style.footerRowPadding,
                                borderRight: "1px",
                              }}
                            >
                              <Text>Discount</Text>
                            </View>
                            <View
                              style={{
                                width: "58%",
                                ...style.footerRowPadding,
                              }}
                            >
                              <Text>
                                {parseFloat(
                                  props.invRegisterData.Discount
                                ).toFixed(2)}
                              </Text>
                            </View>
                          </View>
                          {/* total taxes */}
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              borderBottom: "1px",
                            }}
                          >
                            <View
                              style={{
                                width: "42%",
                                ...style.fontBold,
                                ...style.footerRowPadding,
                                borderRight: "1px",
                              }}
                            >
                              <Text>Total Taxes</Text>
                            </View>
                            <View
                              style={{
                                width: "58%",
                                ...style.footerRowPadding,
                              }}
                            >
                              <Text>
                                {parseFloat(
                                  props.invRegisterData.TaxAmount
                                ).toFixed(2)}
                              </Text>
                            </View>
                          </View>
                          {/* invoice total */}
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              borderBottom: "1px",
                            }}
                          >
                            <View
                              style={{
                                width: "42%",
                                ...style.fontBold,
                                ...style.footerRowPadding,
                                borderRight: "1px",
                              }}
                            >
                              <Text>Invoice Total</Text>
                            </View>
                            <View
                              style={{
                                width: "58%",
                                ...style.footerRowPadding,
                              }}
                            >
                              <Text>
                                {parseFloat(
                                  props.invRegisterData.InvTotal
                                ).toFixed(2)}
                              </Text>
                            </View>
                          </View>
                          {/* round off */}
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              borderBottom: "1px",
                            }}
                          >
                            <View
                              style={{
                                width: "42%",
                                ...style.fontBold,
                                ...style.footerRowPadding,
                                borderRight: "1px",
                              }}
                            >
                              <Text>Round Off</Text>
                            </View>
                            <View
                              style={{
                                width: "58%",
                                ...style.footerRowPadding,
                              }}
                            >
                              <Text>
                                {parseFloat(
                                  props.invRegisterData.Round_Off
                                ).toFixed(2)}
                              </Text>
                            </View>
                          </View>
                          {/* grand total */}
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              // borderBottom: "1px",
                            }}
                          >
                            <View
                              style={{
                                width: "42%",
                                ...style.fontBold,
                                ...style.footerRowPadding,
                                borderRight: "1px",
                              }}
                            >
                              <Text>Grand Total</Text>
                            </View>
                            <View
                              style={{
                                width: "58%",
                                ...style.footerRowPadding,
                              }}
                            >
                              <Text>
                                {parseFloat(
                                  props.invRegisterData.GrandTotal
                                ).toFixed(2)}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* rupees */}
                  <View
                    style={{
                      borderTop: "1px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      ...style.footerRowPadding,
                    }}
                  >
                    <Text>
                      {"Rupees" +
                        wordify(parseInt(props.invRegisterData?.GrandTotal)) +
                        "Only."}
                    </Text>
                  </View>
                  {/* bank detials */}
                  <View
                    style={{
                      borderTop: "1px",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        width: "12%",
                        borderRight: "1px",
                        ...style.fontBold,
                        ...style.footerRowPadding,
                      }}
                    >
                      <Text>Bank Details</Text>
                    </View>
                    <View
                      style={{
                        width: "88%",
                        // ...style.fontBold,
                        ...style.footerRowPadding,
                      }}
                    >
                      <Text>{props.PDFData.BankDetails}</Text>
                    </View>
                  </View>
                  {/* signature line... */}
                  <View
                    style={{
                      borderTop: "1px",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        width: "60%",
                        borderRight: "1px",
                        // ...style.fontBold,
                        ...style.footerRowPadding,
                      }}
                    >
                      <Text>{props.PDFData.InvoiceTerms}</Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        justifyContent: "space-between",
                        width: "40%",
                        ...style.fontBold,
                        ...style.footerRowPadding,
                      }}
                    >
                      <Text>For, {props.PDFData.RegisteredName}</Text>
                      <Text>Authorised Signatory</Text>
                    </View>
                  </View>
                  {/* footer ends */}
                </View>
                {/* main content ends */}

                <View style={{ ...style.globalPadding }}></View>

                {/* Footer address */}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ ...style.fontBold }}>Registered office :</Text>
                  <Text>{props.PDFData.RegistredOfficeAddress}</Text>
                </View>
              </View>
            </Page>
          </>
        ))}
      </Document>
    </>
  );
}

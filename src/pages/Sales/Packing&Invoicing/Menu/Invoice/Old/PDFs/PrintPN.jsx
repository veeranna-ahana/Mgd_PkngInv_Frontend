import React, { useRef, useEffect, useState } from "react";
import { Form, Tab, Table, Tabs } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import Axios from "axios";
import { apipoints } from "../../../../../api/PackInv_API/Invoice/Invoice";

// import { apipoints } from "../../../../../../api/PackInv_API/PackingNote/PackingNote";
// import MLLogo from "../../../../../../../ML-LOGO.png";

const style = {
  // page:{
  //     fds: {
  //         size: 'A4 landscape'
  //       }
  // },
  heading: {
    fontSize: "90%",
    fontWeight: "bold",
  },
  text: {
    alignSelf: "center",
  },
};

// useEffect(() => {
//   Axios.post(apipoints.invoiceDetailTableData, {
//     DCInvNo: DCInvNo,
//   }).then((res) => {
//     setInvoiceDetailsTableData(res.data);
//   });
// }, []);

// const copiesNames = ["Original For Buyer", "Office Copy"];

const rowLimit = 25;

function* chunks(arr, n) {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n);
  }
}

export default function PrintPN(props) {
  const [PrintableData, setPrintableData] = useState([]);
  const [tableData, setTableData] = useState([]);
  // const [TotalQty, setTotalQty] = useState(0);
  //   console.log("DC inv No inside PDFFFFFFFFF", props.DCInvNo);
  var totalQty = 0;
  useEffect(() => {
    Axios.post(apipoints.getWholePrintData, {
      DCInvNo: props?.DCInvNo,
    }).then((res) => {
      //   console.log("response from BE in PDF", res);
      setPrintableData(res.data[0].detailsAndRegisterData);
      setTableData([...chunks(res.data[0]?.detailsAndRegisterData, rowLimit)]);

      // console.log("reposnse u......", res.data[0].detailsAndRegisterData);
    });
  }, []);
  for (let i = 0; i < PrintableData.length; i++) {
    const element = PrintableData[i];
    // console.log(`elemnent ${i}....`, element);
    // setTotalQty(...(TotalQty + 1));
    totalQty = totalQty + element.Qty;
    // console.log("totalqty..", totalQty);
  }
  // console.log("totalqty..outside", totalQty);

  // console.log("outside the useeffect", PrintableData);
  // for (let i = 0; i < tableData.length; i++) {
  //   const element = tableData[i];

  //   // console.log("table data......", element);
  //   for (let j = 0; j < element.length; j++) {
  //     const el = element[j];
  //     console.log("inside twooo.....", el);
  //   }
  // }

  let newVar = [];
  // var variable = 0;

  {
    tableData.map((v1, k1) => {
      newVar[k1] = 0;
      // console.log("v1 valuesss", v1);
      {
        v1.map((v2, k2) => {
          // console.log("v222222", PageQty + v2.Qty);
          // setPageQty(...PageQty + v2.Qty);
          newVar[k1] = newVar[k1] + v2.Qty;
        });
      }
      // newVar.push
      // console.log("varrrrrrrr", newVar);
    });
  }
  // console.log(
  //   "date",
  //   PrintableData[0].DC_Date?.slice(0, 10),
  //   PrintableData[0]?.DC_Date?.slice(11, 19)
  // );

  return (
    <>
      <div className="" style={{ display: "none" }}>
        {/* <div className=""> */}
        <div
          ref={props.componentRef}
          style={{
            width: "100%",
            // size: "A4 landscape",
            // @page: {
            //     size: 'A4 landscape'
            //   }
            // height: window.innerHeight
          }}
        >
          <style type="text/css" media="print">
            {
              "\
                    @page { size:A4 portrait; }\
                    "
            }
          </style>

          <div className="wholePage">
            {tableData.map((outerVal, outerKey) => (
              <>
                <div className="p-3"></div>
                {/* magod gst */}
                <div className="row">
                  <div className="col-md-3"></div>
                  <div className="col-md-4">
                    <div className="row">
                      <span style={style.heading}>GST NO:</span>
                      <span style={style.heading}>29AABCM1970H1ZE</span>
                    </div>
                  </div>
                  <div className="col-md-5"></div>
                </div>
                <div className="p-2"></div>
                {/* maogd details */}
                <div className="row">
                  <div className="col-md-2"></div>
                  <div className="col-md-7">
                    <span style={style.text}>
                      MAGOD LASER MACHINING PVT LTD (00003)
                    </span>
                  </div>
                  <div className="col-md-3"></div>
                </div>

                {/* cust details */}

                <div className="row">
                  {/* left */}
                  <div className="col-md-9">
                    <div className="col">
                      {/* first row */}
                      <div className="row">
                        <div className="col-md-5">
                          <span style={style.text}>
                            {PrintableData[0]?.Cust_Name},{" "}
                            {PrintableData[0]?.Cust_Address},
                          </span>
                        </div>
                        <div className="col-md-5">
                          <span style={style.heading}>Customer GST No: </span>
                          <span style={style.heading}>
                            {PrintableData[0]?.GSTNo}
                          </span>
                        </div>
                      </div>
                      {/* second row */}

                      <div className="row">
                        <span style={style.text}>
                          {PrintableData[0]?.Cust_Place},{" "}
                          {PrintableData[0]?.Cust_State} -{" "}
                          {PrintableData[0]?.PIN_Code}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* right */}
                  <div className="col-md-3">
                    <div className="row">
                      <span>{PrintableData[0]?.PO_Date}</span>
                      <span>{PrintableData[0]?.PN_PkngLevel}</span>
                      <span>
                        Page {outerKey + 1} of {tableData.length}
                      </span>
                    </div>
                  </div>
                </div>

                {/* po no */}

                <div className="row">
                  <div className="col-md-1"></div>
                  <div className="col-md-3">
                    <span style={style.text}> PO No:</span>
                    <span style={style.text}> {PrintableData[0]?.PO_No}</span>
                  </div>
                  <div className="col-md-8"></div>
                </div>

                <div className="p-3"></div>

                {/* products detailssss */}

                {/* {PrintableData?.map((val, key) => ( */}
                {outerVal.map((innerVal, innerKey) => (
                  <div className="row">
                    <div className="col-md-1">
                      <span style={style.text}>
                        {" "}
                        {outerKey * rowLimit + innerKey + 1}
                      </span>
                    </div>
                    <div className="col-md-5">
                      <span style={style.text}>{innerVal.Dwg_No}</span>
                    </div>
                    <div className="col-md-3">
                      <span style={style.text}>{innerVal.Mtrl}</span>
                    </div>
                    <div className="col-md-1">
                      <span style={style.text}>{innerVal.PN_PkngLevel}</span>
                    </div>
                    <div className="col-md-1">
                      <span style={style.text}>{innerVal.InspLevel}</span>
                    </div>
                    <div className="col-md-1">
                      <span style={style.text}>{innerVal.Qty}</span>
                    </div>
                  </div>
                ))}

                <div className="p-1"></div>
                {/* page items and quantity */}

                <div className="row">
                  <div className="col-md-1"></div>
                  <div className="col-md-3">
                    <span style={style.text}>
                      Page Items: {outerVal.length}
                    </span>
                  </div>
                  <div className="col-md-3">
                    <span style={style.text}>
                      Page Quantity: {newVar[outerKey]}
                      {/* {let d =  0;} */}
                      {/* {outerVal.map(
                        (val, i) =>
                          console.log(
                            `vaaallllllllll..... ..i ....${
                              i + 1
                            }.....outer..... ${outerVal.length}`,
                            val.Qty
                          ) // <span>{val}</span>
                      )} */}
                    </span>
                  </div>
                  <div className="col-md-5"></div>
                </div>
                <div className="p-2"></div>
                {/* total items and quantity */}
                <div className="col">
                  <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-3">
                      <span style={style.heading}>
                        Total Items: {PrintableData.length}
                      </span>
                    </div>
                    <div className="col-md-8"></div>
                  </div>
                  <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-3">
                      <span style={style.heading}>
                        Total Quantity: {totalQty}
                      </span>
                    </div>
                    <div className="col-md-8"></div>
                  </div>
                </div>
                <div className="p-5"></div>
              </>
            ))}
          </div>

          {/* <span>hello</span> */}
        </div>
      </div>
    </>
  );
}

// {copiesNames.map((val) => (
//     <>
//       <div className="p-3" style={{ fontSize: "70%" }}>
//         {/* header */}
//         <div className="d-flex justify-content-between">
//           <div className="col-md-1 d-flex justify-content-center">
//             <img src={MLLogo} alt="ML logo" style={{ width: "80%" }} />
//             {/* <span>logo</span> */}
//           </div>
//           <div className="companyName col-md-9">
//             <span className="d-flex flex-column align-items-center">
//               <span style={style.heading}>
//                 <u>Packing Note / Delivery Challan</u>
//               </span>
//               <span style={style.heading}>
//                 Magod Laser Machining Pvt. Ltd.
//               </span>
//               <span style={style.heading}>
//                 GSTIN: 29AABCM1970H1ZE, CIN: U28900KA1995PTC018437
//               </span>
//               <span className="p-0 m-0">
//                 #71 & 72, Phase II, KIADB Indl Area, Jigani, Anekal
//                 Taluk, Bengaluru - 560105
//               </span>
//               <span className="p-0 m-0">
//                 +91-80-42291005, +91-8110-414313, info@magodlaser.in,
//                 https://www.magodlaser.in/
//               </span>
//               {/* <span className="p-0 m-0">
//             +91-80-42291005, +91-8110-414313, info@magodlaser.in,
//             https://www.magodlaser.in/
//           </span> */}
//             </span>
//           </div>
//           <div className="col-md-1" style={style.text}>
//             <span style={style.heading}>{val}</span>
//           </div>
//         </div>
//         <div className="p-1"></div>
//         {/* content starts here */}
//         <div
//           // striped
//           // className="table-data border"
//           // style={{ border: "1px" }}
//           className="border border-dark"
//         >
//           {/* first row */}
//           <div className="row" style={{ minHeight: "120px" }}>
//             <div className="col-md-8 border-dark border-bottom ">
//               {/* billing address */}

//               <div className="row">
//                 <span style={style.heading}>Billing Address:</span>
//                 <span style={style.heading}>
//                   {PrintableData[0]?.Cust_Name}
//                 </span>
//                 <span>
//                   <span style={style.heading}>GSTIN: </span>
//                   {PrintableData[0]?.GSTNo}
//                 </span>
//                 <span>
//                   {PrintableData[0]?.Cust_Address},{" "}
//                   {PrintableData[0]?.Cust_Place},{" "}
//                   {PrintableData[0]?.Cust_State} -{" "}
//                   {PrintableData[0]?.PIN_Code}
//                 </span>
//               </div>
//             </div>
//             <div className="col-md-4 border-dark border-start border-bottom">
//               <span style={style.heading}>Shipping Address:</span>
//               <span> {PrintableData[0]?.Del_Address}</span>
//             </div>
//           </div>
//           {/* second row */}
//           <div className="row">
//             <div
//               className="col-md-3 border-dark  border-end border-bottom"
//               style={style.heading}
//             >
//               Customer PO
//             </div>
//             <div className="col-md-3 border-dark border-end border-bottom">
//               {PrintableData[0]?.PO_No}
//             </div>
//             <div
//               className="col-md-3 border-dark border-end border-bottom"
//               style={style.heading}
//             >
//               Page
//             </div>
//             <div className="col-md-3 border-dark border-bottom">
//               1 of 1
//             </div>
//           </div>
//           {/* third row */}
//           <div className="row">
//             <div
//               className="col-md-3 border-dark  border-end border-bottom"
//               style={style.heading}
//             >
//               Packing Note No
//             </div>
//             <div className="col-md-3 border-dark border-end border-bottom">
//               {PrintableData[0]?.DC_No}
//             </div>
//             <div
//               className="col-md-3 border-dark border-end border-bottom"
//               style={style.heading}
//             >
//               Packing Date
//             </div>
//             <div className="col-md-3 border-dark border-bottom">
//               {PrintableData[0]?.DC_Date?.slice(0, 10)}
//             </div>
//           </div>
//           {/* fourth row */}
//           <div className="row">
//             <div
//               className="col-md-3 border-dark border-end border-bottom"
//               style={style.heading}
//             >
//               Invoice Type
//             </div>
//             <div className="col-md-3 border-dark border-end border-bottom">
//               {PrintableData[0]?.DC_InvType}
//             </div>
//             <div className="col-md-3 border-dark border-end border-bottom"></div>
//             <div className="col-md-3 border-dark border-bottom"></div>
//           </div>
//           {/* fifth row */}
//           <div className="row">
//             <div
//               className="col-md-3 border-dark border-end border-bottom"
//               style={style.heading}
//             >
//               Invoice No
//             </div>
//             <div className="col-md-3 border-dark border-end border-bottom">
//               {PrintableData[0]?.Inv_No}
//             </div>
//             <div
//               className="col-md-3 border-dark border-end border-bottom"
//               style={style.heading}
//             >
//               Invoice Date
//             </div>
//             <div className="col-md-3 border-dark border-bottom">
//               {PrintableData[0]?.Inv_Date?.slice(0, 10)}
//             </div>
//           </div>
//           {/* sixth row */}
//           <div className="row">
//             <div
//               className="col-md-3 border-dark border-end border-bottom"
//               style={style.heading}
//             >
//               Eway Bill No
//             </div>
//             <div className="col-md-3 border-dark border-end border-bottom">
//               {/* data...... */}
//             </div>
//             <div
//               className="col-md-3 border-dark border-end border-bottom"
//               style={style.heading}
//             >
//               Pay on Before
//             </div>
//             <div className="col-md-3 border-dark border-bottom">
//               {/* data...... */}
//             </div>
//           </div>
//           {/* seventh row */}
//           <div className="row">
//             <div
//               className="col-md-3 border-dark border-end border-bottom"
//               style={style.heading}
//             >
//               PAN No
//             </div>
//             <div className="col-md-2 border-dark border-end border-bottom">
//               {/* data...... */}
//               {PrintableData[0]?.PAN_No}
//             </div>
//             <div
//               className="col-md-2 border-dark border-end border-bottom"
//               style={style.heading}
//             >
//               MSME No
//             </div>
//             <div className="col-md-5 border-dark border-bottom">
//               {/* data...... */}
//             </div>
//           </div>
//           {/* eight row */}
//           <div className="row">
//             <div
//               className="col-md-12 border-dark border-bottom d-flex justify-content-center"
//               style={style.heading}
//             >
//               Item List
//             </div>
//           </div>
//           {/* table starts */}
//           <div
//             className=" border-dark border-bottom"
//             style={{ minHeight: "510px" }}
//           >
//             {/* table header */}
//             <div className="row">
//               <div
//                 className="col-md-1 border-dark border-end border-bottom"
//                 style={style.heading}
//               >
//                 SL No
//               </div>
//               <div
//                 className="col-md-4 border-dark border-end border-bottom"
//                 style={style.heading}
//               >
//                 Description of goods / Drawing No
//               </div>
//               <div
//                 className="col-md-2 border-dark border-end border-bottom"
//                 style={style.heading}
//               >
//                 Material
//               </div>
//               <div
//                 className="col-md-2 border-dark border-end border-bottom"
//                 style={style.heading}
//               >
//                 Pkng. Lvl.
//               </div>
//               <div
//                 className="col-md-2 border-dark border-end border-bottom"
//                 style={style.heading}
//               >
//                 Insp. Lvl.
//               </div>
//               <div
//                 className="col-md-1 border-dark border-bottom"
//                 style={style.heading}
//               >
//                 Qty
//               </div>
//             </div>

//             {/* table contents */}

//             {PrintableData.map((val, i) => (
//               <div className="row">
//                 <div className="col-md-1 border-dark border-end border-bottom">
//                   {val.DC_Inv_Srl}
//                 </div>
//                 <div className="col-md-4 border-dark border-end border-bottom">
//                   {/* Rt Angle Detachable Lever - 01 03 2023-T5MS-Q300 */}
//                   {val.Dwg_No}
//                 </div>
//                 <div className="col-md-2 border-dark border-end border-bottom">
//                   {/* Sheet MS HR 5 */}
//                   {val.Mtrl}
//                 </div>
//                 <div className="col-md-2 border-dark border-end border-bottom">
//                   {val.PN_PkngLevel}
//                   {/* Pkng1 */}
//                 </div>
//                 <div className="col-md-2 border-dark border-end border-bottom">
//                   {/* Insp1 */}
//                   {val.InspLevel}
//                 </div>
//                 <div className="col-md-1 border-dark border-bottom">
//                   {/* 300 */}
//                   {val.Qty}
//                 </div>
//               </div>
//             ))}
//           </div>
//           {/* table ends here */}
//           {/* fotter starts here */}
//           {/* footer row 1 */}
//           <div
//             className="row border-dark border-bottom"
//             style={style.heading}
//           >
//             <div className="col-md-3 border-dark border-end ">
//               <span>Page Items Count = 1</span>
//             </div>
//             <div className="col-md-3  border-dark border-end">
//               <span>Page Items Quantity = 300</span>
//             </div>
//             <div className="col-md-3 border-dark border-end">
//               <span>Total Item Count = 1</span>
//             </div>
//             <div className="col-md-3 ">
//               <span>Total Items Quantity = 300</span>
//             </div>
//           </div>
//           {/* footer row 2 */}
//           <div className="row border-dark border-bottom">
//             <div className="col-md-8 border-dark border-end ">
//               <span>
//                 Please receive the above goods return to us the
//                 duplicate copy of "Delivery Challian" Duly stamped and
//                 receipted in acknowledgment of having received the
//                 material in good condition.any issuse on this
//                 transactions, kindly intimate to us in writing within
//                 3days from the date receipt SUBJECT TO BANGALORE
//                 JURISDICTION
//               </span>
//             </div>
//             <div className="col-md-4">
//               <span>Total Waight in KGs = 17.100</span>
//             </div>
//           </div>
//           {/* footer row 3 */}
//           <div
//             className="row"
//             style={{ ...style.heading, height: "100px" }}
//           >
//             <div className="col-md-8 border-dark border-end ">
//               <span>Customer Signature with Seal</span>
//             </div>
//             <div className="col-md-4">
//               <span>
//                 For, Magod Laser Machining Pvt. Ltd. Authorised
//                 Signatory.
//               </span>
//             </div>
//           </div>
//         </div>
//         {/* footer row 4 */}
//         <div className="row">
//           <div className="col-md-12 d-flex justify-content-center">
//             <span>
//               Registered office: #72, Phase II, KIADB Indl Area, Jigani,
//               Anekal Taluk, Bengaluru - 560105.
//             </span>
//           </div>
//         </div>

//         {/* space at the end of the page */}
//         <div className="p-3"></div>
//       </div>
//     </>
//   ))}

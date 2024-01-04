import React, { useRef, useEffect, useState } from "react";
import { Form, Tab, Table, Tabs } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import Axios from "axios";

import { apipoints } from "../../../../../../api/PackInv_API/PackingNote/PackingNote";
import MLLogo from "../../../../../../../ML-LOGO.png";

const style = {
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

const copiesNames = ["Original For Buyer", "Office Copy"];

export default function ReactPdfPrint(props) {
  const [PrintableData, setPrintableData] = useState([]);

  // console.log("inside PDFFFFFFFFF", props);

  useEffect(() => {
    Axios.post(apipoints.getPrintData, {
      DCInvNo: props?.DCInvNo,
    }).then((res) => {
      // console.log("response from BE in PDF", res);
      setPrintableData(res.data);
    });
  }, []);

  // console.log("outside the useeffect", PrintableData[0]);

  // console.log(
  //   "date",
  //   PrintableData[0].DC_Date?.slice(0, 10),
  //   PrintableData[0]?.DC_Date?.slice(11, 19)
  // );

  return (
    <>
      {/* <style>
      * {
        padding:0%
      }
    </style> */}
      <div
        className=""
        // style={{ display: "none" }}
      >
        <div
          ref={props.componentRef}
          style={{
            width: "100%",
            // height: window.innerHeight
          }}
        >
          {copiesNames.map((val) => (
            <>
              <div className="p-3" style={{ fontSize: "70%" }}>
                {/* header */}
                <div className="d-flex justify-content-between">
                  <div className="col-md-1 d-flex justify-content-center">
                    <img
                      src={MLLogo}
                      alt="ML logo"
                      style={{ width: "80%" }}
                      className={props.checkbox ? "withoutContent" : ""}
                    />
                    {/* <span>logo</span> */}
                  </div>
                  <div></div>
                  <div className="companyName col-md-8">
                    <div className={props.checkbox ? "withoutContent" : ""}>
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
                          +91-80-42291005, +91-8110-414313, info@magodlaser.in,
                          https://www.magodlaser.in/
                        </span>
                        {/* <span className="p-0 m-0">
                    +91-80-42291005, +91-8110-414313, info@magodlaser.in,
                    https://www.magodlaser.in/
                  </span> */}
                      </span>
                    </div>
                  </div>
                  <div
                    // className="col-md-1"
                    style={style.text}
                  >
                    <span style={style.heading}>{val}</span>
                  </div>
                </div>
                <div className="p-1"></div>
                {/* content starts here */}
                <div
                  // striped
                  // className="table-data border"
                  // style={{ border: "1px" }}
                  className={
                    props.checkbox
                      ? "withoutBorder border border-dark"
                      : "border border-dark"
                  }

                  // className="border border-dark"
                >
                  {/* first row */}
                  <div className="row" style={{ minHeight: "120px" }}>
                    <div
                      className={
                        props.checkbox
                          ? "withoutBorder col-md-8 border-dark border-bottom"
                          : "col-md-8 border-dark border-bottom"
                      }

                      // className="col-md-8 border-dark border-bottom "
                    >
                      {/* billing address */}

                      <div className="row">
                        <span
                          style={style.heading}
                          className={props.checkbox ? "withoutContent" : ""}
                        >
                          Billing Address:
                        </span>
                        <span style={style.heading}>
                          {PrintableData[0]?.Cust_Name}
                        </span>
                        <span>
                          <span style={style.heading}>GSTIN: </span>
                          {PrintableData[0]?.GSTNo}
                        </span>
                        <span>
                          {PrintableData[0]?.Cust_Address},{" "}
                          {PrintableData[0]?.Cust_Place},{" "}
                          {PrintableData[0]?.Cust_State} -{" "}
                          {PrintableData[0]?.PIN_Code}
                        </span>
                      </div>
                    </div>
                    <div
                      className={
                        props.checkbox
                          ? "withoutBorder col-md-4 border-dark border-start border-bottom"
                          : "col-md-4 border-dark border-start border-bottom"
                      }

                      // className="col-md-4 border-dark border-start border-bottom"
                    >
                      <span
                        style={style.heading}
                        className={props.checkbox ? "withoutContent" : ""}
                      >
                        Shipping Address:
                      </span>
                      <span> {PrintableData[0]?.Del_Address}</span>
                    </div>
                  </div>
                  {/* second row */}
                  <div className="row">
                    <div
                      className={
                        props.checkbox
                          ? "withoutBorder withoutContent col-md-3 border-dark border-end border-bottom"
                          : "col-md-3 border-dark border-end border-bottom"
                      }
                      // className="col-md-3 border-dark  border-end border-bottom"
                      style={style.heading}
                    >
                      Customer PO
                    </div>
                    <div
                      className={
                        props.checkbox
                          ? "withoutBorder col-md-3 border-dark border-end border-bottom"
                          : "col-md-3 border-dark border-end border-bottom"
                      }

                      // className="col-md-3 border-dark border-end border-bottom"
                    >
                      {PrintableData[0]?.PO_No}
                    </div>
                    <div
                      className={
                        props.checkbox
                          ? "withoutBorder withoutContent col-md-3 border-dark border-end border-bottom"
                          : "col-md-3 border-dark border-end border-bottom"
                      }
                      // className="col-md-3 border-dark border-end border-bottom"
                      style={style.heading}
                    >
                      Page
                    </div>

                    <div
                      className={
                        props.checkbox
                          ? "withoutBorder col-md-3 border-dark border-bottom"
                          : "col-md-3 border-dark border-bottom"
                      }
                      // className="col-md-3 border-dark border-bottom"
                    >
                      1 of 1
                    </div>
                  </div>
                  {/* third row */}
                  <div className="row">
                    <div
                      className={
                        props.checkbox
                          ? "withoutBorder withoutContent col-md-3 border-dark  border-end border-bottom"
                          : "col-md-3 border-dark  border-end border-bottom"
                      }
                      // className="col-md-3 border-dark  border-end border-bottom"
                      style={style.heading}
                    >
                      Packing Note No
                    </div>
                    <div
                      className={
                        props.checkbox
                          ? "withoutBorder col-md-3 border-dark border-end border-bottom"
                          : "col-md-3 border-dark border-end border-bottom"
                      }
                      // className="col-md-3 border-dark border-end border-bottom"
                    >
                      {PrintableData[0]?.DC_No}
                    </div>
                    <div
                      className={
                        props.checkbox
                          ? "withoutBorder withoutContent col-md-3 border-dark border-end border-bottom"
                          : "col-md-3 border-dark border-end border-bottom"
                      }
                      // className="col-md-3 border-dark border-end border-bottom"
                      style={style.heading}
                    >
                      Packing Date
                    </div>
                    <div
                      className={
                        props.checkbox
                          ? "withoutBorder col-md-3 border-dark border-bottom"
                          : "col-md-3 border-dark border-bottom"
                      }
                      // className="col-md-3 border-dark border-bottom"
                    >
                      {PrintableData[0]?.DC_Date?.slice(0, 10)}
                    </div>
                  </div>
                  {/* fourth row */}
                  <div className="row">
                    <div
                      className={
                        props.checkbox
                          ? "withoutBorder withoutContent col-md-3 border-dark border-end border-bottom"
                          : "col-md-3 border-dark border-end border-bottom"
                      }
                      // className="col-md-3 border-dark border-end border-bottom"
                      style={style.heading}
                    >
                      Invoice Type
                    </div>
                    <div
                      className={
                        props.checkbox
                          ? "withoutBorder col-md-3 border-dark border-end border-bottom"
                          : "col-md-3 border-dark border-end border-bottom"
                      }
                      // className="col-md-3 border-dark border-end border-bottom"
                    >
                      {PrintableData[0]?.DC_InvType}
                    </div>
                    {/* empty cells */}
                    <div
                      className={
                        props.checkbox
                          ? "withoutBorder col-md-3 border-dark border-end border-bottom"
                          : "col-md-3 border-dark border-end border-bottom"
                      }

                      // className="col-md-3 border-dark border-end border-bottom"
                    ></div>
                    <div
                      className={
                        props.checkbox
                          ? "withoutBorder col-md-3 border-dark border-bottom"
                          : "col-md-3 border-dark border-bottom"
                      }

                      // className="col-md-3 border-dark border-bottom"
                    ></div>
                  </div>
                  {/* fifth row */}
                  <div className="row">
                    <div
                      className={
                        props.checkbox
                          ? "withoutBorder withoutContent col-md-3 border-dark border-end border-bottom"
                          : "col-md-3 border-dark border-end border-bottom"
                      }
                      // className="col-md-3 border-dark border-end border-bottom"
                      style={style.heading}
                    >
                      Invoice No
                    </div>
                    <div
                      className={
                        props.checkbox
                          ? "withoutBorder col-md-3 border-dark border-end border-bottom"
                          : "col-md-3 border-dark border-end border-bottom"
                      }

                      // className="col-md-3 border-dark border-end border-bottom"
                    >
                      {PrintableData[0]?.Inv_No}
                    </div>
                    <div
                      className={
                        props.checkbox
                          ? "withoutBorder withoutContent col-md-3 border-dark border-end border-bottom"
                          : "col-md-3 border-dark border-end border-bottom"
                      }
                      // className="col-md-3 border-dark border-end border-bottom"
                      style={style.heading}
                    >
                      Invoice Date
                    </div>
                    <div
                      className={
                        props.checkbox
                          ? "withoutBorder col-md-3 border-dark border-bottom"
                          : "col-md-3 border-dark border-bottom"
                      }

                      // className="col-md-3 border-dark border-bottom"
                    >
                      {PrintableData[0]?.Inv_Date?.slice(0, 10)}
                    </div>
                  </div>
                  {/* sixth row */}
                  <div className="row">
                    <div
                      className={
                        props.checkbox
                          ? "withoutBorder withoutContent col-md-3 border-dark border-end border-bottom"
                          : "col-md-3 border-dark border-end border-bottom"
                      }
                      // className="col-md-3 border-dark border-end border-bottom"
                      style={style.heading}
                    >
                      Eway Bill No
                    </div>
                    <div
                      className={
                        props.checkbox
                          ? "withoutBorder col-md-3 border-dark border-end border-bottom"
                          : "col-md-3 border-dark border-end border-bottom"
                      }

                      // className="col-md-3 border-dark border-end border-bottom"
                    >
                      {/* data...... */}
                    </div>
                    <div
                      className={
                        props.checkbox
                          ? "withoutBorder withoutContent col-md-3 border-dark border-end border-bottom"
                          : "col-md-3 border-dark border-end border-bottom"
                      }
                      // className="col-md-3 border-dark border-end border-bottom"
                      style={style.heading}
                    >
                      Pay on Before
                    </div>
                    <div
                      className={
                        props.checkbox
                          ? "withoutBorder col-md-3 border-dark border-bottom"
                          : "col-md-3 border-dark border-bottom"
                      }

                      // className="col-md-3 border-dark border-bottom"
                    >
                      {/* data...... */}
                    </div>
                  </div>
                  {/* seventh row */}
                  <div className="row">
                    <div
                      className={
                        props.checkbox
                          ? "withoutBorder withoutContent col-md-3 border-dark border-end border-bottom"
                          : "col-md-3 border-dark border-end border-bottom"
                      }
                      // className="col-md-3 border-dark border-end border-bottom"
                      style={style.heading}
                    >
                      PAN No
                    </div>
                    <div
                      className={
                        props.checkbox
                          ? "withoutBorder col-md-2 border-dark border-end border-bottom"
                          : "col-md-2 border-dark border-end border-bottom"
                      }

                      // className="col-md-2 border-dark border-end border-bottom"
                    >
                      {/* data...... */}
                      {PrintableData[0]?.PAN_No}
                    </div>
                    <div
                      className={
                        props.checkbox
                          ? "withoutBorder withoutContent col-md-2 border-dark border-end border-bottom"
                          : "col-md-2 border-dark border-end border-bottom"
                      }
                      // className="col-md-2 border-dark border-end border-bottom"
                      style={style.heading}
                    >
                      MSME No
                    </div>
                    <div
                      className={
                        props.checkbox
                          ? "withoutBorder col-md-5 border-dark border-bottom"
                          : "col-md-5 border-dark border-bottom"
                      }

                      // className="col-md-5 border-dark border-bottom"
                    >
                      {/* data...... */}
                    </div>
                  </div>
                  {/* eight row */}
                  <div className="row">
                    <div
                      className={
                        props.checkbox
                          ? "withoutBorder withoutContent col-md-12 border-dark border-bottom d-flex justify-content-center"
                          : "col-md-12 border-dark border-bottom d-flex justify-content-center"
                      }
                      // className="col-md-12 border-dark border-bottom d-flex justify-content-center"
                      style={style.heading}
                    >
                      Item List
                    </div>
                  </div>
                  {/* table starts */}
                  <div
                    className={
                      props.checkbox
                        ? "withoutBorder border-dark border-bottom"
                        : "border-dark border-bottom"
                    }
                    // className=" border-dark border-bottom"
                    style={{ minHeight: "510px" }}
                  >
                    {/* table header */}
                    <div className="row">
                      <div
                        className={
                          props.checkbox
                            ? "withoutBorder withoutContent col-md-1 border-dark border-end border-bottom"
                            : "col-md-1 border-dark border-end border-bottom"
                        }
                        // className="col-md-1 border-dark border-end border-bottom"
                        style={style.heading}
                      >
                        SL No
                      </div>
                      <div
                        className={
                          props.checkbox
                            ? "withoutBorder withoutContent col-md-4 border-dark border-end border-bottom"
                            : "col-md-4 border-dark border-end border-bottom"
                        }
                        // className="col-md-4 border-dark border-end border-bottom"
                        style={style.heading}
                      >
                        Description of goods / Drawing No
                      </div>
                      <div
                        className={
                          props.checkbox
                            ? "withoutBorder withoutContent col-md-2 border-dark border-end border-bottom"
                            : "col-md-2 border-dark border-end border-bottom"
                        }
                        // className="col-md-2 border-dark border-end border-bottom"
                        style={style.heading}
                      >
                        Material
                      </div>
                      <div
                        className={
                          props.checkbox
                            ? "withoutBorder withoutContent col-md-2 border-dark border-end border-bottom"
                            : "col-md-2 border-dark border-end border-bottom"
                        }
                        // className="col-md-2 border-dark border-end border-bottom"
                        style={style.heading}
                      >
                        Pkng. Lvl.
                      </div>
                      <div
                        className={
                          props.checkbox
                            ? "withoutBorder withoutContent col-md-2 border-dark border-end border-bottom"
                            : "col-md-2 border-dark border-end border-bottom"
                        }
                        // className="col-md-2 border-dark border-end border-bottom"
                        style={style.heading}
                      >
                        Insp. Lvl.
                      </div>
                      <div
                        className={
                          props.checkbox
                            ? "withoutBorder withoutContent col-md-1 border-dark border-bottom"
                            : "col-md-1 border-dark border-bottom"
                        }
                        // className="col-md-1 border-dark border-bottom"
                        style={style.heading}
                      >
                        Qty
                      </div>
                    </div>

                    {/* table contents */}

                    {PrintableData.map((val, i) => (
                      <div className="row">
                        <div
                          className={
                            props.checkbox
                              ? "withoutBorder col-md-1 border-dark border-end border-bottom"
                              : "col-md-1 border-dark border-end border-bottom"
                          }
                          // className="col-md-1 border-dark border-end border-bottom"
                        >
                          {val.DC_Inv_Srl}
                        </div>
                        <div
                          className={
                            props.checkbox
                              ? "withoutBorder col-md-4 border-dark border-end border-bottom"
                              : "col-md-4 border-dark border-end border-bottom"
                          }

                          // className="col-md-4 border-dark border-end border-bottom"
                        >
                          {/* Rt Angle Detachable Lever - 01 03 2023-T5MS-Q300 */}
                          {val.Dwg_No}
                        </div>
                        <div
                          className={
                            props.checkbox
                              ? "withoutBorder col-md-2 border-dark border-end border-bottom"
                              : "col-md-2 border-dark border-end border-bottom"
                          }

                          // className="col-md-2 border-dark border-end border-bottom"
                        >
                          {/* Sheet MS HR 5 */}
                          {val.Mtrl}
                        </div>
                        <div
                          className={
                            props.checkbox
                              ? "withoutBorder col-md-2 border-dark border-end border-bottom"
                              : "col-md-2 border-dark border-end border-bottom"
                          }

                          //  className="col-md-2 border-dark border-end border-bottom"
                        >
                          {val.PN_PkngLevel}
                          {/* Pkng1 */}
                        </div>
                        <div
                          className={
                            props.checkbox
                              ? "withoutBorder col-md-2 border-dark border-end border-bottom"
                              : "col-md-2 border-dark border-end border-bottom"
                          }

                          // className="col-md-2 border-dark border-end border-bottom"
                        >
                          {/* Insp1 */}
                          {val.InspLevel}
                        </div>
                        <div
                          className={
                            props.checkbox
                              ? "withoutBorder col-md-1 border-dark border-bottom"
                              : "col-md-1 border-dark border-bottom"
                          }

                          // className="col-md-1 border-dark border-bottom"
                        >
                          {/* 300 */}
                          {val.Qty}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* table ends here */}
                  {/* fotter starts here */}
                  {/* footer row 1 */}
                  <div
                    className={
                      props.checkbox
                        ? "withoutBorder row border-dark border-bottom"
                        : "row border-dark border-bottom"
                    }
                    // className="row border-dark border-bottom"
                    style={style.heading}
                  >
                    <div
                      className={
                        props.checkbox
                          ? "withoutBorder col-md-3 border-dark border-end"
                          : "col-md-3 border-dark border-end"
                      }
                      // className="col-md-3 border-dark border-end "
                    >
                      <span className={props.checkbox ? "withoutContent" : ""}>
                        Page Items Count ={" "}
                      </span>
                      <span>1</span>
                    </div>
                    <div
                      className={
                        props.checkbox
                          ? "withoutBorder col-md-3 border-dark border-end"
                          : "col-md-3 border-dark border-end"
                      }

                      // className="col-md-3  border-dark border-end"
                    >
                      <span className={props.checkbox ? "withoutContent" : ""}>
                        Page Items Quantity ={" "}
                      </span>
                      <span>300</span>
                    </div>
                    <div
                      className={
                        props.checkbox
                          ? "withoutBorder col-md-3 border-dark border-end"
                          : "col-md-3 border-dark border-end"
                      }
                      // className="col-md-3 border-dark border-end"
                    >
                      <span className={props.checkbox ? "withoutContent" : ""}>
                        Total Item Count ={" "}
                      </span>
                      <span>1</span>
                    </div>
                    <div
                      className={
                        props.checkbox ? "withoutBorder col-md-3" : "col-md-3"
                      }
                      // className="col-md-3 "
                    >
                      <span className={props.checkbox ? "withoutContent" : ""}>
                        Total Items Quantity ={" "}
                      </span>
                      <span>300</span>
                    </div>
                  </div>
                  {/* footer row 2 */}
                  <div
                    className={
                      props.checkbox
                        ? "withoutBorder row border-dark border-bottom"
                        : "row border-dark border-bottom"
                    }

                    // className="row border-dark border-bottom"
                  >
                    <div
                      className={
                        props.checkbox
                          ? "withoutBorder col-md-8 border-dark border-end"
                          : "col-md-8 border-dark border-end"
                      }

                      // className="col-md-8 border-dark border-end "
                    >
                      <span className={props.checkbox ? "withoutContent" : ""}>
                        Please receive the above goods return to us the
                        duplicate copy of "Delivery Challian" Duly stamped and
                        receipted in acknowledgment of having received the
                        material in good condition.any issuse on this
                        transactions, kindly intimate to us in writing within
                        3days from the date receipt SUBJECT TO BANGALORE
                        JURISDICTION
                      </span>
                    </div>
                    <div className="col-md-4">
                      <span className={props.checkbox ? "withoutContent" : ""}>
                        Total Waight in KGs ={" "}
                      </span>
                      <span>17.100</span>
                    </div>
                  </div>
                  {/* footer row 3 */}
                  <div
                    className="row"
                    style={{ ...style.heading, height: "100px" }}
                  >
                    <div
                      className={
                        props.checkbox
                          ? "withoutBorder withoutContent col-md-8 border-dark border-end"
                          : "col-md-8 border-dark border-end"
                      }

                      // className="col-md-8 border-dark border-end "
                    >
                      <span>Customer Signature with Seal</span>
                    </div>
                    <div
                      className={
                        props.checkbox ? "col-md-4 withoutContent" : "col-md-4"
                      }
                      // className="col-md-4"
                    >
                      <span>
                        For, Magod Laser Machining Pvt. Ltd. Authorised
                        Signatory.
                      </span>
                    </div>
                  </div>
                </div>
                {/* footer row 4 */}
                <div className="row">
                  <div
                    className={
                      props.checkbox
                        ? "withoutBorder withoutContent col-md-12 d-flex justify-content-center"
                        : "col-md-12 d-flex justify-content-center"
                    }

                    // className="col-md-12 d-flex justify-content-center"
                  >
                    <span>
                      Registered office: #72, Phase II, KIADB Indl Area, Jigani,
                      Anekal Taluk, Bengaluru - 560105.
                    </span>
                  </div>
                </div>

                {/* space at the end of the page */}
                <div className="p-3"></div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

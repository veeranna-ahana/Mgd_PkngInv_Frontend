import React, { startTransition, useEffect, useState } from "react";
import axios from "axios";
import {
  Page,
  Document,
  StyleSheet,
  View,
  Text,
  Image,
} from "@react-pdf/renderer";

import MLLogo from "../../../../../../ML-LOGO.png";

const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    flexDirection: "column",
  },
  tableContainer: {
    flexDirection: "column",
    flexWrap: "wrap",
    marginTop: "12px",
    marginLeft: "20px",
    height: "80px",
    width: "100%",
  },
  tableContainer2: {
    flexDirection: "column",
    flexWrap: "wrap",
    marginTop: "30px",
    height: "80px",
    width: "270px",
  },
  description: {
    width: "60%",
  },

  HeadingText: {
    textAlign: "center",
    marginLeft: "160px",
    flexDirection: "row",
    justifyContent: "center",
  },
  Heading: {
    textAlign: "center",
    flexDirection: "row",
    width: "500px",
    padding: "1px",
  },

  tableTitle: {
    marginTop: "10px",
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    marginBottom: "10px",
  },

  underline: {
    textDecoration: "underline",
  },

  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
  },
  globalfontwithbold: {
    fontSize: "10px",
    fontFamily: "Helvetica-Bold",
  },
  globalfontwithoutbold: {
    fontSize: "10px",
  },
  logo: {
    width: "60px",
    height: "80px",
  },

  pdfName: {
    width: "180px",
    marginLeft: "20px",
    marginTop: "10px",
  },
  upperleftLabels: {
    width: "60px",
    textAlign: "left",
    paddingBottom: "8px",
  },
  upperleftLabelsValues: {
    width: "120px",
    paddingBottom: "8px",
  },

  subdetails: {
    width: "350px",
    border: 1,
    marginLeft: "10px",
    height: "140px",
    marginTop: "10px",
  },
  boldGstNo: {
    width: "220px",
    borderRight: 1,
    borderTop: 1,
    borderBottom: 1,
    height: "140px",
    marginTop: "10px",
  },
  subsectiondata: {
    marginLeft: "10px",
    width: "100%",
    textAlign: "left",
    flexDirection: "row",
    padding: "3px",
  },

  heading: {
    width: "50px",
    textalign: "right",
    marginTop: "5px",
    marginLeft: "20px",
  },
  values: {
    width: "100px",
    marginTop: "5px",
  },

  table: {
    display: "table",
    width: "96%", // Adjust the width as needed
    marginLeft: "auto",
    marginRight: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderBottomWidth: 1,
  },

  tableTax: {
    display: "table",
    width: "96%",
    marginLeft: "15px",
    borderStyle: "solid",
    borderWidth: 1,
    borderBottomWidth: 1,
  },
  tableRow: {
    flexDirection: "row",
  },

  tableColSrl: {
    width: "8%",
    padding: 3,
  },

  tableCol: {
    width: "12.5%",
    padding: 4,
  },

  tableColTax: {
    width: "30%",
    padding: 4,
  },

  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "black", // Adjust the color as needed
  },

  text: {
    fontSize: 10,
  },

  container: {
    flexDirection: "row",
    width: "100%",
  },

  remarksText: {
    marginLeft: "20px",
    marginTop: "20px",
  },
});

const DeliveryChallan = ({ formData }) => {
  const dateParts = formData.dcDate.split("/");
  const formattedDate = new Date(
    `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
  ).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  console.log(formattedDate);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          {/* <View style={styles.row}>
            <View style={styles.column}>
              <View style={styles.tableContainer}>
                <View>
                  <Image src={MLLogo} style={styles.logo} />
                </View>
                <View>
                  <Text style={styles.tableTitle}>
                    Magod Laser Machining Pvt Ltd
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.globalfontwithoutbold}>
                    Plot No 72, Phase II KIADB Industruial Area Jigani, Anekal
                    Taluk
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.globalfontwithoutbold}>
                    Banglore - 560106 Karnataka
                  </Text>
                </View>

                <View style={styles.row}>
                  <View style={styles.pdfName}>
                    <View style={styles.column}>
                      <Text
                        style={{
                          ...styles.globalfontwithoutbold,
                          textAlign: "center",
                          marginBottom: "5px",
                          textDecoration: "underline",
                        }}
                      >
                        Returnable Delivery Challan
                      </Text>
                      <View style={styles.row}>
                        <View style={styles.upperleftLabels}>
                          <Text style={styles.globalfontwithbold}>GST NO </Text>
                        </View>
                        <View style={styles.upperleftLabelsValues}>
                          <Text style={styles.globalfontwithbold}>
                            29AABCM1970H1ZE
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.row}>
                      <View style={styles.upperleftLabels}>
                        <Text style={styles.globalfontwithoutbold}>DC No </Text>
                      </View>
                      <View style={styles.upperleftLabelsValues}>
                        <Text style={styles.globalfontwithbold}>
                          : {formData.dcNo}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.row}>
                      <View style={styles.upperleftLabels}>
                        <Text style={styles.globalfontwithoutbold}>Date </Text>
                      </View>
                      <View style={styles.upperleftLabelsValues}>
                        <Text style={styles.globalfontwithoutbold}>
                          : {formattedDate}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View> */}
          <View style={styles.row}>
            <View style={styles.tableContainer}>
              <View>
                <Image src={MLLogo} style={styles.logo} />
              </View>
              <View style={styles.column}>
                <View style={[styles.Heading, { justifyContent: "center" }]}>
                  <Text
                    style={[
                      styles.globalfontwithbold,
                      { textDecoration: "underline" },
                    ]}
                  >
                    Returnable Delivery Challan
                  </Text>
                </View>
                <View
                  style={[
                    styles.Heading,
                    { fontSize: "8px", justifyContent: "center" },
                  ]}
                >
                  <Text style={styles.globalfontwithbold}>
                    Magod Laser Machining Pvt Ltd.
                  </Text>
                </View>

                <View style={[styles.Heading, { justifyContent: "center" }]}>
                  <Text style={styles.globalfontwithbold}>
                    GSTIN: 29AABCM1970H1ZE, CIN: U28900KA1995PTC018437
                  </Text>
                </View>

                <View style={[styles.Heading, { justifyContent: "center" }]}>
                  <Text style={styles.globalfontwithoutbold}>
                    Plot No 72, 2nd Phase, KIADB Indl Area Jigani, Anekal Taluk
                    Bengaluru - 560105
                  </Text>
                </View>

                <View style={[styles.Heading, { justifyContent: "center" }]}>
                  <Text style={styles.globalfontwithoutbold}>
                    Ph : 08110 414313, 9513393352, sales@magodlaser.in,
                    www.magodlaser.in
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <View style={styles.subdetails}>
                <View style={styles.column}>
                  <Text
                    style={{
                      ...styles.globalfontwithbold,
                      marginLeft: "10px",
                      padding: 3,
                      textDecoration: "underline",
                    }}
                  >
                    Consignee
                  </Text>

                  <View style={styles.subsectiondata}>
                    <Text style={styles.globalfontwithbold}>
                      {formData.custName}
                    </Text>
                  </View>
                  <View style={styles.subsectiondata}>
                    {/* <Text style={styles.globalfontwithbold}>Branch: </Text> */}
                    <Text style={styles.globalfontwithoutbold}>
                      {formData.custAddress}
                    </Text>
                  </View>

                  <Text
                    style={{
                      ...styles.globalfontwithbold,
                      marginLeft: "10px",
                      padding: 3,
                    }}
                  >
                    {formData.custCity} PIN - {formData.custPin}
                  </Text>

                  <Text
                    style={{
                      ...styles.globalfontwithbold,
                      marginLeft: "10px",
                      padding: 3,
                    }}
                  >
                    {formData.custState}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.column}>
              <View style={styles.boldGstNo}>
                <View style={styles.column}>
                  <View style={styles.row}>
                    <Text
                      style={{
                        ...styles.globalfontwithoutbold,
                        marginLeft: "10px",
                        padding: 3,
                      }}
                    >
                      GST NO :
                    </Text>

                    <Text
                      style={{
                        ...styles.globalfontwithbold,
                        marginLeft: "5px",
                        paddingTop: "3px",
                      }}
                    >
                      {formData.gstNo}
                    </Text>
                  </View>

                  <View style={styles.row}>
                    <View style={styles.column}>
                      <View style={styles.heading}>
                        <Text style={styles.globalfontwithoutbold}>DC No:</Text>
                      </View>
                      <View style={styles.heading}>
                        <Text style={styles.globalfontwithoutbold}>Date:</Text>
                      </View>
                      <View style={styles.heading}>
                        <Text style={styles.globalfontwithoutbold}>Value:</Text>
                      </View>
                      <View style={styles.heading}>
                        <Text style={styles.globalfontwithoutbold}>Tax:</Text>
                      </View>
                      <View style={styles.heading}>
                        <Text style={styles.globalfontwithoutbold}>
                          E Way No:
                        </Text>
                      </View>
                    </View>

                    <View style={styles.column}>
                      <View style={styles.values}>
                        <Text style={styles.globalfontwithbold}>
                          {formData.dcNo}
                        </Text>
                      </View>
                      <View style={styles.values}>
                        <Text style={styles.globalfontwithbold}>
                          {formattedDate}
                        </Text>
                      </View>
                      <View style={styles.values}>
                        <Text style={styles.globalfontwithbold}>
                          {formData.taxableAmount}
                        </Text>
                      </View>
                      <View style={styles.values}>
                        <Text style={styles.globalfontwithbold}>
                          {formData.taxAmt}
                        </Text>
                      </View>
                      <View style={styles.values}>
                        <Text style={styles.globalfontwithbold}>
                          {formData.ewayBillNo}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <Text
                    style={{
                      ...styles.globalfontwithoutbold,
                      marginTop: "10px",
                      paddingLeft: 5,
                    }}
                  >
                    Goods removed at : {formData.dcDate} {formData.selectedMode}
                  </Text>

                  <Text
                    style={{
                      ...styles.globalfontwithoutbold,
                      marginTop: "5px",
                      paddingLeft: 5,
                    }}
                  >
                    {formData.vehicleDetails}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{ ...styles.row, marginTop: "10px", marginBottom: "10px" }}
          >
            <Text
              style={{
                ...styles.globalfontwithoutbold,
                marginLeft: "10px",
                padding: 3,
              }}
            >
              Reference :
            </Text>

            <Text
              style={{
                ...styles.globalfontwithbold,
                marginLeft: "5px",
                paddingTop: "3px",
              }}
            >
              {formData.reference}
            </Text>
          </View>

          <View style={styles.table}>
            <View style={styles.headerRow}>
              <View style={{ ...styles.tableColSrl, ...styles.headerCol }}>
                <Text style={styles.text}>Srl</Text>
              </View>
              <View style={{ ...styles.tableCol, width: "40%" }}>
                <Text style={styles.text}>
                  Drawing Name / Description of Goods
                </Text>
              </View>
              <View style={{ ...styles.tableCol, ...styles.headerCol }}>
                <Text style={styles.text}>Material</Text>
              </View>
              <View style={{ ...styles.tableCol, ...styles.headerCol }}>
                <Text style={styles.text}>HSN Code</Text>
              </View>
              <View style={{ ...styles.tableCol, ...styles.headerCol }}>
                <Text style={styles.text}>Qty</Text>
              </View>
              <View style={{ ...styles.tableCol, ...styles.headerCol }}>
                <Text style={styles.text}>UOM</Text>
              </View>
              <View style={{ ...styles.tableCol, ...styles.headerCol }}>
                <Text style={styles.text}>Unit Price</Text>
              </View>
              <View style={{ ...styles.tableCol, ...styles.headerCol }}>
                <Text style={styles.text}>Total</Text>
              </View>
            </View>

            {/* Data Rows */}
            {formData.tableData &&
              formData.tableData.map((data, index) => (
                <View key={index} style={styles.tableRow}>
                  <View style={styles.tableColSrl}>
                    <Text style={styles.text}>{index + 1}</Text>
                  </View>
                  <View style={{ ...styles.tableCol, width: "40%" }}>
                    <Text style={styles.text}>
                      {data.Dwg_Code} / {data.Dwg_No}
                    </Text>
                  </View>
                  {/* Adjust the widths of other columns as needed */}
                  <View style={styles.tableCol}>
                    <Text style={styles.text}>{data.Material}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.text}>{data.Excise_CL_no}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.text}>{data.Qty}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.text}>{data.UOM}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.text}>{data.Unit_Rate}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.text}>{data.Qty}</Text>
                  </View>
                </View>
              ))}
          </View>

          <View style={styles.container}>
            <View
              style={{ ...styles.tableTax, marginTop: "20px", width: "48%" }}
            >
              <View style={styles.headerRow}>
                <View style={{ ...styles.tableColTax, ...styles.headerCol }}>
                  <Text style={styles.text}>Tax Name</Text>
                </View>
                <View style={{ ...styles.tableCol, width: "30%" }}>
                  <Text style={styles.text}>Taxable Amount</Text>
                </View>
                <View
                  style={{
                    ...styles.tableCol,
                    ...styles.headerCol,
                    width: "30%",
                  }}
                >
                  <Text style={styles.text}>Tax Amount</Text>
                </View>
              </View>

              {/* Data Rows */}
              {formData.selectedTax &&
                formData.selectedTax.map((data, index) => (
                  <View key={index} style={styles.tableRow}>
                    <View style={styles.tableColTax}>
                      <Text style={styles.text}>{data.Tax_Name}</Text>
                    </View>
                    <View style={{ ...styles.tableCol, width: "30%" }}>
                      <Text style={styles.text}>{data.TaxableAmount}</Text>
                    </View>

                    <View style={{ ...styles.tableCol, width: "30%" }}>
                      <Text style={styles.text}>{data.TaxAmt}</Text>
                    </View>
                  </View>
                ))}
            </View>
            <View style={{ ...styles.remarksText, width: "48%" }}>
              <Text>Remarks:</Text>
            </View>
          </View>
        </View>

        <View style={{ marginLeft: "10px", marginTop: "20px" }}>
          <Text style={styles.globalfontwithbold}>Authorised Signatory</Text>
        </View>
      </Page>
    </Document>
  );
};

export default DeliveryChallan;

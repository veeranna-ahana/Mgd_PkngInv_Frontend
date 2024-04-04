import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Form, Tab, Table, Tabs } from "react-bootstrap";
import { apipoints } from "../../../../../../../api/PackInv_API/Invoice/Invoice";

export default function ProductTable(props) {
  const [materialData, setMaterialData] = useState([]);
  //get allMaterials
  useEffect(() => {
    Axios.get(apipoints.allMaterials, {}).then((res) => {
      setMaterialData(res.data);
    });
  }, []);

  const updateQTY = () => {
    let newNetTotal = 0;
    for (let i = 0; i < props.invDetailsData.length; i++) {
      const element = props.invDetailsData[i];
      newNetTotal = parseFloat(newNetTotal) + parseFloat(element.DC_Srl_Amt);
    }
    props.setInvRegisterData({
      ...props.invRegisterData,
      Net_Total: parseFloat(newNetTotal).toFixed(2),
      Discount: 0.0,
      Del_Chg: 0.0,
      TaxAmount: "0.00",
      InvTotal: parseFloat(newNetTotal).toFixed(2),
      GrandTotal: Math.round(parseFloat(newNetTotal)).toFixed(2),
      Round_Off: (
        Math.round(parseFloat(newNetTotal)) - parseFloat(newNetTotal)
      ).toFixed(2),
      AssessableValue: parseFloat(newNetTotal).toFixed(2),
    });
  };

  const updateWeight = () => {
    let newTotalWeight = 0;
    for (let i = 0; i < props.invDetailsData.length; i++) {
      const element = props.invDetailsData[i];
      newTotalWeight =
        parseFloat(newTotalWeight) + parseFloat(element.DC_Srl_Wt);
    }

    props.setInvRegisterData({
      ...props.invRegisterData,
      Total_Wt: parseFloat(newTotalWeight).toFixed(3),
    });
  };

  const updateRate = () => {
    let newNetTotal = 0;
    for (let i = 0; i < props.invDetailsData.length; i++) {
      const element = props.invDetailsData[i];
      newNetTotal = parseFloat(newNetTotal) + parseFloat(element.DC_Srl_Amt);
    }
    props.setInvRegisterData({
      ...props.invRegisterData,
      Net_Total: parseFloat(newNetTotal).toFixed(2),
      Discount: 0.0,
      Del_Chg: 0.0,
      TaxAmount: "0.00",
      InvTotal: parseFloat(newNetTotal).toFixed(2),
      GrandTotal: Math.round(parseFloat(newNetTotal)).toFixed(2),
      Round_Off: (
        Math.round(parseFloat(newNetTotal)) - parseFloat(newNetTotal)
      ).toFixed(2),
      AssessableValue: parseFloat(newNetTotal).toFixed(2),
    });
  };
  const inputTableRow = (e, key) => {
    props.deleteTaxes();
    if (
      key === props.invDetailsData.length - 1 &&
      !props.invRegisterData?.DC_No &&
      !props.invRegisterData.Iv_Id
    ) {
      props.invDetailsData.push({
        SL_No: props.invDetailsData.length,
        Dwg_No: "",
        Material: "",
        Excise_CL_no: "",
        Qty: "0",
        Unit_Wt: "0.000",
        DC_Srl_Wt: "0.000",
        Unit_Rate: "0.00",
        DC_Srl_Amt: "0.00",
        PkngLevel: "Pkng1",
        InspLevel: "Insp1",
      });
      props.setInvDetailsData(props.invDetailsData);
    }

    const newArray = [];

    for (let i = 0; i < props.invDetailsData.length; i++) {
      const element = props.invDetailsData[i];
      element.SL_No = i + 1;
      if (i === key) {
        if (e.target.name === "Material") {
          element.Material = e.target.value || "";
          element.Mtrl = e.target.value || "";
          element.Excise_CL_no =
            materialData.filter((obj) => obj.Material === e.target.value)[0]
              .ExciseClNo || "";
        } else if (e.target.name === "Qty") {
          element[e.target.name] = e.target.value;
          element.DC_Srl_Wt = (
            parseFloat(e.target.value || 0) * parseFloat(element.Unit_Wt || 0)
          ).toFixed(3);
          element.DC_Srl_Amt = (
            parseFloat(e.target.value || 0) * parseFloat(element.Unit_Rate || 0)
          ).toFixed(2);
          updateQTY();
        } else if (e.target.name === "Unit_Wt") {
          element[e.target.name] = e.target.value;
          element.DC_Srl_Wt = (
            parseFloat(element.Qty || 0) * parseFloat(e.target.value || 0)
          ).toFixed(3);

          updateWeight();
        } else if (e.target.name === "Unit_Rate") {
          element[e.target.name] = e.target.value;
          element.DC_Srl_Amt = (
            parseFloat(element.Qty || 0) * parseFloat(e.target.value || 0)
          ).toFixed(2);
          updateRate();
        } else {
          element[e.target.name] = e.target.value;
        }
        element.PkngLevel = "Pkng1";
        element.InspLevel = "Insp1";
      }
      newArray.push(element);
    }
    props.setInvDetailsData(newArray);
  };

  return (
    <>
      <div className="px-1">
        <Table striped className="table-data border">
          <thead className="tableHeaderBGColor">
            <tr>
              <th>SL No</th>
              <th>Description of Goods</th>
              <th>Material</th>
              <th>Excise Classification</th>
              <th>Quantity</th>
              <th>Unit Weight</th>
              <th>Total Weight</th>
              <th>Unit Rate</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody className="tablebody">
            {props.invDetailsData?.map((tableData, key) => (
              <>
                <tr>
                  <td>
                    {key + 1}
                    {!props.invRegisterData.DC_No &&
                    key + 1 === props.invDetailsData?.length
                      ? props.invRegisterData.Iv_Id
                        ? ""
                        : "***"
                      : ""}
                  </td>
                  <td>
                    <input
                      value={tableData.Dwg_No}
                      name="Dwg_No"
                      onChange={(e) => {
                        inputTableRow(e, key);
                      }}
                      disabled={props.invRegisterData?.DC_No}
                      className={
                        props.invRegisterData?.DC_No
                          ? "input-disabled tableRowInput"
                          : "tableRowInput"
                      }
                    />
                  </td>
                  <td>
                    <select
                      value={tableData?.Material}
                      name="Material"
                      id="materialDropdown"
                      style={{
                        fontSize: "inherit",
                      }}
                      onChange={(e) => {
                        inputTableRow(e, key);
                      }}
                      disabled={props.invRegisterData?.DC_No}
                      className={
                        props.invRegisterData?.DC_No
                          ? "input-disabled tableRowInput"
                          : "tableRowInput"
                      }
                    >
                      <option value="" selected disabled hidden>
                        Select material
                      </option>

                      {materialData?.map((material, key) => (
                        <option value={material.Material}>
                          {material.Material}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      value={tableData.Excise_CL_no}
                      disabled={
                        props.invRegisterData.Inv_No?.length > 0 ||
                        props.invRegisterData.DCStatus === "Cancelled"
                      }
                      className={
                        props.invRegisterData.Inv_No?.length > 0 ||
                        props.invRegisterData.DCStatus === "Cancelled"
                          ? "input-disabled  tableRowInput"
                          : "tableRowInput"
                      }
                      name="Excise_CL_no"
                      onChange={(e) => {
                        inputTableRow(e, key);
                      }}
                      maxLength={"15"}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      value={tableData.Qty}
                      name="Qty"
                      onChange={(e) => {
                        inputTableRow(e, key);
                      }}
                      disabled={
                        props.invRegisterData?.DC_No
                        // ||
                        // props.invRegisterData.Iv_Id
                      }
                      className={
                        props.invRegisterData?.DC_No
                          ? // ||
                            // props.invRegisterData.Iv_Id
                            "input-disabled tableRowInput"
                          : "tableRowInput"
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      value={tableData.Unit_Wt}
                      disabled={
                        props.invRegisterData.Inv_No?.length > 0 ||
                        props.invRegisterData.DCStatus === "Cancelled"
                      }
                      className={
                        props.invRegisterData.Inv_No?.length > 0 ||
                        props.invRegisterData.DCStatus === "Cancelled"
                          ? "input-disabled  tableRowInput"
                          : "tableRowInput"
                      }
                      name="Unit_Wt"
                      onChange={(e) => {
                        inputTableRow(e, key);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      value={tableData.DC_Srl_Wt}
                      disabled
                      className="tableRowInput input-disabled"
                      name="DC_Srl_Wt"
                      onChange={(e) => {
                        inputTableRow(e, key);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      value={tableData.Unit_Rate}
                      disabled={
                        props.invRegisterData.Inv_No?.length > 0 ||
                        props.invRegisterData.DCStatus === "Cancelled"
                      }
                      className={
                        props.invRegisterData.Inv_No?.length > 0 ||
                        props.invRegisterData.DCStatus === "Cancelled"
                          ? "input-disabled  tableRowInput"
                          : "tableRowInput"
                      }
                      name="Unit_Rate"
                      onChange={(e) => {
                        inputTableRow(e, key);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      value={tableData.DC_Srl_Amt}
                      disabled
                      className="tableRowInput input-disabled"
                      name="DC_Srl_Amt"
                      onChange={(e) => {
                        inputTableRow(e, key);
                      }}
                    />
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

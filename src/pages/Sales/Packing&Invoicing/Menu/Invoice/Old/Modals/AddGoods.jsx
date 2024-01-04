import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Tab, Table, Tabs } from "react-bootstrap";
import { toast } from "react-toastify";

import Axios from "axios";
import { apipoints } from "../../../../../api/PackInv_API/Invoice/Invoice";
// import { apipoints } from "../../../../../../api/PackInv_API/PackingNote/PackingNote";

// apipoints
export default function AddGoods(props) {
  // const [inputValues, setInputValues] = useState([{}]);

  const [materialData, setMaterialData] = useState([]);

  const [productDetails, setProductDetails] = useState({});

  const [desc, setDesc] = useState("");
  const [material, setMaterial] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [excise, setExcise] = useState("");
  const [unitWeight, setUnitWeight] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const [unitRate, setUnitRate] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  // const [first, setfirst] = useState(second)

  // console.log("porps", props.tableRow);
  // const updatedRates = props.invoiceDetailsTableData;
  // const updatingTheRateFunction = (newRates) => {
  //   Axios.post(apipoints.updateRatesPN, {
  //     newRates: newRates,
  //   }).then((res) => {
  //     if (res.data) {
  //       props.setShow(false);
  //       toast.success(res.data);
  //     }
  //   });
  // };

  //get allMaterials
  useEffect(() => {
    Axios.get(apipoints.allMaterials, {}).then((res) => {
      setMaterialData(res.data);
      // console.log("allMaterials", res.data);
    });
  }, []);

  const handleCancel = () => {
    props.setAddGoodsModal(false);

    setProductDetails({});

    // setDesc("");
    // setMaterial("");
    // setQuantity(0);
    // setExcise("");
    // setUnitWeight(0);
    // setTotalWeight(0);
    // setUnitRate(0);
    // setTotalAmount(0);
  };

  const handleAddFunc = () => {
    // console.log("header", header, "value", value);

    props.setInvDetailsData([
      ...props.invDetailsData,
      {
        Dwg_No: productDetails.Dwg_No,
        Mtrl: productDetails.Material,
        Material: productDetails.Material,
        Qty: productDetails.Qty,
        Excise_CL_no: productDetails.Excise_CL_no,
        Unit_Wt: productDetails.Unit_Wt,
        DC_Srl_Wt: productDetails.DC_Srl_Wt,
        Unit_Rate: productDetails.Unit_Rate,
        DC_Srl_Amt: productDetails.DC_Srl_Amt,
        PkngLevel: "Pkng1",
        InspLevel: "Insp1",
      },
    ]);
    toast.success("Good added Successfully");

    let netTotal = 0;
    for (let i = 0; i < props.invDetailsData?.length; i++) {
      const element = props.invDetailsData[i];

      // console.log('elemet', element);
      netTotal = parseFloat(netTotal) + parseFloat(element.DC_Srl_Amt);
    }

    netTotal = parseFloat(netTotal) + parseFloat(productDetails.DC_Srl_Amt);

    // console.log("netTotal", netTotal);

    props.setInvRegisterData({
      ...props.invRegisterData,
      Net_Total: netTotal,
      Discount: 0.0,
      Del_Chg: 0.0,
      TaxAmount: "0.00",
      InvTotal: netTotal,

      GrandTotal: Math.round(parseFloat(netTotal)),

      Round_Off: (
        Math.round(parseFloat(netTotal)) - parseFloat(netTotal)
      ).toFixed(2),
      // Math.round
      AssessableValue: netTotal,

      // netTotal,
      // InvTotal:netTotal,
    });

    props.setInvTaxData([]);
    document.getElementById("taxDropdown").value = "none";

    handleCancel();

    // console.log(
    //   "data......",
    //   "desc",
    //   desc,
    //   "material",
    //   material,
    //   "excise",
    //   excise,
    //   "quantity",
    //   quantity,
    //   "unitWeight",
    //   unitWeight,
    //   "totalWeight",
    //   totalWeight,
    //   "unitRate",
    //   unitRate,
    //   "totalAmount",
    //   totalAmount
    // );
  };

  // console.log("props.setTableRow", props.tableRow);
  // console.log("inputValues", inputValues);

  const inputHandler = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Modal
        size="lg"
        show={props.addGoodsModal}
        onHide={() => props.setAddGoodsModal(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Add Goods
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="">
            <div className="row">
              <div className="col-md-6">
                <b>Description of Good</b>
                <input
                  // type="text"
                  defaultValue={productDetails.Dwg_No}
                  name="Dwg_No"
                  onChange={inputHandler}
                  required
                  // onChange={(e) => {
                  //   setDesc(e.target.value);
                  //   // handleInputChange("desc", e.target.value);
                  //   // setInputValues([...inputValues, { desc: e.target.value }]);
                  // }}
                />
              </div>
              <div className="col-md-6">
                <b>Material</b>
                <select
                  defaultValue={productDetails.Material}
                  onChange={(e) => {
                    // inputHandler(e);

                    // console.log("materialData", materialData[e.target.value]);
                    setProductDetails({
                      ...productDetails,
                      Material: materialData[e.target.value].Material,
                      Excise_CL_no: materialData[e.target.value].ExciseClNo,
                    });
                  }}
                  required
                  //  onChange={inputHandler}
                  name="Material"
                  // required
                  // onChange={(e) => {
                  //   setMaterial(e.target.value);

                  //   // handleInputChange("material", e.target.value);
                  //   // setInputValues([
                  //   //   ...inputValues,
                  //   //   { material: e.target.value },
                  //   // ]);
                  // }}
                  className="ip-select"
                  style={{
                    fontSize: "inherit",
                  }}
                >
                  <option value="none" selected disabled hidden>
                    Select the material
                  </option>

                  {materialData?.map((material, key) => (
                    // <option value={material.Material}>
                    <option value={key}>{material.Material}</option>
                  ))}
                </select>
                {/* <input
                  type="text"
                  onChange={(e) => {
                    setMaterial(e.target.value);

                    // handleInputChange("material", e.target.value);
                    // setInputValues([
                    //   ...inputValues,
                    //   { material: e.target.value },
                    // ]);
                  }}
                  required
                /> */}
              </div>
              <div className="col-md-6">
                <b>Excise Classification</b>
                <input
                  defaultValue={productDetails.Excise_CL_no}
                  name="Excise_CL_no"
                  onChange={inputHandler}
                  required

                  // type="text"
                  // onChange={(e) => {
                  //   setExcise(e.target.value);

                  //   // handleInputChange("excise", e.target.value);
                  //   // setInputValues([...inputValues, { excise: e.target.value }]);
                  // }}
                  // required
                />
              </div>
              <div className="col-md-6">
                <b>Quantity</b>
                <input
                  type="number"
                  min="0"
                  defaultValue={productDetails.Qty}
                  name="Qty"
                  onChange={(e) => {
                    setProductDetails({
                      ...productDetails,
                      Qty: e.target.value,
                      DC_Srl_Wt: (
                        parseFloat(productDetails?.Unit_Wt) *
                        parseFloat(e.target.value)
                      ).toFixed(2),
                      DC_Srl_Amt: (
                        parseFloat(productDetails?.Unit_Rate) *
                        parseFloat(e.target.value)
                      ).toFixed(2),
                    });
                  }}
                  required

                  // onChange={(e) => {
                  //   setQuantity(e.target.value);
                  //   setTotalWeight(unitWeight * e.target.value);
                  //   setTotalAmount(unitRate * e.target.value);
                  //   // handleInputChange("quantity", e.target.value);
                  //   // setInputValues([
                  //   //   ...inputValues,
                  //   //   { quantity: e.target.value },
                  //   // ]);
                  // }}
                  // required
                />
              </div>

              <div className="col-md-6">
                <b>Unit Weight</b>
                <input
                  type="number"
                  min="0"
                  defaultValue={productDetails.Unit_Wt}
                  name="Unit_Wt"
                  onChange={(e) => {
                    setProductDetails({
                      ...productDetails,
                      Unit_Wt: parseFloat(e.target.value).toFixed(2),

                      // parseInt(e.target.value),
                      DC_Srl_Wt: (
                        parseFloat(productDetails?.Qty) *
                        parseFloat(e.target.value)
                      ).toFixed(2),
                      // DC_Srl_Amt:(parseFloat(productDetails?.Unit_Rate)*parseFloat(e.target.value)).toFixed(2)
                    });
                  }}
                  required

                  // onChange={(e) => {
                  //   setUnitWeight(e.target.value);
                  //   setTotalWeight(e.target.value * quantity);
                  //   // handleInputChange("unitWeight", e.target.value);
                  //   // setInputValues([
                  //   //   ...inputValues,
                  //   //   {
                  //   //     unitWeight: e.target.value,
                  //   //   },
                  //   // ]);
                  // }}
                  // required
                />
              </div>
              <div className="col-md-6">
                <b>Total Weight</b>
                <input
                  type="number"
                  min="0"
                  disabled
                  className="input-disabled"
                  value={productDetails?.DC_Srl_Wt}
                  // value={unitWeight * quantity}
                  // onChange={(e) => {
                  //   setTotalWeight(e.target.value);

                  //   // handleInputChange("totalWeight", e.target.value);
                  //   // setInputValues([
                  //   //   ...inputValues,
                  //   //   {
                  //   //     totalWeight: e.target.value,
                  //   //   },
                  //   // ]);
                  // }}
                  required
                />
              </div>
              <div className="col-md-6">
                <b>Unit Rate</b>
                <input
                  type="number"
                  min="0"
                  defaultValue={productDetails.Unit_Rate}
                  name="Unit_Rate"
                  onChange={(e) => {
                    setProductDetails({
                      ...productDetails,
                      Unit_Rate: parseFloat(e.target.value).toFixed(2),

                      // parseInt(e.target.value),
                      // DC_Srl_Wt:(parseFloat(productDetails?.Unit_Wt)*parseFloat(e.target.value)).toFixed(2),
                      DC_Srl_Amt: (
                        parseFloat(productDetails?.Qty) *
                        parseFloat(e.target.value)
                      ).toFixed(2),
                    });
                  }}
                  required

                  // onChange={(e) => {
                  //   setUnitRate(e.target.value);
                  //   setTotalAmount(e.target.value * quantity);

                  //   // handleInputChange("unitRate", e.target.value);
                  //   // setInputValues([
                  //   //   ...inputValues,
                  //   //   { unitRate: e.target.value },
                  //   // ]);
                  // }}
                  // required
                />
              </div>
              <div className="col-md-6">
                <b>Total Amount</b>
                <input
                  type="number"
                  min="0"
                  // value={totalAmount}
                  disabled
                  className="input-disabled"
                  value={productDetails?.DC_Srl_Amt}
                  required
                  // onChange={(e) => {
                  //   setTotalAmount(e.target.value);

                  //   // handleInputChange("totalAmount", e.target.value);
                  //   // setInputValues([
                  //   //   ...inputValues,
                  //   //   {
                  //   //     totalAmount: e.target.value,
                  //   //   },
                  //   // ]);
                  // }}
                />
              </div>
            </div>
            <div className="p-2"></div>
            <div className="px-2">
              <div className="d-flex justify-content-between">
                <button className="button-style m-0 p-0" onClick={handleCancel}>
                  Cancel
                </button>

                <button
                  disabled={
                    !(
                      productDetails.Dwg_No?.length > 0 &&
                      productDetails.Material?.length > 0 &&
                      productDetails.Excise_CL_no?.length > 0 &&
                      productDetails.Qty?.length > 0 &&
                      productDetails.Unit_Wt?.length > 0 &&
                      productDetails.DC_Srl_Wt?.length > 0 &&
                      productDetails.Unit_Rate?.length > 0 &&
                      productDetails.DC_Srl_Amt?.length > 0
                    )
                  }
                  className={
                    productDetails.Dwg_No?.length > 0 &&
                    productDetails.Material?.length > 0 &&
                    productDetails.Excise_CL_no?.length > 0 &&
                    productDetails.Qty?.length > 0 &&
                    productDetails.Unit_Wt?.length > 0 &&
                    productDetails.DC_Srl_Wt?.length > 0 &&
                    productDetails.Unit_Rate?.length > 0 &&
                    productDetails.DC_Srl_Amt?.length > 0
                      ? "button-style m-0 p-0"
                      : "button-style button-disabled m-0 p-0"
                  }
                  onClick={(e) => {
                    handleAddFunc();
                    e.preventDefault();

                    // console.log(
                    //   "kjskdfhsdkf",
                    //   productDetails.Dwg_No?.length > 0 &&
                    //     productDetails.Material?.length > 0 &&
                    //     productDetails.Excise_CL_no?.length > 0 &&
                    //     productDetails.Qty?.length > 0 &&
                    //     productDetails.Unit_Wt?.length > 0 &&
                    //     productDetails.DC_Srl_Wt?.length > 0 &&
                    //     productDetails.Unit_Rate?.length > 0 &&
                    //     productDetails.DC_Srl_Amt?.length > 0
                    // );
                    // // console.log("length", productDetails.Dwg_No.length);
                    // console.log("object", productDetails.Dwg_No?.length);
                    // console.log("object", productDetails.Material?.length);
                    // console.log("object", productDetails.Excise_CL_no?.length);
                    // console.log("object", productDetails.Qty?.length);
                    // console.log("object", productDetails.Unit_Wt?.length);
                    // console.log("object", productDetails.DC_Srl_Wt?.length);
                    // console.log("object", productDetails.Unit_Rate?.length);
                    // console.log("object", productDetails.DC_Srl_Amt?.length);
                    // e.preventDefault();
                  }}
                >
                  Add
                </button>
                {/* {productDetails.Dwg_No &&
                productDetails.material &&
                productDetails.Excise_CL_no &&
                productDetails.Qty &&
                productDetails.Unit_Wt &&
                productDetails.DC_Srl_Wt &&
                productDetails.Unit_Rate &&
                productDetails.DC_Srl_Amt ? (
                  <button
                  disabled = {productDetails.Dwg_No &&
                    productDetails.material &&
                    productDetails.Excise_CL_no &&
                    productDetails.Qty &&
                    productDetails.Unit_Wt &&
                    productDetails.DC_Srl_Wt &&
                    productDetails.Unit_Rate &&
                    productDetails.DC_Srl_Amt}
                    className= {(productDetails.Dwg_No &&
                      productDetails.material &&
                      productDetails.Excise_CL_no &&
                      productDetails.Qty &&
                      productDetails.Unit_Wt &&
                      productDetails.DC_Srl_Wt &&
                      productDetails.Unit_Rate &&
                      productDetails.DC_Srl_Amt)?
                    
                      "button-style m-0 p-0"
                    :
                    "button-style button-disabled m-0 p-0"
                  }
                    
                    
                    onClick={(e) => {
                      handleAddFunc();
                      e.preventDefault();
                      // eventpreventDefault;
                    }}
                    // type="sumbit"
                  >
                    Add
                  </button>
                ) : (
                  <button
                    className="button-style button-disabled m-0 p-0"
                    type="sumbit"
                    // onClick={handleAddFunc}
                  >
                    Add
                  </button>
                )} */}
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

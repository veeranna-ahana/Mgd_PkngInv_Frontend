import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import Axios from "axios";
import { toast } from "react-toastify";
import { apipoints } from "../../../../../api/PackInv_API/ReturnableDC/ReturnableDC";

function ConsigneeInfo({ handleInputChange, formData, updateFormData }) {
  const handleTaxSelection = async (selectedTaxPercent) => {
    const taxesWithSelectedPercent = formData.taxDetails.filter(
      (tax) => tax.Tax_Percent === selectedTaxPercent
    );

    const updatedSelectedTax = taxesWithSelectedPercent.map((tax) => ({
      ...tax,
      TaxableAmount: formData.taxableAmount,
      TaxAmount: parseFloat(
        (formData.taxableAmount * tax.Tax_Percent) / 100
      ).toFixed(2),
    }));

    try {
      const response = await Axios.post(apipoints.taxSelection, {
        selectedTax: updatedSelectedTax,
        dcInvNo: formData.dcInvNo,
      });

      const taxAmtSum = response.data.reduce(
        (sum, tax) => sum + parseFloat(tax.TaxAmt),
        0
      );

      updateFormData((prevData) => ({
        ...prevData,
        taxAmt: taxAmtSum.toFixed(2),
        selectedTax: response.data,
      }));
    } catch (error) {
      console.error("Error updating selectedTax:", error);
    }
  };

  const handleDeleteClick = () => {
    updateFormData((prevData) => ({
      ...prevData,
      selectedTax: [],
    }));
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-4 col-sm-12 mt-2">
          <div
            className="ip-box form-bg"
            style={{ height: "330px", padding: "10px" }}
          >
            <h5>
              <b>Consignee</b>
            </h5>

            <div className="row">
              <label className="form-label">Address</label>
              <textarea
                id="exampleFormControlTextarea1"
                rows="3"
                name="custAddress"
                style={{
                  width: "100%",
                  padding: "5px",
                  backgroundColor: "white",
                }}
                value={formData.custAddress}
                onChange={handleInputChange}
                disabled
              ></textarea>
            </div>

            <div className="row">
              <div className="col-md-6">
                <label className="form-label">City</label>

                <input
                  type="text"
                  className="in-fields"
                  name="custCity"
                  value={formData.custCity}
                  onChange={handleInputChange}
                  style={{ height: "30px", backgroundColor: "white" }}
                  disabled
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">PIN</label>
                <input
                  type="text"
                  className="in-fields"
                  name="custPin"
                  value={formData.custPin}
                  onChange={handleInputChange}
                  style={{ height: "30px", backgroundColor: "white" }}
                  disabled
                />
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-md-6">
                <label className="form-label">State</label>
                <select
                  id=""
                  className="ip-select mt-2 in-fields"
                  name="custState"
                  value={formData.custState}
                  onChange={handleInputChange}
                  style={{ height: "30px", backgroundColor: "white" }}
                  disabled
                >
                  <option selected disabled hidden>
                    {formData.custState}
                  </option>
                  {formData.states?.map((st) => (
                    <option value={st.State}>{st.State}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">GST No</label>
                <input
                  type="text"
                  className="in-fields"
                  name="gstNo"
                  value={formData.gstNo}
                  onChange={handleInputChange}
                  style={{ height: "30px", backgroundColor: "white" }}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-sm-12 mt-2">
          <div
            className="ip-box form-bg"
            style={{ height: "330px", padding: "10px" }}
          >
            <h5>
              <b>Delivery Details</b>
            </h5>

            <div className="row">
              <label className="form-label">Address</label>
              <textarea
                id="exampleFormControlTextarea1"
                rows="3"
                style={{
                  width: "100%",
                  padding: "5px",
                  backgroundColor: "white",
                }}
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={handleInputChange}
                disabled={
                  formData.dcStatus === "Despatched" ||
                  formData.dcStatus === "Closed" ||
                  formData.dcStatus === "Cancelled"
                }
              ></textarea>
            </div>

            <div className="row">
              <label className="form-label">State</label>

              <select
                id=""
                className="ip-select in-fields mt-2"
                name="deliveryState"
                onChange={handleInputChange}
                value={formData.deliveryState}
                style={{ height: "30px" }}
                disabled={
                  formData.dcStatus === "Despatched" ||
                  formData.dcStatus === "Closed" ||
                  formData.dcStatus === "Cancelled"
                }
              >
                <option value="" selected disabled hidden>
                  Select State
                </option>
                {formData.states?.map((st) => (
                  <option>{st.State}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-sm-12 mt-2">
          <div
            className="ip-box form-bg"
            style={{ height: "330px", padding: "10px" }}
          >
            <h5>
              <b>Tax Details</b>
            </h5>

            <div className="row">
              <div className="col-md-6 col-sm-12">
                <label className="form-label">Select Taxes</label>
                <select
                  id=""
                  className="ip-select mt-2 in-fields"
                  name="taxName"
                  onChange={(e) => handleTaxSelection(e.target.value)}
                  style={{ height: "30px" }}
                  disabled={
                    formData.dcStatus === "Despatched" ||
                    formData.dcStatus === "Closed" ||
                    formData.dcStatus === "Cancelled" ||
                    !formData.dcInvNo
                  }
                >
                  {/* <option selected disabled hidden>
                    {formData.TaxName}
                  </option> */}
                  <option value="" selected disabled hidden>
                    Select Taxes
                  </option>
                  {formData.taxDetails.map((tax) => (
                    <option value={tax.Tax_Percent}>{tax.TaxName}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 col-sm-12">
                <label className="form-label"></label>
                <button
                  className={
                    formData.dcStatus === "Despatched" ||
                    formData.dcStatus === "Closed" ||
                    formData.dcStatus === "Cancelled"
                      ? "button-style button-disabled"
                      : "button-style"
                  }
                  onClick={handleDeleteClick}
                  disabled={
                    formData.dcStatus === "Despatched" ||
                    formData.dcStatus === "Closed"
                  }
                >
                  Delete Taxes
                </button>
              </div>
            </div>

            <div
              className="row mt-3"
              style={{
                overflowY: "scroll",
                overflowX: "scroll",
                maxHeight: "250px",
              }}
            >
              {/* <Table
                striped
                className="table-data border"
                style={{ border: "1px" }}
              >
                <thead className="tableHeaderBGColor">
                  <tr>
                    <th style={{ whiteSpace: "nowrap" }}>Tax</th>
                    <th style={{ whiteSpace: "nowrap" }}>Taxable Amount</th>
                    <th style={{ whiteSpace: "nowrap" }}>Tax Amount</th>
                    <th style={{ whiteSpace: "nowrap" }}>Tax Percent</th>
                  </tr>
                </thead>
                <tbody className="tablebody">
                  {formData.selectedTax.map((tax, index) => {
                    const taxAmt =
                      (formData.taxableAmount * tax.Tax_Percent) / 100;

                    return (
                      <tr key={index}>
                        <td style={{ whiteSpace: "nowrap" }}>{tax.TaxName}</td>
                        <td style={{ whiteSpace: "nowrap" }}>
                          {formData.taxableAmount}
                        </td>
                        <td style={{ whiteSpace: "nowrap" }}>
                          {taxAmt.toFixed(2)}
                        </td>
                        <td style={{ whiteSpace: "nowrap" }}>
                          {tax.Tax_Percent}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table> */}

              <div style={{ height: "150px" }}>
                <Table
                  striped
                  className="table-data border"
                  style={{ border: "1px" }}
                >
                  <thead className="tableHeaderBGColor">
                    <tr>
                      <th style={{ whiteSpace: "nowrap" }}>Tax</th>
                      <th style={{ whiteSpace: "nowrap" }}>Taxable Amount</th>
                      <th style={{ whiteSpace: "nowrap" }}>Tax Amount</th>
                      {/* <th style={{ whiteSpace: "nowrap" }}>dc_inv TaxId</th>
                      <th style={{ whiteSpace: "nowrap" }}>Dc_inv_No</th>
                      <th style={{ whiteSpace: "nowrap" }}>DcTaxID</th>
                      <th style={{ whiteSpace: "nowrap" }}>TaxID</th>
                      <th style={{ whiteSpace: "nowrap" }}>TaxOn</th>
                      <th style={{ whiteSpace: "nowrap" }}>TaxPercent</th>
                      <th style={{ whiteSpace: "nowrap" }}>ToWords</th> */}
                    </tr>
                  </thead>
                  {formData.dcStatus === "Despatched" ||
                  formData.dcStatus === "Closed" ? (
                    <tbody className="tablebody">
                      {formData.selectedTax.map((tax, index) => (
                        <tr key={index}>
                          <td style={{ whiteSpace: "nowrap" }}>
                            {tax.Tax_Name}
                          </td>
                          <td style={{ whiteSpace: "nowrap" }}>
                            {tax.TaxableAmount}
                          </td>
                          <td style={{ whiteSpace: "nowrap" }}>{tax.TaxAmt}</td>
                          {/* <td style={{ whiteSpace: "nowrap" }}>
                            {tax.dc_invTaxId}
                          </td>
                          <td style={{ whiteSpace: "nowrap" }}>
                            {tax.Dc_inv_No}
                          </td>
                          <td style={{ whiteSpace: "nowrap" }}>
                            {tax.DcTaxID}
                          </td>
                          <td style={{ whiteSpace: "nowrap" }}>{tax.TaxID}</td>
                          <td style={{ whiteSpace: "nowrap" }}>{tax.TaxOn}</td>
                          <td style={{ whiteSpace: "nowrap" }}>
                            {tax.TaxPercent}
                          </td>
                          <td style={{ whiteSpace: "nowrap" }}>{tax.Under}</td> */}
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    <tbody className="tablebody">
                      {formData.selectedTax.map((tax, index) => {
                        const taxAmt =
                          (formData.taxableAmount * tax.TaxPercent) / 100;

                        return (
                          <tr key={index}>
                            <td style={{ whiteSpace: "nowrap" }}>
                              {tax.Tax_Name}
                            </td>
                            <td style={{ whiteSpace: "nowrap" }}>
                              {formData.taxableAmount.toFixed(2)}
                            </td>
                            <td style={{ whiteSpace: "nowrap" }}>
                              {taxAmt.toFixed(2)}
                            </td>
                            {/* <td style={{ whiteSpace: "nowrap" }}>
                              {tax.dc_invTaxId}
                            </td>
                            <td style={{ whiteSpace: "nowrap" }}>
                              {tax.Dc_inv_No}
                            </td>
                            <td style={{ whiteSpace: "nowrap" }}>
                              {tax.DcTaxID}
                            </td>
                            <td style={{ whiteSpace: "nowrap" }}>
                              {tax.TaxID}
                            </td>
                            <td style={{ whiteSpace: "nowrap" }}>
                              {tax.TaxOn}
                            </td>
                            <td style={{ whiteSpace: "nowrap" }}>
                              {tax.TaxPercent}
                            </td>
                            <td style={{ whiteSpace: "nowrap" }}>
                              {tax.Under}
                            </td> */}
                          </tr>
                        );
                      })}
                    </tbody>
                  )}
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConsigneeInfo;

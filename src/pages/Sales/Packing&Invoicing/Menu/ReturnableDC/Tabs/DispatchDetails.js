import React, { useEffect } from "react";

function DispatchDetails({ handleInputChange, formData, updateFormData }) {
  const totalTaxAmount = formData.selectedTax.reduce(
    (sum, tax) => sum + parseFloat(tax.TaxAmt || 0),
    0
  );

  return (
    <div>
      <div className="row mt-2">
        <h5>
          <b>Dispatch Details</b>
        </h5>
        <div className="row">
          <div className="col-md-3 col-sm-12">
            <label className="form-label">Inspected By</label>
            <input
              type="text"
              value={formData.inspectedBy}
              name="inspectedBy"
              disabled
            />
          </div>
          <div className="col-md-3 col-sm-12">
            <label className="form-label">Packed By</label>
            <input
              type="text"
              value={formData.packedBy}
              name="packedBy"
              disabled
            />
          </div>
          <div className="col-md-3 col-sm-12">
            <label className="form-label">Total Weight</label>
            <input
              type="text"
              value={formData.totalWeight}
              name="totalWeight"
              disabled
            />
          </div>
          <div className="col-md-3 col-sm-12">
            <label className="form-label">Scrap Weight</label>
            <input
              type="text"
              name="scrapWeight"
              value={formData.scrapWeight}
              onChange={handleInputChange}
              disabled={
                formData.dcStatus === "Despatched" ||
                formData.dcStatus === "Closed" ||
                formData.dcStatus === "Cancelled"
              }
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-3 col-sm-12">
            <label className="form-label">Date Time</label>
            <input
              className="mt-1"
              type="text"
              name="dcDate"
              value={formData.dcDate}
              disabled
            />
          </div>
          <div className="col-md-3 col-sm-12">
            <label className="form-label">Mode</label>

            <select
              id=""
              className="ip-select mt-1"
              value={formData.selectedMode}
              name="selectedMode"
              onChange={handleInputChange}
              disabled={
                formData.dcStatus === "Despatched" ||
                formData.dcStatus === "Closed" ||
                formData.dcStatus === "Cancelled"
              }
            >
              <option disabled hidden value="">
                Select a mode
              </option>
              {formData.modeList.map((mode, index) => (
                <option key={index} value={mode}>
                  {mode}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3 col-sm-12">
            <label className="form-label">Veh/Docu Details</label>
            <input
              type="text"
              name="vehicleDetails"
              value={formData.vehicleDetails}
              onChange={handleInputChange}
              disabled={
                formData.dcStatus === "Despatched" ||
                formData.dcStatus === "Closed" ||
                formData.dcStatus === "Cancelled"
              }
            />
          </div>
          <div className="col-md-3 col-sm-12">
            <label className="form-label">E Way Ref</label>
            <input
              type="text"
              name="eWayRef"
              value={formData.eWayRef}
              onChange={handleInputChange}
              disabled
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-3 col-sm-12">
            <label className="form-label">Net Value</label>
            <input
              type="number"
              value={formData.taxableAmount}
              name="totalValue"
              disabled
            />
          </div>
          <div className="col-md-3 col-sm-12">
            <label className="form-label">Tax Amount</label>
            <input
              type="text"
              value={totalTaxAmount.toFixed(2)}
              name="totalTaxAmount"
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DispatchDetails;

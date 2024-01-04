import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import Axios from "axios";
import { apipoints } from "../../../../../api/PackInv_API/ReturnableDC/ReturnableDC";

function AddNew({
  showAddModal,
  setShowAddModal,
  closeAddModal,
  handleInputChange,
  formData,
  updateFormData,
}) {
  const fetchMaterials = async () => {
    try {
      const response = await Axios.get(apipoints.materials);
      if (response.status === 200) {
        const materialsData = response.data.map((item) => item.Material);
        const ExciseClNoData = response.data.map((item) => item.ExciseCLNo);

        updateFormData({
          ...formData,
          materials: materialsData,
          exciseClNos: ExciseClNoData,
        });
      } else {
        throw new Error("Failed to fetch materials");
      }
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleQtyBlurValidate = () => {
    if (formData.uom === "Kg") {
      updateFormData((prevData) => ({
        ...prevData,
        weight: formData.quantity,
      }));
    }

    if (formData.unitRate) {
      const total_value =
        parseFloat(formData.unitRate) * parseFloat(formData.quantity);
      updateFormData((prevData) => ({
        ...prevData,
        totalValue: total_value,
      }));
    } else {
      updateFormData((prevData) => ({
        ...prevData,
        totalValue: 0,
      }));
    }
  };

  const handleRateValidate = () => {
    if (formData.quantity) {
      const total_value =
        parseFloat(formData.unitRate) * parseFloat(formData.quantity);
      updateFormData((prevData) => ({
        ...prevData,
        totalValue: total_value,
      }));
    } else {
      updateFormData((prevData) => ({
        ...prevData,
        totalValue: 0,
      }));
    }
  };

  const handleTotalValueValidate = () => {
    if (formData.quantity && parseFloat(formData.quantity) !== 0) {
      const rate =
        parseFloat(formData.totalValue) / parseFloat(formData.quantity);
      updateFormData((prevData) => ({
        ...prevData,
        unitRate: rate.toFixed(2),
      }));
    } else {
      updateFormData((prevData) => ({
        ...prevData,
        unitRate: 0,
      }));
    }
  };

  const fetchTableData = async () => {
    try {
      const response = await Axios.post(apipoints.getTableData, {
        dcInvNo: formData.dcInvNo,
      });
      if (response.status === 200) {
        const tableData = response.data;

        updateFormData({
          ...formData,
          tableData,
        });
      } else {
        console.error("Failed to fetch data from API");
      }
    } catch (error) {
      console.error("Error while fetching data from API:", error);
    }
  };

  const handleSubmit = async () => {
    if (!formData.partName || !formData.itemDescription) {
      toast.error("Values Required in Part Name or Item Description");
    } else if (!formData.material) {
      toast.error("Please select a material");
    } else if (!formData.quantity || Number(formData.quantity) <= 0) {
      toast.error("Values Required in Quantity");
    } else if (!formData.uom) {
      toast.error("Please select UOM");
    } else if (!formData.unitRate || Number(formData.unitRate <= 0)) {
      toast.error("Values Required in Unit Rate");
    } else if (!formData.weight || Number(formData.weight) <= 0) {
      toast.error("Value Required in Total Weight");
    } else {
      try {
        const response = await Axios.post(apipoints.returnDetails, {
          dcInvNo: formData.dcInvNo,
          custCode: formData.custCode,
          partName: formData.partName,
          itemDescription: formData.itemDescription,
          material: formData.material,
          quantity: formData.quantity,
          uom: formData.uom,
          unitRate: formData.unitRate,
          totalValue: formData.quantity * formData.unitRate,
          hsnCode: formData.hsnCode,
          weight: formData.weight,
          returned: formData.returned,
          srlType: formData.srlType,
        });

        if (response.status === 200) {
          toast.success("Data submitted successfully!");
          fetchTableData();
          setShowAddModal(false);
        } else {
          toast.error("Failed to submit data");
        }
      } catch (error) {
        console.error("Error while submitting data:", error);
      }
    }
  };

  const newInputValues = (value) => {
    const isValidNumericValue =
      value === "" || (!isNaN(value) && parseFloat(value) >= 0);

    return isValidNumericValue ? value : 0;
  };

  const handleSpecificInputChange = (name, value) => {
    const newValues = newInputValues(value);

    updateFormData((prevData) => ({
      ...prevData,
      [name]: newValues,
    }));
  };

  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

  const blockInvalidQtyChar = (e) =>
    ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault();

  return (
    <div>
      <Modal show={showAddModal} onHide={closeAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>DC Return Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="row">
            <div className="col-md-4 col-sm-12">
              <label className="form-label">Part Name</label>
            </div>

            <div className="col-md-6 col-sm-12">
              <input
                type="text"
                id="partName"
                name="partName"
                value={formData.partName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 col-sm-12">
              <label className="form-label" style={{ whiteSpace: "nowrap" }}>
                Item Description
              </label>
            </div>

            <div className="col-md-6 col-sm-12">
              <textarea
                id="itemDescription"
                rows="2"
                name="itemDescription"
                style={{ width: "210px" }}
                value={formData.itemDescription}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 col-sm-12">
              <label className="form-label">Material</label>
            </div>

            <div className="col-md-6 col-sm-12 mt-2">
              <select
                id=""
                className="ip-select"
                name="material"
                value={formData.material}
                onChange={handleInputChange}
              >
                <option>Select Material</option>
                {formData.materials &&
                  formData.materials.map((materialItem, index) => (
                    <option key={index} value={materialItem}>
                      {materialItem}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 col-sm-12">
              <label className="form-label">Quantity</label>
            </div>

            <div className="col-md-6 col-sm-12">
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onBlur={handleRateValidate}
                onChange={(e) =>
                  handleSpecificInputChange("quantity", e.target.value)
                }
                onKeyDown={blockInvalidQtyChar}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 col-sm-12">
              <label className="form-label">UOM</label>
            </div>

            <div className="col-md-6 col-sm-12 mt-2">
              <select
                id=""
                className="ip-select"
                name="uom"
                value={formData.uom}
                onChange={handleInputChange}
              >
                <option value="">Select UOM</option>
                {formData.uomList.map((uomOption, index) => (
                  <option key={index} value={uomOption}>
                    {uomOption}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 col-sm-12">
              <label className="form-label">Unit Rate</label>
            </div>

            <div className="col-md-6 col-sm-12">
              <input
                type="number"
                id="unitRate"
                name="unitRate"
                value={formData.unitRate}
                onChange={(e) =>
                  handleSpecificInputChange("unitRate", e.target.value)
                }
                onBlur={handleRateValidate}
                onKeyDown={blockInvalidChar}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 col-sm-12">
              <label className="form-label">Total Value</label>
            </div>

            <div className="col-md-6 col-sm-12">
              <input
                type="number"
                id="totalValue"
                name="totalValue"
                value={parseFloat(formData.totalValue).toFixed(2)}
                onChange={(e) =>
                  handleSpecificInputChange("totalValue", e.target.value)
                }
                onBlur={handleTotalValueValidate}
                onKeyDown={blockInvalidChar}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 col-sm-12">
              <label className="form-label">HSN Code</label>
            </div>

            <div className="col-md-6 col-sm-12">
              <input
                type="text"
                id="hsnCode"
                name="hsnCode"
                value={formData.hsnCode}
                onChange={handleInputChange}
                disabled
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 col-sm-12">
              <label className="form-label">Weight</label>
            </div>

            <div className="col-md-6 col-sm-12">
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={(e) =>
                  handleSpecificInputChange("weight", e.target.value)
                }
                onKeyDown={blockInvalidChar}
              />
            </div>
          </div>

          <div className=" row justify-content-center mt-3">
            <button
              className="button-style "
              style={{ width: "100px" }}
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AddNew;

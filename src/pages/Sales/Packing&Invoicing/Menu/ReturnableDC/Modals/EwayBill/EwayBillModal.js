import React from "react";
import { Modal } from "react-bootstrap";

function EwayBillModal({
  ewayBill,
  closeEwayBill,
  handleInputChange,
  formData,
  openEwayBillSave,
}) {
  return (
    <Modal show={ewayBill} onHide={closeEwayBill} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>E Way Bill</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <b>
            <h5>
              <span
                style={{
                  background: "#2b3a55",
                  color: "white",
                  width: "auto",
                  whiteSpace: "nowrap",
                  padding: "1.5px",
                }}
              >
                {formData.gstNo}
              </span>{" "}
              <span
                style={{
                  background: "#2b3a55",
                  color: "white",
                  width: "auto",
                  whiteSpace: "nowrap",
                  padding: "1.5px",
                  marginLeft: "2%",
                }}
              >
                {formData.custName}
              </span>
            </h5>
          </b>
        </div>

        <div className="row mt-2">
          <div className="col-md-4">
            <label className="form-label">Inv/DC No</label>
            <input type="text" disabled value={formData.dcType} />
          </div>

          <div className="col-md-4 mt-2">
            <input
              className="mt-4"
              type="text"
              disabled
              value={formData.dcNo}
            />
          </div>

          <div className="col-md-4 mt-2">
            <input
              className="mt-4"
              type="text"
              disabled
              value={formData.dcDate}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <label className="form-label">Place</label>
            <input type="text" disabled value={formData.custCity} />
          </div>

          <div className="col-md-4 mt-2">
            <input
              className="mt-4"
              type="text"
              disabled
              value={formData.custState}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Transport</label>
            <input type="text" disabled value={formData.vehicleDetails} />
          </div>
        </div>
        <div className="row mt-2">
          <label className="form-label">Delivery</label>
          <textarea
            rows="3"
            name="deliveryAddress"
            style={{
              width: "100%",
              padding: "5px",
              backgroundColor: "white",
            }}
            value={formData.deliveryAddress}
            disabled
          ></textarea>
        </div>

        <div className="row">
          <div className="col-md-4">
            <label className="form-label">Value</label>
            <input type="text" disabled value={formData.taxableAmount} />
          </div>

          <div className="col-md-4">
            <label className="form-label">Tax</label>
            <input type="text" disabled value={formData.taxAmt} />
          </div>

          <div className="col-md-4">
            <label className="form-label">E Way Bill No</label>
            <input
              type="text"
              name="ewayBillNo"
              value={formData.ewayBillNo}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="row justify-content-center mt-3">
        <button
          className="button-style "
          style={{ width: "100px" }}
          onClick={openEwayBillSave}
        >
          Save
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default EwayBillModal;

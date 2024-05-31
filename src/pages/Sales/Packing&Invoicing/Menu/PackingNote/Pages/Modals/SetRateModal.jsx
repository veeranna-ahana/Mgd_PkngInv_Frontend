import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Tab, Table, Tabs } from "react-bootstrap";
import { toast } from "react-toastify";

import Axios from "axios";
import { apipoints } from "../../../../../../api/PackInv_API/PackingNote/PackingNote";

export default function SetRateModal(props) {
  const closeModal = () => {
    props.fetchData();
    props.setShowSetRateModal(false);
  };

  const onChangeInput = (key, JW_Rate, Mtrl_rate) => {
    let arr = [];
    for (let i = 0; i < props.invDetailsData.length; i++) {
      const element = props.invDetailsData[i];

      if (i === key) {
        element.JW_Rate = parseFloat(JW_Rate || 0);
        element.Mtrl_rate = parseFloat(Mtrl_rate || 0);
        element.Unit_Rate =
          parseFloat(JW_Rate || 0) + parseFloat(Mtrl_rate || 0);
      }
      arr.push(element);
    }

    props.setInvDetailsData(arr);
  };

  const updatingTheRateFunction = () => {
    let newInvRegister = props.invRegisterData || {};

    Axios.post(apipoints.updateRatesPN, {
      newRates: props.invDetailsData,
    }).then((res) => {
      if (res.data) {
        toast.success("Set Rate Successful");

        let newNetTotal = 0;
        let newRoundOff = 0;
        let newGrandTotal = 0;

        for (let i = 0; i < props.invDetailsData.length; i++) {
          const element = props.invDetailsData[i];

          newNetTotal =
            newNetTotal +
            parseFloat(element.Qty) *
              (parseFloat(element.JW_Rate) + parseFloat(element.Mtrl_rate));
          // console.log("new net ttoal", newNetTotal);
        }

        newGrandTotal = Math.round(newNetTotal);
        newRoundOff = parseFloat(newGrandTotal) - parseFloat(newNetTotal);

        // setting the nettotal , discount, del charg, tax amount, inv total, round off, grand total
        newInvRegister.Net_Total = newNetTotal.toFixed(2);
        newInvRegister.Discount = (0).toFixed(2);
        newInvRegister.Del_Chg = (0).toFixed(2);
        newInvRegister.TaxAmount = (0).toFixed(2);
        newInvRegister.InvTotal = newNetTotal.toFixed(2);
        newInvRegister.Round_Off = newRoundOff.toFixed(2);
        newInvRegister.GrandTotal = newGrandTotal.toFixed(2);

        // console.log("newInvRegister", newInvRegister);

        Axios.post(apipoints.updatePNProfileData, {
          invRegisterData: newInvRegister,
          invTaxData: [],
        }).then((res) => {
          if (res) {
            if (res.data.status === 1) {
              // props.fetchData();

              // set tax dropdown null
              document.getElementById("taxDropdown").value = "none";

              toast.success(res.data.comment);
              closeModal();
            } else if (res.data.status === 0) {
              toast.error(res.data.comment);
            } else {
              toast.error("Uncaught Error");
            }
          }
        });
      } else {
        toast.warning("Backend Error");
      }
    });
  };

  const numbValidations = (e) => {
    if (
      e.which === 38 ||
      e.which === 40 ||
      ["e", "E", "+", "-"].includes(e.key)
    ) {
      e.preventDefault();
    }
  };

  return (
    <>
      <Modal
        size="lg"
        show={props.showSetRateModal}
        onHide={closeModal}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="example-custom-modal-styling-title"
            style={{ fontSize: "14px" }}
          >
            Set Rates
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="d-flex col-md-4" style={{ gap: "30px" }}>
              <label className="form-label">Customer</label>
              <input
                type="text"
                defaultValue={props.setRateConsumerData[0]?.Cust_Name}
                disabled
                className="input-disabled"
              />
            </div>
            <div className="d-flex col-md-4" style={{ gap: "15px" }}>
              <label className="form-label" style={{ whiteSpace: "nowrap" }}>
                Sales Contact
              </label>
              <input
                type="text"
                defaultValue={props.setRateConsumerData[0]?.SalesContact}
                disabled
                className="input-disabled"
              />
            </div>
            <div className="d-flex col-md-4" style={{ gap: "60px" }}>
              <label className="form-label" style={{ whiteSpace: "nowrap" }}>
                PO No.
              </label>
              <input
                type="text"
                defaultValue={props.setRateConsumerData[0]?.PO_No}
                disabled
                className="input-disabled"
              />
            </div>
            <div className="d-flex col-md-4" style={{ gap: "10px" }}>
              <label className="form-label" style={{ whiteSpace: "nowrap" }}>
                Schedule No.
              </label>
              <input
                type="text"
                defaultValue={props.setRateConsumerData[0]?.ScheduleId}
                disabled
                className="input-disabled"
              />
            </div>
            <div className="d-flex col-md-4" style={{ gap: "10px" }}>
              <label className="form-label" style={{ whiteSpace: "nowrap" }}>
                Schedule Type
              </label>
              <input
                type="text"
                defaultValue={props.setRateConsumerData[0]?.ScheduleType}
                disabled
                className="input-disabled"
              />
            </div>
            <div className="d-flex col-md-4" style={{ gap: "10px" }}>
              <label className="form-label" style={{ whiteSpace: "nowrap" }}>
                Schedule Status
              </label>
              <input
                type="text"
                defaultValue={props.setRateConsumerData[0]?.Schedule_Status}
                disabled
                className="input-disabled"
              />
            </div>
          </div>
          <div className="border-top m-3"></div>

          {/* table */}

          <div>
            <Table
              striped
              className="table-data border"
              style={{ border: "1px" }}
            >
              <thead className="tableHeaderBGColor">
                <tr>
                  <th>SL No</th>
                  <th>Drawing Name</th>
                  <th>Material</th>
                  <th>Job Work Cost</th>
                  <th>Material Cost</th>
                </tr>
              </thead>
              <tbody className="tablebody">
                {props.invDetailsData.map((val, i) => (
                  <>
                    <tr>
                      <td>{i + 1}</td>
                      <td>{val.Dwg_No}</td>
                      <td>{val.Mtrl}</td>

                      <td>
                        <input
                          type="number"
                          // min="0"
                          className="border-0"
                          value={val.JW_Rate}
                          onKeyDown={numbValidations}
                          onChange={(e) => {
                            e.target.value = e.target.value || 0;

                            if (parseInt(e.target.value) < 0) {
                              e.target.value = parseInt(e.target.value) * -1;
                              toast.warning("Job Work Cost can't be negative");
                            }

                            onChangeInput(i, e.target.value, val.Mtrl_rate);
                          }}
                        />
                      </td>

                      <td>
                        <input
                          type="number"
                          // min="0"
                          value={val.Mtrl_rate}
                          onKeyDown={numbValidations}
                          onChange={(e) => {
                            e.target.value = e.target.value || 0;

                            if (parseInt(e.target.value) < 0) {
                              e.target.value = parseInt(e.target.value) * -1;
                              toast.warning("Material Cost can't be negative");
                            }

                            onChangeInput(i, val.JW_Rate, e.target.value);
                          }}
                          disabled={
                            props.invRegisterData?.DC_InvType === "Job Work" ||
                            props.setRateConsumerData[0]?.ScheduleType ===
                              "Service"
                          }
                          className={
                            props.invRegisterData?.DC_InvType === "Job Work" ||
                            props.setRateConsumerData[0]?.ScheduleType ===
                              "Service"
                              ? "border-0 input-disabled"
                              : "border-0"
                          }
                        />
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="" style={{ float: "right" }}>
            <button className="button-style" onClick={updatingTheRateFunction}>
              Save
            </button>

            <button className="button-style" onClick={closeModal}>
              Close
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

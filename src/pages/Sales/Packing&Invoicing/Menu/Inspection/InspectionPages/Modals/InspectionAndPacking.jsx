import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, ModalFooter, Tab, Table, Tabs } from "react-bootstrap";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";

import Axios from "axios";
import ConfirmationModal from "./ConfirmationModal";
export default function InspectionAndPacking(props) {
  //   const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  useEffect(() => {
    props.setInsAndPack({
      inspectedBy: props.headerData[0]?.SalesContact,
      packedBy: props.headerData[0]?.Inspected_By,
    });
  }, [props.InspectionAndPackingModal]);

  const closeModal = () => {
    props.setInspectionAndPackingModal(false);
    // props.setConfirmModalOpen(false);
  };

  const yesClicked = () => {
    // console.log("clicked yesss");
    // props.yesClickedFunc();
    props.setConfirmModalOpen(true);
    // closeModal();
    // props.setInsAndPack({
    //   inspectedBy: props.headerData[0].SalesContact,
    //   packedBy: props.headerData[0].Inspected_By,
    // });
  };

  const changeInputs = (e) => {
    props.setInsAndPack({
      ...props.insAndPack,
      [e.target.name]: e.target.value,
    });
  };

  // console.log("asas", props.insAndPack);
  return (
    <>
      <Modal
        //   centered
        show={props.InspectionAndPackingModal}
        onHide={closeModal}
        style={{ background: "#4d4d4d57" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Inspection and Packing Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="">
            <div className="row">
              <label className="form-label col-md-4 m-0">Inspected by</label>
              <div className="col-md-7">
                <input
                  value={props.insAndPack?.inspectedBy || ""}
                  name="inspectedBy"
                  onChange={changeInputs}
                />
              </div>
            </div>
            <div className="p-1"></div>
            <div className="row">
              <label className="form-label col-md-4 m-0">Packed by</label>
              <div className="col-md-7">
                <input
                  value={props.insAndPack?.packedBy || ""}
                  name="packedBy"
                  onChange={changeInputs}
                />{" "}
              </div>
            </div>
          </form>
          {/* <span>odallllllll</span> */}
          {/* <span>{props.message}</span> */}
        </Modal.Body>
        <Modal.Footer className="d-flex flex-row justify-content-end">
          <button
            disabled={
              props.insAndPack.inspectedBy === undefined ||
              props.insAndPack.inspectedBy === null ||
              props.insAndPack.inspectedBy === "" ||
              props.insAndPack.packedBy === undefined ||
              props.insAndPack.packedBy === null ||
              props.insAndPack.packedBy === ""
            }
            className={
              props.insAndPack.inspectedBy === undefined ||
              props.insAndPack.inspectedBy === null ||
              props.insAndPack.inspectedBy === "" ||
              props.insAndPack.packedBy === undefined ||
              props.insAndPack.packedBy === null ||
              props.insAndPack.packedBy === ""
                ? "button-style button-disabled m-0 me-3"
                : "button-style m-0 me-3"
            }
            // className="button-style m-0 me-3"
            style={{ width: "60px" }}
            onClick={yesClicked}
          >
            Ok
          </button>
          {/* 
          <button
            className="button-style m-0"
            style={{ width: "60px", background: "rgb(173, 173, 173)" }}
            onClick={closeModal}
          >
            No
          </button> */}
        </Modal.Footer>
      </Modal>

      {/* <div>
        <ConfirmationModal
          setConfirmModalOpen={setConfirmModalOpen}
          confirmModalOpen={confirmModalOpen}
        />
      </div> */}
    </>
  );
}

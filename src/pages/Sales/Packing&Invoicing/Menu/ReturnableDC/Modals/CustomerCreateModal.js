import React, { useState } from "react";
import { Modal } from "react-bootstrap";

function CustomerCreateModal({
  showCreateNewModal,
  handleCloseModal,
  handlePasswordEntered,
}) {
  const [password, setPassword] = useState("");
  return (
    <Modal show={showCreateNewModal} onHide={handleCloseModal} size="md">
      <Modal.Header closeButton>
        <Modal.Title style={{fontSize:'14px'}}>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{fontSize:'12px'}}>
        Customer count exceeds the limit. Do you want to continue please enter
        the password?
        <div className="d-flex" style={{gap:'10px'}}>
          <label className="form-label">Password:</label>
          <input
            className="in-field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="button-style"
          style={{ width: "50px" }}
          onClick={() => handlePasswordEntered(password)}
        >
          Yes
        </button>

        <button
          className="button-style"
          style={{ width: "50px", backgroundColor: "rgb(173, 173, 173)" }}
          onClick={handleCloseModal}
        >
          No
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default CustomerCreateModal;

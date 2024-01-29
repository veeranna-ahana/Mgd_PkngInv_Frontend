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
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Customer count exceeds the limit. Do you want to continue please enter
        the password?
        <div>
          <label>Password:</label>
          <input
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

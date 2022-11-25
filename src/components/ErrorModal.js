import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

export function ErrorModal({ error, errorMessage, setError }) {
  const toggle = () => setError(!error);

  return (
    <div>
      <Modal isOpen={error} toggle={toggle}>
        <ModalBody>{errorMessage.error.message}</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Ok
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

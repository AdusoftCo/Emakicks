import React, { useEffect, useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";

const SplashModal = ({ onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 5000); // auto-close after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShow(false);
    if (onClose) onClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header>
        <Modal.Title>Ofertas Exclusivas</Modal.Title>
        <Button
          variant="close"
          aria-label="Close"
          onClick={handleClose}
        />
      </Modal.Header>
      <Modal.Body className="text-center">
        <Spinner animation="border" role="status" className="mb-3">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Estamos preparando tus ofertas…</p>
      </Modal.Body>
    </Modal>
  );
};

export default SplashModal;

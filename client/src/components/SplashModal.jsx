import React, { useEffect, useState } from "react";
import { Modal, Button, Spinner, Carousel } from "react-bootstrap";

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
        <Modal.Title>Estamos en Galeria FERIA DEL SOL - Once !!</Modal.Title>
        <Button
          variant="close"
          aria-label="Close"
          onClick={handleClose}
        />
      </Modal.Header>
      <Modal.Body className="text-center">
      <Carousel indicators={false} controls={false} interval={2000}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="./assets/localEX2024.png"
              alt="Primera foto"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="./assets/fotoGale2024.png"
              alt="Segunda foto"
            />
          </Carousel.Item>
        </Carousel>

        <Spinner animation="border" role="status" className="mb-3">
          <span className="visually-hidden">Cargando ...</span>
        </Spinner>
        <p>FERIA DE OFERTAS …</p>
      </Modal.Body>
    </Modal>
  );
};

export default SplashModal;

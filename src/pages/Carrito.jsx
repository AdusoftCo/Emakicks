// Carrito.jsx

import React, { useContext } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // <-- New import
import { CartContext } from '../components/CartContext';

const BASE_IMAGE_URL = 'http://localhost/emakick2/imagenes/';

const currencyFormatter = new Intl.NumberFormat('es-AR', {
    style: 'decimal',
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});

const Carrito = () => {
    // Usamos las nuevas funciones del contexto
    const { carrito, eliminarDelCarrito, aumentarCantidad, disminuirCantidad, vaciarCarrito } = useContext(CartContext);
    
    // El subtotal ahora usa la propiedad `quantity` en lugar de `cantidad`
    const subtotal = carrito.reduce((acc, item) => acc + (item.precio_oferta || item.precio_doc) * item.quantity, 0);
    const shippingCost = 1500;
    const finalTotal = subtotal + shippingCost;

    const handleCheckout = () => {
        // This is a placeholder function. You would add your payment gateway logic here.
        console.log('Iniciando proceso de compra...');
        // For example, you might redirect to a checkout page or a payment provider.
    };

    if (carrito.length === 0) {
        return (
            <Container className="mt-4 text-center">
                <h3>Tu carrito está vacío</h3>
                <p>
                    <Link to="/" className="text-decoration-none">Ver más productos</Link> {/* <-- Link to home page */}
                </p>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <h3>Carrito de compras</h3>

            <div className="cart-layout border rounded mt-3 p-3">
                
                {carrito.map((item, index) => (
                    // La key debe ser única. Usamos una combinación de id, color, y talla.
                    <Row key={`${item.id}-${item.color}-${item.talla}`} className="cart-item-row align-items-center py-2 border-bottom">
                        <Col xs={12} md={2} className="mb-2 mb-md-0">
                            <img
                                src={`${BASE_IMAGE_URL}${item.imagen}`}
                                alt={item.descripcion}
                                style={{ width: '120px', height: '120px', objectFit: 'contain' }}
                                className="border rounded"
                            />
                        </Col>
                        
                        <Col xs={12} md={4} className="mb-2 mb-md-0">
                            <div className="fw-bold d-md-none">Descripcion:</div>
                            {item.descripcion}
                            <div className="text-muted small">Color: {item.color} | Talla: {item.talla}</div>
                        </Col>
                        
                        <Col xs={4} md={1} className="mb-2 mb-md-0 d-flex align-items-center me-4">
                            <div className="d-flex align-items-center">
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    // Pasamos id, color y talla para identificar el item
                                    onClick={() => disminuirCantidad(item.id, item.color, item.talla)}
                                >
                                    -
                                </Button>
                                <span className="mx-2">{item.quantity}</span>
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    // Pasamos id, color y talla para identificar el item
                                    onClick={() => aumentarCantidad(item.id, item.color, item.talla)}
                                >
                                    +
                                </Button>
                            </div>
                        </Col>
                        
                        <Col xs={4} md={2} className="fw-bold mb-2 mb-md-0">
                            <div className="d-flex justify-content-end align-items-center">
                                $ {currencyFormatter.format((item.precio_oferta || item.precio_doc) * item.quantity)}
                            </div>
                        </Col>

                        <Col xs={12} md={1} className="d-flex justify-content-end align-items-center mt-2 mt-md-0">
                            <Button
                                variant="danger"
                                size="sm"
                                // Pasamos id, color y talla para identificar el item
                                onClick={() => eliminarDelCarrito(item.id, item.color, item.talla)}
                            >
                                Eliminar
                            </Button>
                        </Col>
                    </Row>
                ))}

                <Row className="mt-4 pt-3 border-top">
                    <Col xs={12} md={6} className="d-flex align-items-center">
                        <Button variant="outline-danger" onClick={vaciarCarrito}>
                            Vaciar Carrito
                        </Button>
                    </Col>
                    <Col xs={12} md={6} className="mt-3 mt-md-0">
                        <div className="d-flex justify-content-end align-items-center">
                            <h5 className="me-3">Subtotal (Sin envio):</h5>
                            <h5 className="fw-bold">$ {currencyFormatter.format(subtotal)}</h5>
                        </div>

                        <div className="d-flex justify-content-end align-items-center mt-2">
                            <h5 className="me-3">Envio :</h5>
                            <h5 className="fw-bold">$ {currencyFormatter.format(shippingCost)}</h5>
                        </div>

                        <div className="d-flex justify-content-end align-items-center mt-3 pt-3 border-top">
                            <h4 className="me-3">Subtotal :</h4>
                            <h4 className="fw-bold">$ {currencyFormatter.format(finalTotal)}</h4>
                        </div>
                    </Col>
                </Row>

                <div className="d-flex justify-content-between align-items-center mt-4">
                    <Link to="/" className="text-decoration-none">Ver más productos</Link> {/* <-- Link to home page */}
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={handleCheckout}
                    >
                        Iniciar Compra
                    </Button>
                </div>
            </div>
        </Container>
    );
};

export default Carrito;

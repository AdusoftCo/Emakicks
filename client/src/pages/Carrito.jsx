// Carrito.jsx
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Container, Button, Row, Col, Form, Spinner, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../components/CartContext';
import { formatPrice } from '../utils/formater';
import CuErre from '../assets/0001.png';
const BASE_IMAGE_URL = `${import.meta.env.VITE_API_URL}/imagenes/`;

const Carrito = () => {
    const { carrito, eliminarDelCarrito, aumentarCantidad, disminuirCantidad, vaciarCarrito } = useContext(CartContext);
    
    const [deliveryOption, setDeliveryOption] = useState('pickup');
    const [zipCode, setZipCode] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [selectedShippingOptionIndex, setSelectedShippingOptionIndex] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        email: '',
        paymentMethod: 'Transferencia Bancaria',
    });
    
    const currencyFormatter = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' });

    const subtotal = carrito.reduce((acc, item) => acc + (item.precio_oferta || item.precio_doc) * item.quantity, 0);
    const finalTotal = subtotal + (shippingOptions[selectedShippingOptionIndex]?.price || 0);

    const getItemKey = (item) => `${item.id}-${item.color || 'no-color'}-${item.talla || 'no-size'}`;

    const paymentDetails = {
        'Transferencia Bancaria': {
            title: 'Datos para Transferencia Bancaria',
            info: (
                <>
                    <p>CVU: 0000003100086344854008</p>
                    <p>Alias: emanuel.ximena</p>
                    <p>Titular: Jane Fernandez Daga</p>
                </>
            ),
        },
        'Mercado Pago': {
            title: 'Datos para Mercado Pago',
            info: (
                <>
                    <p>Alias: emanuel.ximena</p>
                    <p>Código QR: Escanear en la app</p>
                    <img src={CuErre} alt="QR Code" className="img-fluid my-2" />
                </>
            ),
        },
        'Efectivo (Retiro en tienda)': {
            title: 'Pago en Efectivo',
            info: <p>Podrás abonar en efectivo al momento de retirar tu pedido en la tienda.</p>,
        },
    };
    
    const handleCalculateShipping = async () => {
        setLoading(true);
        setShippingOptions([]);
        setSelectedShippingOptionIndex(null);

        try {
            const SHIPPING_API_URL = `${import.meta.env.VITE_API_URL}/api/calculate-shipping`;

            const response = await fetch(SHIPPING_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                zipCode,
                cartItems: carrito
            }),
            });

            if (!response.ok) {
                throw new Error('Error al obtener las opciones de envío');
            }

            const data = await response.json();
            
            // ================================================================
            console.log('Respuesta de la API de envío:', data);

            setShippingOptions(data.options);
            if (data.options?.length > 0) {
                setSelectedShippingOptionIndex(0);
            }
        } catch (error) {
            console.error('Fallo en la llamada a la API de envío:', error);
            setShippingOptions([]);
            setSelectedShippingOptionIndex(null);
        } finally {
            setLoading(false);
        }
    };

    const handleShippingOptionChange = (index) => {
        setSelectedShippingOptionIndex(index);
    };

    const handleProceedToPayment = () => {
        if (carrito.length === 0) return;
        setShowPaymentForm(true);
    };

    const handleCustomerInfoChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleFinalCheckout = async () => {
        const selectedShippingOption = shippingOptions[selectedShippingOptionIndex];

        const orderSummary = carrito.map(item =>
            `Producto: ${item.descripcion} (x${item.quantity})\n` +
            `Precio unitario: ${formatPrice(item.precio_oferta || item.precio_doc)}\n` +
            (item.color ? `Color: ${item.color}\n` : '') +
            (item.talla ? `Talla: ${item.talla}\n` : '')
        ).join('\n');

        const shippingDetails = deliveryOption === 'delivery' && selectedShippingOption
            ? `\nTipo de Envío: ${selectedShippingOption.name}\nCosto de Envío: ${formatPrice(selectedShippingOption.price)}\nEntrega: ${selectedShippingOption.days}`
            : '\nRetiro en tienda';

        const whatsappMessage = 
            `¡Hola! Me gustaría hacer un pedido.\n\n` +
            `*Información del Cliente:*\n` +
            `Nombre: ${customerInfo.name}\n` +
            `Email: ${customerInfo.email}\n\n` +
            `*Detalles del Pedido:*\n` +
            `------------------------------------\n` +
            `${orderSummary}\n` +
            `------------------------------------\n` +
            `Subtotal: ${formatPrice(subtotal)}\n` +
            `Total Final: ${formatPrice(finalTotal)}\n` +
            `\n*Método de Entrega:*\n` +
            `${shippingDetails}\n\n` +
            `*Método de Pago Seleccionado:*\n` +
            `${customerInfo.paymentMethod}\n\n` +
            `¡Pago pendiente!`;
        
        const sellerPhoneNumber = '5491150511072';
        const whatsappUrl = `https://wa.me/${sellerPhoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        
        window.open(whatsappUrl, '_blank');

        // Call backend to decrement stock
    try {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/purchase`, {
        carrito
        });
        console.log("Stock decremented successfully");
    } catch (err) {
        console.error("Error updating stock:", err);
        alert("Error al actualizar stock en el servidor");
    }
        
        vaciarCarrito();
        setShowPaymentForm(false);
    };

    return (
        <Container className="my-5">
            <h1 className="text-center mb-4">Carrito de Compras</h1>
            <Row>
                <Col lg={8}>
                    {carrito.length === 0 ? (
                        <p className="text-center">El carrito está vacío.</p>
                    ) : (
                        <ul className="list-unstyled">
                            {carrito.map((item) => (
                                <li key={getItemKey(item)} className="mb-4 p-3 border rounded">
                                    <Row className="align-items-center">
                                        <Col xs={3} sm={2}>
                                            <img src={`${BASE_IMAGE_URL}${item.imagen}`} alt={item.descripcion} className="img-fluid rounded" />
                                        </Col>
                                        <Col xs={9} sm={5}>
                                            <div className="d-flex flex-column">
                                                <h5 className="mb-1">{item.descripcion}</h5>
                                                {item.color && <p className="text-muted mb-0">Color: {item.color}</p>}
                                                {item.talla && <p className="text-muted mb-0">Talla: {item.talla}</p>}
                                                <p className="mb-0">Precio: {formatPrice(item.precio_oferta || item.precio_doc)}</p>
                                            </div>
                                        </Col>
                                        <Col xs={12} sm={3} className="mt-3 mt-sm-0 text-center text-sm-start">
                                            <div className="d-flex align-items-center justify-content-center justify-content-sm-start">
                                                <Button variant="outline-secondary" size="sm" onClick={() => disminuirCantidad(item)} className='btn-rounded'>-</Button>
                                                <span className="mx-2">{item.quantity}</span>
                                                <Button variant="outline-secondary" size="sm" onClick={() => aumentarCantidad(item)} className='btn-rounded'>+</Button>
                                            </div>
                                        </Col>
                                        <Col xs={12} sm={2} className="mt-3 mt-sm-0 text-center text-sm-end">
                                            <Button variant="danger" size="sm" onClick={() => eliminarDelCarrito(item)} className='btn-rounded'>Eliminar</Button>
                                        </Col>
                                    </Row>
                                </li>
                            ))}
                        </ul>
                    )}
                    {carrito.length > 0 && (
                        <div className="text-center my-4">
                            <Button variant="outline-danger" onClick={vaciarCarrito} className='btn-rounded'>Vaciar Carrito</Button>
                        </div>
                    )}
                </Col>
                <Col lg={4}>
                    <div className="border rounded p-4 sticky-top" style={{ top: '20px' }}>
                        <h4 className="mb-3">Resumen de compra</h4>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Subtotal:</span>
                            <span>{currencyFormatter.format(subtotal)}</span>
                        </div>
                        <hr />
                        <h5 className="d-flex justify-content-between align-items-center">
                            <span>Total:</span>
                            <span>{currencyFormatter.format(finalTotal)}</span>
                        </h5>
                        <hr />
                        {showPaymentForm ? (
                            <Form>
                                <h5 className="mb-3">Información de Contacto y Pago</h5>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nombre Completo</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="name" 
                                        value={customerInfo.name} 
                                        onChange={handleCustomerInfoChange} 
                                        required 
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        name="email" 
                                        value={customerInfo.email} 
                                        onChange={handleCustomerInfoChange} 
                                        required 
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Método de Pago</Form.Label>
                                    <Form.Select 
                                        name="paymentMethod" 
                                        value={customerInfo.paymentMethod} 
                                        onChange={handleCustomerInfoChange}
                                    >
                                        <option>Transferencia Bancaria</option>
                                        <option>Mercado Pago</option>
                                        <option>Efectivo (Retiro en tienda)</option>
                                    </Form.Select>
                                </Form.Group>
                                <Card className="mb-3 p-3">
                                    <h6>{paymentDetails[customerInfo.paymentMethod]?.title}</h6>
                                    {paymentDetails[customerInfo.paymentMethod]?.info}
                                </Card>
                                <Button
                                    className="w-100"
                                    style={{ backgroundColor: '#5728b7', color: 'white', height: '75px', fontSize: '22px', padding: '0 20px'}}
                                    onClick={handleFinalCheckout}
                                    disabled={!customerInfo.name || !customerInfo.email}
                                >
                                    Enviar Pedido por WhatsApp
                                </Button>
                                <div className="text-center mt-3">
                                    <Link onClick={() => setShowPaymentForm(false)}>Volver a métodos de entrega</Link>
                                </div>
                            </Form>
                        ) : (
                            <>
                                <Form className="mt-4">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Método de entrega</Form.Label>
                                        <Form.Select value={deliveryOption} onChange={(e) => setDeliveryOption(e.target.value)}>
                                            <option value="pickup">Retirar en tienda</option>
                                            <option value="delivery">Envío a domicilio</option>
                                        </Form.Select>
                                    </Form.Group>
                                    {deliveryOption === 'delivery' && (
                                        <div className="mb-3">
                                            <Form.Group className="mb-2">
                                                <Form.Label>Código Postal</Form.Label>
                                                <Form.Control type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                                            </Form.Group>
                                            <Button onClick={handleCalculateShipping} className="w-100 btn-rounded" disabled={loading}
                                                style={{ backgroundColor: '#5728b7', color: 'white', borderRadius: '15px'}}>
                                                {loading ? <Spinner animation="border" size="sm" /> : 'Calcular envío'}
                                            </Button>
                                            {shippingOptions.length > 0 && (
                                                <div className="mt-3">
                                                    <h6>Opciones de envío:</h6>
                                                    {shippingOptions.map((option, index) => (
                                                        <div key={index} className="form-check">
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="shippingOption"
                                                                id={`shipping-${index}`}
                                                                checked={selectedShippingOptionIndex === index}
                                                                onChange={() => handleShippingOptionChange(index)}
                                                            />
                                                            <label className="form-check-label d-flex justify-content-between" htmlFor={`shipping-${index}`}>
                                                                {/* Una vez que veas el nombre del campo en la consola, reemplaza "option.days" con el nombre correcto. */}
                                                                <span>{option.company}({option.deliveryTimeMin}-{option.deliveryTimeMax} días)</span>
                                                                <span>{currencyFormatter.format(option.price)}</span>
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </Form>
                                <Button
                                    className="w-100 btn-rounded"
                                    onClick={handleProceedToPayment}
                                    style={{ backgroundColor: '#5728b7', color: 'white'}}
                                    disabled={carrito.length === 0 || (deliveryOption === 'delivery' && selectedShippingOptionIndex === null)}
                                >
                                    Continuar con el pago
                                </Button>
                            </>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Carrito;

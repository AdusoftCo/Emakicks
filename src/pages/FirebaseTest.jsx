import React, { useContext, useState, useEffect } from 'react';
import { Container, Button, Row, Col, Form, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../components/CartContext';
import { formatPrice } from '../utils/formater';

// Import Firebase modules
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Global variables from the Canvas environment
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const appId = 'emakicks-3091f'; // <--- We are using your actual project ID here
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

const BASE_IMAGE_URL = 'http://localhost/emakick2/imagenes/';

const Carrito = () => {
    // Correctly place all state variables and hooks inside the component
    const { carrito, eliminarDelCarrito, aumentarCantidad, disminuirCantidad, vaciarCarrito } = useContext(CartContext);
    
    const [deliveryOption, setDeliveryOption] = useState('pickup');
    const [zipCode, setZipCode] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [selectedShippingOptionIndex, setSelectedShippingOptionIndex] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPaymentDetails, setShowPaymentDetails] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [savingOrder, setSavingOrder] = useState(false);

    const [auth, setAuth] = useState(null);
    const [db, setDb] = useState(null);
    
    // Initialize Firebase and handle auth state only once when the component mounts
    useEffect(() => {
        try {
            const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
            setAuth(getAuth(app));
            setDb(getFirestore(app));
        } catch (err) {
            console.error("Firebase initialization failed:", err);
        }
    }, []);

    useEffect(() => {
        if (auth) {
            const signIn = async () => {
                try {
                    if (initialAuthToken) {
                        await signInWithCustomToken(auth, initialAuthToken);
                    } else {
                        await signInAnonymously(auth);
                    }
                } catch (error) {
                    console.error("Firebase auth error:", error);
                    await signInAnonymously(auth);
                }
            };
            signIn();
        }
    }, [auth]);

    const selectedShippingOption = shippingOptions[selectedShippingOptionIndex];
    const currencyFormatter = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' });

    const subtotal = carrito.reduce((acc, item) => acc + (item.precio_oferta || item.precio_doc) * item.quantity, 0);
    const finalTotal = subtotal + (selectedShippingOption?.price || 0);

    const getItemKey = (item) => `${item.id}-${item.color || 'no-color'}-${item.talla || 'no-size'}`;

    const handleCalculateShipping = async () => {
        setLoading(true);
        setShippingOptions([]);
        setSelectedShippingOptionIndex(null);

        try {
            const response = await fetch('http://localhost:3001/api/calculate-shipping', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    zipCode: zipCode,
                    cartItems: carrito
                }),
            });

            if (!response.ok) {
                throw new Error('Error al obtener las opciones de envío');
            }

            const data = await response.json();
            
            console.log('API Response Data:', data);
            
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

    useEffect(() => {
        if (deliveryOption === 'pickup') {
            setSelectedShippingOptionIndex(null);
            setShippingOptions([]);
        }
    }, [deliveryOption]);

    const handleShippingOptionChange = (index) => {
        setSelectedShippingOptionIndex(index);
    };

    const handleCheckout = async () => {
        setSavingOrder(true);
    
        try {
            const userId = auth?.currentUser?.uid || 'anonymous';
            
            const orderData = {
                userId: userId,
                items: carrito.map(item => ({
                    id: item.id,
                    description: item.descripcion,
                    color: item.color,
                    talla: item.talla,
                    quantity: item.quantity,
                    price: item.precio_oferta || item.precio_doc,
                })),
                subtotal: subtotal,
                finalTotal: finalTotal,
                deliveryOption: deliveryOption,
                shippingDetails: deliveryOption === 'delivery' ? selectedShippingOption : null,
                status: 'pending-payment', // Initial status
                orderDate: serverTimestamp(),
            };
    
            const ordersCollectionRef = collection(db, `artifacts/${appId}/public/data/orders`);
            const docRef = await addDoc(ordersCollectionRef, orderData);
            
            setOrderId(docRef.id);
            vaciarCarrito();
            setShowPaymentDetails(true);
    
        } catch (error) {
            console.error("Error al guardar el pedido:", error);
        } finally {
            setSavingOrder(false);
        }
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
                            {carrito.map((item, index) => (
                                <li key={getItemKey(item)} className="mb-4 p-3 border rounded">
                                    <Row className="align-items-center">
                                        <Col xs={3} sm={2}>
                                            <img src={`${BASE_IMAGE_URL}${item.imagen_doc}`} alt={item.descripcion} className="img-fluid rounded" />
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
                                                <Button variant="outline-secondary" size="sm" onClick={() => disminuirCantidad(item)}>-</Button>
                                                <span className="mx-2">{item.quantity}</span>
                                                <Button variant="outline-secondary" size="sm" onClick={() => aumentarCantidad(item)}>+</Button>
                                            </div>
                                        </Col>
                                        <Col xs={12} sm={2} className="mt-3 mt-sm-0 text-center text-sm-end">
                                            <Button variant="danger" size="sm" onClick={() => eliminarDelCarrito(item)}>Eliminar</Button>
                                        </Col>
                                    </Row>
                                </li>
                            ))}
                        </ul>
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
                        {showPaymentDetails ? (
                            <div className="mt-4">
                                <h5>Detalles de pago</h5>
                                <p>Tu pedido ha sido creado. ID de Pedido: <strong>{orderId}</strong></p>
                                <p>Por favor, contacta con el vendedor para finalizar el pago.</p>
                                <Button variant="success" as={Link} to="/" className="w-100">Volver a la tienda</Button>
                            </div>
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
                                            <Button onClick={handleCalculateShipping} className="w-100" disabled={loading}>
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
                                                                <span>{option.name}</span>
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
                                    className="w-100"
                                    onClick={handleCheckout}
                                    disabled={carrito.length === 0 || savingOrder || (deliveryOption === 'delivery' && selectedShippingOptionIndex === null)}
                                >
                                    {savingOrder ? 'Guardando pedido...' : 'Iniciar Compra'}
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

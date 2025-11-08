// Home.jsx
import { useEffect, useState, useContext } from 'react';
import { Card, Button, Form, Col, Row, Modal, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../components/CartContext';
import { formatPrice } from '../utils/formater';

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/products`;
const BASE_IMAGE_URL = `${import.meta.env.VITE_API_URL}/imagenes/`;

const Home = () => {
    const [offers, setOffers] = useState([]);
    
    const [selectedVariations, setSelectedVariations] = useState({
        color: '',
        talla: '',
        quantity: 1
    });

    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const navigate = useNavigate();
    
    // Usamos el hook useContext para acceder a las funciones del carrito
    const { agregarAlCarrito } = useContext(CartContext);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const offersResponse = await axios.get(`${API_BASE_URL}?type=offers`);
            setOffers(offersResponse.data);
          } catch (error) {
            console.error("Error fetching offers:", error);
          }
        };
      
        fetchData();
      }, []);

    const handleShowModal = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
        setSelectedVariations({
            color: '',
            talla: '',
            quantity: 1
        });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
    };

    const handleModalVariationChange = (e) => {
        const { name, value } = e.target;
        // The fix is here: we convert the value to a number only if the name is 'quantity'
        const newValue = name === 'quantity' ? Number(value) : value;
        
        setSelectedVariations(prev => ({
            ...prev,
            [name]: newValue
        }));
    };

    const handleModalAddToCart = () => {
        if (!selectedProduct || !selectedVariations.color || !selectedVariations.talla || selectedVariations.quantity <= 0) {
            alert("Please select a color, size, and a valid quantity.");
            return;
        }

        const itemToAdd = {
            id: selectedProduct.id,
            descripcion: selectedProduct.descripcion,
            imagen: selectedProduct.imagen,
            precio_doc: selectedProduct.precio_doc,
            precio_oferta: selectedProduct.precio_oferta,
            color: selectedVariations.color,
            talla: selectedVariations.talla,
            quantity: selectedVariations.quantity,
        };
        
        // Llamamos a la función global para agregar el objeto completo
        agregarAlCarrito(itemToAdd);
        
        alert(`${itemToAdd.quantity} x ${itemToAdd.descripcion} (${itemToAdd.color}/${itemToAdd.talla}) added to cart!`);

        handleCloseModal();
        
        navigate('/carrito');
    };

    const getUniqueValues = (variations, key) => {
        if (!variations) return [];
        return [...new Set(variations.map(v => v[key]))];
    };

    const getStockForSelection = () => {
        if (selectedProduct && selectedVariations.color && selectedVariations.talla) {
            const variation = selectedProduct.variaciones.find(v => 
                v.color === selectedVariations.color && v.talla === selectedVariations.talla
            );
            return variation ? Number(variation.stock) : 0;
        }
        return 0;
    };

    const uniqueColors = getUniqueValues(selectedProduct?.variaciones, 'color');
    const filteredTallas = getUniqueValues(
        selectedProduct?.variaciones.filter(v => v.color === selectedVariations.color), 
        'talla'
    );
    const stock = getStockForSelection();

    return (
        <div className="container mt-4">
            {offers.length > 0 && (
                <div className="mb-4">
                    <h3 className="text-center mb-3">Ofertas</h3>
                    <Row xs={1} md={2} lg={4} className="g-4">
                        {offers.map(prod => (
                            <Col key={prod.id}>
                                <Card className="h-100">
                                    <Card.Img 
                                        variant="top" 
                                        src={`${BASE_IMAGE_URL}${prod.imagen}`}
                                        loading="lazy"
                                        style={{ height: '250px', objectFit: 'contain' }} />
                                    <Card.Body>
                                        <Card.Title>{prod.nombre} -{prod.cod_art}- {prod.descripcion}</Card.Title>
                                        <Card.Text className="mt-auto">
                                            {prod.is_on_offer === 1 ? (
                                                <>
                                                    <span className="text-muted text-decoration-line-through">
                                                        {formatPrice(prod.precio_doc)}
                                                    </span>
                                                    <strong className="text-danger ms-2">
                                                        {formatPrice(prod.precio_oferta)}
                                                    </strong>
                                                </>
                                            ) : (
                                                <strong>{formatPrice(prod.precio_doc)}</strong>
                                            )}
                                        </Card.Text>
                                        <Button variant="primary" onClick={() => handleShowModal(prod)}>Ver Producto</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            )}
            
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {selectedProduct?.nombre} -
                        {selectedProduct?.cod_art} - 
                        {selectedProduct?.descripcion}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedProduct && (
                        <>
                            <img loading="lazy" src={`${BASE_IMAGE_URL}${selectedProduct.imagen}`} alt={selectedProduct.descripcion} className="w-100 mb-3" style={{maxHeight: '400px', objectFit: 'contain'}} />
                            <p><strong>Precio:</strong> {formatPrice(selectedProduct.is_on_offer === 1 ? selectedProduct.precio_oferta : selectedProduct.precio_doc)}</p>
                            
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Color</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="color"
                                        value={selectedVariations.color}
                                        onChange={handleModalVariationChange}
                                        required
                                    >
                                        <option value="">Selecciona Color</option>
                                        {uniqueColors.map(color => (
                                            <option key={color} value={color}>{color}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Talla</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="talla"
                                        value={selectedVariations.talla}
                                        onChange={handleModalVariationChange}
                                        required
                                        disabled={!selectedVariations.color}
                                    >
                                        <option value="">Selecciona Talla</option>
                                        {filteredTallas.map(talla => (
                                            <option key={talla} value={talla}>{talla}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Cantidad (Stock: {stock})</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="quantity"
                                        value={selectedVariations.quantity}
                                        onChange={handleModalVariationChange}
                                        min="1"
                                        max={stock > 0 ? stock : 1}
                                        required
                                        disabled={!selectedVariations.color || !selectedVariations.talla || stock === 0}
                                    />
                                </Form.Group>
                            </Form>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={handleModalAddToCart}
                        disabled={!selectedVariations.color || !selectedVariations.talla || selectedVariations.quantity <= 0 || stock === 0}
                    >
                        Agregar al Carrito
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Home;

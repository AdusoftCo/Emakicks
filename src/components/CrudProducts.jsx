import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container,
    Button,
    Modal,
    Form,
    Table,
    Row,
    Col,
    Alert
} from 'react-bootstrap';
import { formatPrice } from '../utils/formater';

// Se carga el CSS de Bootstrap dinámicamente para evitar errores de compilación.
const loadBootstrapCSS = () => {
    const bootstrapLink = document.createElement('link');
    bootstrapLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
    bootstrapLink.rel = 'stylesheet';
    document.head.appendChild(bootstrapLink);

    // Retorna una función de limpieza para remover el CSS cuando el componente se desmonte.
    return () => {
        document.head.removeChild(bootstrapLink);
    };
};

// Esta función implementa la lógica de calculos del lado del cliente.
const calculatePrices = (id_prov, costo) => {
    let docena, oferta;
    const costoNum = parseFloat(costo);
    if (isNaN(costoNum)) return [null, null];

    switch (String(id_prov)) {
        case '13': {
            const b13 = costoNum * 0.75;
            const d13 = b13 * 1.12;
            docena = d13 * 1.26;
            const f13 = d13 / 12;
            oferta = f13 * 1.55;
            break;
        }
        case '16': {
            const b16 = costoNum * 0.80;
            const d16 = b16 * 1.07;
            const doce16 = d16 * 12;
            docena = doce16 * 1.30;
            oferta = d16 * 1.50;
            break;
        }
        case '17':
            docena = costoNum * 1.25;
            oferta = costoNum * 1.30;
            break;
        case '28': {
            const doce28 = costoNum * 0.88;
            docena = doce28 * 1.26;
            const c28 = doce28 * 1.55;
            oferta = c28 / 12;
            break;
        }
        default:
            docena = costoNum * 1.30;
            oferta = (costoNum / 12) * 1.53;
            break;
    }
    return [docena.toFixed(2), oferta.toFixed(2)];
};

const CrudProducts = () => {
    const [products, setProducts] = useState([]);
    const [manufacturers, setManufacturers] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        descripcion: '',
        fabricante_id: '',
        cod_art: '',
        precio_doc: '',
        precio_oferta: '',
        costo: '',
        is_on_offer: false,
        variaciones: '',
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const API_URL = 'http://localhost/emakick2/apiEK.php';
    const IMAGES_BASE_URL = 'http://localhost/emakick2/imagenes/';

    useEffect(() => {
        const cleanup = loadBootstrapCSS();
        return cleanup;
    }, []);

    // Fetch products from the API
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL);
            setProducts(response.data);
            setError('');
        } catch (err) {
            console.error('Error fetching products:', err);
            setError('Error al cargar productos. Por favor, revisa la consola para más detalles.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch manufacturers from the API
    const fetchManufacturers = async () => {
        try {
            const response = await axios.get(`${API_URL}?table=fabricants`);
            setManufacturers(response.data);
        } catch (err) {
            console.error('Error fetching manufacturers:', err);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchManufacturers();
    }, []);

    // Open the modal for editing or creating a product
    const openModal = (product = null) => {
        if (product) {
            setSelectedProduct(product);
            setIsEditing(true);
            setFormData({
                ...product,
                fabricante_id: product.id_prov,
                is_on_offer: product.is_on_offer === 1,
                variaciones: JSON.stringify(product.variaciones, null, 2),
            });
            // Set the preview to the existing image
            setImagePreviewUrl(`${IMAGES_BASE_URL}${product.imagen}`);
        } else {
            setSelectedProduct(null);
            setIsEditing(false);
            setFormData({
                descripcion: '',
                fabricante_id: '',
                cod_art: '',
                precio_doc: '',
                precio_oferta: '',
                costo: '',
                is_on_offer: false,
                variaciones: '',
            });
            setImageFile(null);
            setImagePreviewUrl('');
        }
        setIsModalOpen(true);
    };

    // Close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setLoading(false);
        setError('');
        setImageFile(null);
        setImagePreviewUrl('');
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        let newFormData = {
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        };

        // Si el campo es 'costo' o 'fabricante_id', recalculamos los precios
        if (name === 'costo' || name === 'fabricante_id') {
            const newCosto = parseFloat(name === 'costo' ? value : formData.costo);
            const newIdProv = name === 'fabricante_id' ? value : formData.fabricante_id;

            if (!isNaN(newCosto) && newIdProv) {
                const [newPrecioDoc, newPrecioOferta] = calculatePrices(newIdProv, newCosto);
                newFormData.precio_doc = newPrecioDoc;
                newFormData.precio_oferta = newPrecioOferta;
            } else {
                newFormData.precio_doc = '';
                newFormData.precio_oferta = '';
            }
        }
        setFormData(newFormData);
    };

    // Handle file input change and create a preview URL
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreviewUrl(URL.createObjectURL(file));
        } else {
            setImageFile(null);
            setImagePreviewUrl('');
        }
    };

    // Handle form submission (Create or Update)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const data = {
                ...formData,
                variaciones: formData.variaciones,
                is_on_offer: formData.is_on_offer ? 1 : 0,
            };

            // CRITICAL FIX: Only send image data if a new file is selected.
            if (imageFile) {
                // Convert image to base64
                const reader = new FileReader();
                reader.readAsDataURL(imageFile);
                reader.onloadend = async () => {
                    const base64String = reader.result;
                    data.imagen_base64 = base64String;
                    data.imagen_nombre = imageFile.name;
                    await submitData(data);
                };
            } else {
                // If no new file, just submit the other data
                await submitData(data);
            }
        } catch (err) {
            console.error('Form submission error:', err);
            setError('Error al guardar los datos. Por favor, revisa la consola.');
            setLoading(false);
        }
    };

    // Submits the form data to the API
    const submitData = async (data) => {
        try {
            if (isEditing) {
                // Update existing product
                await axios.put(API_URL, data);
            } else {
                // Create new product
                await axios.post(API_URL, data);
            }
            fetchProducts();
            closeModal();
        } catch (err) {
            console.error('API Error during submission:', err);
            const errorMessage = err.response?.data?.error || err.message;
            setError(`Error: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    // Handle product deletion
    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            try {
                await axios.delete(`${API_URL}?id=${id}`);
                fetchProducts();
            } catch (err) {
                console.error('Error deleting product:', err);
                setError('Error al eliminar el producto. Por favor, revisa la consola.');
            }
        }
    };

    return (
        <Container className="my-5">
            <h1 className="mb-4 text-center">Administración de Productos</h1>
            <div className="d-flex justify-content-end mb-4">
                <Button variant="primary" onClick={() => openModal()}>
                    Crear Nuevo Producto
                </Button>
            </div>

            {loading && <p className="text-center">Cargando productos...</p>}
            {error && <Alert variant="danger">{error}</Alert>}

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Imagen</th>
                        <th>Descripción</th>
                        <th>Fabricante</th>
                        <th>Precio</th>
                        <th>En Oferta</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map(product => (
                            <tr key={product.id}>
                                <td>{product.cod_art}</td>
                                <td>
                                    <img
                                        src={`${IMAGES_BASE_URL}${product.imagen}`}
                                        alt={product.descripcion}
                                        style={{ width: '64px', height: '64px', objectFit: 'cover' }}
                                        onError={(e) => { e.target.src = 'https://placehold.co/64x64/E2E8F0/A0AEC0?text=No+Img'; }}
                                    />
                                </td>
                                <td>{product.descripcion}</td>
                                <td>{product.nombre}</td>
                                <td>
                                    {product.is_on_offer === 1 ? (
                                        <>
                                            <span className="text-muted text-decoration-line-through">{formatPrice(product.precio_doc)}</span>{' '}
                                            <span className="text-danger fw-bold">{formatPrice(product.precio_oferta)}</span>
                                        </>
                                    ) : (
                                        <span>{formatPrice(product.precio_doc)}</span>
                                    )}
                                </td>
                                <td>{product.is_on_offer === 1 ? 'Sí' : 'No'}</td>
                                <td>
                                    <Button variant="warning" size="sm" onClick={() => openModal(product)} className="me-2">
                                        Editar
                                    </Button>
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(product.id)}>
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">
                                No hay productos disponibles.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <Modal show={isModalOpen} onHide={closeModal} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Editar Producto' : 'Crear Producto'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="descripcion"
                                        value={formData.descripcion}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Fabricante</Form.Label>
                                    <Form.Select
                                        name="fabricante_id"
                                        value={formData.fabricante_id}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Seleccionar fabricante</option>
                                        {manufacturers.map(manuf => (
                                            <option key={manuf.id} value={manuf.id}>
                                                {manuf.nombre}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Costo</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="costo"
                                        value={formData.costo}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                        <Form.Label>Código de Artículo</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="cod_art"
                                            value={formData.cod_art}
                                            onChange={handleInputChange}
                                            required
                                        />
                                </Form.Group>
                                
                                <Form.Group className="mb-3">
                                    <Form.Label>Imagen</Form.Label>
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                    {imagePreviewUrl && (
                                        <img
                                            src={imagePreviewUrl}
                                            alt="Vista previa"
                                            className="mt-2 img-fluid"
                                        />
                                    )}
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Check
                                        type="checkbox"
                                        name="is_on_offer"
                                        label="En Oferta"
                                        checked={formData.is_on_offer}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Variaciones (JSON)</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="variaciones"
                                value={formData.variaciones}
                                onChange={handleInputChange}
                                rows={5}
                                placeholder='Ej: [{"color":"Rojo","talla":"M","stock":10}]'
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-end">
                            <Button variant="secondary" onClick={closeModal} className="me-2">
                                Cancelar
                            </Button>
                            <Button variant="primary" type="submit" disabled={loading}>
                                {loading ? 'Guardando...' : (isEditing ? 'Actualizar Producto' : 'Crear Producto')}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default CrudProducts;

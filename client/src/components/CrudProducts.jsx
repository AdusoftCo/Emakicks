   //CrudProducts.jsx
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
    Alert,
    FormGroup,
    FormLabel,
    FormSelect
} from 'react-bootstrap';
import { formatPrice } from '../utils/formater';
import '../App.css';

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
const calculatePrices = (fabricante_id, costo) => {
    let docena, oferta;
    const costoNum = parseFloat(costo);
    if (isNaN(costoNum)) return [null, null];

    switch (String(fabricante_id)) {
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
        case '29':
            docena = costoNum * 1.25;
            oferta = costoNum * 1.30;
            break;
        default:
            docena = costoNum * 1.30;
            oferta = (costoNum / 12) * 1.60;
            break;
    }
    return [docena.toFixed(2), oferta.toFixed(2)];
};

const formatDateDMY = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

const CrudProducts = () => {
    const [products, setProducts] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [manufacturers, setManufacturers] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        descripcion: "",
        cod_art: "",
        precio_doc: 0,
        precio_oferta: 0,
        costo: 0,
        fecha_alta: "",
        is_on_offer: false,
        fabricante_id: "",
        imagen_base64: "",
        category: "",
        variaciones: [],
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/products`;
    // const BASE_IMAGE_URL = `${import.meta.env.VITE_API_URL}/imagenes/`;
    
    useEffect(() => {
        const cleanup = loadBootstrapCSS();
        return cleanup;
    }, []);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);

    // Fetch products from the API
    const fetchProducts = async () => {
        if (loading) return; // ✅ prevent loop
        setLoading(true);
        try {
          const response = await axios.get(API_BASE_URL);
          setProducts(response.data);
          console.trace();
        } catch (err) {
          console.error('Error fetching products:', err);
        } finally {
          setLoading(false);
        }
      };
      
    // Fetch manufacturers from the API
    const fetchManufacturers = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/fabricants`);
          setManufacturers(response.data);
        } catch (err) {
          console.error('Error fetching manufacturers:', err);
        }
      };

    useEffect(() => {
        fetchProducts();
        fetchManufacturers();
    }, []);

    const openModal = async (product = null) => {
        await fetchManufacturers();
      
        if (product) {

            const safeVariaciones = Array.isArray(product.variaciones) ? product.variaciones : [];
        
            // If backend sends fabricante_id, use it directly
            let fabricanteId = product.fabricante_id;
        
            // If backend only sends fabricante_nombre, look up the id
            if (!fabricanteId && product.fabricante_nombre) {
                const found = manufacturers.find(m => m.nombre === product.fabricante_nombre);
                fabricanteId = found ? found.id : "";
            }
        
            setSelectedProduct(product);
            
            setFormData({
                ...product,
                fabricante_id: fabricanteId ? String(fabricanteId) : "",
                is_on_offer: product.is_on_offer === true,
                variaciones: safeVariaciones, // ✅ keep as array
              });
              
            
            setImagePreviewUrl(
                product.imagen_base64
                  ? `data:image/jpeg;base64,${product.imagen_base64}`
                  : ""
            );
              
            setIsEditing(true);
            
            } else {
                // reset for create mode
                setSelectedProduct(null);
                setFormData({
                    descripcion: "",
                    cod_art: "",
                    precio_doc: 0,
                    precio_oferta: 0,
                    costo: 0,
                    fecha_alta: "",
                    fabricante_id: "",
                    is_on_offer: false,
                    imagen_base64: "",
                    variaciones: [],
                });

            setImagePreviewUrl("");
            setIsEditing(false);
            }
        
            setIsModalOpen(true);
      };
      
    // Close Modal
    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditing(false); // ✅ Reset editing state
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
            const newFabricanteId = name === 'fabricante_id' ? value : formData.fabricante_id;

            if (!isNaN(newCosto) && newFabricanteId) {
                const [newPrecioDoc, newPrecioOferta] = calculatePrices(newFabricanteId, newCosto);
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
        setImageFile(file);
      
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({ ...prev, imagen_base64: reader.result }));
          setImagePreviewUrl(reader.result); // preview in modal
        };
        reader.readAsDataURL(file);
      };

    // Handle form submission (Create or Update)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
      
        try {
          const data = {
            ...formData,
            id: formData.id,
            fecha_alta: formData.fecha_alta
                ? formData.fecha_alta.split("T")[0] // keep only YYYY-MM-DD
                : "",
            variaciones: formData.variaciones,
            is_on_offer: formData.is_on_offer === true,
          };
          console.log('Submitting is_on_offer:', formData.is_on_offer ? true : false);

          if (imageFile) {
            // Convert image to base64 using a Promise
            const base64String = await new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(imageFile);
              reader.onloadend = () => resolve(reader.result);
              reader.onerror = reject;
            });
      
            data.imagen_base64 = base64String;
            data.imagen_nombre = imageFile.name;
          }
      
          await submitData(data);
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
                await axios.put(API_BASE_URL, data);
            } else {
                // Create new product
                await axios.post(API_BASE_URL, data);
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
                await axios.delete(`${API_BASE_URL}/${id}`);
                fetchProducts();
            } catch (err) {
                console.error('Error deleting product:', err);
                setError('Error al eliminar el producto. Por favor, revisa la consola.');
            }
        }
    };

    return (
        <Container className="my-5">
            <h1 className="mb-4 text-center">Admin de Productos</h1>
            <div className="d-flex justify-content-end mb-4">
                <Button className="btn-rounded" style={{ color: 'white'}} onClick={() => openModal(null)}>
                    Crear Nuevo Producto
                </Button>
            </div>

            {loading && <p className="text-center">Cargando productos...</p>}
            {error && <Alert variant="danger">{error}</Alert>}

            {/* Design Mobile / PC */}
            {isMobile ? (
                // Mobile layout
                products.length > 0 ? (
                    products.map(product => (
                    <div className="product-record" key={product.id}>
                        {product.imagen_base64 ? (
                            <img
                                src={`data:image/jpeg;base64,${product.imagen_base64}`}
                                alt={product.descripcion}
                                style={{ width: '64px', height: '64px', objectFit: 'cover' }}
                                onError={(e) => {
                                e.target.src = 'https://placehold.co/64x64/E2E8F0/A0AEC0?text=No+Img';
                                }}
                            />
                            ) : (
                            <img
                                src="https://placehold.co/64x64/E2E8F0/A0AEC0?text=No+Img"
                                alt="No image"
                                style={{ width: '64px', height: '64px', objectFit: 'cover' }}
                            />
                            )}
                        <div className="product-field"><strong>Código:</strong> {product.cod_art}</div>
                        <div className="product-field"><strong>Descripción:</strong> {product.descripcion}</div>
                        <div className="product-field"><strong>Fabricante:</strong> {product.fabricante_nombre}</div>
                        <div className="product-field"><strong>Precio Docena:</strong> {formatPrice(product.precio_doc)}</div>
                        <div className="product-field"><strong>Precio Oferta:</strong> {formatPrice(product.precio_oferta)}</div>
                        <div className="product-field"><strong>En Oferta:</strong> {product.is_on_offer ? "Sí" : "No"}</div>
                        <div className="product-actions">
                            <Button variant="warning" size="sm" 
                                    onClick={() => openModal(product)} 
                                    className="me-2"
                                    style={{borderRadius: '15px', height: '50px', width: 'auto', padding: '0 20px', fontSize: '24px'}}>
                                    Editar
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(product.id)}
                                    style={{borderRadius: '15px', height: '50px', width: 'auto', padding: '0 20px', fontSize: '24px'}}>
                                    Eliminar
                            </Button>
                        </div>
                    </div>
                    ))
                ) : (
                    <div>No hay productos disponibles.</div>
                )
                ) : (

                // Desktop layout
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
                                {product.imagen_base64 ? (
                                    <img
                                        src={`data:image/jpeg;base64,${product.imagen_base64}`}
                                        alt={product.descripcion}
                                        style={{ width: '64px', height: '64px', objectFit: 'cover' }}
                                        onError={(e) => {
                                        e.target.src = 'https://placehold.co/64x64/E2E8F0/A0AEC0?text=No+Img';
                                        }}
                                    />
                                    ) : (
                                    <img
                                        src="https://placehold.co/64x64/E2E8F0/A0AEC0?text=No+Img"
                                        alt="No image"
                                        style={{ width: '64px', height: '64px', objectFit: 'cover' }}
                                    />
                                    )}
                                </td>
                                <td>{product.descripcion}</td>
                                <td>{product.fabricante_nombre}</td>
                                <td>
                                    {product.is_on_offer ? (
                                        <>
                                            <span className="text-muted text-decoration-line-through">{formatPrice(product.precio_doc)}</span>{' '}
                                            <span className="text-danger fw-bold">{formatPrice(product.precio_oferta)}</span>
                                        </>
                                    ) : (
                                        <span>{formatPrice(product.precio_doc)}</span>
                                    )}
                                </td>
                                <td>{product.is_on_offer ? 'Sí' : 'No'}</td>
                                <td>
                                    <Button variant="warning" size="sm" onClick={() => openModal(product)} className="me-2">
                                        Editar
                                    </Button>
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(product.id)} >
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
            )}

            {/* Modal */}
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
                                    {selectedProduct?.fabricante_nombre && (
                                        <div className="mb-2 text-muted">
                                            <small>Actual: {selectedProduct.fabricante_nombre}</small>
                                        </div>
                                    )}
                                    <Form.Select
                                        name="fabricante_id"
                                        value={formData.fabricante_id}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Seleccionar fabricante</option>
                                        {manufacturers.map(manuf => (
                                            <option key={manuf.id} value={String(manuf.id)}>
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
                                <Form.Group className="mb-3">
                                    {selectedProduct?.fecha_alta && (
                                    <div className="mb-2 text-muted">
                                        <small>
                                        Última fecha guardada: {formatDateDMY(selectedProduct.fecha_alta)}
                                        </small>
                                    </div>
                                    )}
                                    <Form.Label>Actualizado al</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="fecha_alta"
                                        value={formData.fecha_alta}
                                        onChange={handleInputChange}
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
                                    
                                <FormGroup controlId="category" className='mb-3'>
                                    <FormLabel>Categoria</FormLabel>
                                    <FormSelect
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        required
                                    >
                                        <option value="">-- Select Categoria --</option>
                                        <option value="femInterior">femenInterior</option>
                                        <option value="medias">medias</option>
                                        <option value="camisonetas">camisonetas</option>
                                        <option value="masculinos">masculinos</option>
                                    </FormSelect>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Variaciones (JSON)</Form.Label>
                            {formData.variaciones.map((v, index) => (
                                <div key={index} className="mb-2">
                                    <Form.Control
                                    type="text"
                                    placeholder="Color"
                                    value={v.color}
                                    onChange={(e) => {
                                        const newVars = [...formData.variaciones];
                                        newVars[index].color = e.target.value;
                                        setFormData({ ...formData, variaciones: newVars });
                                    }}
                                    />
                                    <Form.Control
                                    type="text"
                                    placeholder="Talla"
                                    value={v.talla}
                                    onChange={(e) => {
                                        const newVars = [...formData.variaciones];
                                        newVars[index].talla = e.target.value;
                                        setFormData({ ...formData, variaciones: newVars });
                                    }}
                                    />
                                    <Form.Control
                                    type="number"
                                    placeholder="Stock"
                                    value={v.stock}
                                    onChange={(e) => {
                                        const newVars = [...formData.variaciones];
                                        newVars[index].stock = parseInt(e.target.value, 10);
                                        setFormData({ ...formData, variaciones: newVars });
                                    }}
                                    />
                                </div>
                                ))}

                                <Button onClick={() =>
                                setFormData({ ...formData, variaciones: [...formData.variaciones, { color: "", talla: "", stock: 0 }] })
                                }>
                                Add Variation
                                </Button>
                        </Form.Group>

                        <div className="d-flex justify-content-end">
                            <Button variant="secondary" onClick={closeModal} className="btn-rounded me-2">
                                Cancelar
                            </Button>
                            <Button variant="primary" type="submit" disabled={loading} className='btn-rounded'>
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

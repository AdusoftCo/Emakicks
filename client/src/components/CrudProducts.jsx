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
        imagen_url: "",
        category: "",
        variaciones: [],
    });
    
    const [imageFile, setImageFile] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formattedDate, setFormattedDate] = useState("");

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
        if (loading) return;
        setLoading(true);
      
        try {
          const response = await axios.get(API_BASE_URL);
      
          const normalized = response.data.map(p => ({
            ...p,
            imagen_url: p.imagen || "", // ✅ map backend → frontend
          }));
      
          setProducts(normalized);
        } catch (err) {
          console.error('Error fetching products:', err);
        } finally {
          setLoading(false);
        }
    };
      
    // Fetch manufacturers from the API
    const fetchManufacturers = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/products/fabricants`
            );
            setManufacturers(response.data);
        } catch (err) {
          console.error('Error fetching manufacturers:', err);
        }
      };

    useEffect(() => {
        fetchProducts();
        fetchManufacturers();
    }, []);

    // open modal
    const openModal = (product = null) => {
        setImageFile(null);          // ✅ IMPORTANT
        setImagePreviewUrl("");      // ✅ IMPORTANT
        setError("");
        fetchManufacturers(); // no await
    
        if (product) {
            const safeVariaciones = Array.isArray(product.variaciones)
                ? product.variaciones
                    // 🚫 Remove empty rows
                    .filter(v =>
                        (v.color && v.color.trim() !== '') ||
                        (v.talla && v.talla.trim() !== '')
                    )
                    // ✅ Remove duplicates
                    .filter(
                        (v, i, arr) =>
                        i === arr.findIndex(
                            x => x.color === v.color && x.talla === v.talla
                        )
                    )
                : [];
    
            let fabricanteId = product.fabricante_id;
    
            if (!fabricanteId && product.fabricante_nombre) {
                const found = manufacturers.find(m => m.nombre === product.fabricante_nombre);
                fabricanteId = found ? found.id : "";
            }
    
            setSelectedProduct(product);
    
            const dateOnly = product.fecha_alta
                ? new Date(product.fecha_alta).toISOString().split("T")[0]
                : "";
    
            setFormattedDate(dateOnly);
    
            setFormData({
                descripcion: product.descripcion || "",
                cod_art: product.cod_art || "",
                precio_doc: product.precio_doc || 0,
                precio_oferta: product.precio_oferta || 0,
                costo: product.costo || 0,
                fecha_alta: dateOnly,
                is_on_offer: product.is_on_offer === true,
                fabricante_id: fabricanteId ? String(fabricanteId) : "",
                imagen_url: product.imagen_url || "",
                category: product.category || "",
                variaciones: safeVariaciones, // ✅ ONLY ONCE
              });
    
            setImagePreviewUrl(product.imagen_url || "");
            setIsEditing(true);
        } else {
            // reset code...
        }
    
        setIsModalOpen(true);
    };
    
    // Close Modal
    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        setSelectedProduct(null);
        setError("");
        setImageFile(null);
        setImagePreviewUrl("");
      
        setFormData({
          descripcion: "",
          cod_art: "",
          precio_doc: 0,
          precio_oferta: 0,
          costo: 0,
          fecha_alta: "",
          is_on_offer: false,
          fabricante_id: "",
          imagen_url: "",
          category: "",
          variaciones: [],
        });
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

    // Handle file input change and preview
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
      
        setImageFile(file);
      
        // Clean previous preview (avoid memory leaks)
        if (imagePreviewUrl) {
          URL.revokeObjectURL(imagePreviewUrl);
        }
      
        setImagePreviewUrl(URL.createObjectURL(file));
    };
      

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
    
        try {
            const data = {
                ...formData,
                id: selectedProduct?.id,
                fecha_alta: formData.fecha_alta
                    ? formData.fecha_alta.split("T")[0]
                    : "",
                variaciones: formData.variaciones,
                is_on_offer: formData.is_on_offer === true,
            };
    
            // ---------------------------------------------------------
            // IMAGE LOGIC
            // ---------------------------------------------------------
    
            if (imageFile) {
                try {
                  console.log("Uploading to Cloudinary...");
              
                  const cloudinaryUrl =
                    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;
              
                  const formDataCloud = new FormData();
                  formDataCloud.append("file", imageFile);
                  formDataCloud.append(
                    "upload_preset",
                    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
                  );
              
                  console.log("Cloudinary URL:", cloudinaryUrl);
                  console.log("Upload preset:", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
              
                  const uploadRes = await axios.post(cloudinaryUrl, formDataCloud);
              
                  console.log("Cloudinary response:", uploadRes.data);
              
                  data.imagen_url = uploadRes.data.secure_url;
              
                } catch (err) {
                  console.error("❌ Cloudinary upload failed:", err.response?.data || err);
                  throw err;
                }
              }
              
    
            // ---------------------------------------------------------
            // SAVE / UPDATE PRODUCT
            // ---------------------------------------------------------
            await submitData(data);
    
        } catch (err) {
            console.error("Submit error:", err);
            setError("Error uploading image or saving data.");
        } finally {
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
                        {product.imagen_url ? (
                            <img
                                src={product.imagen_url || 'https://placehold.co/64x64/E2E8F0/A0AEC0?text=No+Img'}
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
                                    <img
                                        src={product.imagen_url || 'https://placehold.co/64x64/E2E8F0/A0AEC0?text=No+Img'}
                                        alt={product.descripcion}
                                        style={{ width: '64px', height: '64px', objectFit: 'cover' }}
                                        onError={(e) => {
                                        e.currentTarget.src =
                                            'https://placehold.co/64x64/E2E8F0/A0AEC0?text=No+Img';
                                        }}
                                    />
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

                                    {/* Show current image when editing and no new file selected */}
                                    {isEditing && !imagePreviewUrl && selectedProduct?.imagen_url && (
                                        <div className="mb-2">
                                            <small className="text-muted">Imagen actual:</small>
                                            <img
                                                src={selectedProduct.imagen_url}
                                                alt="Actual"
                                                className="img-fluid mt-2"
                                                style={{ maxHeight: "200px" }}
                                            />
                                        </div>
                                    )}

                                    {/* File picker */}
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />

                                    {/* Preview for newly selected image */}
                                    {imagePreviewUrl && (
                                        <img
                                            src={imagePreviewUrl}
                                            alt="Vista previa"
                                            className="mt-2 img-fluid"
                                            style={{ maxHeight: "200px" }}
                                        />
                                    )}

                                    {isEditing && (
                                        <div>
                                            <small className="text-muted">
                                                *Si no seleccionas una nueva imagen, se mantendrá la actual.
                                            </small>
                                        </div>
                                    )}
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
                            </Button>Ñ
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default CrudProducts;

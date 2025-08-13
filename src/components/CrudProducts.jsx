// CrudProducts.jsx

import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Modal, Card, InputGroup } from 'react-bootstrap';

const API_BASE_URL = 'http://localhost/emakick2/apiEK.php';

const BASE_IMAGE_URL = 'http://localhost/emakick2/imagenes/';

const CrudProductos = () => {
    const [productos, setProductos] = useState([]);
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({
        descripcion: '',
        precio_doc: '', // Changed from 'precio' to match API
        stock: '',
        imagen: '',
        variaciones: [] // NEW: Add an array for variations
    });
    const [editId, setEditId] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [newVariacion, setNewVariacion] = useState({ color: '', talla: '', stock: '' }); // NEW: State for new variation form

    useEffect(() => {
        const handleResize = () => { setIsMobile(window.innerWidth < 768); };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getProductos = async () => {
        const res = await fetch(API_BASE_URL);
        const data = await res.json();
        setProductos(data);
    };

    const handleClose = () => {
        setShow(false);
        setForm({ descripcion: '', precio_doc: '', stock: '', imagen: '', variaciones: [] }); // Reset form
        setNewVariacion({ color: '', talla: '', stock: '' }); // Reset new variation form
        setEditId(null);
    };

    const handleShow = (producto) => {
        setShow(true);
        if (producto) {
            setForm({
                ...producto,
                precio_doc: Number(producto.precio_doc),
                stock: Number(producto.stock),
                variaciones: producto.variaciones || [] // Load existing variations
            });
            setEditId(producto.id);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editId ? 'PUT' : 'POST';
        const url = editId ? `${API_BASE_URL}/${editId}` : API_BASE_URL;

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form) // Send the full form, including variations
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            console.log('Product saved successfully');
            handleClose();
            getProductos();
        } catch (error) {
            console.error('Failed to save product:', error);
        }
    };

    const eliminarProducto = async (id) => {
        if (window.confirm('¿Seguro que quieres eliminar este producto?')) {
            await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
            getProductos();
        }
    };

    useEffect(() => {
        getProductos();
    }, []);

    // NEW: Handlers for Variations
    const handleAddVariacion = () => {
        if (newVariacion.color || newVariacion.talla || newVariacion.stock) {
            setForm(prevForm => ({
                ...prevForm,
                variaciones: [...prevForm.variaciones, { ...newVariacion, id: Date.now() }] // Use temporary ID
            }));
            setNewVariacion({ color: '', talla: '', stock: '' });
        }
    };

    const handleRemoveVariacion = (id) => {
        setForm(prevForm => ({
            ...prevForm,
            variaciones: prevForm.variaciones.filter(v => v.id !== id)
        }));
    };

    return (
        <div className="flex flex-col items-center p-3">
            <h2 className="mb-4 text-center">Emakick's Store</h2>
            <div className="w-full flex justify-start mb-3">
                <Button variant="success" className="rounded-pill px-3 py-1 text-sm" onClick={() => handleShow()}>
                    Agrega Producto
                </Button>
            </div>

            {/* Desktop/Tablet View (Table) */}
            {!isMobile && (
                <Table striped bordered hover className="w-100">
                    <thead>
                        <tr>
                            <th>Descripción</th>
                            <th>Proveedor</th>
                            <th>Precio</th>
                            <th>Imagen</th>
                            <th>Variaciones (Talle/Color/Stock)</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map(prod => (
                            <tr key={prod.id}>
                                <td>{prod.descripcion}</td>
                                <td>{prod.fabricant_name}</td>
                                <td>${Number(prod.precio_doc).toFixed(2)}</td>
                                <td>
                                    <img
                                        src={`${BASE_IMAGE_URL}${prod.imagen}`}
                                        alt={prod.descripcion}
                                        style={{ width: '100px', height: '100px', objectFit: 'contain' }}
                                        className="border rounded"
                                    />
                                </td>
                                <td>
                                    {prod.variaciones?.map(v => (
                                        <div key={v.id} className="d-flex justify-content-between">
                                            <span>{v.talla} / {v.color}</span>
                                            <span className="fw-bold">Stock: {v.stock}</span>
                                        </div>
                                    ))}
                                </td>
                                <td>
                                    <Button size="sm" variant="link" onClick={() => handleShow(prod)}>Editar</Button>{' '}
                                    <Button size="sm" variant="link" onClick={() => eliminarProducto(prod.id)}>Eliminar</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {/* Mobile View (Cards) */}
            {isMobile && (
                <div className="d-flex flex-wrap justify-content-center gap-3">
                    {productos.map(prod => (
                        <Card key={prod.id} style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={prod.imagen} alt={prod.descripcion} style={{ height: '180px', objectFit: 'contain' }} />
                            <Card.Body>
                                <Card.Title>{prod.descripcion}</Card.Title>
                                <Card.Text>
                                    <strong>Fabricante:</strong> {prod.fabricant_name}<br/>
                                    <strong>Precio:</strong> ${Number(prod.precio_doc).toFixed(2)}<br/>
                                    <strong>Variaciones:</strong>
                                    {prod.variaciones?.map(v => (
                                        <div key={v.id}>
                                            <span>{v.talla} / {v.color} / (Stock: {v.stock})</span>
                                        </div>
                                    ))}
                                </Card.Text>
                                <div className="d-flex justify-content-between">
                                    <Button size="sm" variant="link" onClick={() => handleShow(prod)}>Editar</Button>
                                    <Button size="sm" variant="link" onClick={() => eliminarProducto(prod.id)}>Eliminar</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            )}
            
            {/* Modal for adding/editing products */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editId ? 'Editar' : 'Agregar'} Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-2"><Form.Label>Descripción</Form.Label><Form.Control value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} required /></Form.Group>
                        <Form.Group className="mb-2"><Form.Label>Precio</Form.Label><Form.Control type="number" value={form.precio_doc} onChange={e => setForm({ ...form, precio_doc: Number(e.target.value) })} required /></Form.Group>
                        <Form.Group className="mb-2"><Form.Label>Imagen (URL)</Form.Label><Form.Control value={form.imagen} onChange={e => setForm({ ...form, imagen: e.target.value })} required /></Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Variaciones (Color, Talla, Stock)</Form.Label>
                            {form.variaciones.map(v => (
                                <InputGroup key={v.id} className="mb-2">
                                    <Form.Control value={v.color} placeholder="Color" readOnly />
                                    <Form.Control value={v.talla} placeholder="Talla" readOnly />
                                    <Form.Control value={v.stock} placeholder="Stock" readOnly />
                                    <Button variant="outline-danger" onClick={() => handleRemoveVariacion(v.id)}>Eliminar</Button>
                                </InputGroup>
                            ))}
                            <InputGroup className="mt-2">
                                <Form.Control value={newVariacion.color} onChange={e => setNewVariacion({ ...newVariacion, color: e.target.value })} placeholder="Nuevo Color" />
                                <Form.Control value={newVariacion.talla} onChange={e => setNewVariacion({ ...newVariacion, talla: e.target.value })} placeholder="Nueva Talla" />
                                <Form.Control type="number" value={newVariacion.stock} onChange={e => setNewVariacion({ ...newVariacion, stock: Number(e.target.value) })} placeholder="Stock" />
                                <Button variant="outline-primary" onClick={handleAddVariacion}>Agregar</Button>
                            </InputGroup>
                        </Form.Group>
                        <Button type="submit" className="rounded-pill mt-2">Guardar</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default CrudProductos;

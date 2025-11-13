// Navbar.jsx
import React, { useContext, useState } from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import carritoIcon from '../assets/icons8-carrito-de-compras-48.png';
import newIcon from '../assets/icons8-pet-commands-follow-100.png';
import { CartContext } from '../components/CartContext';

const Navegacion = () => {
    const { carrito } = useContext(CartContext);
    const [expanded, setExpanded] = useState(false);

    // FIXED: Changed 'item.cantidad' to 'item.quantity' to match the updated CartContext
    const totalItems = carrito.reduce((acc, item) => acc + item.quantity, 0);

    const handleNavLinkClick = () => {
        setExpanded(false);
    };

    return (
        <Navbar style={{ backgroundColor: '#88e660' }} variant="dark" expand="lg" expanded={expanded} onToggle={() => setExpanded(!expanded)}>
            <Container fluid className="navbar-padding-lg">
                <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center w-100">
                    {/* Brand and Toggle grouped on mobile */}
                    <div className="d-flex justify-content-between align-items-center w-100 d-lg-none">
                        <Navbar.Brand
                            as={Link}
                            to="/"
                            className="d-flex align-items-center mx-auto"
                            onClick={handleNavLinkClick}
                            style={{ marginLeft: '0' }}
                        >
                            <img
                            src={newIcon}
                            alt="Icono del Comercio"
                            style={{ width: '48px', height: '48px', marginRight: '15px' }}
                            />
                            <span className="text-dark fs-5 cursiv" style={{ color: '#0a3d62' }}>EMAKICK'S</span>
                        </Navbar.Brand>

                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    </div>

                    {/* Desktop layout */}
                    <div className="d-none d-lg-flex justify-content-between align-items-center w-100">
                        <Navbar.Brand
                            as={Link}
                            to="/"
                            className="d-flex align-items-center"
                            onClick={handleNavLinkClick}
                        >
                            <img
                            src={newIcon}
                            alt="Icono del Comercio"
                            style={{ width: '48px', height: '48px', marginRight: '15px' }}
                            />
                            <span className="fw-bold text-dark fs-5 cursive" style={{ color: '#0a3d62' }}>EMAKICK'S</span>
                        </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    </div>
                </div>
            </Container>

            <Navbar.Collapse id="basic-navbar-nav">
                <Container className="navbar-padding-lg">
                <Nav className="w-100 d-flex flex-column flex-lg-row align-items-center">
                    <div className="d-flex flex-column flex-lg-row">
                    <Nav.Link as={Link} to="/" onClick={handleNavLinkClick} style={{ color: '#0a3d62' }}>Home</Nav.Link>
                    <Nav.Link as={Link} to="/contacto" onClick={handleNavLinkClick} style={{ color: '#0a3d62' }}>Contacto</Nav.Link>
                    <Nav.Link as={Link} to="/admin" onClick={handleNavLinkClick} style={{ color: '#0a3d62' }}>Admin</Nav.Link>
                    <Nav.Link as={Link} to="/carrito" onClick={handleNavLinkClick} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={carritoIcon} alt="Carrito" style={{ width: '32px', height: '32px', marginRight: '8px' }} />
                        {totalItems > 0 && (
                        <Badge pill bg="light" text="dark">
                            {totalItems}
                        </Badge>
                        )}
                    </Nav.Link>
                    </div>
                </Nav>
                </Container>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Navegacion;

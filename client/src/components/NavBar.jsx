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
        <Navbar style={{ backgroundColor: '#abd5db' }} variant="dark" expand="lg" expanded={expanded} onToggle={() => setExpanded(!expanded)}>
            <Container>
                {/* Brand icon on the left */}
                <Navbar.Brand as={Link} to="/" style={{ display: 'flex', alignItems: 'center' }} onClick={handleNavLinkClick}>
                    <img
                        src={newIcon}
                        alt="Icono del Comercio"
                        style={{ width: '48px', height: '48px', marginLeft: '8px' }}
                    />
                </Navbar.Brand>

                {/* Toggle button for mobile */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                {/* Main navigation content */}
                <Navbar.Collapse id="basic-navbar-nav">
                    {/* All links in a single Nav component */}
                    <Nav className="w-100 d-flex flex-column flex-lg-row text-center">
                        <Nav.Link as={Link} to="/" onClick={handleNavLinkClick}>Home</Nav.Link>
                        <Nav.Link as={Link} to="/contacto" onClick={handleNavLinkClick}>Contacto</Nav.Link>
                        
                        {/* The Admin and Cart links are pushed to the right on large screens */}
                        <div className="ms-lg-auto d-flex flex-column flex-lg-row align-items-center justify-content-center">
                            <Nav.Link as={Link} to="/admin" onClick={handleNavLinkClick}>Admin</Nav.Link>
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
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navegacion;

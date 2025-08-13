// ProductCard.jsx

import React from 'react';
import { Card, Button } from 'react-bootstrap';

const BASE_IMAGE_URL = 'http://localhost/emakick2/imagenes/';

const ProductCard = ({ product, agregarAlCarrito }) => {

const imageUrl = `${BASE_IMAGE_URL}${product.imagen}`;


return (
    // Armo la cards
    <Card className="h-100 d-flex flex-column">
      <Card.Img variant="top" src={imageUrl} alt={product.descripcion || "Product Image"} />

      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.descripcion}</Card.Title>
        
        <Card.Text>
          <strong>${product.precio_oferta}</strong>
        </Card.Text>
        
      </Card.Body>

      <Button className="mb-2" variant="primary" onClick={() => agregarAlCarrito(product)}>
          Agregar al carrito
      </Button>

    </Card>
  );
};

export default ProductCard;

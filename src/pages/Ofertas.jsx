// Ofertas.jsx

import React, { useEffect, useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import { CartContext } from '../components/CartContext';

const Ofertas = () => {
  const { agregarAlCarrito } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/category/jewelery');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setProducts(data);
      
      } catch (error) {
        setError(error.message);

      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

  }, []);

  if (loading) {
    return <div>Cargando ...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h2 className="my-4">Listado de Productos</h2>
      <Row>
          {products.map((product) => (
            <Col md={4} key={product.id} className="mb-4">
              <ProductCard product={product} agregarAlCarrito={agregarAlCarrito} />
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default Ofertas;

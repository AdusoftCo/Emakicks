import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    // Load cart from local storage on initial render
    try {
      const savedCart = localStorage.getItem('carrito');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to load cart from localStorage", error);
      return [];
    }
  });

  // Save cart to local storage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('carrito', JSON.stringify(carrito));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  }, [carrito]);

  const agregarAlCarrito = (item) => {
    const existingItem = carrito.find(cartItem => 
      cartItem.id === item.id && 
      cartItem.color === item.color && 
      cartItem.talla === item.talla
    );
    if (existingItem) {
      setCarrito(
        carrito.map(cartItem =>
          cartItem.id === item.id && cartItem.color === item.color && cartItem.talla === item.talla
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        )
      );
    } else {
      setCarrito([...carrito, { ...item }]);
    }
  };

  const eliminarDelCarrito = (item) => {
    setCarrito(carrito.filter(cartItem => {
      const cartItemKey = `${cartItem.id}-${cartItem.color || 'no-color'}-${cartItem.talla || 'no-size'}`;
      const itemKey = `${item.id}-${item.color || 'no-color'}-${item.talla || 'no-size'}`;
      return cartItemKey !== itemKey;
    }));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const aumentarCantidad = (item) => {
    setCarrito(
      carrito.map(cartItem =>
        cartItem.id === item.id && cartItem.color === item.color && cartItem.talla === item.talla
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };

  const disminuirCantidad = (item) => {
    setCarrito(
      carrito.map(cartItem =>
        cartItem.id === item.id && cartItem.color === item.color && cartItem.talla === item.talla
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ).filter(cartItem => cartItem.quantity > 0)
    );
  };

  return (
    <CartContext.Provider value={{
      carrito,
      agregarAlCarrito,
      eliminarDelCarrito,
      vaciarCarrito,
      aumentarCantidad,
      disminuirCantidad
    }}>
      {children}
    </CartContext.Provider>
  );
};

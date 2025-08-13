// CartContext.jsx

import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Initial state: load cart from localStorage or start with an empty array
    const [carrito, setCarrito] = useState(() => {
        try {
            const storedCart = localStorage.getItem('carrito');
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (error) {
            console.error("Error al cargar el carrito del localStorage:", error);
            return [];
        }
    });

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem('carrito', JSON.stringify(carrito));
        } catch (error) {
            console.error("Error al guardar el carrito en el localStorage:", error);
        }
    }, [carrito]);

    // Agregar producto al carrito
    // La función ahora recibe un objeto completo con todas las propiedades necesarias
    const agregarAlCarrito = (itemToAdd) => {
        setCarrito((prevCarrito) => {
            // Buscamos si ya existe un item con el mismo ID, color y talla
            const existe = prevCarrito.find(
                (item) => item.id === itemToAdd.id && item.color === itemToAdd.color && item.talla === itemToAdd.talla
            );

            if (existe) {
                // Si existe, actualizamos la cantidad
                return prevCarrito.map((item) =>
                    item.id === itemToAdd.id && item.color === itemToAdd.color && item.talla === itemToAdd.talla
                        ? { ...item, quantity: item.quantity + itemToAdd.quantity } // Sumamos la cantidad nueva
                        : item
                );
            }
            // Si no existe, agregamos el nuevo item
            return [...prevCarrito, itemToAdd];
        });
    };

    // Eliminar producto del carrito por su ID, color y talla
    const eliminarDelCarrito = (id, color, talla) => {
        setCarrito((prevCarrito) =>
            prevCarrito.filter((item) => !(item.id === id && item.color === color && item.talla === talla))
        );
    };

    // Aumentar la cantidad de un producto
    const aumentarCantidad = (id, color, talla) => {
        setCarrito(prevCarrito =>
            prevCarrito.map(item =>
                item.id === id && item.color === color && item.talla === talla
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    // Disminuir la cantidad de un producto
    const disminuirCantidad = (id, color, talla) => {
        setCarrito(prevCarrito =>
            prevCarrito.map(item =>
                item.id === id && item.color === color && item.talla === talla
                    ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                    : item
            )
        );
    };

    // Vaciar el carrito
    const vaciarCarrito = () => {
        setCarrito([]);
    };

    return (
        <CartContext.Provider
            value={{
                carrito,
                setCarrito,
                agregarAlCarrito,
                eliminarDelCarrito,
                vaciarCarrito,
                aumentarCantidad,
                disminuirCantidad
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

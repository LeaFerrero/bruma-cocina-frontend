import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

const initCart = () => {
  const savedCart = localStorage.getItem("bruma_cart");
  return savedCart ? JSON.parse(savedCart) : [];
};

function CartProvider({ children }) {
  // Inicializamos usando la función auxiliar en lugar de un array vacío
  const [cart, setCart] = useState(initCart);

  // Guardamos en localStorage cada vez que el carrito cambia
  useEffect(() => {
    localStorage.setItem("bruma_cart", JSON.stringify(cart));
  }, [cart]);

  // Función para agregar una vianda al carrito
  const addToCart = (meal) => {
    setCart((prevCart) => {
      const existingMeal = prevCart.find((item) => item._id === meal._id);

      if (existingMeal) {
        return prevCart.map((item) =>
          item._id === meal._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { ...meal, quantity: 1 }];
    });
  };

  // Función para sumar o restar la cantidad desde el modal
  const updateQuantity = (id, amount) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item._id === id) {
          const newQuantity = item.quantity + amount;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }),
    );
  };

  // Función para eliminar por completo una vianda del carrito
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  // Función para vaciar el carrito de golpe
  const clearCart = () => setCart([]);

  // Calculamos el precio total a pagar de forma dinámica
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }

  return context;
};

export { CartProvider, useCart };

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cart')) || []; } catch { return []; }
  });

  useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart]);

  const addToCart = (product) => setCart(prev => {
    const found = prev.find(item => item.id === product.id);
    if (found) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
    return [...prev, { ...product, quantity: 1 }];
  });

  const increaseQuantity = id => setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  const decreaseQuantity = id => setCart(prev => prev.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
  const removeFromCart = id => setCart(prev => prev.filter(item => item.id !== id));
  const clearCart = () => setCart([]);

  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const totalPrice = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

  return <CartContext.Provider value={{ cart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart, totalItems, totalPrice }}>
    {children}
  </CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}

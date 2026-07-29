import { createContext, useContext, useState, useEffect } from 'react';
import { getCart, addToCart, updateCartItem, removeCartItem, clearCart as clearCartApi } from '../services/cartService';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await getCart();
      setCart(data.cart);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchCart();
    else setCart({ items: [], total: 0 });
  }, [user]);

  const addItem = async (productId, quantity = 1) => {
    await addToCart(productId, quantity);
    await fetchCart();
  };

  const updateItem = async (cartItemId, quantity) => {
    await updateCartItem(cartItemId, quantity);
    await fetchCart();
  };

  const removeItem = async (cartItemId) => {
    await removeCartItem(cartItemId);
    await fetchCart();
  };

  const clearCart = async () => {
    await clearCartApi();
    setCart({ items: [], total: 0 });
  };

  return (
    <CartContext.Provider value={{ cart, loading, addItem, updateItem, removeItem, clearCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

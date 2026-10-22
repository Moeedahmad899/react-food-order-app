import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { cartReducer, initialCartState, CART_ACTIONS } from './cartReducer';
import toast from "react-hot-toast";

const CartContext = createContext(null);

export function CartContextProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const addItem = useCallback((item) => {
    dispatch({ type: CART_ACTIONS.ADD_ITEM, item });
      toast.success(`${item.name} has been added to cart`);

  }, []);

  const removeItem = useCallback((id) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, id });
      toast("Item removed from cart");

  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
      toast.error("Cart cleared");

  }, []);

  const value = useMemo(() => {
    const totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = state.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    return {
      items: state.items,
      totalQuantity,
      totalPrice,
      addItem,
      removeItem,
      clearCart,
    };
  }, [state.items, addItem, removeItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside <CartContextProvider>');
  }
  return context;
}
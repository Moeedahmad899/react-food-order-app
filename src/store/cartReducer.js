export const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  CLEAR_CART: 'CLEAR_CART',
};

export const initialCartState = { items: [] };

export function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { id, name, price } = action.item; // keep only what the cart needs
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { id, name, price, quantity: 1 }],
      };
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const existingItem = state.items.find((item) => item.id === action.id);

      if (!existingItem) {
        return state; // nothing to remove — don't crash
      }

      if (existingItem.quantity === 1) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.id),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.id ? { ...item, quantity: item.quantity - 1 } : item
        ),
      };
    }

    case CART_ACTIONS.CLEAR_CART:
      return { ...state, items: [] };

    default:
      return state;
  }
}
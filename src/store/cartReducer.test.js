import { cartReducer, initialCartState, CART_ACTIONS } from "./cartReducer";

const pizza = {
  id: "m1",
  name: "Pizza",
  price: 12.99,
  description: "Tasty",
  image: "pizza.jpg",
};

describe("cartReducer", () => {
  test("adds a new item with quantity 1", () => {
    const state = cartReducer(initialCartState, {
      type: CART_ACTIONS.ADD_ITEM,
      item: pizza,
    });

    expect(state.items).toEqual([
      { id: "m1", name: "Pizza", price: 12.99, quantity: 1 },
    ]);
  });

  test("increases the quantity when the same item is added again", () => {
    let state = cartReducer(initialCartState, {
      type: CART_ACTIONS.ADD_ITEM,
      item: pizza,
    });
    state = cartReducer(state, { type: CART_ACTIONS.ADD_ITEM, item: pizza });

    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
  });

  test("decreases the quantity when removing an item with quantity 2", () => {
    const start = {
      items: [{ id: "m1", name: "Pizza", price: 12.99, quantity: 2 }],
    };
    const state = cartReducer(start, {
      type: CART_ACTIONS.REMOVE_ITEM,
      id: "m1",
    });

    expect(state.items[0].quantity).toBe(1);
  });

  test("removes the item when its quantity is 1", () => {
    const start = {
      items: [{ id: "m1", name: "Pizza", price: 12.99, quantity: 1 }],
    };
    const state = cartReducer(start, {
      type: CART_ACTIONS.REMOVE_ITEM,
      id: "m1",
    });

    expect(state.items).toEqual([]);
  });

  test("does nothing when the item is not in the cart", () => {
    const state = cartReducer(initialCartState, {
      type: CART_ACTIONS.REMOVE_ITEM,
      id: "nope",
    });

    expect(state).toBe(initialCartState);
  });

  test("clears the cart", () => {
    const start = {
      items: [{ id: "m1", name: "Pizza", price: 12.99, quantity: 3 }],
    };
    const state = cartReducer(start, { type: CART_ACTIONS.CLEAR_CART });

    expect(state.items).toEqual([]);
  });
});

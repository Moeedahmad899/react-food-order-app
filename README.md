# ReactFood – Food Order App

A small food ordering app built with React 19 and Vite. Users can browse meals,
add them to a cart, and submit an order.

## Getting started

```bash
npm install
npm run dev      # start the app on localhost
npm test         # run unit tests (Jest)
npm run format   # format code with Prettier
```

## Folder structure

```
src/
  api/          functions that talk to the server (fetchMeals, submitOrder)
  hooks/        TanStack Query hooks (useMeals, useSubmitOrder)
  store/        client state: cart (Context + useReducer) and which modal is open
  components/
    layout/     Header
    meals/      Meals, MealItem
    cart/       Cart, CartItem
    checkout/   Checkout
    ui/         reusable pieces: Button, Input, Modal, ErrorMessage
  utils/        helpers (currency formatting)
```

## Decisions I made

**Structure**

- Components are grouped by feature. State, hooks and API code live outside
  `components/` because they are not UI.

**Toasts**

- added toast when item add,remove and clear from cart

**Data fetching**

- All `fetch` calls are in `src/api/`. Components don't know about URLs.
- I replaced my custom `useHttp` hook with TanStack Query. It handles loading,
  errors, caching, retries and request cancelling.
- `useQuery` is used for reading meals; `useMutation` is used for submitting orders.
- Prices from the API are strings, so they are converted to numbers once, in `fetchMeals`.

**Loading, error and empty states**

- Meals: loading text, an error message with a "Try again" button, and an empty message.
- Cart: an empty message, and the checkout button is hidden when the cart is empty.
- Checkout: "Sending order..." while submitting, the server's error message on failure,
  and the form keeps the user's input after an error.

**State management**

- Server state (meals, orders) is handled by TanStack Query. Client state (cart, open modal)
  is handled by Context.
- The cart uses `useReducer`, with the reducer as a pure function in its own file.
- Totals are calculated from the items (derived state), never stored separately.
- The context value is memoized so components only re-render when the cart changes.
- `useCart()` / `useUserProgress()` throw a clear error if used outside their provider.

**Testing**

- Jest unit tests for the cart reducer

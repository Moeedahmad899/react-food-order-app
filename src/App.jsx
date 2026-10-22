import Header from "./components/layout/Header";
import Meals from "./components/meals/Meals";
import Cart from "./components/cart/Cart";
import Checkout from "./components/checkout/Checkout";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Toaster position="top-left" />
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;

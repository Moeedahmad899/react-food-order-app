import { currenncyFormatter } from "../utils/formatting";
import Modal from "./UI/Model";
import Input from "./UI/Input";
import UserProgressContext from "./store/UserProgressContext";
import CartContext from "./store/CartContext";
import { useContext, useActionState } from "react";
import Button from "./UI/Button";
import useHttp from "./hooks/useHTTP";
import Error from "./Error";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCTX = useContext(CartContext);
  const userProgressCTX = useContext(UserProgressContext);

  const { data, error, sendRequest, clearData } = useHttp(
    "http://localhost:3000/orders",
    requestConfig
  );

  const cartTotal = cartCTX.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  function handleClose() {
    userProgressCTX.hideCheckout();
  }

  function handleFinish() {
    userProgressCTX.hideCheckout();
    cartCTX.clearCart();
    clearData();
  }

  async function checkoutAction(prevState, fd) {
    const userData = Object.fromEntries(fd.entries());

    await sendRequest(
      JSON.stringify({
        order: {
          items: cartCTX.items,
          customer: userData,
        },
      })
    );
  }

  const [formState, formAction, isSending] = useActionState(
    checkoutAction,
    null
  );

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCTX.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>Success</h2>
        <p>Your Order was successfully submitted!</p>
        <p className="model-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCTX.progress === "checkout"} onClose={handleClose}>
      <form action={formAction}>
        <h2>CHECKOUT</h2>
        <p>TOTAL AMOUNT: {currenncyFormatter.format(cartTotal)}</p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        {error && <Error title="failed to submit order" message={error} />}

        <p className="model-actions">{actions}</p>
      </form>
    </Modal>
  );
}
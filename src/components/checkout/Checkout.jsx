import { useContext } from 'react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';
import ErrorMessage from '../ui/ErrorMessage';
import CartContext from '../../store/CartContext';
import UserProgressContext from '../../store/UserProgressContext';
import { useSubmitOrder } from '../../hooks/useSubmitOrder';

import { currenncyFormatter } from '../../utils/formatting';
export default function Checkout() {
  const cartCTX = useContext(CartContext);
  const userProgressCTX = useContext(UserProgressContext);
  const { mutate, isPending, isError, isSuccess, error, reset } = useSubmitOrder();

  const cartTotal = cartCTX.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  function handleClose() {
    userProgressCTX.hideCheckout();
    reset(); // clear old error/success so it doesn't show next time
  }

  function handleFinish() {
    userProgressCTX.hideCheckout();
    cartCTX.clearCart();
    reset();
  }

  function handleSubmit(event) {
    event.preventDefault();
    const customer = Object.fromEntries(new FormData(event.target));

    mutate({
      // send only what the server needs — never trust prices from the browser
      items: cartCTX.items.map(({ id, quantity }) => ({ id, quantity })),
      customer,
    });
  }

  const isOpen = userProgressCTX.progress === 'checkout';

  if (isSuccess) {
    return (
      <Modal open={isOpen} onClose={handleFinish}>
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total amount: {currenncyFormatter.format(cartTotal)}</p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        {isError && (
          <ErrorMessage title="Failed to submit order" message={error.message} />
        )}

        <p className="modal-actions">
          {isPending ? (
            <span>Sending order...</span>
          ) : (
            <>
              <Button type="button" textOnly onClick={handleClose}>
                Close
              </Button>
              <Button>Submit Order</Button>
            </>
          )}
        </p>
      </form>
    </Modal>
  );
}
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import ErrorMessage from "../ui/ErrorMessage";
import { useSubmitOrder } from "../../hooks/useSubmitOrder";
import { useCart } from "../../store/CartContext";
import { useUserProgress, PROGRESS } from "../../store/UserProgressContext";

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { progress, close } = useUserProgress();

  const { mutate, isPending, isError, isSuccess, error, reset } =
    useSubmitOrder();

  function handleClose() {
    close();
    reset();
  }

  function handleFinish() {
    close();
    clearCart();
    reset();
  }

  function handleSubmit(event) {
    event.preventDefault();
    const customer = Object.fromEntries(new FormData(event.target));
    mutate({
      items: items.map(({ id, quantity }) => ({ id, quantity })),
      customer,
    });
  }

  const isOpen = progress === PROGRESS.CHECKOUT;

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
        <p>Total amount: {totalPrice}</p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        {isError && (
          <ErrorMessage
            title="Failed to submit order"
            message={error.message}
          />
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

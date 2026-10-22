import Modal from "../ui/Modal";
import Button from "../ui/Button";
import CartItem from "./CartItem";
import { useCart } from "../../store/CartContext";
import { useUserProgress, PROGRESS } from "../../store/UserProgressContext";
import { currenncyFormatter } from "../../utils/formatting";

export default function Cart() {
  const { items, totalPrice, addItem, removeItem } = useCart();
  const { progress, showCheckout, close } = useUserProgress();

  const isOpen = progress === PROGRESS.CART;

  return (
    <Modal className="cart" open={isOpen} onClose={isOpen ? close : undefined}>
      <h2>Your Cart</h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <CartItem
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              onIncrease={() => addItem(item)}
              onDecrease={() => removeItem(item.id)}
            />
          ))}
        </ul>
      )}

      <p className="cart-total">{currenncyFormatter.format(totalPrice)}</p>

      <p className="modal-actions">
        <Button textOnly onClick={close}>
          Close
        </Button>
        {items.length > 0 && (
          <Button onClick={showCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
}

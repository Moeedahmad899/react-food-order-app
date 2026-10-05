import { useContext } from "react";
import CartContext from "./store/CartContext";
import Modal from "./UI/Model";
import { currenncyFormatter } from "../utils/formatting";
import Button from "./UI/Button";
import UserProgressContext from "./store/UserProgressContext";
import CartItem from "./UI/CartItem";
function Cart() {
    const cartCTX = useContext(CartContext);
    const userProgressCTX = useContext(UserProgressContext);

    const cartTotal = cartCTX.items.reduce((totalPrice, item)=>{
        return totalPrice + item.quantity *item.price;
    },0)

  function handleCloseCart(){
    userProgressCTX.hideCart('');
  }
    function handleGoToCheckout(){
    userProgressCTX.showCheckout();
  }
  return (
  <Modal className="cart" open={userProgressCTX.progress === 'cart'} 
   onClose={userProgressCTX.progress === 'cart' ? handleCloseCart:null}
  >
        <h2>Your Cart</h2>
        <ul>
            {cartCTX.items.map((item)=>{
                
                return (
                    <CartItem key={item.id} 
                    name={item.name}
                    quantity={item.quantity}
                    price={item.price}
                    onIncrease = {()=>cartCTX.addItem(item)}
                    onDecrease = {()=>cartCTX.removeItem(item.id)}
                />
                )
             
            })}
        </ul>
        <p className="cart-total">{currenncyFormatter.format(cartTotal)}</p>
        <p className="model-actions">
            <Button textOnly onClick={handleCloseCart}>Close</Button>
           {cartCTX.items.length > 0 &&
             <Button onClick={handleGoToCheckout}>Go To Checkout</Button>
             }
        </p>
  </Modal>
  );
}

export default Cart;

import { useContext } from 'react';
import logoImg from '../assets/logo.jpg'
import Button from './UI/Button';
import CartContext from "./store/CartContext";
import UserProgressContext from './store/UserProgressContext';
function Header() {
    
    const cartCTX = useContext(CartContext);
    const userProgressCTX = useContext(UserProgressContext);
    const totalCartItems = cartCTX.items.reduce((totalNumberOfItems, item)=>{
        return totalNumberOfItems + item.quantity;
    },0)

    function handleShowCart(){
        userProgressCTX.showCart();
    }
  return (
   <header id="main-header">
    <div id="title">
        <img src={logoImg} alt="" />
        <h1>ReactFood</h1>
    </div>
    <nav>
        <Button onClick={handleShowCart} textOnly>CART ( {totalCartItems})</Button>
    </nav>
   </header>
  );
}

export default Header;

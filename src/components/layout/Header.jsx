import logoImg from '../../assets/logo.jpg';
import Button from '../ui/Button';
import CartContext from '../../store/CartContext';
import UserProgressContext from '../../store/UserProgressContext';
import { useContext } from 'react';
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

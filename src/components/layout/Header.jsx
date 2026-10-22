import logoImg from "../../assets/logo.jpg";
import Button from "../ui/Button";
import { useCart } from "../../store/CartContext";
import { useUserProgress } from "../../store/UserProgressContext";

export default function Header() {
  const { totalQuantity } = useCart();
  const { showCart } = useUserProgress();

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="ReactFood logo" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly onClick={showCart}>
          Cart ({totalQuantity})
        </Button>
      </nav>
    </header>
  );
}

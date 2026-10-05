import { useContext } from "react";
import { currenncyFormatter } from "../utils/formatting";
import Button from "./UI/Button";
import CartContext from "./store/CartContext";
function MealItem({meal}) {
    const cartCTX = useContext(CartContext);
    function handleAddMealToCar(){

   cartCTX.addItem(meal);
    }
  return (
   <li className="meal-item">
    <article>
        <img src= {`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
            <h3>{meal.name}</h3>
            <p className="meal-item-price">{currenncyFormatter.format(meal.price)}</p>
             <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
            <Button onClick={handleAddMealToCar}>ADD TO CART</Button>
        </p>
    </article>
   </li>
  );
}

export default MealItem;

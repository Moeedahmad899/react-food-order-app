import Button from '../ui/Button';
import { useCart } from '../../store/CartContext';

import  { currenncyFormatter}  from "../../utils/formatting"
export default function MealItem({ meal }) {
  const { addItem } = useCart();

  return (
    <li className="meal-item">
      <article>
        <img src={`/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{currenncyFormatter.format(meal.price)}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={() => addItem(meal)}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
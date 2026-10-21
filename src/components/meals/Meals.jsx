import MealItem from './MealItem';

import ErrorMessage from '../ui/ErrorMessage';
import { useMeals } from '../../hooks/useMeals';


export default function Meals() {

  const {data:meals, isPending, isError, error , refetch} = useMeals();



  if (isPending) {
    return <p className="center">Fetching meals...</p>;
  }
 
  if(isError){
    return <ErrorMessage title="Failed to fetch meals" 
    message={error.message}
            onRetry={refetch}

    
    />
  }

   if (meals.length === 0) {
    return <p className="center">No meals available right now.</p>;
  }

  return (
    <ul id="meals">
      {meals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
import MealItem from './MealItem';
import useHttp from '../../hooks/useHttp';
import ErrorMessage from '../ui/ErrorMessage';
const requestConfig = {};

export default function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("/meals.json", requestConfig, []);



  if (isLoading) {
    return <p className='center'>Fetching meals...</p>;
  }

  if (error) {
    return <Error title="failed to fetch meals" message={error}/>
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
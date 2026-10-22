export async function fetchMeals({signal}) {
    const response =  await fetch('/meals.json',{signal});
    if(!response.ok){
        throw new Error('could not load meals. Please try again later');
    }
    const meals = await response.json();
    return meals.map((meal)=>({...meal,price: Number(meal.price)}));
}
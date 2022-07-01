import { useState, useEffect } from "react";
import "./availableMeals.css";
import { Card } from "../UI/Card";
import MealItem from "./Item/Mealtem";

function AvailableMeals(props) {

  const [meals, setMeals] = useState([]);
  const [isLoading, setisLoading] = useState(1);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('https://food-order-40bae-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json');

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        });
      }
      
      setisLoading(false);
      setMeals(loadedMeals);
    }

    fetchMeals().catch((error) => {
      setisLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading.....</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section>
        <p>{httpError} </p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section class="meals">
      <Card>
        <ul> {mealsList}</ul>
      </Card>
    </section>
  );
}

export default AvailableMeals;

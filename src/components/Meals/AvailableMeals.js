import { useState, useEffect } from "react";
import "./availableMeals.css";
import { Card } from "../UI/Card";
import MealItem from "./Item/Mealtem";
import menu from "./test.json";

function AvailableMeals(props) {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      // if (!response.ok) {
      //   throw new Error("Something went wrong");
      // }

      // const responseData = await response.json();
      const responseData = menu;

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setIsLoading(false);
      setMeals(loadedMeals);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
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
    <div className="">
      <div className="x">
        <Card> {mealsList[0]}</Card>
        <Card> {mealsList[1]}</Card>
        <Card> {mealsList[2]}</Card>
      </div>
      <div className="x">
      <Card> {mealsList[3]}</Card>
      <Card> {mealsList[4]}</Card>
      <Card> {mealsList[5]}</Card>
      </div>
      <div className="x">
      <Card> {mealsList[6]}</Card>
      <Card> {mealsList[7]}</Card>
      <Card> {mealsList[8]}</Card>
      </div>
    </div>
  );
}

export default AvailableMeals;

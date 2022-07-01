import { Fragment } from "react";
import { MealsSummary } from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";
import "./meals.css";

export default function Meals() {
  return (
    <Fragment>
      <MealsSummary />
      <AvailableMeals />
    </Fragment>
  );
}

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const { isLoading, error, sendRequest: fetchMeals } = useHttp();

  useEffect(() => {
    fetchMeals(
      {
        url: "https://react-http-7d3ed-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json",
      },
      (mealsData) => {
        const loadedMeals = Object.keys(mealsData).map((key) => {
          return {
            id: key,
            name: mealsData[key].name,
            description: mealsData[key].description,
            price: mealsData[key].price,
          };
        });

        setMeals(loadedMeals);
      }
    );
  }, [fetchMeals]);

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.error}>
        <p>{error}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;

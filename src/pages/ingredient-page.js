import { MainLayout } from "../layouts/main-layout";
import { IngredientPageComponent } from "../components/ingredient-page-component/ingredient-page-component.js";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

export function IngredientPage() {
  const { ingredients } = useSelector(state => state.burgerIngredientsReducer);
  const { id } = useParams();

  const ingredient = useMemo(() => {
    if (ingredients) {
      return ingredients.find(item => item._id === id);
    }
    return;
  }, [ingredients, id]);

  return (
    <MainLayout>
      <IngredientPageComponent ingredient={ingredient} />
    </MainLayout>
  );
}

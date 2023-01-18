import { MainLayout } from "layouts/main-layout";
import { IngredientPageComponent } from "components/ingredient-page-component/ingredient-page-component";
import { useMemo, FC } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "hooks";

export const IngredientPage: FC = () => {
  const { ingredients } = useAppSelector(
    state => state.burgerIngredientsReducer,
  );
  const { id } = useParams() as { id: string };

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
};

import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {MainLayout} from '../layouts/main-layout.js';
import {BurgerIngredients} from '../components/burger-ingredients/burger-ingredients.js'; 
import {BurgerConstructor} from '../components/burger-constructor/burger-constructor.js';

export function MainPage() {
  return (
    <MainLayout>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </MainLayout>
  );
}
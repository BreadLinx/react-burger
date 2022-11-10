import ingredientDetailsStyles from './ingredient-details.module.css';
import {useSelector} from 'react-redux';

export function IngredientDetails() {
    const {relevantIngredient} = useSelector(state => state.ingredientDetailsReducer);

    return (
        <>
            <h2 className={`text text_type_main-large ${ingredientDetailsStyles.title}`}>Детали ингредиента</h2>
            <img src={relevantIngredient.image} alt={relevantIngredient.name} className={ingredientDetailsStyles.image} />
            <p className={`text text_type_main-medium mt-4 mb-8 ${ingredientDetailsStyles.name}`}>{relevantIngredient.name}</p>
            <ul className={ingredientDetailsStyles.compound}>
                <li className={ingredientDetailsStyles.component}>
                    <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
                    <p className={`text text_type_digits-medium text_color_inactive ${ingredientDetailsStyles.digits}`}>{relevantIngredient.calories}</p>
                </li>
                <li className={ingredientDetailsStyles.component}>
                    <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
                    <p className={`text text_type_digits-medium text_color_inactive ${ingredientDetailsStyles.digits}`}>{relevantIngredient.proteins}</p>
                </li>
                <li className={ingredientDetailsStyles.component}>
                    <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
                    <p className={`text text_type_digits-medium text_color_inactive ${ingredientDetailsStyles.digits}`}>{relevantIngredient.fat}</p>
                </li>
                <li className={ingredientDetailsStyles.component}>
                    <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
                    <p className={`text text_type_digits-medium text_color_inactive ${ingredientDetailsStyles.digits}`}>{relevantIngredient.carbohydrates}</p>
                </li>
            </ul>
        </>
    );
}
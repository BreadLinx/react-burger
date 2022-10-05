import ingredientDetailsStyles from './ingredient-details.module.css';
import {ingridientPropTypes} from '../../utils/prop-types.js';

export function IngredientDetails({ingredientDetails}) {
    return (
        <>
            <h2 className={`text text_type_main-large ${ingredientDetailsStyles.title}`}>Детали ингредиента</h2>
            <img src={ingredientDetails.image} alt={ingredientDetails.name} className={ingredientDetailsStyles.image} />
            <p className={`text text_type_main-medium mt-4 mb-8 ${ingredientDetailsStyles.name}`}>{ingredientDetails.name}</p>
            <ul className={ingredientDetailsStyles.compound}>
                <li className={ingredientDetailsStyles.component}>
                    <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
                    <p className={`text text_type_digits-medium text_color_inactive ${ingredientDetailsStyles.digits}`}>{ingredientDetails.calories}</p>
                </li>
                <li className={ingredientDetailsStyles.component}>
                    <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
                    <p className={`text text_type_digits-medium text_color_inactive ${ingredientDetailsStyles.digits}`}>{ingredientDetails.proteins}</p>
                </li>
                <li className={ingredientDetailsStyles.component}>
                    <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
                    <p className={`text text_type_digits-medium text_color_inactive ${ingredientDetailsStyles.digits}`}>{ingredientDetails.fat}</p>
                </li>
                <li className={ingredientDetailsStyles.component}>
                    <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
                    <p className={`text text_type_digits-medium text_color_inactive ${ingredientDetailsStyles.digits}`}>{ingredientDetails.carbohydrates}</p>
                </li>
            </ul>
        </>
    );
}

IngredientDetails.propTypes = {
    ingredientDetails: ingridientPropTypes
};
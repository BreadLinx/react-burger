import IngredientDetailsStyles from './ingredient-details.module.css';
import PropTypes from 'prop-types';

export function IngredientDetails({image, name, calories, proteins, fats, carbohydrates}) {
    return (
        <>
            <h2 className={`text text_type_main-large ${IngredientDetailsStyles.title}`}>Детали ингредиента</h2>
            <img src={image} alt={name} className={IngredientDetailsStyles.image} />
            <p className={`text text_type_main-medium mt-4 mb-8 ${IngredientDetailsStyles.name}`}>{name}</p>
            <ul className={IngredientDetailsStyles.compound}>
                <li className={IngredientDetailsStyles.component}>
                    <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
                    <p className={`text text_type_digits-medium text_color_inactive ${IngredientDetailsStyles.digits}`}>{calories}</p>
                </li>
                <li className={IngredientDetailsStyles.component}>
                    <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
                    <p className={`text text_type_digits-medium text_color_inactive ${IngredientDetailsStyles.digits}`}>{proteins}</p>
                </li>
                <li className={IngredientDetailsStyles.component}>
                    <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
                    <p className={`text text_type_digits-medium text_color_inactive ${IngredientDetailsStyles.digits}`}>{fats}</p>
                </li>
                <li className={IngredientDetailsStyles.component}>
                    <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
                    <p className={`text text_type_digits-medium text_color_inactive ${IngredientDetailsStyles.digits}`}>{carbohydrates}</p>
                </li>
            </ul>
        </>
    );
}

IngredientDetails.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fats: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired
};
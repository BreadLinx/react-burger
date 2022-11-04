import {createAsyncThunk} from '@reduxjs/toolkit';
import {getIngredients} from '../../utils/burger-api.js';

export const getIngridients = createAsyncThunk(
    'burgerIngredients/getIngridients',
    async () => {
        let data;
        await getIngredients()
        .then((res) => {
            data = res.data;
        })
        .catch((err) => {
            alert(`Произошла ошибка при выполнении запроса. ${err}`);
        });
        return data;
    }
);
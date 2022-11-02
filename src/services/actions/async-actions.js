import {createAsyncThunk} from '@reduxjs/toolkit';
import {getIngredients, sendOrderRequest} from '../../utils/burger-api.js';

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

export const sendOrder = createAsyncThunk(
    'orderDetailsSlice/sendOrder',
    async (idArray) => {
        let data = null;
        await sendOrderRequest(idArray)
        .then((res) => {
            data = {...res};
        })
        .catch((err) => {
            alert(`Произошла ошибка при выполнении запроса. ${err}`);
        });
        return data;
    }
);
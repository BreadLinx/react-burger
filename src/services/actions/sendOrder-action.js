import {createAsyncThunk} from '@reduxjs/toolkit';
import {sendOrderRequest} from '../../utils/burger-api.js';

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
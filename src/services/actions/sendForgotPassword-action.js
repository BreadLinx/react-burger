import {createAsyncThunk} from '@reduxjs/toolkit';
import {sendForgotPasswordRequest} from '../../utils/burger-api.js';

export const sendForgotPassword = createAsyncThunk(
    'forgotPassword/sendForgotPassword',
    async (email) => {
        let data;
        await sendForgotPasswordRequest(email)
        .then((res) => {
            data = res.data;
        })
        .catch((err) => {
            alert(`Произошла ошибка при выполнении запроса. ${err}`);
        });
        return data;
    }
);
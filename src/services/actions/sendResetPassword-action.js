import {createAsyncThunk} from '@reduxjs/toolkit';
import {sendResetPasswordRequest} from '../../utils/burger-api.js';

export const sendResetPassword = createAsyncThunk(
    'forgotPassword/sendResetPassword',
    async (password, token) => {
        let data;
        await sendResetPasswordRequest(password, token)
        .then((res) => {
            data = res.data;
        })
        .catch((err) => {
            alert(`Произошла ошибка при выполнении запроса. ${err}`);
        });
        return data;
    }
);
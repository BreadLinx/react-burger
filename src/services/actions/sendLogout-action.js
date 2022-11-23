import {createAsyncThunk} from '@reduxjs/toolkit';
import {sendLogoutRequest} from '../../utils/burger-api.js';

export const sendLogout = createAsyncThunk(
    'loginAuthSlice/sendLogout',
    async () => {
        let data;
        await sendLogoutRequest()
        .then((res) => {
            data = res;
        })
        .catch(() => {
            alert(`Произошла ошибка при выходе из личного кабинета. Попробуйте еще раз.`);
        });
        return data;
    }
);
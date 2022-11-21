import {createAsyncThunk} from '@reduxjs/toolkit';
import {sendRefreshRequest} from '../../utils/burger-api.js';

export const sendRefreshToken = createAsyncThunk(
    'loginAuthSlice/sendRefreshToken',
    async (refreshToken) => {
        let data;
        await sendRefreshRequest(refreshToken)
        .then((res) => {
            data = res;
        })
        .catch(() => {
            // alert(`Произошла ошибка при обновлении токена.`);
        });
        return data;
    }
);
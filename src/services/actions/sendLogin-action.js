import {createAsyncThunk} from '@reduxjs/toolkit';
import {sendLoginRequest} from '../../utils/burger-api.js';

export const sendLogin = createAsyncThunk(
    'loginAuthSlice/sendLogin',
    async ({emailValue, passwordValue}) => {
        let data;
        await sendLoginRequest(emailValue, passwordValue)
        .then((res) => {
            data = res;
        })
        .catch(() => {
            alert(`Произошла ошибка при выполнении запроса. Возможно такой пользователь не существует или вы ввели неверный данные. Попробуйте еще раз.`);
        });
        return data;
    }
);
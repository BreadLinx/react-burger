import {createAsyncThunk} from '@reduxjs/toolkit';
import {sendRegistrationRequest} from '../../utils/burger-api.js';

export const sendRegistration = createAsyncThunk(
    'loginAuthSlice/sendRegistration',
    async ({nameValue, emailValue, passwordValue}) => {
        let data;
        await sendRegistrationRequest(nameValue, emailValue, passwordValue)
        .then((res) => {
            data = res;
        })
        .catch(() => {
            alert(`Произошла ошибка при выполнении запроса. Возможно такой пользователь уже существует или вы ввели неверный данные. Попробуйте еще раз.`);
        });
        return data;
    }
);
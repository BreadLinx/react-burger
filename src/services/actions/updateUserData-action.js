import {createAsyncThunk} from '@reduxjs/toolkit';
import {updateUserDataRequest} from '../../utils/burger-api.js';

export const updateUserData = createAsyncThunk(
    'loginAuthSlice/updateUserData',
    async (authToken) => {
        let data;
        await updateUserDataRequest(authToken)
        .then((res) => {
            data = res;
        })
        .catch((err) => {
            alert(`Произошла ошибка при выполнении запроса. ${err}`);
        });
        return data;
    }
);
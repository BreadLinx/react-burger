import {createAsyncThunk} from '@reduxjs/toolkit';
import {getUserDataRequest} from '../../utils/burger-api.js';

export const getUserData = createAsyncThunk(
    'loginAuthSlice/getUserData',
    async () => {
        let data;
        await getUserDataRequest()
        .then((res) => {
            data = res;
        })
        .catch((err) => {
            alert(err);
        });
        return data;
    }
);
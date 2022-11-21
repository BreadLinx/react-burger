import {createAsyncThunk} from '@reduxjs/toolkit';
import {getUserDataRequest, sendRefreshRequest} from '../../utils/burger-api.js';
import {getCookie} from '../../utils/cookies.js';

export const getUserData = createAsyncThunk(
    'loginAuthSlice/getUserData',
    async (authToken) => {
        let data;
        await getUserDataRequest(authToken)
        .then((res) => {
            data = res;
        })
        .catch((err) => {
            if(err.status !== 403) {
                alert(`При попытке загрузки данных произошла ошибка ${err.status}. Попробуйте еще раз.`);
            }
            sendRefreshRequest(getCookie('refreshToken'))
            .then((res) => {
                console.log(res);
            });
            // if(!refreshData.success) {
            //     Promise.reject(refreshData);
            // }
            // console.log(refreshData);
        });
        return data;
    }
);
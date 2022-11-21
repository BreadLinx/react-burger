import {createSlice} from '@reduxjs/toolkit';
import {sendRegistration} from '../actions/sendRegistration-action.js';
import {sendLogin} from '../actions/sendLogin-action.js';
import {sendRefreshToken} from '../actions/sendRefreshToken-action.js';
import {sendLogout} from '../actions/sendLogout-action.js';
import {getUserData} from '../actions/getUserData-action.js';
import {setCookie} from '../../utils/cookies.js';

const initialState = {
  user: {
      email: '',
      name: '',
  },
  requestStatus: {
    registrationRequest: false,
    registrationError: false,
    registrationSuccess: false,
    loginRequest: false,
    loginError: false,
    loginSuccess: false,
    refreshTokenRequest: false,
    refreshTokenError: false,
    refreshTokenSuccess: false,
    logoutRequest: false,
    logoutError: false,
    logoutSuccess: false,
    getUserDataRequest: false,
    getUserDataError: false,
    getUserDataSuccess: false,
  }
};

export const loginAuthSlice = createSlice({
  name: 'loginAuthSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendRegistration.pending, state => {
        state.requestStatus.registrationRequest = true;
        state.requestStatus.registrationError = false;
        state.requestStatus.registrationSuccess = false;
      })
      .addCase(sendRegistration.fulfilled, (state, action) => {
        state.requestStatus.registrationRequest = false;
        state.requestStatus.registrationSuccess = true;

        const authToken = action.payload.accessToken.split('Bearer ')[1];
        const refreshToken = action.payload.refreshToken;
        setCookie('authToken', authToken);
        setCookie('refreshToken', refreshToken);

        state.user.email = action.payload.user.email;
        state.user.name = action.payload.user.name;
      })
      .addCase(sendRegistration.rejected, state => {
        state.requestStatus.registrationRequest = false;
        state.requestStatus.registrationError = true;
      })
      .addCase(sendLogin.pending, state => {
        state.requestStatus.loginRequest = true;
        state.requestStatus.loginError = false;
        state.requestStatus.loginSuccess = false;
      })
      .addCase(sendLogin.fulfilled, (state, action) => {
        state.requestStatus.loginRequest = false;
        state.requestStatus.loginSuccess = true;

        const authToken = action.payload.accessToken.split('Bearer ')[1];
        const refreshToken = action.payload.refreshToken;
        setCookie('authToken', authToken);
        setCookie('refreshToken', refreshToken);

        state.user.email = action.payload.user.email;
        state.user.name = action.payload.user.name;
      })
      .addCase(sendLogin.rejected, state => {
        state.requestStatus.loginRequest = false;
        state.requestStatus.loginError = true;
      })
      .addCase(sendRefreshToken.pending, state => {
        state.requestStatus.refreshTokenRequest = true;
        state.requestStatus.refreshTokenError = false;
        state.requestStatus.refreshTokenSuccess = false;
      })
      .addCase(sendRefreshToken.fulfilled, (state, action) => {
        state.requestStatus.refreshTokenRequest = false;
        state.requestStatus.refreshTokenSuccess = true;

        console.log(action.payload);

        const authToken = action.payload.accessToken.split('Bearer ')[1];
        const refreshToken = action.payload.refreshToken;
        setCookie('authToken', authToken);
        setCookie('refreshToken', refreshToken);
      })
      .addCase(sendRefreshToken.rejected, state => {
        state.requestStatus.refreshTokenRequest = false;
        state.requestStatus.refreshTokenError = true;
      })
      .addCase(sendLogout.pending, state => {
        state.requestStatus.logoutRequest = true;
        state.requestStatus.logoutError = false;
        state.requestStatus.logoutSuccess = false;
      })
      .addCase(sendLogout.fulfilled, state => {
        state.requestStatus.logoutRequest = false;
        state.requestStatus.logoutSuccess = true;
      })
      .addCase(sendLogout.rejected, state => {
        state.requestStatus.logoutRequest = false;
        state.requestStatus.logoutError = true;
      })
      .addCase(getUserData.pending, state => {
        state.requestStatus.getUserDataRequest = true;
        state.requestStatus.getUserDataError = false;
        state.requestStatus.getUserDataSuccess = false;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.requestStatus.getUserDataRequest = false;
        state.requestStatus.getUserDataSuccess = true;

        state.user.email = action.payload.user.email;
        state.user.name = action.payload.user.name;
      })
      .addCase(getUserData.rejected, state => {
        state.requestStatus.getUserDataRequest = false;
        state.requestStatus.getUserDataError = true;
      })
  },
});

export default loginAuthSlice.reducer;
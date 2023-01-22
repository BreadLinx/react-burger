import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sendRegistration } from "services/actions/sendRegistration-action";
import { sendLogin } from "services/actions/sendLogin-action";
import { sendLogout } from "services/actions/sendLogout-action";
import { getUserData } from "services/actions/getUserData-action";
import { updateUserData } from "services/actions/updateUserData-action";
import { setCookie, deleteCookie } from "utils/cookies";

interface IInitialState {
  user: {
    isUserAuthorized: undefined | boolean;
    email: string;
    name: string;
  };
  requestStatus: {
    registration: {
      request: boolean;
      error: boolean;
      errorMessage: string | undefined;
      success: boolean;
    };
    login: {
      request: boolean;
      error: boolean;
      errorMessage: string | undefined;
      success: boolean;
    };
    logout: {
      request: boolean;
      error: boolean;
      errorMessage: string | undefined;
      success: boolean;
    };
    getUserData: {
      request: boolean;
      error: boolean;
      errorMessage: string | undefined;
      success: boolean;
    };
    updateUserData: {
      request: boolean;
      error: boolean;
      errorMessage: string | undefined;
      success: boolean;
    };
  };
}

const initialState: IInitialState = {
  user: {
    isUserAuthorized: undefined,
    email: "",
    name: "",
  },
  requestStatus: {
    registration: {
      request: false,
      error: false,
      errorMessage: "",
      success: false,
    },
    login: {
      request: false,
      error: false,
      errorMessage: "",
      success: false,
    },
    logout: {
      request: false,
      error: false,
      errorMessage: "",
      success: false,
    },
    getUserData: {
      request: false,
      error: false,
      errorMessage: "",
      success: false,
    },
    updateUserData: {
      request: false,
      error: false,
      errorMessage: "",
      success: false,
    },
  },
};

export const loginAuthSlice = createSlice({
  name: "loginAuthSlice",
  initialState,
  reducers: {
    makeUserAuthorizedTrue: state => {
      state.user.isUserAuthorized = true;
    },
    makeUserAuthorizedFalse: state => {
      state.user.isUserAuthorized = false;
    },
    resetUpdateUserDataRequestStatus: state => {
      state.requestStatus.updateUserData.success = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(sendRegistration.pending, state => {
        state.requestStatus.registration.request = true;
        state.requestStatus.registration.error = false;
        state.requestStatus.registration.success = false;
      })
      .addCase(sendRegistration.fulfilled, (state, action) => {
        state.requestStatus.registration.request = false;
        state.requestStatus.registration.success = true;

        const authToken = action.payload.accessToken.split("Bearer ")[1];
        const refreshToken = action.payload.refreshToken;
        setCookie("authToken", authToken);
        setCookie("refreshToken", refreshToken);

        state.user.isUserAuthorized = true;
        state.user.email = action.payload.user.email;
        state.user.name = action.payload.user.name;
      })
      .addCase(sendRegistration.rejected, (state, action) => {
        state.requestStatus.registration.request = false;
        state.requestStatus.registration.error = true;
        state.requestStatus.registration.errorMessage = action.error.message;
      })
      .addCase(sendLogin.pending, state => {
        state.requestStatus.login.request = true;
        state.requestStatus.login.error = false;
        state.requestStatus.login.success = false;
      })
      .addCase(sendLogin.fulfilled, (state, action) => {
        state.requestStatus.login.request = false;
        state.requestStatus.login.success = true;

        const authToken = action.payload.accessToken.split("Bearer ")[1];
        const refreshToken = action.payload.refreshToken;
        setCookie("authToken", authToken);
        setCookie("refreshToken", refreshToken);

        state.user.isUserAuthorized = true;
        state.user.email = action.payload.user.email;
        state.user.name = action.payload.user.name;
      })
      .addCase(sendLogin.rejected, (state, action) => {
        state.requestStatus.login.request = false;
        state.requestStatus.login.error = true;
        state.requestStatus.login.errorMessage = action.error.message;
      })
      .addCase(sendLogout.pending, state => {
        state.requestStatus.logout.request = true;
        state.requestStatus.logout.error = false;
        state.requestStatus.logout.success = false;
      })
      .addCase(sendLogout.fulfilled, state => {
        state.requestStatus.logout.request = false;
        state.requestStatus.logout.success = true;

        state.user.isUserAuthorized = false;
        state.user.name = "";
        state.user.email = "";
        deleteCookie("authToken");
        deleteCookie("refreshToken");

        state.requestStatus.registration.success = false;
        state.requestStatus.login.success = false;
      })
      .addCase(sendLogout.rejected, (state, action) => {
        state.requestStatus.logout.request = false;
        state.requestStatus.logout.error = true;
        state.requestStatus.logout.errorMessage = action.error.message;
      })
      .addCase(getUserData.pending, state => {
        state.requestStatus.getUserData.request = true;
        state.requestStatus.getUserData.error = false;
        state.requestStatus.getUserData.success = false;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.requestStatus.getUserData.request = false;
        state.requestStatus.getUserData.success = true;

        state.user.email = action.payload.user.email;
        state.user.name = action.payload.user.name;
      })
      .addCase(getUserData.rejected, state => {
        state.requestStatus.getUserData.request = false;
        state.requestStatus.getUserData.error = true;
        state.user.isUserAuthorized = false;
      })
      .addCase(updateUserData.pending, state => {
        state.requestStatus.updateUserData.request = true;
        state.requestStatus.updateUserData.error = false;
        state.requestStatus.updateUserData.success = false;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.requestStatus.updateUserData.request = false;
        state.requestStatus.updateUserData.success = true;

        state.user.email = action.payload.user.email;
        state.user.name = action.payload.user.name;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.requestStatus.updateUserData.request = false;
        state.requestStatus.updateUserData.error = true;
        state.requestStatus.updateUserData.errorMessage = action.error.message;
      });
  },
});

export default loginAuthSlice.reducer;

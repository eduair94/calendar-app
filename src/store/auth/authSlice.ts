import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AuthStateI, AuthStatus, AuthUserI } from './auth.interface';


const initialState:AuthStateI = {
    status: AuthStatus.checking,
    user: {},
    errorMessage: undefined
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onChecking: (state) => {
        state.status = AuthStatus.checking;
        state.user = {}
        state.errorMessage = undefined
    },
    onLogin: (state, action:PayloadAction<AuthUserI>) => {
        state.status = AuthStatus.authenticated;
        state.user = action.payload
        state.errorMessage = undefined;
    },
    onLogout: (state, action:PayloadAction<string|undefined>) => {
      state.status = AuthStatus.notAuthenticated;
      state.user = {}
      state.errorMessage = action.payload;
    },
    clearErrorMesssage: (state) => {
      state.errorMessage = undefined;
    }
  }
});

export const {onChecking, onLogin, onLogout, clearErrorMesssage } = authSlice.actions

export default authSlice.reducer
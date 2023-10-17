import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { AuthState } from '../../interfaces';

const initialState: AuthState = {
    ok: false,
    status: 'checking',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, {payload}: PayloadAction<AuthState>) => {
            state.ok = payload.ok
            state.status = 'authenticated';
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            state.errorMessage = null;
        },
        logout: (state, {payload}: PayloadAction<AuthState | {}>) => {
            console.log('slice',payload)
            state.ok = false;
            state.status = 'not-authenticated';
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = payload?.errorMessage;
        },
        checkingCredencials: (state) => {
            state.status = 'checking';
        },
        // incrementByAmount: (state, action: PayloadAction<number>) => { state.value += action.payload },
    },
});
// Action creators are generated for each case reducer function
export const { login, logout, checkingCredencials } = authSlice.actions;
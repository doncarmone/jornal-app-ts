import { Dispatch } from "@reduxjs/toolkit"
import { checkingCredencials, login, logout } from ".";
import { loginWithEmailAndPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers";
import { authForms } from "../../interfaces";
import { clearNotesLogout } from "../jornal";


export const checkingAuthentication = (email: string, password: string) => {
    return async (dispatch: Dispatch): Promise<void> => {
        dispatch(checkingCredencials());
    }
}

export const startGoogleSignIn = () => {
    return async (dispatch: Dispatch): Promise<void> => {
        dispatch(checkingCredencials());
        const result = await singInWithGoogle();
        // console.log(typeof dispatch( logout(result.errorMessage) ))
        console.log(typeof logout(result.errorMessage))
        if (!result.ok) {
            return dispatch(logout(result.errorMessage));
        }

        dispatch(login(result));
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }: authForms) => {
    return async (dispatch: Dispatch) => {
        dispatch(checkingCredencials());

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });

        if (!ok) return dispatch(logout({ errorMessage }))

        dispatch(login({ uid, displayName, email, photoURL }));
    }
}

export const startLoginUserWithEmailPassword = ({ email, password }: authForms) => {
    return async (dispatch: Dispatch) => {
        dispatch(checkingCredencials());
        const { ok, uid, displayName, photoURL, errorMessage } = await loginWithEmailAndPassword({ email, password });

        if (!ok) {
            return dispatch(logout({ errorMessage }));
        }

        dispatch(login({ uid, displayName, email, photoURL }));
    }
}

export const startLogout = () => {
    return async (dispatch: Dispatch) => {
        
        await logoutFirebase();
        dispatch(logout({}));
        dispatch(clearNotesLogout());
    }
}
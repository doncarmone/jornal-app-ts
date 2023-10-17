import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { FirebaseAuth } from "./config";
import { authForms } from "../interfaces";

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        const { displayName, email, photoURL, uid } = result.user;
        return {
            ok: true,
            //user info
            displayName,
            email,
            photoURL,
            uid
        }

    } catch (error: any) {
        console.error(error)
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage,
            errorCode

        }
    }
}


export const registerUserWithEmailPassword = async ({ email, password, displayName }: authForms) => {
    try {

        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);

        const { uid, photoURL } = resp.user;
        //Todo: Actualizar el displayName en Firebase

        await updateProfile(FirebaseAuth.currentUser, {
            displayName
        });

        return {
            ok: true,
            uid, photoURL, email, displayName, password
        }

    } catch (error) {
        console.error(error)
        return { ok: false, errorMessage: error.message }
    }
}


export const loginWithEmailAndPassword = async ({ email, password }: authForms) => {
    try {
        const result = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { displayName, photoURL, uid } = result.user;
        return {
            ok: true,
            //user info
            displayName,
            email,
            photoURL,
            uid
        }
    } catch (error: any) {
        console.log("Error Provider", error.message)
        return { ok: false, errorMessage: error.message }
    }
}

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
}
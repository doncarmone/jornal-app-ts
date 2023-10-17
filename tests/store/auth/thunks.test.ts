import { loginWithEmailAndPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from '../../../src/firebase/providers';
import { checkingCredencials, login, logout, startGoogleSignIn } from '../../../src/store/auth';
import { checkingAuthentication, startCreatingUserWithEmailPassword, startLoginUserWithEmailPassword, startLogout } from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/jornal';
import { demoUser } from '../../fixtures/authFixtures';

jest.mock('../../../src/firebase/providers')

describe('Test over auth/thunks', () => {
    const dispatch = jest.fn();
    beforeEach(() => jest.clearAllMocks());
    test('should invoke checking credentials', async () => {
        await checkingAuthentication()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredencials())
        // { type: 'auth/checkingCredencials', payload: undefined }
    })

    test('should startGoogleSignIn call checkingCredentials and Login - Success', async () => {
        const loginData = { ok: true, ...demoUser }

        await singInWithGoogle.mockResolvedValue(loginData)
        //thunk
        await startGoogleSignIn()(dispatch);

        expect(dispatch).toBeCalledWith(checkingCredencials());
        expect(dispatch).toBeCalledWith(login(loginData));
    })

    test('should startGoogleSignIn call checkingCredentials and Logout - Error', async () => {
        const loginData = { ok: false, errorMessage: 'Error in Google' }

        await singInWithGoogle.mockResolvedValue(loginData)
        //thunk
        await startGoogleSignIn()(dispatch);

        expect(dispatch).toBeCalledWith(checkingCredencials());
        expect(dispatch).toBeCalledWith(logout(loginData.errorMessage));
    })


    test('startLoginUserWithEmailPassword should call checkingCredentials and Login -Success',async () => {
        const loginData = { ok: true, ...demoUser };

        const formData = { email: demoUser.email, password: "123456" };

        await loginWithEmailAndPassword.mockResolvedValue(loginData);

        await startLoginUserWithEmailPassword(formData)(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredencials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));
    })

    test('startLogout should call logoutFirebase, clearNotes,', async() => {
        await startLogout()(dispatch)

        expect(logoutFirebase).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
        expect(dispatch).toHaveBeenCalledWith(logout({}));

     })
     
     test(' startCreatingUserWithEmailPassword should create a user', async() => {
        const loginData = { ok: true, ...demoUser };
        
        const formData = { email: demoUser.email, password: "123456", displayName: demoUser.displayName };

        await registerUserWithEmailPassword.mockResolvedValue(loginData);
        
        await startCreatingUserWithEmailPassword (formData)(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredencials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));

      })
})
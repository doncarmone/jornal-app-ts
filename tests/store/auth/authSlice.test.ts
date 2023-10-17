import { authSlice, checkingCredencials, login, logout } from '../../../src/store/auth/authSlice';
import { authenticatedState, demoUser, initialState } from '../../fixtures/authFixtures';
describe('Test on AuthSlice', () => {
    test('should return the initial state and be called auth', () => {
        const state = authSlice.reducer(initialState, {})

        expect(authSlice.name).toBe('auth');
        expect(state).toEqual(initialState)
    })

    test('should do the the auth', () => {
        // console.log(login(demoUser))
        const state = authSlice.reducer(initialState, login(demoUser));
        // console.log(state)
        expect(state).toEqual({
            ok: undefined,
            status: 'authenticated',
            uid: '123456',
            email: 'demo@gmail.com',
            displayName: 'demo user',
            photoURL: 'https://demo.jpg',
            errorMessage: null,
        })
    })

    test('should do the logout with out args', () => { 
        const state = authSlice.reducer(authenticatedState, logout());

        expect(state).toEqual({
            ok: false,
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
          })
     })

     test('should do the logout with message args', () => { 
        const errorMessage = 'Wrong Credentials'
        const state = authSlice.reducer(authenticatedState, logout({errorMessage}));

        expect(state).toEqual({
            ok: false,
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: 'Wrong Credentials'
          })
     })

     test('should change the state to checking...', () => { 
        const errorMessage = 'Wrong Credentials'
        const state = authSlice.reducer(authenticatedState, checkingCredencials());
        expect(state.status).toBe('checking')

        
     })
})
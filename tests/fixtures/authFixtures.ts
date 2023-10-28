import { AuthState, User } from '../../src/interfaces/interfaces';

export const initialState: AuthState = {
    ok: false,
    status: 'checking',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

export const authenticatedState: AuthState = {
    ok: undefined,
    status: 'authenticated',
    uid: '123456',
    email: 'demo@gmail.com',
    displayName: 'demo user',
    photoURL: 'https://demo.jpg',
    errorMessage: null,
}

export const notAuthenticatedState: AuthState = {
    ok: false,
    status: 'not-authenticated',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

export const demoUser: User = {
    uid: '123456',
    email: 'demo@gmail.com',
    displayName: 'demo user',
    photoURL: 'https://demo.jpg',
}
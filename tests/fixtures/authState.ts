import { AuthStatus } from "../../src/store/auth";

export const initialState = {
    status: AuthStatus.checking,
    user: {},
    errorMessage: undefined
}

export const authenticatedState = {
    status: AuthStatus.authenticated,
    user: {
        uid: 'abc',
        name: 'Fernando'
    },
    errorMessage: undefined
}

export const notAuthenticatedState = {
    status: AuthStatus.notAuthenticated,
    user: {},
    errorMessage: undefined
}
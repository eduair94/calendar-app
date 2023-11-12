import { authSlice, onLogin, onLogout, AuthUserI, AuthStatus, clearErrorMesssage } from '../../../src/store/auth/';
import { authenticatedState, initialState } from '../../fixtures/authState';
import { testUserCredentials } from '../../fixtures/testUser';

describe('Test in authSlice.ts', () => {
    it('should handle initial state', () => {
        expect(authSlice.getInitialState()).toEqual(initialState);
    });

    it('should handle onLogin', () => {
        const state = authSlice.reducer(initialState, onLogin(testUserCredentials as AuthUserI));
        expect(state).toEqual({
            status: AuthStatus.authenticated,
            user: testUserCredentials,
            errorMessage: undefined
        })
    });

    it('should handle onLogout', () => {
        const errorMessage = 'ErrorMessage';
        const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
        // Add your expected state here
        expect(state).toEqual({
            status: AuthStatus.notAuthenticated,
            user: {},
            errorMessage
        });
    });

    it('should clear errorMessage', () => {
        const erroMessage = 'Invalid credentials';
        const state = authSlice.reducer(authenticatedState, onLogout(erroMessage));
        const newState = authSlice.reducer(state, clearErrorMesssage());
        expect(newState.errorMessage).toBe(undefined);
    })

    
});
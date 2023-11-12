import { onCloseDateModal, onOpenDateModal, uiSlice } from '../../../src/store/ui/uiSlice';

describe('Test in uiSlice.ts', () => { 
    test('should have default config', () => {
        expect(uiSlice.getInitialState()).toEqual({isDateModalOpen: false})
    });
    test('should open modal', () => {
        let state = uiSlice.getInitialState();
        state = uiSlice.reducer(state, onOpenDateModal());
        expect(state.isDateModalOpen).toBeTruthy();
        state = uiSlice.reducer(state, onCloseDateModal());
        expect(state.isDateModalOpen).toBeFalsy();
    });
 })
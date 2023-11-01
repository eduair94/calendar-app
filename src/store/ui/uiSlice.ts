import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isDateModalOpen: false
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    onOpenDateModal: (state) => {
        state.isDateModalOpen = true;
    },
    onCloseDateModal: (state) => {
        state.isDateModalOpen = false;
    }
  }
});

export const {onOpenDateModal, onCloseDateModal} = uiSlice.actions

export default uiSlice.reducer
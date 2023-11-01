import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns';
import { CalendarEventI } from './';

const tempEvent:CalendarEventI = {
    _id: new Date().getTime(),
    title: "Cumpleaños del Jefe",
    notes: "Hay que comprar pastel",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: "#fafafa",
    user: {
      _id: "123",
      name: "Fernando",
    },
}

const initialState = {
  events: [
    tempEvent
  ],
  activeEvent: null as CalendarEventI | null
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    onSetActiveEvent(state, {payload}:PayloadAction<CalendarEventI>) {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, {payload}:PayloadAction<CalendarEventI>) => {
      state.events.push(payload)
      state.activeEvent = null;
    },
    onUpdateEvent: (state, {payload}:PayloadAction<CalendarEventI>) => {
      state.events = state.events.map(event => {
        if(event._id === payload._id) return payload;
        return event;
      })
    },
    onDeleteEvent: (state) => {
      if(!state.activeEvent) return;
      state.events = state.events.filter(event=> event._id !== state.activeEvent?._id)
      state.activeEvent = null;
    }
  }
});

export const {
  onDeleteEvent,
  onSetActiveEvent, 
  onAddNewEvent, 
  onUpdateEvent
} = calendarSlice.actions

export default calendarSlice.reducer
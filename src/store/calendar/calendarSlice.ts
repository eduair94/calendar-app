import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CalendarEventI } from './';

const initialState = {
  isLoadingEvents: true,
  events: [] as CalendarEventI[],
  activeEvent: null as CalendarEventI | null
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    onLoadEvents(state, {payload}:PayloadAction<CalendarEventI[]>) {
      state.isLoadingEvents = false;
      payload.forEach((event) => {
        const exists = state.events.some((e) => e.id === event.id);
        if(!exists) state.events.push(event);
      })
    },
    onSetActiveEvent(state, {payload}:PayloadAction<CalendarEventI>) {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, {payload}:PayloadAction<CalendarEventI>) => {
      state.events.push(payload)
      state.activeEvent = null;
    },
    onUpdateEvent: (state, {payload}:PayloadAction<CalendarEventI>) => {
      console.log("Update event", payload, state.events);
      state.events = state.events.map(event => {
        if(event.id === payload.id) return payload;
        return event;
      })
    },
    onDeleteEvent: (state) => {
      if(!state.activeEvent) return;
      state.events = state.events.filter(event=> event.id !== state.activeEvent?.id)
      state.activeEvent = null;
    },
    onLogoutCalendar(state) {
      state.events = [];
      state.activeEvent = null;
      state.isLoadingEvents = true
    }
  }
});

export const {
  onDeleteEvent,
  onSetActiveEvent, 
  onAddNewEvent, 
  onUpdateEvent,
  onLoadEvents,
  onLogoutCalendar
} = calendarSlice.actions

export default calendarSlice.reducer
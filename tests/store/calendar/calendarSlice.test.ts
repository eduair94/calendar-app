import { CalendarEventI, calendarSlice, onAddNewEvent, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar"
import { calendarWithEventState, events, initialState } from "../../fixtures/calendarState";
import { testUserCredentials } from "../../fixtures/testUser";

describe('Test calendarSlice.ts', () => {
    it('should return default state', () => {
        const state = calendarSlice.getInitialState();
        expect(state).toEqual(initialState)
    })
    it('onSetActiveEvent must activate the event', () => {
        const state = calendarSlice.reducer(initialState, onSetActiveEvent(events[0] as CalendarEventI));
        expect(state.activeEvent).toEqual(events[0]);
    })
    it('onAddNewEvent must add a new event', () => {
        const newEvent = {
            id: '3',
            start: new Date('2023-10-21 10:00:00'),
            end: new Date('2023-10-21 11:00:00'),
            title: 'New event',
            notes: 'New event notes',
            user: {
                _id: testUserCredentials._id,
                name: testUserCredentials.name
            }
        }
        const state = calendarSlice.reducer(initialState, onAddNewEvent(newEvent));
        expect(state.events).toContain(newEvent);
    });
    it('onUpdateEvent must update the event', () => {
        const updatedEvent = {
            id: '1',
            start: new Date('2023-10-21 10:00:00'),
            end: new Date('2023-10-21 11:00:00'),
            title: 'New event',
            notes: 'New event notes',
            user: {
                _id: testUserCredentials._id,
                name: testUserCredentials.name
            }
        }
        const state = calendarSlice.reducer(calendarWithEventState, onUpdateEvent(updatedEvent));
        expect(state.events).toContain(updatedEvent);
    });
})
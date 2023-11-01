import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { CalendarEventI, onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar";

export const useCalendarStore = () => {
    const dispatch = useDispatch();
    const {events, activeEvent} = useSelector((state:RootState) =>  state.calendar)

    const setActiveEvent = (calendarEvent: CalendarEventI) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async (calendarEvent: CalendarEventI) => {
        // TODO: llegar al backend
        if(calendarEvent._id) {
            dispatch(onUpdateEvent({...calendarEvent}))
            return;
        }

        dispatch(onAddNewEvent({...calendarEvent, _id: new Date().getTime()}))
    
    }

    const startDeletingEvent = () => {
        dispatch(onDeleteEvent())
    }

    return {
        setActiveEvent,
        events,
        activeEvent,
        startSavingEvent,
        startDeletingEvent,
        hasEventSelected: !!activeEvent
    }
}
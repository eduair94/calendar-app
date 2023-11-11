import { useDispatch, useSelector } from "react-redux";
import { AuthUserI, RootState } from "../store";
import { CalendarEventI, onAddNewEvent, onDeleteEvent, onSetActiveEvent, onLoadEvents, onUpdateEvent, CalendarEventApiI } from "../store/calendar";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers/converEventsToDateEvents";
import Swal from "sweetalert2";
import { AxiosError } from "axios";

export const useCalendarStore = () => {
    const dispatch = useDispatch();
    const {events, activeEvent} = useSelector((state:RootState) =>  state.calendar)
    const { user } = useSelector((state:RootState) =>  state.auth) as {user: AuthUserI}


    const setActiveEvent = (calendarEvent: CalendarEventI) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async (calendarEvent: CalendarEventI) => {
        try {

            if(calendarEvent.id) {
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch(onUpdateEvent({...calendarEvent, user}))
                return;
            }

            const {data} = await calendarApi.post('/events', calendarEvent);
            const event:CalendarEventApiI = data.event;
            
            dispatch(onAddNewEvent({...calendarEvent, user, id: event.id}))

        } catch(e) {
            const axiosError = e as AxiosError<{msg:string}>;
            Swal.fire('Error', axiosError.response?.data.msg || 'Error saving event', 'error')
        }
    
    }

    const startDeletingEvent = async () => {
        try {
            await calendarApi.delete(`/events/${activeEvent?.id}`);
            dispatch(onDeleteEvent())
        } catch(e) {
            console.log('Error deleting event')
            console.log(e); 
        }
    }

    const startLoadingEvents = async () => {
        try {
            const {data} = await calendarApi.get('/events');
            const events = data.events || [];
            const eventsWithDate = convertEventsToDateEvents(events);
            dispatch(onLoadEvents(eventsWithDate))
        } catch(e) {
            console.log('Error loading events')
            console.log(e);

        }
    }

    return {
        setActiveEvent,
        events,
        activeEvent,
        startSavingEvent,
        startDeletingEvent,
        hasEventSelected: !!activeEvent,
        startLoadingEvents
    }
}
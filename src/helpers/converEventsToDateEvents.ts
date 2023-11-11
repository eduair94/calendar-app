import { parseISO } from "date-fns";
import { CalendarEventApiI, CalendarEventI } from "../store";

export const convertEventsToDateEvents = (events: CalendarEventApiI[]): CalendarEventI[] => {
    return events.map(event=> {
        return {...event, start: parseISO(event.start), end: parseISO(event.end)};
    }) 
}
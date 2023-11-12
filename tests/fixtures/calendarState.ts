import { CalendarEventI } from '../../src/store/calendar';

export const events = [
    {
        "title": "Trabajo pendiente 2",
        "notes": "comprar pastel",
        "start": new Date(),
        "end": new Date(),
        "user": {
            "_id": "65482564b4051d1b0dc9c19b",
            "name": "Eduardo"
        },
        "__v": 0,
        "id": "1"
    },
    {
        "title": "Trabajo pendiente",
        "notes": "comprar pastel",
        "start": new Date(),
        "end": new Date(),
        "user": {
            "_id": "65482564b4051d1b0dc9c19b",
            "name": "Eduardo"
        },
        "__v": 0,
        "id": "2"
    },
]


export const initialState = {
    isLoadingEvents: true,
    events: [] as CalendarEventI[],
    activeEvent: null as CalendarEventI | null
}

export const calendarWithEventState = {
    isLoadingEvents: true,
    events: [...events],
    activeEvent: null as CalendarEventI | null
}

export const calendarWithActiveEventState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: {...events[0]}
}
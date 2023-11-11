export interface CalendarEventI {
    id?: string;
    title: string;
    notes: string;
    start: Date | null;
    end: Date | null;
    bgColor: string;
    user: {
        _id: string;
        name: string;
    };
}

export interface CalendarEventApiI {
    id: string;
    title: string;
    notes: string;
    start: string;
    end: string;
    bgColor: string;
    user: {
        _id: string;
        name: string;
    };
}
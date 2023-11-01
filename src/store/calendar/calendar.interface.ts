export interface CalendarEventI {
    _id?: number;
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
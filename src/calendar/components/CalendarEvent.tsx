import { EventProps } from "react-big-calendar";
import { CalendarEventI } from "../../store/calendar";

export const CalendarEvent = ({ event }: EventProps<CalendarEventI>) => {
  const { title, user } = event;
  return (
    <>
      <strong>{title}</strong>
      <span> - {user.name}</span>
    </>
  );
};

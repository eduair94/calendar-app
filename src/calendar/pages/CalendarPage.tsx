import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, NavBar } from "..";
import { Calendar, EventPropGetter, View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getMessagesES, localizer } from "../../helpers";
import { useState } from "react";
import { useUiStore } from "../../hooks";
import { useCalendarStore } from "../../hooks";
import { CalendarEventI } from "../../store/calendar";

export const CalendarPage = () => {
  const [lastView] = useState<View>(
    (localStorage.getItem("lastView") as View) || "week",
  );

  const { events, setActiveEvent } = useCalendarStore();

  const { openDateModal } = useUiStore();

  const eventStyleGetter: EventPropGetter<CalendarEventI> = (
    event,
    start,
    end,
    isSelected,
  ) => {
    const style = {
      backgroundColor: isSelected ? "#138D75" : "#347CF7",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };
    return {
      style,
    };
  };

  const onDoubleClick = (
    event: CalendarEventI,
    //e: React.SyntheticEvent<HTMLElement, Event>,
  ) => {
    console.log({ doubleClick: event });
    setActiveEvent(event);
    openDateModal();
  };

  const onSelect = (event: CalendarEventI) => {
    setActiveEvent(event);
  };

  const onViewChanged = (event: View) => {
    localStorage.setItem("lastView", event);
  };

  return (
    <>
      <NavBar />
      <Calendar
        culture="es"
        defaultView={lastView}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        on
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};

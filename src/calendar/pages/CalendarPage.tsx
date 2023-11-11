import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, NavBar } from "..";
import { Calendar, EventPropGetter, View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getMessagesES, localizer } from "../../helpers";
import { useEffect, useState } from "react";
import { useUiStore } from "../../hooks";
import { useCalendarStore } from "../../hooks";
import { CalendarEventI } from "../../store/calendar";
import { useSelector } from "react-redux";
import { RootState, AuthUserI } from "../../store";

export const CalendarPage = () => {
  const [lastView] = useState<View>(
    (localStorage.getItem("lastView") as View) || "week",
  );

  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const { activeEvent } = useSelector((state: RootState) => state.calendar);
  const { user } = useSelector((state: RootState) => state.auth) as {
    user: AuthUserI;
  };

  const { openDateModal } = useUiStore();

  const eventStyleGetter: EventPropGetter<CalendarEventI> = (
    event,
    _start,
    _end,
    isSelected,
  ) => {
    const isMyEvent = user._id === event.user._id;
    const style = {
      backgroundColor: isSelected
        ? "#138D75"
        : isMyEvent
        ? "#347CF7"
        : "#465660",
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

  useEffect(() => {
    startLoadingEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isActiveUser = activeEvent && user._id === activeEvent.user._id;

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
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal />
      <FabAddNew />
      {isActiveUser ? <FabDelete /> : null}
    </>
  );
};

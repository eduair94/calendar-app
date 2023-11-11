import { useAuthStore, useCalendarStore, useUiStore } from "../../hooks";

export const FabAddNew = () => {
  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();
  const { user } = useAuthStore();

  const handleClickNew = () => {
    openDateModal();
    setActiveEvent({
      title: "",
      notes: "",
      start: null,
      end: null,
      bgColor: "#fafafa",
      user,
    });
  };

  return (
    <button onClick={handleClickNew} className="btn btn-primary fab">
      <i className="fas fa-plus"></i>
    </button>
  );
};

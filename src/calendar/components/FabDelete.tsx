import { useCalendarStore } from "../../hooks";

export const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();
  const handleClickNew = () => {
    startDeletingEvent();
  };

  return (
    <button
      onClick={handleClickNew}
      className="btn btn-danger fab-delete"
      style={{ display: hasEventSelected ? "" : "none" }}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};

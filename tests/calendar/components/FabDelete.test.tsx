import { fireEvent, render, screen } from "@testing-library/react";
import { FabDelete } from "../../../src/calendar/components/FabDelete";
import React from "react";
import { useCalendarStore } from "../../../src/hooks/useCalendarStore";
jest.mock("../../../src/hooks/useCalendarStore");

describe("Test in <FabDelete/>", () => {
  const mockStartDeletingEvent = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  it("should not show the component if there is no event selected", () => {
    (useCalendarStore as jest.Mock<unknown>).mockReturnValue({
      hasEventSelected: false,
    });
    render(<FabDelete />);
    const btn = screen.getByLabelText("btn-delete");
    expect(btn.classList.toString()).toContain("btn");
    expect(btn.classList.toString()).toContain("btn-danger");
    expect(btn.classList.toString()).toContain("fab-delete");
    expect(btn.style.display).toBe("none");
  });

  it("should be visible if there is an event selected", () => {
    (useCalendarStore as jest.Mock<unknown>).mockReturnValue({
      hasEventSelected: true,
    });
    render(<FabDelete />);
    const btn = screen.getByLabelText("btn-delete");
    expect(btn.classList.toString()).toContain("btn");
    expect(btn.classList.toString()).toContain("btn-danger");
    expect(btn.classList.toString()).toContain("fab-delete");
    expect(btn.style.display).toBe("");
  });

  it("should call startDeletingEvent when the button is clicked", () => {
    (useCalendarStore as jest.Mock<unknown>).mockReturnValue({
      hasEventSelected: true,
      startDeletingEvent: mockStartDeletingEvent,
    });
    render(<FabDelete />);
    const btn = screen.getByLabelText("btn-delete");
    fireEvent.click(btn);
    expect(mockStartDeletingEvent).toHaveBeenCalled();
  });
});

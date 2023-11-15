import { render, screen } from "@testing-library/react";
import React from "react";
import { AppRouter } from "../../src/router/AppRouter";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { AuthStatus } from "../../src/store";
import { MemoryRouter } from "react-router-dom";
jest.mock("../../src/hooks/useAuthStore");
jest.mock("react-modal", () => {
  return {
    setAppElement: jest.fn(),
    // other exports...
  };
});
jest.mock("../../src/calendar", () => ({
  CalendarPage: () => <div>CalendarPage</div>,
}));

describe("Tests in <AppRouter/>", () => {
  const mockCheckAuthToken = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("should show the loading screen and call checkAuthToken ", () => {
    (useAuthStore as jest.Mock<unknown>).mockReturnValue({
      status: AuthStatus.checking,
      checkAuthToken: mockCheckAuthToken,
    });

    render(<AppRouter />);
    expect(screen.getByText("Cargando...")).toBeTruthy();
    expect(mockCheckAuthToken).toHaveBeenCalled();
  });

  it("should show the login in case of not being authenticated", () => {
    (useAuthStore as jest.Mock<unknown>).mockReturnValue({
      status: AuthStatus.notAuthenticated,
      checkAuthToken: mockCheckAuthToken,
    });

    const { container } = render(
      <MemoryRouter initialEntries={["/auth/dfasfsd"]}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.getAllByText("Login").length).toBeGreaterThanOrEqual(1);
    expect(container).toMatchSnapshot();
  });

  it("should show the calendar in case of being authenticated", () => {
    (useAuthStore as jest.Mock<unknown>).mockReturnValue({
      status: AuthStatus.authenticated,
      checkAuthToken: mockCheckAuthToken,
    });

    render(
      <MemoryRouter initialEntries={["/auth/dfasfsd"]}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.getByText("CalendarPage")).toBeTruthy();
  });
});

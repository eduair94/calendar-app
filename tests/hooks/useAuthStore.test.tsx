import { configureStore } from "@reduxjs/toolkit";
import { AuthStatus, authSlice } from "../../src/store";
import { act, renderHook, waitFor } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { useAuthStore } from "../../src/hooks";
import { testUserCredentials } from "../fixtures/testUser";
import { calendarApi } from "../../src/api";

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: { ...initialState },
    },
  });
};

describe("Test in useAuthStore hook", () => {
  beforeEach(() => localStorage.clear());

  it("should return default values", () => {
    const mockStore = getMockStore({
      status: AuthStatus.notAuthenticated,
      user: {},
    });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    expect(result.current).toEqual({
      status: AuthStatus.notAuthenticated,
      user: {},
      errorMessage: undefined,
      startLogin: expect.any(Function),
      startRegister: expect.any(Function),
      checkAuthToken: expect.any(Function),
      startLogout: expect.any(Function),
    });
  });
  it("startLogin should work propertly", async () => {
    const mockStore = getMockStore({
      status: AuthStatus.notAuthenticated,
      user: {},
    });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startLogin(testUserCredentials);
    });

    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: AuthStatus.authenticated,
      user: {
        name: testUserCredentials.name,
        _id: testUserCredentials._id,
      },
    });

    expect(localStorage.getItem("token")).toEqual(expect.any(String));
    expect(localStorage.getItem("token-init-date")).toEqual(expect.any(String));
  });

  it("startLogin must fail the authentication", async () => {
    const mockStore = getMockStore({
      status: AuthStatus.notAuthenticated,
      user: {},
    });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startLogin({
        email: "broken@mail.com",
        password: "broken@mail.com",
      });
    });

    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: expect.any(String),
      status: AuthStatus.notAuthenticated,
      user: {},
    });
    expect(localStorage.getItem("token")).toBeNull();

    await waitFor(() => expect(result.current.errorMessage).toBeUndefined());
  });

  it("startRegister should create an user", async () => {
    const newUser = {
      email: "broken12@mail.com",
      password: "broken12@mail.com",
      name: "blabla",
    };

    const mockStore = getMockStore({
      status: AuthStatus.notAuthenticated,
      user: {},
    });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const spy = jest.spyOn(calendarApi, "post").mockReturnValue(
      Promise.resolve({
        data: {
          ok: true,
          uid: "Any id",
          name: newUser.name,
          token: "Any token",
        },
      }),
    );

    await act(async () => {
      await result.current.startRegister(newUser);
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: AuthStatus.authenticated,
      user: {
        name: newUser.name,
        _id: expect.any(String),
      },
    });

    spy.mockRestore();
  });

  it("startRegister should fail", async () => {
    const newUser = testUserCredentials;

    const mockStore = getMockStore({
      status: AuthStatus.notAuthenticated,
      user: {},
    });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startRegister(newUser);
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: "User already exists",
      status: AuthStatus.notAuthenticated,
      user: {},
    });
  });

  it("checkAuthToken should fail if there is no token", async () => {
    const mockStore = getMockStore({
      status: AuthStatus.notAuthenticated,
      user: {},
    });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.checkAuthToken();
    });

    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: AuthStatus.notAuthenticated,
      user: {},
    });
  });

  it("checkAuthToken should authenticate the user if there is an auth token", async () => {
    const { data } = await calendarApi.post("/auth", testUserCredentials);
    localStorage.setItem("token", data.token);
    const mockStore = getMockStore({
      status: AuthStatus.notAuthenticated,
      user: {},
    });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.checkAuthToken();
    });

    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: AuthStatus.authenticated,
      user: {
        name: testUserCredentials.name,
        _id: testUserCredentials._id,
      },
    });
  });
});

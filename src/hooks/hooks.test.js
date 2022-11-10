import useLocalStoragestate from "./useLocalStorageState";
import "@testing-library/jest-dom";
import { render, renderHook, act } from "@testing-library/react";
import useGeoLocAPI from "./useGeoLocAPI";

describe("useLocalStoragestate", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });
  test("Smoke Test", () => {
    renderHook(() => useLocalStoragestate());
  });
  test("Returns undefined if no information is stored locallys", () => {
    const { result } = renderHook(() => useLocalStoragestate("weatherapp"));
    expect(result.current[0].weatherapp.coords).toBe(null);
  });
  test("Is able to store value", () => {
    const { result, rerender } = renderHook(() =>
      useLocalStoragestate("weatherapp")
    );
    const [localStorage, setStorage] = result.current;
    // Storage should be empty at first
    expect(localStorage.weatherapp.coords).toBe(null);
    const store = {
      coords: {
        latitude: 45,
        longitude: 56,
      },
      token: null,
    };
    act(() => {
      setStorage(store);
    });
    // State should be a string when entered into storage
    expect(result.current[0]).toEqual(
      '{"coords":{"latitude":45,"longitude":56},"token":null}'
    );
    const { result: res } = renderHook(() =>
      useLocalStoragestate("weatherapp")
    );
    // Retrieve value from storage to confirm it's parseing the string back into JSON object
    expect(res.current[0].coords).toStrictEqual(
      expect.objectContaining({
        latitude: 45,
        longitude: 56,
      })
    );
  });
});

describe("useGeoLocAPI", () => {
  test("Smoke Test", () => {
    const { result } = renderHook(() => useGeoLocAPI());
  });
  test("useGeoLocAPI success", () => {
    const mockGeolocation = {
      getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
        Promise.resolve(
          success({
            coords: {
              latitude: 51.1,
              longitude: 45.3,
            },
          })
        )
      ),
    };
    global.navigator.geolocation = mockGeolocation;

    const { result } = renderHook(() => useGeoLocAPI());
    const [coords] = result.current;

    expect(coords).toEqual({
      lat: 51.1,
      long: 45.3,
    });
  });
});

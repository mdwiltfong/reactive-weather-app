import useLocalStoragestate from "./useLocalStorageState";
import "@testing-library/jest-dom";
import { render, renderHook, act } from "@testing-library/react";

describe("useLocalStoragestate", () => {
  test("Returns undefined if no information is stored locallys", () => {
    const { result } = renderHook(() => useLocalStoragestate("coords"));
    expect(result.current).toBe(undefined);
  });
  test.only("Is able to store value", () => {
    const { result } = renderHook(() => useLocalStoragestate("coords"));
    const [coords, setCoords] = result.current;
    console.log(result.current);
    act(() => {
      setCoords(
        `
        {
            "coords":{
                "latitude":"45",
                "longitude":"56"
            }
        }
        `
      );
    });
    console.log(result.current);
  });
});

import useLocalStoragestate from "./useLocalStorageState";
import "@testing-library/jest-dom";

const window = jest.fn(() => {
  return (localStorage = {
    getItem(keyName) {
      return `
            {
                "latitude": 45.67,
                "longitude":60.23
            }
            `;
    },
  });
});
describe("useLocalStoragestate", () => {
  test("Can obtain information in local storage", () => {
    const [coords, setCoords] = useLocalStoragestate("coords", undefined);
    expect(coords).toBe(
      expect.objectContaining({
        latitude: expect.any(Number),
        longitude: expect.any(Number),
      })
    );
  });
});

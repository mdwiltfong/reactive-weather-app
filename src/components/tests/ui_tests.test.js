import App from "../../App";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import useGeoLocAPI from "../../hooks/useGeoLocAPI";
import { setupServer } from "msw/lib/node";
function setUp(route = "/") {
  const screen = render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>
  );
  return screen;
}
function searchCity(screen) {
  const searchInput = screen.getByLabelText("City Name");
  fireEvent.change(searchInput, {
    target: { value: "Madrid" },
  });

  fireEvent.submit(searchInput);
}

jest.mock("../../hooks/useGeoLocAPI");

describe("Basic UI Flow", () => {
  test("App has loading screen", () => {
    useGeoLocAPI.mockImplementation(() => [
      null,
      function setUp() {
        return;
      },
    ]);
    const screen = setUp();
    const loading = screen.getByText("Loading...");
    expect(loading).toBeInTheDocument();
  });

  test("App loads geolocation", async () => {
    useGeoLocAPI.mockImplementation(() => [
      {
        lat: 56,
        long: 67,
      },
      function setUp() {
        return;
      },
    ]);
    const screen = setUp();
    await waitFor(
      () => {
        screen.getByTestId("current-weather");
      },
      { timeout: 5000 }
    );
    expect(screen.getByTestId("current-weather")).toBeInTheDocument();
    expect(screen.queryAllByTestId("forecast-", { exact: false })).toHaveLength(
      5
    );
  });

  test("Users can search for a city's weather", async () => {
    useGeoLocAPI.mockImplementation(() => [
      {
        lat: 56,
        long: 67,
      },
      function setUp() {
        return;
      },
    ]);
    const screen = setUp();
    await waitFor(() => screen.getByTestId("current-weather"));
    searchCity(screen);
    await waitFor(() => screen.getByText("Madrid"), { timeout: 5000 });
    expect(screen.getByText("Madrid")).toBeInTheDocument();
    expect(screen.queryAllByTestId("forecast-", { exact: false })).toHaveLength(
      5
    );
  });
});

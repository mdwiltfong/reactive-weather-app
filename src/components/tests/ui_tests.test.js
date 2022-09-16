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
describe("Basic UI Flow", () => {
  test("App has loading screen", () => {
    const screen = setUp();
    const loading = screen.getByText("Loading...");
    expect(loading).toBeInTheDocument();
  });
  test.only("App loads geolocation", async () => {
    const screen = setUp();
    await waitFor(() => {
      screen.debug();
      screen.getByTestId("current-weather");
    });
    expect(screen.getByTestId("current-weather")).toBeInTheDocument();
  });

  test("Users can search for a city's weather", async () => {
    const screen = setUp();
    searchCity(screen);
    await waitFor(() => {
      expect(screen.getByText("Madrid")).toBeInTheDocument();
      expect(screen.getByTestId("current-weather")).toBeInTheDocument();
      expect(screen.getByTestId("current-date")).toBeInTheDocument();
    });
  });
  test("App Renders Forecast", async () => {
    const screen = setUp();
    searchCity(screen);
    await waitFor(() => {
      expect(screen.getByTestId("forecasts")).toBeInTheDocument();
      expect(
        screen.queryAllByTestId("forecast-", { exact: false })
      ).toHaveLength(5);
    });
  });
});

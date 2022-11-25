process.env.NODE_ENV = "test";
import App from "../../App";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import useGeoLocAPI from "../../hooks/useGeoLocAPI";
function setUp(coordsObj, route = "/") {
  useGeoLocAPI.mockImplementation(() => [
    coordsObj,
    function setUp() {
      return;
    },
  ]);
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
  screen.debug();
  fireEvent.submit(searchInput);
}
function logIn(username, password) {
  const screen = setUp(null, "/login");
  const usernameInput = screen.getByTestId("username");
  const passwordInput = screen.getByTestId("password");
  const submitBtn = screen.getByTestId("submit");
  fireEvent.change(usernameInput, { target: { value: username } });
  fireEvent.change(passwordInput, { target: { value: password } });
  fireEvent.click(submitBtn);
  return screen;
}

jest.mock("../../hooks/useGeoLocAPI");

describe("Basic UI Flow", () => {
  test("App has loading screen", () => {
    const screen = setUp(null);
    const loading = screen.getByText("Loading...");
    expect(loading).toBeInTheDocument();
  });

  test("App loads geolocation", async () => {
    const screen = setUp({
      lat: 56,
      long: 67,
    });
    await waitFor(
      () => {
        screen.getByTestId("current-weather");
      },
      { timeout: 5000 }
    );
    searchCity(screen);
    expect(screen.getByTestId("current-weather")).toBeInTheDocument();
    expect(screen.queryAllByTestId("forecast-", { exact: false })).toHaveLength(
      5
    );
  });

  //TODO: Create mock data in order to make this test happen.

  test("Users can navigate to the login page", () => {
    const screen = setUp(
      {
        lat: 56,
        long: 67,
      },
      "/login"
    );
    expect(screen.getByTestId("submit")).toBeInTheDocument();
  });
  test("Users can login", async () => {
    const screen = logIn("m.mcfly", "password");
    await waitFor(() => {
      screen.debug();
      expect(screen.getByTestId("user_title")).toBeInTheDocument();
      expect(screen.getByTestId("savedWeather")).toBeInTheDocument();
    });
  });
  test.todo("Users can save a weather instance");
  test.todo("Users can delete a weather instance");
  test.todo("Users can search for a city's weather");
});

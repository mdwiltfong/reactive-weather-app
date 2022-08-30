import App from "../../App";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
function setUp(route = "/") {
  const screen = render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>
  );
  if ((route = "/")) {
    const searchInput = screen.getByLabelText("City Name");
    fireEvent.change(searchInput, {
      target: { value: "Madrid" },
    });

    fireEvent.submit(searchInput);
  }

  return screen;
}
describe("Basic UI Flow", () => {
  test("App Renders City Name, Weather, and Time", async () => {
    const screen = setUp();
    await waitFor(() => {
      expect(screen.getByText("Madrid")).toBeInTheDocument();
      expect(screen.getByTestId("current-weather")).toBeInTheDocument();
      expect(screen.getByTestId("current-date")).toBeInTheDocument();
    });
  });
  test("App Renders Forecast", async () => {
    const screen = setUp();
    await waitFor(() => {
      expect(screen.getByTestId("forecasts")).toBeInTheDocument();
      expect(
        screen.queryAllByTestId("forecast-", { exact: false })
      ).toHaveLength(5);
    });
  });
});

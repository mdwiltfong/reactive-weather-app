import App from "../../App";
import { render, fireEvent, waitFor, getByText } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
function setUp(route = "/") {
  const screen = render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>
  );
  if (route == "/") {
    const searchInput = screen.getByLabelText("City Name");
    console.log(searchInput.nodeValue);
    fireEvent.change(searchInput, {
      target: {
        value: "Madrid",
      },
    });
    fireEvent.submit(searchInput);
  }

  return screen;
}
describe("Basic UI Flow", () => {
  test("App Renders City Name, Weather, and Time", async () => {
    const screen = setUp();

    //TODO: Since this data is rendered from an API call, we have to do an asynchronous test here
    await waitFor(() => {
      expect(screen.getByLabelText("City Name")).toBeInTheDocument();
      expect(screen.getByText("Madrid")).toBeInTheDocument();
      expect(screen.getByTestId("current-weather")).toBeInTheDocument();
      expect(screen.getByTestId("current-date")).toBeInTheDocument();
    });
  });
  test("App Renders Forecast", async () => {
    const screen = setUp();

    await waitFor(() => {
      expect(screen.getByTestId("forecast")).toBeInTheDocument();
      expect(
        screen.queryAllByTestId("forecast-", { exact: false })
      ).toHaveLength(5);
    });
  });
});

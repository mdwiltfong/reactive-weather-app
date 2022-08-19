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
  const searchInput = screen.getByLabelText("City Name");
  console.log(searchInput.nodeValue);
  return {
    screen,
    searchInput,
  };
}
describe("Basic UI Flow", () => {
  test("App Renders City Name, Weather, and Time", async () => {
    const { screen, searchInput } = setUp();

    fireEvent.change(searchInput, {
      target: {
        value: "Madrid",
      },
    });
    fireEvent.submit(searchInput);

    //TODO: Since this data is rendered from an API call, we have to do an asynchronous test here
    await waitFor(() => {
      expect(screen.getByText("Madrid")).toBeInTheDocument();
      expect(screen.getByTestId("current-weather")).toBeInTheDocument();
      expect(screen.getByTestId("current-date")).toBeInTheDocument();
    });
  });
});

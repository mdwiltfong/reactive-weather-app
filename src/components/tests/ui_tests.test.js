import App from "../../App";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
function setUp(route = "/") {
  const screen = render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>
  );
  const searchInput = screen.getByLabelText("City Name");
  return {
    screen,
    searchInput,
  };
}
describe("Basic UI Flow", () => {
  test("User can search for a city", () => {
    const { screen, searchInput } = setUp();

    fireEvent.change(searchInput, {
      target: {
        value: "Madrid",
      },
    });
    fireEvent.keyDown(searchInput, {
      key: "Enter",
    });
    const city = screen.getByTestId("city");
    expect(city).toBeInTheDocument();
  });
});

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
  test("User can search for a city", async () => {
    const { screen, searchInput } = setUp();

    fireEvent.change(searchInput, {
      target: {
        value: "Madrid",
      },
    });
    fireEvent.submit(searchInput);

    //TODO: Since this data is rendered from an API call, we have to do an asynchronous test here
    await waitFor(() => {
      screen.debug();
      expect(screen.queryByText("Madrid")).toBeInTheDocument();
    });
  });
});

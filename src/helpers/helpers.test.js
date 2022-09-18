import OpenWeatherAPI, { DateFormatter } from "./helpers";
import MockDatePM from "./DateMockPM";
import MockDateAM from "./DateMockAM";
import currentWeather from "./mocks/mocks";
import axios from "axios";
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
function dateFormatterSetUp(offSet = null) {
  return new DateFormatter(offSet);
}

describe("DateFormatter client time tests", () => {
  const realDate = global.Date;
  beforeAll(() => {
    global.Date = MockDatePM;
  });
  afterAll(() => {
    global.Date = realDate;
  });
  test("Outputs current day", () => {
    const date = dateFormatterSetUp();
    const currentDay = date.GetDay();
    expect(currentDay).toEqual(days[new Date().getDay()]);
  });
  test("Outputs current time in p.m.", () => {
    const date = dateFormatterSetUp();
    const currentTime = date.GetTime();
    expect(currentTime).toEqual("11:17 p.m.");
  });
  test("Outputs am", () => {
    global.Date = MockDateAM;
    const date = dateFormatterSetUp();
    const currentTime = date.GetTime();
    expect(currentTime).toEqual("4:17 a.m.");
  });
});
jest.mock("axios");

function setUpMock(mockData) {
  axios.mockImplementation(() => {
    return { data: mockData };
  });
}
describe("OpenWeatherAPI handler class", () => {
  test.only("Wrapper can retrieve current weather", async () => {
    setUpMock(currentWeather);
    const weatherData = await OpenWeatherAPI.currentWeather("Madrid");
    expect(weatherData).toStrictEqual(
      expect.objectContaining({
        coord: expect.any(Object),
        weather: expect.any(Array),
        base: expect.any(String),
        main: expect.any(Object),
        visibility: expect.any(Number),
        wind: expect.any(Object),
        clouds: expect.any(Object),
        dt: expect.any(Number),
        sys: expect.any(Object),
        timezone: expect.any(Number),
        id: expect.any(Number),
        name: expect.any(String),
        cod: expect.any(Number),
      })
    );
  });
  test.skip("Wrapper can retrieve forecast", () => {});
  test.todo("Wrapper returns undefined");
  test.todo("Wrapper obtains current weather through city name");
  test.todo("Wrapper obtains current weather through coordinates");
});

import OpenWeatherAPI, { DateFormatter } from "./helpers";
import MockDatePM from "./DateMockPM";
import MockDateAM from "./DateMockAM";
import MockWeatherData from "./mocks/mocks";
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

function setUpMock(mockData, errorMessage = null) {
  if (!errorMessage) {
    axios.mockImplementation(() => {
      if (!errorMessage) {
        return { data: mockData };
      }
    });
  } else {
    axios.mockImplementation(() => {
      throw ErrorEvent;
    });
  }
}
describe("OpenWeatherAPI handler class", () => {
  test("Wrapper can retrieve current weather", async () => {
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
  test("Wrapper can retrieve forecast", async () => {
    const foreCastData = await OpenWeatherAPI.currentWeatherForecast(52, 53);
    expect(foreCastData).toStrictEqual(
      expect.objectContaining({
        lat: expect.any(Number),
        lon: expect.any(Number),
        timezone: expect.any(String),
        timezone_offset: expect.any(Number),
        current: expect.any(Object),
        daily: expect.any(Array),
      })
    );
  });
  test("Wrapper throws an error message", async () => {
    try {
      const apiData = await OpenWeatherAPI.request("badRoute");
    } catch (error) {
      console.debug("Wrapper Error Object", error);
      expect(error).toStrictEqual(
        expect.arrayContaining(["Internal Server Error"])
      );
    }
  });
  test("Wrapper obtains current weather through city name", async () => {
    const response = await OpenWeatherAPI.currentWeather("Madrid");
    expect(response).toBeDefined();
  });
  test("Wrapper obtains current weather through coordinates", async () => {
    const response = await OpenWeatherAPI.currentWeather(null, 56, 34);
    expect(response).toBeDefined();
  });
});

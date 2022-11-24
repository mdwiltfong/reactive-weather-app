process.env.NODE_ENV = "test";
import OpenWeatherAPI, { DateFormatter } from "./helpers";
import MockDatePM from "./DateMockPM";
import MockDateAM from "./DateMockAM";
import MockData from "./mocks/mocks";
import axios from "axios";
import { createToken } from "../../server/helpers/token";
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
  beforeAll(async () => {
    const MockUser = MockData.MockUserData.users[0];
    await OpenWeatherAPI.registerUser(MockUser);
  });
  afterAll(async () => {
    const MockUser = MockData.MockUserData.users[0];
    delete OpenWeatherAPI.token;
    await OpenWeatherAPI.loginUser(MockUser);
    await OpenWeatherAPI.deleteUser(MockUser.username);
  });
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
      expect(error.message).toStrictEqual("Page Not Found");
    }
  });
  test("Wrapper obtains current weather through city name", async () => {
    const response = await OpenWeatherAPI.currentWeather("Madrid");
    expect(response).toStrictEqual(
      MockData.MockWeatherData.mockCurrentWeatherData
    );
  });
  test("Wrapper obtains current weather through coordinates", async () => {
    const response = await OpenWeatherAPI.currentWeather(null, 56, 34);
    expect(response).toStrictEqual(
      MockData.MockWeatherData.mockCurrentWeatherData
    );
  });

  test("Wrapper can retrieve a single user", async () => {
    const MockUser = MockData.MockUserData.users[0];
    OpenWeatherAPI.token = createToken(MockUser);
    const response = await OpenWeatherAPI.getUser(MockUser.username);
    expect(response).toStrictEqual(
      expect.objectContaining({
        email: MockUser.email,
        firstName: MockUser.firstName,
        isAdmin: false,
        lastName: MockUser.lastName,
        username: MockUser.username,
      })
    );
  });
  test.todo("Wrapper can save a single weather instance");
  test.todo("Wrapper can delete a user");
});

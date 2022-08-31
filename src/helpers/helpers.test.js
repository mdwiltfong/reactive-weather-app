import { DateFormatter, GeolocationAPI } from "./helpers";
import MockDatePM from "./DateMockPM";
import MockDateAM from "./DateMockAM";
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
function GeoLocationAPISetUp() {
  return new GeolocationAPI();
}
global.navigator;
describe("GeolocationAPI Class", () => {
  global.navigator.geolocation = {
    getCurrentPosition: jest.fn(() => {
      lat: 45.31963;
      long: -75.89316;
    }),
  };
  test("Class is able to output correct latitude and longitude", async () => {
    const location = GeoLocationAPISetUp();
    //TODO: Finish mocking getCurrentPostion
    const { lat, long } = location.getCoords();
    expect(lat).toBe(45.31963);
    expect(long).toBe(-75.89316);
  });
});

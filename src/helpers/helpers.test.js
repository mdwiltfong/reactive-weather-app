import { DateFormatter } from "./helpers";
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

describe("OpenWeatherAPI handler class", () => {
  test.todo("Wrapper can retrieve current weather");
  test.todo("Wrapper can retrieve forecast");
  test.todo("Wrapper returns undefined");
  test.todo("Wrapper obtains current weather through city name");
  test.todo("Wrapper obtains current weather through coordinates");
});

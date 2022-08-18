import { DateFormatter } from "./helpers";
import MockDate from "./DateMock";
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
function setUp() {
  return new DateFormatter();
}

describe("DateFormatter client time tests", () => {
  const realDate = global.Date;
  beforeAll(() => {
    global.Date = MockDate;
  });
  afterAll(() => {
    global.Date = realDate;
  });
  test("Outputs current day", () => {
    const date = setUp();
    const currentDate = date.GetDay();
    expect(currentDate).toEqual(days[new Date().getDay()]);
  });
  test.only("Outputs current time", () => {
    const date = setUp();
    const currentTime = date.GetTime();
    expect(currentTime).toEqual("11:17 p.m.");
  });
  test.todo("Outputs am and pm");
  test.todo("Outputs time in another timezone");
});

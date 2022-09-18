// src/mocks/handlers.js
import { rest } from "msw";
import MockWeatherData from "../helpers/mocks/mocks";
const BASE_URL = process.env.REACT_APP_MOCK || "http://localhost:3001";
console.log(BASE_URL);
export const handlers = [
  // Handles a GET /weather request. This will return the weather for madrid
  rest.get(`${BASE_URL}/weather`, (req, res, ctx) => {
    const { q, appid } = req.params;
    console.log(q, appid);
    return res(
      ctx.status(200),
      ctx.json(MockWeatherData.mockCurrentWeatherData)
    );
  }),
  // Handles a GET /forecast request. This will return the weather for madrid for 5 days.
  rest.get(`${BASE_URL}/dailyForecast`, (req, res, ctx) => {
    const { q, appid } = req.params;
    console.debug("Forecast API Call", q, appid);
    return res(
      ctx.status(200),
      ctx.json(MockWeatherData.mockOneCallAPIForecast)
    );
  }),
  rest.get(`${BASE_URL}/badRoute`, (req, res, ctx) => {
    console.debug("Hits bad route handler");
    return res(
      ctx.status(500),
      ctx.json({
        error: {
          message: "Internal Server Error",
        },
      })
    );
  }),
];

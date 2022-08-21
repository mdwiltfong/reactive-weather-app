// src/mocks/handlers.js
import { rest } from "msw";
const BASE_URL = process.env.REACT_APP_MOCK || "http://localhost:3001";
console.log(BASE_URL);
export const handlers = [
  // Handles a GET /weather request. This will return the weather for madrid
  rest.get(`${BASE_URL}/weather`, (req, res, ctx) => {
    const { q, appid } = req.params;
    console.log(q, appid);
    return res(
      ctx.status(200),
      ctx.json({
        coord: {
          lon: -3.7026,
          lat: 40.4165,
        },
        weather: [
          {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "01n",
          },
        ],
        base: "stations",
        main: {
          temp: 26.15,
          feels_like: 300.02,
          temp_min: 298.02,
          temp_max: 302.4,
          pressure: 1005,
          humidity: 32,
        },
        visibility: 10000,
        wind: {
          speed: 2.57,
          deg: 180,
        },
        clouds: {
          all: 0,
        },
        dt: 1658197511,
        sys: {
          type: 2,
          id: 2007545,
          country: "ES",
          sunrise: 1658206814,
          sunset: 1658259694,
        },
        timezone: 7200,
        id: 3117735,
        name: "Madrid",
        cod: 200,
      })
    );
  }),
  // Handles a GET /forecast request. This will return the weather for madrid for 5 days.
  rest.get(`${BASE_URL}/forecast`, (req, res, ctx) => {
    const { q, appid } = req.params;
    console.log(q, appid);
    return res(
      ctx.status(200),
      ctx.json({
        cod: "200",
        message: 0,
        cnt: 40,
        list: [
          {
            dt: 1658199600,
            main: {
              temp: 300.64,
              feels_like: 299.98,
              temp_min: 298.67,
              temp_max: 300.64,
              pressure: 1005,
              sea_level: 1005,
              grnd_level: 941,
              humidity: 32,
              temp_kf: 1.97,
            },
            weather: [
              {
                id: 800,
                main: "Clear",
                description: "clear sky",
                icon: "01n",
              },
            ],
            clouds: {
              all: 0,
            },
            wind: {
              speed: 4.34,
              deg: 217,
              gust: 6.92,
            },
            visibility: 10000,
            pop: 0,
            sys: {
              pod: "n",
            },
            dt_txt: "2022-07-19 03:00:00",
          },
          {
            dt: 1658210400,
            main: {
              temp: 299.27,
              feels_like: 299.27,
              temp_min: 296.53,
              temp_max: 299.27,
              pressure: 1009,
              sea_level: 1009,
              grnd_level: 942,
              humidity: 32,
              temp_kf: 2.74,
            },
            weather: [
              {
                id: 800,
                main: "Clear",
                description: "clear sky",
                icon: "01d",
              },
            ],
            clouds: {
              all: 0,
            },
            wind: {
              speed: 3.49,
              deg: 226,
              gust: 6.96,
            },
            visibility: 10000,
            pop: 0,
            sys: {
              pod: "d",
            },
            dt_txt: "2022-07-19 06:00:00",
          },
          {
            dt: 1658221200,
            main: {
              temp: 300.49,
              feels_like: 299.64,
              temp_min: 300.41,
              temp_max: 300.49,
              pressure: 1013,
              sea_level: 1013,
              grnd_level: 943,
              humidity: 26,
              temp_kf: 0.08,
            },
            weather: [
              {
                id: 800,
                main: "Clear",
                description: "clear sky",
                icon: "01d",
              },
            ],
            clouds: {
              all: 0,
            },
            wind: {
              speed: 4.95,
              deg: 229,
              gust: 6.28,
            },
            visibility: 10000,
            pop: 0,
            sys: {
              pod: "d",
            },
            dt_txt: "2022-07-19 09:00:00",
          },
          {
            dt: 1658232000,
            main: {
              temp: 304.28,
              feels_like: 302.22,
              temp_min: 304.28,
              temp_max: 304.28,
              pressure: 1016,
              sea_level: 1016,
              grnd_level: 943,
              humidity: 16,
              temp_kf: 0,
            },
            weather: [
              {
                id: 800,
                main: "Clear",
                description: "clear sky",
                icon: "01d",
              },
            ],
            clouds: {
              all: 0,
            },
            wind: {
              speed: 6.09,
              deg: 225,
              gust: 7.94,
            },
            visibility: 10000,
            pop: 0,
            sys: {
              pod: "d",
            },
            dt_txt: "2022-07-19 12:00:00",
          },
          {
            dt: 1658242800,
            main: {
              temp: 306.61,
              feels_like: 304.15,
              temp_min: 306.61,
              temp_max: 306.61,
              pressure: 1014,
              sea_level: 1014,
              grnd_level: 942,
              humidity: 11,
              temp_kf: 0,
            },
            weather: [
              {
                id: 800,
                main: "Clear",
                description: "clear sky",
                icon: "01d",
              },
            ],
            clouds: {
              all: 0,
            },
            wind: {
              speed: 6.4,
              deg: 237,
              gust: 8.07,
            },
            visibility: 10000,
            pop: 0,
            sys: {
              pod: "d",
            },
            dt_txt: "2022-07-19 15:00:00",
          },
          {
            dt: 1658253600,
            main: {
              temp: 305.93,
              feels_like: 303.57,
              temp_min: 305.93,
              temp_max: 305.93,
              pressure: 1013,
              sea_level: 1013,
              grnd_level: 941,
              humidity: 10,
              temp_kf: 0,
            },
            weather: [
              {
                id: 800,
                main: "Clear",
                description: "clear sky",
                icon: "01d",
              },
            ],
            clouds: {
              all: 0,
            },
            wind: {
              speed: 6.02,
              deg: 240,
              gust: 5.91,
            },
            visibility: 10000,
            pop: 0,
            sys: {
              pod: "d",
            },
            dt_txt: "2022-07-19 18:00:00",
          },
          {
            dt: 1658264400,
            main: {
              temp: 301.86,
              feels_like: 300.33,
              temp_min: 301.86,
              temp_max: 301.86,
              pressure: 1015,
              sea_level: 1015,
              grnd_level: 942,
              humidity: 17,
              temp_kf: 0,
            },
            weather: [
              {
                id: 800,
                main: "Clear",
                description: "clear sky",
                icon: "01n",
              },
            ],
            clouds: {
              all: 0,
            },
            wind: {
              speed: 4.1,
              deg: 305,
              gust: 6.74,
            },
            visibility: 10000,
            pop: 0,
            sys: {
              pod: "n",
            },
            dt_txt: "2022-07-19 21:00:00",
          },
          {
            dt: 1658275200,
            main: {
              temp: 299.1,
              feels_like: 299.1,
              temp_min: 299.1,
              temp_max: 299.1,
              pressure: 1015,
              sea_level: 1015,
              grnd_level: 941,
              humidity: 24,
              temp_kf: 0,
            },
            weather: [
              {
                id: 800,
                main: "Clear",
                description: "clear sky",
                icon: "01n",
              },
            ],
            clouds: {
              all: 0,
            },
            wind: {
              speed: 1.3,
              deg: 354,
              gust: 2.26,
            },
            visibility: 10000,
            pop: 0,
            sys: {
              pod: "n",
            },
            dt_txt: "2022-07-20 00:00:00",
          },
          {
            dt: 1658286000,
            main: {
              temp: 296.9,
              feels_like: 296.09,
              temp_min: 296.9,
              temp_max: 296.9,
              pressure: 1016,
              sea_level: 1016,
              grnd_level: 942,
              humidity: 29,
              temp_kf: 0,
            },
            weather: [
              {
                id: 800,
                main: "Clear",
                description: "clear sky",
                icon: "01n",
              },
            ],
            clouds: {
              all: 0,
            },
            wind: {
              speed: 2.26,
              deg: 47,
              gust: 2.6,
            },
            visibility: 10000,
            pop: 0,
            sys: {
              pod: "n",
            },
            dt_txt: "2022-07-20 03:00:00",
          },
          {
            dt: 1658296800,
            main: {
              temp: 296.37,
              feels_like: 295.61,
              temp_min: 296.37,
              temp_max: 296.37,
              pressure: 1017,
              sea_level: 1017,
              grnd_level: 943,
              humidity: 33,
              temp_kf: 0,
            },
            weather: [
              {
                id: 800,
                main: "Clear",
                description: "clear sky",
                icon: "01d",
              },
            ],
            clouds: {
              all: 0,
            },
            wind: {
              speed: 2.73,
              deg: 42,
              gust: 3.21,
            },
            visibility: 10000,
            pop: 0,
            sys: {
              pod: "d",
            },
            dt_txt: "2022-07-20 06:00:00",
          },
          {
            dt: 1658307600,
            main: {
              temp: 300.97,
              feels_like: 299.95,
              temp_min: 300.97,
              temp_max: 300.97,
              pressure: 1017,
              sea_level: 1017,
              grnd_level: 944,
              humidity: 26,
              temp_kf: 0,
            },
            weather: [
              {
                id: 800,
                main: "Clear",
                description: "clear sky",
                icon: "01d",
              },
            ],
            clouds: {
              all: 0,
            },
            wind: {
              speed: 2.14,
              deg: 51,
              gust: 2.03,
            },
            visibility: 10000,
            pop: 0,
            sys: {
              pod: "d",
            },
            dt_txt: "2022-07-20 09:00:00",
          },
          {
            dt: 1658318400,
            main: {
              temp: 305.78,
              feels_like: 303.53,
              temp_min: 305.78,
              temp_max: 305.78,
              pressure: 1016,
              sea_level: 1016,
              grnd_level: 944,
              humidity: 16,
              temp_kf: 0,
            },
            weather: [
              {
                id: 800,
                main: "Clear",
                description: "clear sky",
                icon: "01d",
              },
            ],
            clouds: {
              all: 0,
            },
            wind: {
              speed: 0.55,
              deg: 279,
              gust: 1.01,
            },
            visibility: 10000,
            pop: 0,
            sys: {
              pod: "d",
            },
            dt_txt: "2022-07-20 12:00:00",
          },
          {
            dt: 1658329200,
            main: {
              temp: 308.19,
              feels_like: 305.55,
              temp_min: 308.19,
              temp_max: 308.19,
              pressure: 1014,
              sea_level: 1014,
              grnd_level: 943,
              humidity: 11,
              temp_kf: 0,
            },
            weather: [
              {
                id: 800,
                main: "Clear",
                description: "clear sky",
                icon: "01d",
              },
            ],
            clouds: {
              all: 0,
            },
            wind: {
              speed: 1.41,
              deg: 216,
              gust: 1.69,
            },
            visibility: 10000,
            pop: 0,
            sys: {
              pod: "d",
            },
            dt_txt: "2022-07-20 15:00:00",
          },
          {
            dt: 1658340000,
            main: {
              temp: 308.26,
              feels_like: 305.58,
              temp_min: 308.26,
              temp_max: 308.26,
              pressure: 1013,
              sea_level: 1013,
              grnd_level: 942,
              humidity: 10,
              temp_kf: 0,
            },
            weather: [
              {
                id: 800,
                main: "Clear",
                description: "clear sky",
                icon: "01d",
              },
            ],
            clouds: {
              all: 0,
            },
            wind: {
              speed: 1.91,
              deg: 189,
              gust: 1.59,
            },
            visibility: 10000,
            pop: 0,
            sys: {
              pod: "d",
            },
            dt_txt: "2022-07-20 18:00:00",
          },
          {
            dt: 1658350800,
            main: {
              temp: 304.33,
              feels_like: 302.23,
              temp_min: 304.33,
              temp_max: 304.33,
              pressure: 1014,
              sea_level: 1014,
              grnd_level: 942,
              humidity: 13,
              temp_kf: 0,
            },
            weather: [
              {
                id: 800,
                main: "Clear",
                description: "clear sky",
                icon: "01n",
              },
            ],
            clouds: {
              all: 0,
            },
            wind: {
              speed: 0.99,
              deg: 179,
              gust: 1.27,
            },
            visibility: 10000,
            pop: 0,
            sys: {
              pod: "n",
            },
            dt_txt: "2022-07-20 21:00:00",
          },
          {
            dt: 1658361600,
            main: {
              temp: 300.29,
              feels_like: 299.44,
              temp_min: 300.29,
              temp_max: 300.29,
              pressure: 1016,
              sea_level: 1016,
              grnd_level: 942,
              humidity: 24,
              temp_kf: 0,
            },
            weather: [
              {
                id: 800,
                main: "Clear",
                description: "clear sky",
                icon: "01n",
              },
            ],
            clouds: {
              all: 0,
            },
            wind: {
              speed: 4.97,
              deg: 50,
              gust: 7.25,
            },
            visibility: 10000,
            pop: 0,
            sys: {
              pod: "n",
            },
            dt_txt: "2022-07-21 00:00:00",
          },
          {
            dt: 1658372400,
            main: {
              temp: 297.89,
              feels_like: 297.62,
              temp_min: 297.89,
              temp_max: 297.89,
              pressure: 1017,
              sea_level: 1017,
              grnd_level: 943,
              humidity: 46,
              temp_kf: 0,
            },
            weather: [
              {
                id: 800,
                main: "Clear",
                description: "clear sky",
                icon: "01n",
              },
            ],
            clouds: {
              all: 0,
            },
            wind: {
              speed: 3.66,
              deg: 61,
              gust: 4.56,
            },
            visibility: 10000,
            pop: 0,
            sys: {
              pod: "n",
            },
            dt_txt: "2022-07-21 03:00:00",
          },
          {
            dt: 1658383200,
            main: {
              temp: 297.15,
              feels_like: 296.86,
              temp_min: 297.15,
              temp_max: 297.15,
              pressure: 1017,
              sea_level: 1017,
              grnd_level: 943,
              humidity: 48,
              temp_kf: 0,
            },
            weather: [
              {
                id: 800,
                main: "Clear",
                description: "clear sky",
                icon: "01d",
              },
            ],
            clouds: {
              all: 0,
            },
            wind: {
              speed: 3.69,
              deg: 59,
              gust: 5.46,
            },
            visibility: 10000,
            pop: 0,
            sys: {
              pod: "d",
            },
            dt_txt: "2022-07-21 06:00:00",
          },
          {
            dt: 1658394000,
            main: {
              temp: 301.7,
              feels_like: 300.95,
              temp_min: 301.7,
              temp_max: 301.7,
              pressure: 1017,
              sea_level: 1017,
              grnd_level: 944,
              humidity: 35,
              temp_kf: 0,
            },
            weather: [
              {
                id: 800,
                main: "Clear",
                description: "clear sky",
                icon: "01d",
              },
            ],
            clouds: {
              all: 0,
            },
            wind: {
              speed: 2.96,
              deg: 110,
              gust: 3.4,
            },
            visibility: 10000,
            pop: 0,
            sys: {
              pod: "d",
            },
            dt_txt: "2022-07-21 09:00:00",
          },
          {
            dt: 1658404800,
            main: {
              temp: 307.87,
              feels_like: 305.68,
              temp_min: 307.87,
              temp_max: 307.87,
              pressure: 1015,
              sea_level: 1015,
              grnd_level: 944,
              humidity: 18,
              temp_kf: 0,
            },
            weather: [
              {
                id: 800,
                main: "Clear",
                description: "clear sky",
                icon: "01d",
              },
            ],
            clouds: {
              all: 0,
            },
            wind: {
              speed: 1.43,
              deg: 199,
              gust: 2.62,
            },
            visibility: 10000,
            pop: 0,
            sys: {
              pod: "d",
            },
            dt_txt: "2022-07-21 12:00:00",
          },
          {
            dt: 1658415600,
            main: {
              temp: 310.81,
              feels_like: 307.9,
              temp_min: 310.81,
              temp_max: 310.81,
              pressure: 1013,
              sea_level: 1013,
              grnd_level: 942,
              humidity: 10,
              temp_kf: 0,
            },
            weather: [
              {
                id: 800,
                main: "Clear",
                description: "clear sky",
                icon: "01d",
              },
            ],
            clouds: {
              all: 0,
            },
            wind: {
              speed: 2.35,
              deg: 226,
              gust: 4.29,
            },
            visibility: 10000,
            pop: 0,
            sys: {
              pod: "d",
            },
            dt_txt: "2022-07-21 15:00:00",
          },
          {
            dt: 1658426400,
            main: {
              temp: 311.06,
              feels_like: 307.9,
              temp_min: 311.06,
              temp_max: 311.06,
              pressure: 1011,
              sea_level: 1011,
              grnd_level: 940,
              humidity: 7,
              temp_kf: 0,
            },
            weather: [
              {
                id: 800,
                main: "Clear",
                description: "clear sky",
                icon: "01d",
              },
            ],
            clouds: {
              all: 0,
            },
            wind: {
              speed: 2.96,
              deg: 240,
              gust: 5.34,
            },
            visibility: 10000,
            pop: 0,
            sys: {
              pod: "d",
            },
            dt_txt: "2022-07-21 18:00:00",
          },
          {
            dt: 1658437200,
            main: {
              temp: 306.46,
              feels_like: 304.02,
              temp_min: 306.46,
              temp_max: 306.46,
              pressure: 1012,
              sea_level: 1012,
              grnd_level: 941,
              humidity: 9,
              temp_kf: 0,
            },
            weather: [
              {
                id: 804,
                main: "Clouds",
                description: "overcast clouds",
                icon: "04n",
              },
            ],
            clouds: {
              all: 90,
            },
            wind: {
              speed: 4.3,
              deg: 232,
              gust: 8.2,
            },
            visibility: 10000,
            pop: 0,
            sys: {
              pod: "n",
            },
            dt_txt: "2022-07-21 21:00:00",
          },
          {
            dt: 1658448000,
            main: {
              temp: 303.17,
              feels_like: 301.3,
              temp_min: 303.17,
              temp_max: 303.17,
              pressure: 1013,
              sea_level: 1013,
              grnd_level: 940,
              humidity: 13,
              temp_kf: 0,
            },
            weather: [
              {
                id: 804,
                main: "Clouds",
                description: "overcast clouds",
                icon: "04n",
              },
            ],
            clouds: {
              all: 93,
            },
            wind: {
              speed: 3.91,
              deg: 228,
              gust: 8.87,
            },
            visibility: 10000,
            pop: 0,
            sys: {
              pod: "n",
            },
            dt_txt: "2022-07-22 00:00:00",
          },
          {
            dt: 1658458800,
            main: {
              temp: 300.26,
              feels_like: 299.28,
              temp_min: 300.26,
              temp_max: 300.26,
              pressure: 1014,
              sea_level: 1014,
              grnd_level: 940,
              humidity: 19,
              temp_kf: 0,
            },
            weather: [
              {
                id: 803,
                main: "Clouds",
                description: "broken clouds",
                icon: "04n",
              },
            ],
            clouds: {
              all: 72,
            },
            wind: {
              speed: 1.63,
              deg: 190,
              gust: 3.18,
            },
            visibility: 10000,
            pop: 0,
            sys: {
              pod: "n",
            },
            dt_txt: "2022-07-22 03:00:00",
          },
          {
            dt: 1658469600,
            main: {
              temp: 298.58,
              feels_like: 297.86,
              temp_min: 298.58,
              temp_max: 298.58,
              pressure: 1015,
              sea_level: 1015,
              grnd_level: 941,
              humidity: 26,
              temp_kf: 0,
            },
            weather: [
              {
                id: 803,
                main: "Clouds",
                description: "broken clouds",
                icon: "04d",
              },
            ],
            clouds: {
              all: 68,
            },
            wind: {
              speed: 2.6,
              deg: 193,
              gust: 4.02,
            },
            visibility: 10000,
            pop: 0,
            sys: {
              pod: "d",
            },
            dt_txt: "2022-07-22 06:00:00",
          },
          {
            dt: 1658480400,
            main: {
              temp: 303.58,
              feels_like: 301.74,
              temp_min: 303.58,
              temp_max: 303.58,
              pressure: 1016,
              sea_level: 1016,
              grnd_level: 943,
              humidity: 20,
              temp_kf: 0,
            },
            weather: [
              {
                id: 800,
                main: "Clear",
                description: "clear sky",
                icon: "01d",
              },
            ],
            clouds: {
              all: 0,
            },
            wind: {
              speed: 4.58,
              deg: 227,
              gust: 6.69,
            },
            visibility: 10000,
            pop: 0,
            sys: {
              pod: "d",
            },
            dt_txt: "2022-07-22 09:00:00",
          },
          {
            dt: 1658491200,
            main: {
              temp: 308.52,
              feels_like: 305.9,
              temp_min: 308.52,
              temp_max: 308.52,
              pressure: 1015,
              sea_level: 1015,
              grnd_level: 943,
              humidity: 12,
              temp_kf: 0,
            },
            weather: [
              {
                id: 800,
                main: "Clear",
                description: "clear sky",
                icon: "01d",
              },
            ],
            clouds: {
              all: 0,
            },
            wind: {
              speed: 6.53,
              deg: 229,
              gust: 9.76,
            },
            visibility: 10000,
            pop: 0,
            sys: {
              pod: "d",
            },
            dt_txt: "2022-07-22 12:00:00",
          },
          {
            dt: 1658502000,
            main: {
              temp: 310.58,
              feels_like: 307.61,
              temp_min: 310.58,
              temp_max: 310.58,
              pressure: 1013,
              sea_level: 1013,
              grnd_level: 942,
              humidity: 9,
              temp_kf: 0,
            },
            weather: [
              {
                id: 800,
                main: "Clear",
                description: "clear sky",
                icon: "01d",
              },
            ],
            clouds: {
              all: 0,
            },
            wind: {
              speed: 6.31,
              deg: 245,
              gust: 7.69,
            },
            visibility: 10000,
            pop: 0,
            sys: {
              pod: "d",
            },
            dt_txt: "2022-07-22 15:00:00",
          },
          {
            dt: 1658512800,
            main: {
              temp: 310.16,
              feels_like: 307.18,
              temp_min: 310.16,
              temp_max: 310.16,
              pressure: 1012,
              sea_level: 1012,
              grnd_level: 941,
              humidity: 8,
              temp_kf: 0,
            },
            weather: [
              {
                id: 800,
                main: "Clear",
                description: "clear sky",
                icon: "01d",
              },
            ],
            clouds: {
              all: 0,
            },
            wind: {
              speed: 6.53,
              deg: 241,
              gust: 6.29,
            },
            visibility: 10000,
            pop: 0,
            sys: {
              pod: "d",
            },
            dt_txt: "2022-07-22 18:00:00",
          },
          {
            dt: 1658523600,
            main: {
              temp: 305.65,
              feels_like: 303.34,
              temp_min: 305.65,
              temp_max: 305.65,
              pressure: 1014,
              sea_level: 1014,
              grnd_level: 942,
              humidity: 9,
              temp_kf: 0,
            },
            weather: [
              {
                id: 800,
                main: "Clear",
                description: "clear sky",
                icon: "01n",
              },
            ],
            clouds: {
              all: 0,
            },
            wind: {
              speed: 3.94,
              deg: 260,
              gust: 7,
            },
            visibility: 10000,
            pop: 0,
            sys: {
              pod: "n",
            },
            dt_txt: "2022-07-22 21:00:00",
          },
          {
            dt: 1658534400,
            main: {
              temp: 302.91,
              feels_like: 301.11,
              temp_min: 302.91,
              temp_max: 302.91,
              pressure: 1014,
              sea_level: 1014,
              grnd_level: 941,
              humidity: 10,
              temp_kf: 0,
            },
            weather: [
              {
                id: 800,
                main: "Clear",
                description: "clear sky",
                icon: "01n",
              },
            ],
            clouds: {
              all: 0,
            },
            wind: {
              speed: 1.79,
              deg: 262,
              gust: 2.19,
            },
            visibility: 10000,
            pop: 0,
            sys: {
              pod: "n",
            },
            dt_txt: "2022-07-23 00:00:00",
          },
          {
            dt: 1658545200,
            main: {
              temp: 299.87,
              feels_like: 298.85,
              temp_min: 299.87,
              temp_max: 299.87,
              pressure: 1015,
              sea_level: 1015,
              grnd_level: 941,
              humidity: 12,
              temp_kf: 0,
            },
            weather: [
              {
                id: 800,
                main: "Clear",
                description: "clear sky",
                icon: "01n",
              },
            ],
            clouds: {
              all: 0,
            },
            wind: {
              speed: 1.09,
              deg: 133,
              gust: 2.33,
            },
            visibility: 10000,
            pop: 0,
            sys: {
              pod: "n",
            },
            dt_txt: "2022-07-23 03:00:00",
          },
          {
            dt: 1658556000,
            main: {
              temp: 298.98,
              feels_like: 298.01,
              temp_min: 298.98,
              temp_max: 298.98,
              pressure: 1016,
              sea_level: 1016,
              grnd_level: 942,
              humidity: 15,
              temp_kf: 0,
            },
            weather: [
              {
                id: 800,
                main: "Clear",
                description: "clear sky",
                icon: "01d",
              },
            ],
            clouds: {
              all: 0,
            },
            wind: {
              speed: 0.63,
              deg: 96,
              gust: 1.56,
            },
            visibility: 10000,
            pop: 0,
            sys: {
              pod: "d",
            },
            dt_txt: "2022-07-23 06:00:00",
          },
          {
            dt: 1658566800,
            main: {
              temp: 304.38,
              feels_like: 302.27,
              temp_min: 304.38,
              temp_max: 304.38,
              pressure: 1016,
              sea_level: 1016,
              grnd_level: 944,
              humidity: 11,
              temp_kf: 0,
            },
            weather: [
              {
                id: 800,
                main: "Clear",
                description: "clear sky",
                icon: "01d",
              },
            ],
            clouds: {
              all: 0,
            },
            wind: {
              speed: 1.49,
              deg: 177,
              gust: 2.29,
            },
            visibility: 10000,
            pop: 0,
            sys: {
              pod: "d",
            },
            dt_txt: "2022-07-23 09:00:00",
          },
          {
            dt: 1658577600,
            main: {
              temp: 309.46,
              feels_like: 306.66,
              temp_min: 309.46,
              temp_max: 309.46,
              pressure: 1015,
              sea_level: 1015,
              grnd_level: 944,
              humidity: 10,
              temp_kf: 0,
            },
            weather: [
              {
                id: 800,
                main: "Clear",
                description: "clear sky",
                icon: "01d",
              },
            ],
            clouds: {
              all: 0,
            },
            wind: {
              speed: 3.7,
              deg: 221,
              gust: 6.82,
            },
            visibility: 10000,
            pop: 0,
            sys: {
              pod: "d",
            },
            dt_txt: "2022-07-23 12:00:00",
          },
          {
            dt: 1658588400,
            main: {
              temp: 311.73,
              feels_like: 308.47,
              temp_min: 311.73,
              temp_max: 311.73,
              pressure: 1013,
              sea_level: 1013,
              grnd_level: 942,
              humidity: 7,
              temp_kf: 0,
            },
            weather: [
              {
                id: 800,
                main: "Clear",
                description: "clear sky",
                icon: "01d",
              },
            ],
            clouds: {
              all: 0,
            },
            wind: {
              speed: 4.13,
              deg: 241,
              gust: 6.01,
            },
            visibility: 10000,
            pop: 0,
            sys: {
              pod: "d",
            },
            dt_txt: "2022-07-23 15:00:00",
          },
          {
            dt: 1658599200,
            main: {
              temp: 311.18,
              feels_like: 307.94,
              temp_min: 311.18,
              temp_max: 311.18,
              pressure: 1012,
              sea_level: 1012,
              grnd_level: 941,
              humidity: 6,
              temp_kf: 0,
            },
            weather: [
              {
                id: 800,
                main: "Clear",
                description: "clear sky",
                icon: "01d",
              },
            ],
            clouds: {
              all: 0,
            },
            wind: {
              speed: 5.77,
              deg: 248,
              gust: 6.18,
            },
            visibility: 10000,
            pop: 0,
            sys: {
              pod: "d",
            },
            dt_txt: "2022-07-23 18:00:00",
          },
          {
            dt: 1658610000,
            main: {
              temp: 306.64,
              feels_like: 304.18,
              temp_min: 306.64,
              temp_max: 306.64,
              pressure: 1015,
              sea_level: 1015,
              grnd_level: 943,
              humidity: 8,
              temp_kf: 0,
            },
            weather: [
              {
                id: 801,
                main: "Clouds",
                description: "few clouds",
                icon: "02n",
              },
            ],
            clouds: {
              all: 20,
            },
            wind: {
              speed: 3.85,
              deg: 249,
              gust: 6.97,
            },
            visibility: 10000,
            pop: 0,
            sys: {
              pod: "n",
            },
            dt_txt: "2022-07-23 21:00:00",
          },
          {
            dt: 1658620800,
            main: {
              temp: 304.23,
              feels_like: 302.18,
              temp_min: 304.23,
              temp_max: 304.23,
              pressure: 1015,
              sea_level: 1015,
              grnd_level: 943,
              humidity: 9,
              temp_kf: 0,
            },
            weather: [
              {
                id: 802,
                main: "Clouds",
                description: "scattered clouds",
                icon: "03n",
              },
            ],
            clouds: {
              all: 49,
            },
            wind: {
              speed: 2.28,
              deg: 255,
              gust: 3.52,
            },
            visibility: 10000,
            pop: 0,
            sys: {
              pod: "n",
            },
            dt_txt: "2022-07-24 00:00:00",
          },
        ],
        city: {
          id: 3117735,
          name: "Madrid",
          coord: {
            lat: 40.4165,
            lon: -3.7026,
          },
          country: "ES",
          population: 1000000,
          timezone: 7200,
          sunrise: 1658206814,
          sunset: 1658259694,
        },
      })
    );
  }),
];

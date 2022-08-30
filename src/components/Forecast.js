import { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from "reactstrap";
export function Forecast({ foreCastData }) {
  console.log(foreCastData);
  return (
    <div className="d-flex flex-row" data-testid="forecasts">
      {foreCastData.map((foreCast, index) => {
        return (
          <Card
            data-testid={`forecast-${index}`}
            style={{
              width: "18rem",
            }}
          >
            <img
              alt="Sample"
              src={`http://openweathermap.org/img/wn/${foreCast.icon}@2x.png`}
            />
          </Card>
        );
      })}
    </div>
  );
}

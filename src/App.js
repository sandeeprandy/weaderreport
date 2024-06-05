import React, { useState } from "react";
import axios from "axios";
import { Button, Input, Card } from "antd";
import { CloudTwoTone } from "@ant-design/icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "./App.css";

function App() {
  const [city, setCountry] = useState("");
  const [cityWaeder, setCityWaeder] = useState(null);
  const [data, setadata] = useState([{ time: 5, temperature: 25 }]);
  const date = new Date().toLocaleDateString();
  const times = new Date().toLocaleTimeString();

  //fetch the data & get weather report based on city
  const fetchcity = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=23da13304a0096bcdf900edc15a66563`
      );

      setCityWaeder(response.data); //set the weather data in state
      const newdata = [...data];
      newdata[0].temperature = cityWaeder.main.temp;
      newdata[0].time =times
      setadata(newdata);
      console.log(times[0]);
    } catch (error) {
      console.error("we got an error", error); //handles the exceptions
    }
  };

  return (
    <>
      <header className="header">
        {" "}
        <h2>Type city name</h2>
        <Input
          type="primary"
          className="input"
          placeholder="Enter city name "
          onChange={(e) => setCountry(e.target.value)}
        />
        <Button type="primary" className="button" onClick={fetchcity}>
          search
        </Button>
      </header>
      <div className="App">
        <div className="searchCountys">
          <div className="weatherReport">
            {cityWaeder ? (
              <>
                <p>today date : {date}</p>
                <h1>city name : {cityWaeder.name} </h1>
                <div className="cloudy">
                  <CloudTwoTone style={{ fontSize: "105px" }} />
                  <p style={{ fontSize: "25px" }}>{cityWaeder.main.temp} F</p>
                </div>
                <h1>{cityWaeder.weather[0].description} </h1>
                <div className="humadity">
                  <p className="humadityItems">
                    humidity <br></br> {cityWaeder.main.humidity}
                  </p>
                  <p className="humadityItems">
                    wind speed <br></br> {cityWaeder.wind.speed}
                  </p>
                </div>
                <div className="humadity">
                  <p className="humadityItems">
                    min tempo <br></br> {cityWaeder.main.temp_min}
                  </p>
                  <p className="humadityItems">
                    max tempo <br></br> {cityWaeder.main.temp_max}
                  </p>
                </div>
              </>
            ) : (
             <></>
            )}
          </div>
        </div>
        <div className="chart">
          {cityWaeder ? (
            <>
              <Card
                title={`temperature of ${cityWaeder.name}`}
                className="charts"
               
              >
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="temperature"
                      stroke="#8884d8"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
              <div className="moreweader">
                <h2>Time Zone : {cityWaeder.timezone} </h2>
                <p>
                  Feels Like is :
                  <span style={{ color: "green" }}>
                    {cityWaeder.main.feels_like}
                  </span>
                </p>
                <p>
                  Temp min is :
                  <span style={{ color: "green" }}>
                    {cityWaeder.main.temp_min}
                  </span>
                </p>
                <p>
                  Temp max is :
                  <span style={{ color: "red" }}>
                    {" "}
                    {cityWaeder.main.temp_max}{" "}
                  </span>
                </p>
              </div>
            </>
          ) : (
            <h1> </h1>
          )}
        </div>
      </div>
    </>
  );
}

export default App;

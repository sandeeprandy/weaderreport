import React, { useState } from "react";
import axios from "axios";
import { Button, Input } from "antd";
import "./App.css";

function App() {
  const [city, setCountry] = useState("");
  const [cityWaeder, setCityWaeder] = useState(null);

  const fetchcity = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=23da13304a0096bcdf900edc15a66563`
      ); //fetch the data & get weather report based on city

      setCityWaeder(response.data); //set the weather data in state

      console.log(cityWaeder.main.temp);
    } catch (error) {
      console.error("we got an error", error); //handles the exceptions
    }
  };

  return (
    <div className="App">
      <div className="searchCountys">
        <h2>get the weather report on city name</h2>
        <Input
          type="primary"
          className="input"
          placeholder="Enter city name "
          onChange={(e) => setCountry(e.target.value)}
        />
        <Button type="primary" className="button" onClick={fetchcity}>
          search
        </Button>
      </div>
      <div className="weatherReport">
        {cityWaeder ? (
          <>
            <h1>Weather of : {cityWaeder.name}</h1>
            <h2>Time Zone : {cityWaeder.timezone} </h2>
            <p>
              Tempreture is :
              {<span style={{ color: "yellow" }}>{cityWaeder.main.temp}</span>}
            </p>
            <p>
              Feels Like is :
              <span style={{ color: "green" }}>
                {cityWaeder.main.feels_like}
              </span>
            </p>
            <p>
              Temp min is :
              <span style={{ color: "green" }}>{cityWaeder.main.temp_min}</span>
            </p>
            <p>
              Temp max is :
              <span style={{ color: "red" }}> {cityWaeder.main.temp_max} </span>
            </p>
            <p>
              Humidity :
              <span style={{ color: "yellow" }}>
                {cityWaeder.main.humidity}
              </span>
            </p>
          </>
        ) : (
          <h1> loading...</h1>
        )}
      </div>
    </div>
  );
}

export default App;

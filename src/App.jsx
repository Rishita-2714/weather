import React, { useState, useEffect } from 'react';
import './App.css';
import Temperature from './components/temperature';
import Highlights from './components/Highlights';

function App() {
  const [city, setCity] = useState("New Delhi");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = () => {
      const apiURL = `https://api.weatherapi.com/v1/current.json?key=37c0282b476f4035aae201041241709&q=${city}&aqi=no`;

      fetch(apiURL)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setWeatherData(data);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    fetchWeatherData();
  }, [city]);

  return (
    <div className='bg-[#1F213A] h-screen flex items-start justify-center align-top'>
      <div className='mt-40 w-1/5 h-1/3'>
        {weatherData && (
          <Temperature 
            setCity={setCity} 
            stats={{
              temp: weatherData.current.temp_c,
              condition: weatherData.current.condition.text,
              time: weatherData.location.localtime,
              location: weatherData.location.name,
              isDay: weatherData.current.is_day
            }} 
            city={city}
          />
        )}
      </div>
      <div className='mt-40 w-1/3 h-1/3 p-10 grid grid-cols-2 gap-6'>
        <h2 className='col-span-2 text-slate-200 text-2xl'>Today's Highlights</h2>
        {weatherData && (
          <>
            <Highlights stats={{ title: "Temperature", value: weatherData.current.temp_c, unit: "°C" }} />
            <Highlights stats={{ title: "Wind Speed", value: weatherData.current.wind_kph, unit: "kph", direction: weatherData.current.wind_dir }} />
            <Highlights stats={{ title: "Humidity", value: weatherData.current.humidity, unit: "%" }} />
            <Highlights stats={{ title: "Pressure", value: weatherData.current.pressure_mb, unit: "mb" }} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;

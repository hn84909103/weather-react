import React, { useState } from 'react';

const api = {
  key: "ea0a788c803d1f0772c799a988c16294",
  base:"http://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt =>{
    if(evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=imperial&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('')
          console.log(result);
        });    
    }
  }

  const options={weekday: 'long', year:'numeric', month:'long', day:'numeric'};

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 60) ? 'app' : ((weather.main.temp < 32)) ? 'app snow' : 'app morning') : 'app morning'}>
      <main>
        <div className="search-box">
          <input 
            type="text" 
            className="search-bar" 
            placeholder="Search ..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{new Date().toLocaleDateString(undefined, options)}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°F
              </div>
              <div className="weather">
                <div>
                  <img className="weather-icon" src ={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="wthr img" />
                </div>
                {weather.weather[0].main}
              </div>
            </div>
          </div>
        ) : (
          <div className="location-box">
            <div className="location">
              Welcome to WeatherApp
            </div>
            <div className="date">
              Please enter a city name
            </div>
          </div> 
          )}
      </main>
    </div>
    
  );
}

export default App;

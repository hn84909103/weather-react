import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'weather-icons/css/weather-icons.css';


const api = {
  key: "ea0a788c803d1f0772c799a988c16294",
  base:"https://api.openweathermap.org/data/2.5/"
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
              <div className="weather-box-m">
                <div className="weather-icon-api"><i class={`wi wi-owm-${weather.weather[0].id} display-4`}></i></div>
                <div className="weather">
                {weather.weather[0].main}
                </div>
              </div>
              <br></br>
              <div className="temp">
                <div className="tem">{Math.round(weather.main.temp)}</div><div className="degree">°</div><div className="fahren">F</div>
                <br></br>
                <div className="temp-min">{Math.round(weather.main.temp_min)}°F↓</div>
                <div className="vl"></div>
                <div className="temp-max">{Math.round(weather.main.temp_max)}°F↑</div>
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

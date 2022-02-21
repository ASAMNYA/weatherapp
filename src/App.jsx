import './App.css';
import apiInfo from './api'
import { useState } from 'react';

function App() {

  const [searchQuery, setSearchQuery] = useState('')
  const [weather, setWeather] = useState({})
  const search = evy => {
    if (evy.key === 'Enter') {
      if(searchQuery.length<1)
      return ;
      else{
        fetch(`${apiInfo.base}weather?q=${searchQuery}&units=metric&APPID=${apiInfo.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setSearchQuery('')
          console.log(result)
        })
      }
      console.log(searchQuery)
     
    }
  }

  const dateBuilder = (d) => {
    let months = [
      "January", "February", "March", "April", "June", "July", "August", "September",
      "October", "November", "December"
    ]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()
    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={(typeof weather.main!=="undefined")?
    (
      (weather.main.temp>16) ? 'App warm':'App')
      :'App'} >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Enter A City"
            onChange={e => setSearchQuery(e.target.value)}
            value={searchQuery}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <>
            <div className='location-box'>
              <div className='location'>{weather.name}, {weather.sys.country}</div>
              <div className='date'>{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temperature">
               {Math.round(weather.main.temp)} °C
              </div>
              <div className="weather">
                {weather.weather[0].main}
              </div>
            </div>
          </>
        ):('')}

      </main>
    </div>
  );
}

export default App;

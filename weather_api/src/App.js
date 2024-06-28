import React, { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import cloud from './Assets/cloud.png';
import clear from './Assets/clear.png';
import drizle from './Assets/drizzle.png';
import rain from './Assets/rain.png';
import snow from './Assets/snow.png';
import humidity from './Assets/humidity.png';
import wind from './Assets/wind.png';
function App() {
  // const api = 'https://api.weatherapi.com/v1/current.json?key=d48eb91615f04d6ab5071258242806%20&q=Pakistan';
  // const weather = () => {
  //   fetch(api)
  //     .then(res => res.json())
  //     .then(data => console.log(data))
  // }
  // weather();
 
  const [sky, setSky] = useState(clear);
  const [temperature, setTemperature] = useState(21);
  const [city, setCity] = useState('New York');
  const [Humidity_percentage, setHumidity] = useState(61);
  const [windSpeed, setWindSpeed] = useState(4.1);
  const [inputValue, setInputValue] = useState('');
  const [text, setText] = useState('Clear');
  const inputValueChanged = (event) => {
    // let value = event.target.value;
    // setInputValue(value);
    setInputValue(event.target.value);
  }
  const formSubmitted = (event) => {
    event.preventDefault();
    setInputValue('');
    if (inputValue === '') {
      console.error('enter your location');
    } else {
      const fetchingData = async () => {
        const url = `https://api.weatherapi.com/v1/current.json?key=d48eb91615f04d6ab5071258242806%20&q=${inputValue}`;
        const fetching = await fetch(url);
        const data = await fetching.json();
        setCity(data.location.name);
        setText(data.current.condition.text);
        setTemperature(data.current.temp_c);
        setHumidity(data.current.humidity);
        setWindSpeed(data.current.wind_kph);
        if (data.current.condition.text === 'Sunny') {
          setSky(clear);
        } else if (data.current.condition.text === 'Mist') {
          setSky(snow);
        } else if (data.current.condition.text === 'Partly cloudy') {
          setSky(cloud);
        } else if (data.current.condition.text === 'Patchy rain nearby') {
          setSky(drizle);
        } else if (data.current.condition.text === 'Moderate or heavy rain shower') {
          setSky(rain);
        }
      }
      fetchingData();

    }
  }
  return (
    <div className="App">
      <div className='weather_container'>
        <form className='form_container' onSubmit={formSubmitted}>
          <input className='inpt_field' value={inputValue} onChange={inputValueChanged} type="search" placeholder='Search' />
          <button type='submit' className='submit_btn'>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>
        <div className='image_container'>
          <p className='condition'>{text}</p>
          <img className='cloud_img' src={sky} alt="cloud" />
        </div>
        <div className='details'>
          <p className='temp'>{temperature}°C</p>
          <p className='location'>{city}</p>
        </div>
        <div className='details2'>
          <div className='humidity_container'>
            <div className='hImage_container'>
              <img className='humidity_Image' src={humidity} alt="" />
            </div>
            <div className='humidity_count'>
              <h1 className='humidity_Number'>{Humidity_percentage} %</h1>
              <h3 className='humidity_Text'>Humidity</h3>
            </div>
          </div>
          <div className='wind_container'>
            <div className='wImage_container'>
              <img className='wind_Image' src={wind} alt="" />
            </div>
            <div className='wind_count'>
              <h1 className='wind_Number'>{windSpeed} km/h</h1>
              <h3 className='Wind_Text'>Wind Speed</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import PropTypes from 'prop-types';
import ForecastHour from './ForecastHour';


const Result = ({ weather}) => {
    const {
        city,
        date,
        temp,
        main,
        sunset,
        sunrise,
        description,
        highestTemp,
        lowestTemp,
        forecast,
    } = weather;

    const forecasts = forecast.map(item => (
        <ForecastHour
          key={item.dt}
          temp={Math.floor(item.main.temp * 1) / 1}
          month={item.dt_txt.slice(5, 7)}
          day={item.dt_txt.slice(8, 10)}
          hour={item.dt_txt.slice(11, 13) * 1}
        />
      ));
    


return (
    <div>
    <h2>City: {city}</h2>
    <h3>Current Temp: {Math.floor(temp)}</h3>
    <h4>low temp:{Math.floor(lowestTemp)}</h4>
        <p>description: {description}</p>
        <p>Forecast: {forecasts}</p>
        <p>time of sunrise:{sunrise}</p>
    </div>
)
}
Result.propTypes = {
    weather: PropTypes.shape({
      city: PropTypes.string,
      date: PropTypes.string,
      description: PropTypes.string,
      main: PropTypes.string,
      temp: PropTypes.number,
      sunrise: PropTypes.string,
      sunset: PropTypes.string,
      highestTemp: PropTypes.number,
      lowestTemp: PropTypes.number,
      forecast: PropTypes.array,
    }).isRequired,
  };

export default Result;
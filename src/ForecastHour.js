import React from 'react';
import PropTypes from 'prop-types';

const ForecastHour = props => {
    const { temp, month, day, hour } = props;
  
    return (
        <div>
        <p>Date: {month}.{day}</p>
        <p>Time: {hour}:00</p>
        <p> Temperature: {temp}</p>
        </div>
    )
  };
  
  ForecastHour.propTypes = {
    temp: PropTypes.number.isRequired,
    month: PropTypes.string.isRequired,
    day: PropTypes.string.isRequired,
    hour: PropTypes.number.isRequired,
  };
  
  export default ForecastHour;
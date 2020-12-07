import React from 'react';
import './DayCard.css';
var moment = require('moment');


class DayCard extends React.Component{
    render(){
        let newDate = new Date();
        const weekday = this.props.day.dt * 1000
        newDate.setTime(weekday)
        const imgURL = "owf owf-"+ this.props.day.weather[0].id +" owf-5x red"
        
        return (
            <div className="col-sm-2">
              <div className="card">
                <h3 className="card-title">{moment(newDate).format('dddd')}</h3>
                <p className="text-muted">{moment(newDate).format('MMMM Do, h:mm a')}</p>
                <i className={imgURL}></i>
                <h2>{Math.round(this.props.day.main.temp)} °F</h2>             
                <div className="card-body">
                <p className="card-text">{this.props.day.weather[0].description}</p>
                <button className="btn btn-dark btn-outline-light">See Hourly Forecast</button>
                </div>
              </div>
            </div>
          )
    }
}
   
    

        

export default DayCard;
import React, { Component} from 'react';
import apiConfig from './apiKey';
import DayCard from './DayCard';
import DegreeToggle from './DegreeToggle';


class WeekContainer extends React.Component{
    
    state = {
        days: [],
        location: "zip=10302",
        country: "us",
        degreeType: "imperial"
      }

//The constructor for a React component is called before it is mounted
    componentDidMount = () => {
        const weatherURL =
        `http://api.openweathermap.org/data/2.5/forecast?${this.state.location},${this.state.country}&units=${this.state.degreeType}&APPID=${apiConfig.openWeatherMapKey}`  
            fetch(weatherURL)
            .then(res => res.json())
            .then(data => { 
                console.log("Data List Loaded", data.list)
                const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
                this.setState({days: dailyData})
            }) 
    }
    formatDayCards = () => {
        return this.state.days.map((day, index) => <DayCard day={day} key={index} />)
      }

      updateForecastDegree = newDegreeType => {
        this.setState({
          degreeType: newDegreeType
        }, this.sendNewFetch)
      }

      sendNewFetch = () => {
        const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?${this.state.location},${this.state.country}&units=${this.state.degreeType}&APPID=${apiConfig.openWeatherMapKey}`
        fetch(weatherURL)
        .then(res => res.json())
        .then(data => {
          console.log("Data List Loaded", data.list)
          const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
          this.setState({days: dailyData})
        })
      }

    render(){     
//fetching the data from the API using our API key, parsing it to json, and then printing it the console to check that our fetch was successful.
        return (
            <div className="container">
      <h1 className="display-1 jumbotron">5-Day Forecast.</h1>
      <DegreeToggle degreeType={this.state.degreeType} updateForecastDegree={this.updateForecastDegree}/>
      <h5 className="display-5">ohio</h5>
        <div className="row justify-content-center">
          {this.formatDayCards()}
        </div>
      </div>
)
    }
}

export default WeekContainer;
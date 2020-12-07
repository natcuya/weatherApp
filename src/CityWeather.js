import React, { Component} from 'react';
import apiConfig from './apiKey';
import SearchCity from './SearchCity';
import Result from './Result';

class CityWeather extends React.Component{
//value is a controlled component "controlled by react/the user input"
    state = {
            value: '',
            weatherInfo: null,
            error: false,
          };

        handleInputChange = event => {
            this.setState({ value: event.target.value });
            };

            handleSearchCity = event => {
                event.preventDefault();
                const { value } = this.state;
                const apiKey = apiConfig.openWeatherMapKey;
                const weather = `https://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=${apiKey}&units=imperial`;
                const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${value}&APPID=${apiKey}&units=imperial`;
                
        
                Promise.all([fetch(weather), fetch (forecast)])
                .then(([res1, res2]) => {
                    if (res1.ok && res2.ok){
                        return Promise.all([res1.json(),res2.json()]);
                    }
                    throw Error(res1.statusText, res2.statusText);
                })
                .then(([data1,data2])=>{
                    const months = [
                        'January',
                        'February',
                        'March',
                        'April',
                        'May',
                        'June',
                        'July',
                        'August',
                        'September',
                        'October',
                        'November',
                        'December',
                    ];
                    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    const currentDate = new Date();
                    //The getMonth() method returns the month in the specified date according to local time
                    const date = `${days[currentDate.getDay()]}
                                ${currentDate.getDate()}
                                ${months[currentDate.getMonth()]}`;
                                const sunset = new Date(data1.sys.sunset * 1000).toLocaleTimeString().slice(0, 5);
                                const sunrise = new Date(data1.sys.sunrise * 1000).toLocaleTimeString().slice(0, 5);
                    const weatherInfo = {
                        city: data1.name,
                        temp: data1.main.temp,
                        description: data1.weather[0].description,
                        forecast: data2.list,
                        highestTemp: data1.main.temp_max,
                        lowestTemp: data1.main.temp_min,
                        sunrise, sunset
                    };
//setState() schedules an update to a component’s state object. When state changes, the component responds by re-rendering.
                    this.setState({
                        weatherInfo,
                        error: false,
                    });
                })
                .catch( error => {
                    console.log(error);
                    this.setState({
                        error: true,
                        weatherInfo:null,
                    });
                });
            };

    render (){
        const {value, weatherInfo, error} = this.state;
        return (
            //show weather results (or error) and if true
            <>
            <SearchCity 
                value = {value} 
                showResult = {(weatherInfo|| error) && true}
                change = {this.handleInputChange}
                submit = {this.handleSearchCity}
            />
                      {weatherInfo && <Result weather={weatherInfo} />}
            </>
        );
    }
}


/* 
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

*/

export default CityWeather;
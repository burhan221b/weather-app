import React from 'react';

import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';

const API_KEY = { ENTER API KEY };

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  getGeo = (e) => {
    e.preventDefault();
    if (navigator.geolocation) {
      this.setState({
        temperature: 'Loading, Please wait...',
        city: 'Loading, Please wait...',
        humidity: 'Loading, Please wait...',
        description: 'Loading, Please wait...',
      });
      navigator.geolocation.getCurrentPosition(this.getGeo2);
    }
  }
  getGeo2 = async (position) => {
    console.log(position);
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&mode=json&appid=${API_KEY}&units=metric`);

    const data = await api_call.json();
    let cTemp = data.main.temp;
    let cToFahr = cTemp * 9 / 5 + 32;
    cToFahr = cToFahr.toFixed(2)
    this.setState({
      temperature: cToFahr,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      error: ""
    });
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&mode=json&appid=${API_KEY}&units=metric`);


    // const api_call = await fetch(`https://samples.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}`);
    const data = await api_call.json();
    if (data.cod === "404") {
      return this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Error in Search, City and/or Country not found."
      })
    }
    console.log(data);
    if (city && country) {
      let cTemp = data.main.temp;
      let cToFahr = cTemp * 9 / 5 + 32;
      cToFahr = cToFahr.toFixed(2)
      this.setState({
        temperature: cToFahr,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      })
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the value"
      })
    }
  }
  render() {
    return (
      <div>
        <div className='wrapper'>
          <div className='main'>
            <div className='container'>
              <div className='row'>
                <div className="col-xs-4 title-container">
                  <Titles />
                </div>
                <div className="col-xs-8 form-container">
                  <Form getWeather={this.getWeather} getGeo={this.getGeo} />
                  <Weather
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;



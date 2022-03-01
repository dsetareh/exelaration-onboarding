import React from 'react';
import './App.css';
import { CountrySelect } from './components/CountrySelect';

const API_URL = 'https://xc-countries-api.herokuapp.com/api/';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countryData: [],
      stateData: []
    };
  }

  componentDidMount() {
    fetch(API_URL + 'countries')
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          countryData: json
        });
        console.log(this.state.countryData);
      })

      fetch(API_URL + 'states')
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          stateData: json
        });
        console.log(this.state.stateData);
      })

  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Country API</p>
        </header>
        <CountrySelect stateData={this.state.stateData} countryData={this.state.countryData}/>
      </div>
    );
  }
}

export default App;

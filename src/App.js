import React, { useState, useEffect } from 'react';
import './App.css';
import { CountrySelect } from './components/CountrySelect';

const API_URL = 'https://xc-countries-api.herokuapp.com/api/countries';
export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countryData: {}
    };
  }

  componentDidMount() {
    fetch(API_URL)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          countryData: json
        });
        console.log(this.state.countryData);
      })

  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Country API</p>
        </header>
        <p>{JSON.stringify(this.state.countryData)}</p>
        <CountrySelect />
      </div>
    );
  }
}

export default App;

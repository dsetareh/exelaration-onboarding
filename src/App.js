import React from 'react';
import './App.css';
import { LocationBrowser } from './components/LocationBrowser';
import { AddNewCountry } from './components/AddNewCountry';
import { AddNewState } from './components/AddNewState';


const API_URL = 'https://xc-countries-api.herokuapp.com/api/'; //! should be made a global import, reused in some components

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countryData: [],
      stateData: []
    };
  }

  // grab api data and sort it before passing it down to components
  componentDidMount() {
    fetch(API_URL + 'countries')
      .then((res) => res.json())
      .then((json) => {
        // ! stolen from MDN, also duplicated code !
        json.sort(function (a, b) {
          var nameA = a.name.toUpperCase(); // ignore upper and lowercase
          var nameB = b.name.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        });
        this.setState({
          countryData: json
        });
      })



    fetch(API_URL + 'states')
      .then((res) => res.json())
      .then((json) => {
        // ! stolen from MDN, also duplicated code !
        json.sort(function (a, b) {
          var nameA = a.name.toUpperCase(); // ignore upper and lowercase
          var nameB = b.name.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        });
        this.setState({
          stateData: json
        });
      })

  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Country API</p>
        </header>
        <div className="input-area">
          <LocationBrowser stateData={this.state.stateData} countryData={this.state.countryData} />
          <AddNewCountry API_URL={API_URL} />
          <AddNewState API_URL={API_URL} countryData={this.state.countryData} />
        </div>
      </div>
    );
  }
}

export default App;

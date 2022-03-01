import React from 'react';
import './App.css';
import { SubmitNewState } from './components/SubmitNewState';

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
      })

    fetch(API_URL + 'states')
      .then((res) => res.json())
      .then((json) => {
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
          <SubmitNewState stateData={this.state.stateData} countryData={this.state.countryData} />
        </div>
      </div>
    );
  }
}

export default App;

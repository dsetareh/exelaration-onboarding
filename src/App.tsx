import React from 'react';
import { Routes, Route, Outlet, Link } from "react-router-dom";



import './App.css';
import { LocationBrowser } from './components/LocationBrowser';
import { AddNewCountry } from './components/AddNewCountry';
import { AddNewState } from './components/AddNewState';
import { Utils } from './Utils';


const API_URL = 'https://xc-countries-api.herokuapp.com/api/';



interface IStateData {
  countryData: ICountry[];
}

class App extends React.Component<any, IStateData> {
  constructor(props: any) {
    super(props);
    this.state = {
      countryData: []
    };
  }



  // grab api data and sort it before passing it down to components
  componentDidMount = async () => {
    let response = await fetch(`${API_URL}countries`);
    let countries: ICountry[] = await response.json()
    countries.sort(Utils.compareLocation);
    this.setState({ countryData: countries });

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Country API</p>
          <nav
            style={{
              borderBottom: "solid 1px",
              paddingBottom: "1rem",
            }}
          >
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LocationBrowser apiUrl={API_URL} countryData={this.state.countryData} />} />
            <Route path="add-country" element={<AddNewCountry apiUrl={API_URL} />} />
            <Route path="add-state" element={<AddNewState apiUrl={API_URL} countryData={this.state.countryData} />} />

            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </div>

    );
  }
}
function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul>
          <li>
            <Link to="/">Browse Countries</Link>
          </li>
          <li>
            <Link to="/add-country">Add Country</Link>
          </li>
          <li>
            <Link to="/add-state">Add State</Link>
          </li>
        </ul>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}


function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default App;

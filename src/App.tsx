import React from 'react';
import './App.less';
// my stuff
import { LocationBrowser } from './components/LocationBrowser';
import { AddNewCountry } from './components/AddNewCountry';
import { AddNewState } from './components/AddNewState';
import { Utils } from './Utils';
// ant design
import { Carousel, Tabs } from 'antd';
// mobx
import { CountryStore, Country } from './stores/CountryStore';
import { time } from 'console';

const { TabPane } = Tabs;



const API_URL = 'https://xc-countries-api.herokuapp.com/api/';



interface IStateData {
  countryStore: CountryStore;
}

class App extends React.Component<any, IStateData> {
  constructor(props: any) {
    super(props);
    this.state = {
      countryStore: new CountryStore()
    };
  }



  // grab api data and sort it before passing it down to components
  componentDidMount = async () => {
    // console.log(this.state.countryStore);
    // console.log(this.state.countryStore.hasLoaded);
    // console.log(this.state.countryStore.allCountries);
    for (let i = 0; i < 500; i++) {
      console.log(this.state.countryStore.allCountries);
    }
    
    
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Country API</p>
        </header>
        <Tabs defaultActiveKey="1" >
          <TabPane tab="Carousel" key="1">
            <Carousel className="input-area">
              <LocationBrowser apiUrl={API_URL} countryStore={this.state.countryStore} />
              <AddNewCountry apiUrl={API_URL} />
              <AddNewState apiUrl={API_URL} countryStore={this.state.countryStore} />
            </Carousel>
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>

      </div>
    );
  }
}

export default App;

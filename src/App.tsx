import React from 'react';
import './App.less';
import { LocationBrowser } from './components/LocationBrowser';
import { AddNewCountry } from './components/AddNewCountry';
import { AddNewState } from './components/AddNewState';
import { Utils } from './Utils';
import { Carousel, Tabs } from 'antd';

const { TabPane } = Tabs;



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
        </header>
        <Tabs defaultActiveKey="1" >
          <TabPane tab="Carousel" key="1">
            <Carousel className="input-area">
              <LocationBrowser apiUrl={API_URL} countryData={this.state.countryData} />
              <AddNewCountry apiUrl={API_URL} />
              <AddNewState apiUrl={API_URL} countryData={this.state.countryData} />
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

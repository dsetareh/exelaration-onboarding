import React, { useState, useEffect } from 'react';
import './App.less';
import LocationBrowser from './components/LocationBrowser';
import AddNewCountry from './components/AddNewCountry';
import AddNewState from './components/AddNewState';
import { Utils } from './Utils';
import { Carousel, Tabs } from 'antd';

import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { configStore } from './stores'

const { TabPane } = Tabs;



const App = observer(() => {

  const countryStore = useContext(configStore)

  return (
    <div className="App">
      <header className="App-header">
        <p>Country API</p>
      </header>
      <Tabs defaultActiveKey="1" >
        <TabPane tab="Carousel" key="1">
          <Carousel className="input-area">
            <LocationBrowser />
            <AddNewCountry />
            <AddNewState />
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

})

export default App;

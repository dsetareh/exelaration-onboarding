import React from 'react';
import './App.less';
import LocationBrowser from './components/LocationBrowser';
import AddNewCountry from './components/AddNewCountry';
import AddNewState from './components/AddNewState';
import { Space } from 'antd';

import { observer } from 'mobx-react-lite'




const App = observer(() => {
  


  return (
    <div className="App">
      <header className="App-header">
        <p>Country API</p>
      </header>
      <Space direction="horizontal" wrap>
        <LocationBrowser />
        <AddNewCountry />
        <AddNewState />
      </Space>
    </div>
  );

})

export default App;

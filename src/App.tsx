import React, { useState } from 'react';

import './App.less';
import LocationBrowser from './components/LocationBrowser';
import AddNewCountry from './components/AddNewCountry';
import AddNewState from './components/AddNewState';
import TestingComponents from './components/TestingComponents';
import { PageHeader, Menu } from 'antd';

import { observer } from 'mobx-react-lite'

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FlagOutlined,
  GlobalOutlined,
  WarningOutlined
} from '@ant-design/icons';

const { SubMenu } = Menu;



const App = observer(() => {

  const [collapsed, setCollapsed] = useState(false);


  const toggleCollapsed = (): void => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="App">
      <PageHeader
        className="site-page-header"
        title="CountryAPI"
        subTitle="Browse and submit countries and states"
        backIcon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onBack={toggleCollapsed}
      />

      <BrowserRouter>
        <div style={{ width: 256 }}>
          <Menu
            defaultSelectedKeys={['1']}
            mode="vertical"
            theme="light"
            inlineCollapsed={collapsed}
          >
            <Menu.Item key="1" icon={<GlobalOutlined />}>
              <Link to="/">
                <span>Location Browser</span>
              </Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<FlagOutlined />} title="Add new locations">
              <Menu.Item key="2">
                <Link to="/add/country">
                  <span>Countries</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/add/state">
                  <span>States</span>
                </Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="4" icon={<  WarningOutlined />}>
              <Link to="/testing">
                <span>Testing</span>
              </Link>
            </Menu.Item>
          </Menu>
        </div>



        <Routes>
          <Route path="/" element={<LocationBrowser />} />
          <Route path="add/country" element={<AddNewCountry />} />
          <Route path="add/state" element={<AddNewState />} />
          <Route path="testing" element={<TestingComponents />} />
        </Routes>
      </BrowserRouter>

    </div>
  );

})

export default App;

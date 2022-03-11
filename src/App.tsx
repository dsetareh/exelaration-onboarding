import React, { useState } from 'react';

import './App.less';
import LocationBrowser from './components/LocationBrowser';
import AddNewCountry from './components/AddNewCountry';
import AddNewState from './components/AddNewState';
import { Space, PageHeader, Menu } from 'antd';

import { observer } from 'mobx-react-lite'

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FlagOutlined,
  GlobalOutlined
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
        backIcon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
        onBack={toggleCollapsed}
      />


      <div style={{ width: 256 }}>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
        >
          <Menu.Item key="1" icon={<GlobalOutlined />}>
            Location Browser
          </Menu.Item>
          <SubMenu key="sub1" icon={<FlagOutlined />} title="Add new locations">
            <Menu.Item key="2">Countries</Menu.Item>
            <Menu.Item key="3">States</Menu.Item>
          </SubMenu>
        </Menu>
      </div>






      <Space direction="horizontal" wrap>
        <LocationBrowser />
        <AddNewCountry />
        <AddNewState />
      </Space>
    </div>
  );

})

export default App;

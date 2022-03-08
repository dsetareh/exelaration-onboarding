import React from 'react';
import {  Menu, Dropdown  } from 'antd';
import { DownOutlined } from '@ant-design/icons';

interface ILocationSelectProps {
    locationData: ILocation[];
    onLocationChange: Function;
    locationType: string;

    selectedLocation?: number;
}

interface ILocationSelectState {
    currentLocationName: string;
}

export class LocationSelect extends React.Component<ILocationSelectProps, ILocationSelectState> {
    constructor(props:ILocationSelectProps) {
        super(props);
        this.state = {
            currentLocationName: 'Select a ' + this.props.locationType
        };
    }

    handleChange = (value: any) => {
        this.props.onLocationChange(value.key);
        this.setState({ currentLocationName: value.key });
    }

    menu = (
        <Menu onClick={this.handleChange}>
            {this.props.locationData.map((location: ILocation) => {
                return (
                    <Menu.Item key={location.id} >
                        <a href="#">{location.id} | {location.code} | {location.name}</a>
                    </Menu.Item>
                );
            })}
        </Menu>
            )

    render() {
        return (
            <div>
                <Dropdown overlay={this.menu}>
                    <a className="ant-dropdown-link" href="#" onClick={e => e.preventDefault()}>
                        {this.state.currentLocationName} <DownOutlined />
                    </a>
                </Dropdown>

            </div>
        );
    }
}
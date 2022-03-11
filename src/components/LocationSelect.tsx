import React from 'react';
import { Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';
const { Option } = Select;

interface ILocationSelectProps {
    locationData: ILocation[];
    onLocationChange: Function;
    locationType: string;

    selectedLocation?: number;
}



export class LocationSelect extends React.Component<ILocationSelectProps, {}> {


    handleChange = (value: string) => {
        this.props.onLocationChange(value);
    }

    render() {
        return (
            <div>
                <Select defaultValue="0" onChange={this.handleChange}>
                    <Option value="0" key="0" disabled>Select a {this.props.locationType}</Option>
                    {this.props.locationData.map((location: ILocation) => {
                        return (
                            <Option value={location.id} key={location.id} >
                                {location.id} | {location.code} | {location.name}
                            </Option>
                        );
                    })}
                </Select>
            </div>
        );
    }
}
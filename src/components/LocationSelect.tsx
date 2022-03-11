import React from 'react';
import { Select } from 'antd';
import { ReloadOutlined } from '@ant-design/icons'

const { Option } = Select;


interface ILocationSelectProps {
    locationData: ILocation[];
    onLocationChange: Function;
    onRefreshRequest?: Function;
    locationType: string;

    selectedLocation?: number;
}


interface ILocationSelectState {
    spin: boolean;
}



export class LocationSelect extends React.Component<ILocationSelectProps, ILocationSelectState> {
    constructor(props: ILocationSelectProps) {
        super(props);
        this.state = {
            spin: false
        };
    }


    handleChange = (value: string) => {
        this.props.onLocationChange(value);
    }

    handleRefreshRequest = () => {
        if (this.props.onRefreshRequest) {
            this.props.onRefreshRequest();
            this.setState({spin: true});
            setTimeout(() => {
                this.setState({spin: false});
            }, 1000); // 1 second spin regardless of anything
        }
    }


    render() {
        return (
            <div>
                <Select defaultValue="0" onChange={this.handleChange}>
                    <Option value="0" key="0" disabled>Select a {this.props.locationType} </Option>
                    {this.props.locationData.map((location: ILocation) => {
                        return (
                            <Option value={location.id} key={location.id} >
                                {location.id} | {location.code} | {location.name}
                            </Option>
                        );
                    })}
                </Select>
                {
                    this.props.onRefreshRequest ? <ReloadOutlined spin={this.state.spin} onClick={this.handleRefreshRequest} /> : ''
                }
            </div>
        );
    }
}
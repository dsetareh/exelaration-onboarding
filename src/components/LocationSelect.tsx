import React from 'react';
import { DropDown } from './Dropdown';


interface ILocationSelectProps {
    locationData: ILocation[];
    onLocationChange: Function;
    locationType: string;

    selectedLocation?: number;
}

export class LocationSelect extends React.Component<ILocationSelectProps, {}> {

    render() {
        return (
            <div>
                <DropDown data={this.props.locationData} getValue={l => l.id} getName={l => l.name} onChange={this.props.onLocationChange} type={this.props.locationType} selected={this.props.selectedLocation} />
            </div>
        );
    }
}
import React from 'react';

interface ILocationSelectProps {
    locationData: ILocation[];
    onLocationChange: Function;
    locationType: string;

    selectedLocation?: number;
}

export class LocationSelect extends React.Component<ILocationSelectProps, {}> {
    handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.props.onLocationChange(event.target.value);
    }

    render() {
        return (
            <div>
               {
                    <select id='${this.props.locationType}List' defaultValue={0} onChange={this.handleChange} value={this.props.selectedLocation}>
                        <option disabled value={0}>Select a {this.props.locationType}</option>
                        {this.props.locationData.map(location => <option key={location.id} value={location.id}>{location.name}</option>)}
                    </select>
                }
            </div>
        );
    }
}
import React from 'react';
import { LocationSelect } from './LocationSelect';
import { Utils } from '../Utils';

interface ILocationBrowserProps {
    apiUrl: string;
    countryData: ICountry[];
}

interface ILocationBrowserState {
    selectedCountry: number;
    selectedState: number;
    stateData: IState[];
    
}

export class LocationBrowser extends React.Component<ILocationBrowserProps, ILocationBrowserState> {
    constructor(props:ILocationBrowserProps) {
        super(props);
        this.state = {
            selectedCountry: 0,
            selectedState: 0,
            stateData: []
        };
    }
    onCountryChange = async (id:number) => {
        this.setState({ selectedCountry: id });
        // get code
        let countryCode = this.props.countryData.find(c => c.id == id)?.code; //? === didnt work here?????
        // sanity check
        if (!countryCode) {
            console.log("No country code found for id: " + id);
            return;
        }
        // get states
        let response = await fetch(`${this.props.apiUrl}countries/${countryCode}/states`);
        let states: IState[] = await response.json();
        states.sort(Utils.compareLocation);
        this.setState({
            stateData: states,
            selectedState: 0 // reset selected state
        });
    }
    onStateChange = (id:number) => {
        this.setState({ selectedState: id });
    }
    render() {
        return (
            <div className="databox">
                <h4>Browse Countries and States:</h4>
                <LocationSelect onLocationChange={this.onCountryChange} locationData={this.props.countryData} locationType="country"  />
                {this.state.stateData.length === 0 ? '' : <LocationSelect onLocationChange={this.onStateChange} locationData={this.state.stateData} locationType="state"/>}
            </div>
        );
    }
}


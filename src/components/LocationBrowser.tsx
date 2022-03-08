import React from 'react';
import { Utils } from '../Utils';
import DropDown from './Dropdown';

interface ILocationBrowserProps {
    apiUrl: string;
    countryData: ICountry[];
}

interface ILocationBrowserState {
    selectedCountry: string;
    selectedState: number;
    stateData: IState[];
    
}

export class LocationBrowser extends React.Component<ILocationBrowserProps, ILocationBrowserState> {
    constructor(props:ILocationBrowserProps) {
        super(props);
        this.state = {
            selectedCountry: '',
            selectedState: 0,
            stateData: []
        };
    }
    onCountryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const countryCode = event.target.value;
        if (!countryCode) {
            console.log("No country code given");
            return;
        }
        // get states
        let response = await fetch(`${this.props.apiUrl}countries/${countryCode}/states`);
        let states: IState[] = await response.json();
        states.sort(Utils.compareLocation);
        this.setState({
            stateData: states,
            selectedCountry: countryCode,
            selectedState: 0 // reset selected state
        });
    }
    onStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ selectedState: parseInt(event.target.value) });
    }
    render() {
        return (
            <div className="databox">
                <h4>Browse Countries and States:</h4>
                {this.state.selectedCountry === '' ? <h5>Select a country: </h5> : <h5>Selected: {this.state.selectedCountry} </h5>}
                <DropDown onChange={this.onCountryChange} data={this.props.countryData} valueField="code" textField={(country: ILocation) => `${country.code}: ${country.name}`} style={{color: "red"}}/>
                {this.state.selectedCountry === '' ? '' : this.state.selectedState === 0 ? <h5>Select a state: </h5> : <h5>Selected: {this.state.selectedState} </h5>}
                {this.state.selectedCountry !== '' && <DropDown onChange={this.onStateChange} data={this.state.stateData} valueField="id" textField="name" />}
            </div>
        );
    }
}


import React from 'react';
import { StateSelect } from './StateSelect';
import { CountrySelect } from './CountrySelect';
import { Utils } from '../Utils';

interface ILocationBrowserProps {
    apiUrl: string;
    stateData: IState[];
    countryData: ICountry[];
}

interface ILocationBrowserState {
    selectedCountry: number;
    selectedState: number;
}

export class LocationBrowser extends React.Component<ILocationBrowserProps, ILocationBrowserState> {
    constructor(props:ILocationBrowserProps) {
        super(props);
        this.state = {
            selectedCountry: 0,
            selectedState: 0
        };
    }
    onCountryChange(id:number) {
        this.setState({ selectedCountry: id });
    }
    onStateChange(id:number) {
        this.setState({ selectedState: id });
    }
    render() {
        return (
            <div className="databox">
                <h4>Browse Countries and States:</h4>
                {this.state.selectedCountry === 0 ? <h5>Select a country: </h5> : <h5>Selected: {this.state.selectedCountry} </h5>}
                <CountrySelect onCountryChange={this.onCountryChange} countryData={this.props.countryData} />
                {this.state.selectedCountry === 0 ? '' : this.state.selectedState === 0 ? <h5>Select a state: </h5> : <h5>Selected: {this.state.selectedState} </h5>}
                {this.state.selectedCountry === 0 ? '' : <StateSelect onStateChange={this.onStateChange} stateData={this.props.stateData.filter((state) => state.countryId === this.state.selectedCountry)} />}
            </div>
        );
    }
}


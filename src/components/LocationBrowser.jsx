import React from 'react';
import PropTypes from 'prop-types';

import { StateSelect } from './StateSelect';
import { CountrySelect } from './CountrySelect';


export class LocationBrowser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCountry: 0,
            selectedState: 0
        };
        this.onCountryChange = this.onCountryChange.bind(this);
        this.onStateChange = this.onStateChange.bind(this);
    }
    onCountryChange(id) {
        this.setState({ selectedCountry: id });
    }
    onStateChange(id) {
        this.setState({ selectedState: id });
    }
    render() {
        return (
            <div className="databox">
                <h4>Browse Countries and States:</h4>
                {this.state.selectedCountry === 0 ? <h5>Select a country: </h5> : <h5>Selected: {this.state.selectedCountry} </h5>}

                <CountrySelect onCountryChange={this.onCountryChange} countryData={this.props.countryData} />

                {this.state.selectedCountry === 0 ? '' : this.state.selectedState === 0 ? <h5>Select a state: </h5> : <h5>Selected: {this.state.selectedState} </h5>}
                {this.state.selectedCountry === 0 ? '' : <StateSelect onStateChange={this.onStateChange} stateData={this.props.stateData.filter((state) => state.countryId === parseInt(this.state.selectedCountry))} />}
            </div>
        );
    }
}


LocationBrowser.propTypes = {
    countryData: PropTypes.array.isRequired,
    stateData: PropTypes.array.isRequired
};
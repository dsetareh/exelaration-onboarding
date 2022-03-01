import React from 'react';
import PropTypes from 'prop-types';

import { StateSelect } from './StateSelect';

export class CountrySelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedCountry: 0 };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ selectedCountry: event.target.value });
    }

    render() {
        return (
            <div>
                Selected Country: {this.props.countryData.find((country) => country.id == this.state.selectedCountry)?.name}<br />
                {
                    <select id="countryList" onChange={this.handleChange} value={this.state.selectedCountry}>
                        <option disabled selected="true" value="0">Select A Country</option>
                        {this.props.countryData.map(country => <option value={country.id}>{country.name}</option>)}
                    </select>
                }

                {this.state.selectedCountry == 0 ? '' :<StateSelect stateData={this.props.stateData.filter((state) => state.countryId == this.state.selectedCountry)} />}
            </div>
        );
    }
}


CountrySelect.propTypes = {
    countryData: PropTypes.array.isRequired
};
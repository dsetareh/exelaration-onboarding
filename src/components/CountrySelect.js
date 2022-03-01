import React from 'react';
import PropTypes from 'prop-types';

export class CountrySelect extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onCountryChange(event.target.value);
    }

    render() {
        return (
            <div>
                {
                    <select id="countryList" defaultValue={0} onChange={this.handleChange} value={this.props.selectedCountry}>
                        <option disabled value={0}>Select A Country</option>
                        {this.props.countryData.map(country => <option key={country.id} value={country.id}>{country.name}</option>)}
                    </select>
                }
            </div>
        );
    }
}


CountrySelect.propTypes = {
    countryData: PropTypes.array.isRequired,
    onCountryChange: PropTypes.func.isRequired
};
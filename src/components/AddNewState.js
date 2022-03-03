import React from 'react';
import PropTypes from 'prop-types';

import { CountrySelect } from './CountrySelect';

export class AddNewState extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            code: '',
            selectedCountry: 0
        };

        this.onCountryChange = this.onCountryChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onCountryChange(id) {
        this.setState({ selectedCountry: id });
    }
    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handleCodeChange(event) {
        this.setState({ code: event.target.value });
    }

    handleSubmit(event) {
        fetch(this.props.API_URL + 'states/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                code: this.state.code,
                countryId: this.state.selectedCountry
            })
        })
            .then(response => response.json())
        alert('A state was submitted: ' + this.state.name + ' ' + this.state.code + ' ' + this.state.selectedCountry);
        event.preventDefault(); //! prevents page reload
    }

    render() {
        return (
            <div className="databox">
                <h4>Add New State</h4>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <h5>Name:</h5>
                        <input type="text" value={this.state.name} onChange={this.handleNameChange} /><br />
                        <h5>Code:</h5>
                        <input type="text" value={this.state.code} onChange={this.handleCodeChange} /><br />
                    </label>
                    {this.state.selectedCountry === 0 ? <h5>Select a country: </h5> : <h5>Selected: {this.state.selectedCountry} </h5>}

                    <CountrySelect onCountryChange={this.onCountryChange} countryData={this.props.countryData} />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

AddNewState.propTypes = {
    countryData: PropTypes.array.isRequired,
    API_URL: PropTypes.string.isRequired
};
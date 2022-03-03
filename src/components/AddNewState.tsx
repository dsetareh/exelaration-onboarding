import React from 'react';
import { CountrySelect } from './CountrySelect';

interface IAddNewStateProps {
    countryData: ICountry[];
    apiUrl: string;
}

interface IAddNewStateState {
    name: string;
    code: string;
    selectedCountry: number;
}

export class AddNewState extends React.Component<IAddNewStateProps, IAddNewStateState> {
    constructor(props: IAddNewStateProps) {
        super(props);
        this.state = {
            name: '',
            code: '',
            selectedCountry: 0
        };
    }

    onCountryChange(id: number) {
        this.setState({ selectedCountry: id });
    }
    handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ name: event.target.value });
    }
    handleCodeChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ code: event.target.value });
    }
    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        fetch(this.props.apiUrl + 'states/', {
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

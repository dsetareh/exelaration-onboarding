import React from 'react';

interface ICountrySelectProps {
    countryData: ICountry[];
    onCountryChange: Function;
    selectedCountry?: number;
}

export class CountrySelect extends React.Component<ICountrySelectProps, {}> {
    handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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

import React from 'react';
import { Card } from 'antd';


interface IAddNewCountryProps {
    apiUrl: string;
}

interface IAddNewCountryState {
    name: string;
    code: string;
}

export class AddNewCountry extends React.Component<IAddNewCountryProps, IAddNewCountryState> {
    constructor(props: IAddNewCountryProps) {
        super(props);
        this.state = {
            name: '',
            code: ''
        };
    }
    handleNameChange = (event:React.ChangeEvent<HTMLInputElement>)  => {
        this.setState({ name: event.target.value });
    }
    handleCodeChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
        this.setState({ code: event.target.value });
    }
    handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        fetch(this.props.apiUrl + 'countries/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                code: this.state.code,
            })
        })
            .then(response => response.json())
            .then(data => {
                //! push new country up to parent here eventually
            })
        alert('A country was submitted: ' + this.state.name + ' ' + this.state.code);
        event.preventDefault(); //! prevents page reload
    }

    render() {
        return (
            <Card className="databox" title="Add New Country">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <h5>Country Name:</h5>
                        <input type="text" value={this.state.name} onChange={this.handleNameChange} /><br />
                        <h5>Country Code:</h5>
                        <input type="text" value={this.state.code} onChange={this.handleCodeChange} /><br />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </Card>
        );
    }
}
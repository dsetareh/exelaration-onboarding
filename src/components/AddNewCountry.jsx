import React from 'react';
import PropTypes from 'prop-types';


export class AddNewCountry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            code: ''
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handleCodeChange(event) {
        this.setState({ code: event.target.value });
    }

    handleSubmit(event) {
        fetch(this.props.API_URL + 'countries/', {
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
            <div className="databox">
                <h4>Add New Country</h4>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <h5>Country Name:</h5>
                        <input type="text" value={this.state.name} onChange={this.handleNameChange} /><br />
                        <h5>Country Code:</h5>
                        <input type="text" value={this.state.code} onChange={this.handleCodeChange} /><br />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

AddNewCountry.propTypes = {
    API_URL: PropTypes.string.isRequired
};
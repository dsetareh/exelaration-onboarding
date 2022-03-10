import React from 'react';
import { LocationSelect } from './LocationSelect';
import { Card, Form, Input, Button } from 'antd';
import { CountryStore } from '../stores/CountryStore';

interface IAddNewStateProps {
    countryStore: CountryStore;
    apiUrl: string;
}

interface IAddNewStateState {
    name: string;
    code: string;
    selectedCountry: number;
    validStateName: boolean;
    validStateCode: boolean;
}

export class AddNewState extends React.Component<IAddNewStateProps, IAddNewStateState> {
    constructor(props: IAddNewStateProps) {
        super(props);
        this.state = {
            name: '',
            code: '',
            selectedCountry: 0,
            validStateName: false,
            validStateCode: false
        };
    }

    onCountryChange = (id: number) => {
        this.setState({ selectedCountry: id });
    }
    handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ name: event.target.value });
    }
    handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ code: event.target.value });
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        //! handle validation here?
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
            <Card className="databox" title="Add New State">
                <Form onFinish={this.handleSubmit}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input a State Name!',
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Code"
                        name="code"
                        rules={[
                            {
                                required: true,
                                message: 'Please input a State Code!',
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Country">
                        <LocationSelect onLocationChange={this.onCountryChange} locationData={this.props.countryStore.allCountries} locationType="country" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>

                </Form>
            </Card>
        );
    }
}

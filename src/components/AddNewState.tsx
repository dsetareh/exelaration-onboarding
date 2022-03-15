import React, { useState } from 'react';
import { LocationSelect } from './LocationSelect';
import { Card, Form, Input, Button } from 'antd';

import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { configStore } from '../stores'

const AddNewState = observer(() => {

    const countryStore = useContext(configStore);

    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(0);

    const onCountryChange = (id: number) => {
        setSelectedCountry(id);
    }
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }
    const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCode(event.target.value);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        //! handle validation here?
        fetch(countryStore.apiUrl + 'states/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                code: code,
                countryId: selectedCountry
            })
        })
            .then(response => response.json())
        alert('A state was submitted: ' + name + ' ' + code + ' ' + selectedCountry);
        event.preventDefault(); //! prevents page reload
    }

    return (
        <Card className="databox" title="Add New State">
            <Form onFinish={handleSubmit}>
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input a State Name!',
                        },
                        {
                            pattern: /^[a-zA-Z\s]+$/,
                            message: 'State Name can only include letters and whitespace.',
                        }
                    ]}>
                    <Input onChange={handleNameChange} />
                </Form.Item>
                <Form.Item
                    label="Code"
                    name="code"
                    rules={[
                        {
                            required: true,
                            message: 'Please input a State Code!',
                        },
                        {
                            pattern: /^[a-zA-Z]+$/,
                            message: 'State Code can only include letters.',
                        },
                        {
                            pattern: /^[a-zA-Z]{2,3}$/,
                            message: 'State Code must be between two to three characters.',
                        }
                    ]}>
                    <Input onChange={handleCodeChange} />
                </Form.Item>
                <Form.Item
                    label="Country"
                    name="country"
                    rules={[
                        {
                            required: true,
                            message: 'Please select a Country!',
                        }
                    ]}>
                    <LocationSelect onRefreshRequest={countryStore.loadFromApi} onLocationChange={onCountryChange} locationData={countryStore.countries} locationType="country" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>

            </Form>
        </Card>
    );
});

export default AddNewState;

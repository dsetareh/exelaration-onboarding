import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button } from 'antd';

import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { configStore } from '../stores'


const AddNewCountry = observer(() => {

    const countryStore = useContext(configStore);

    const [name, setName] = useState('');
    const [code, setCode] = useState('');



    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }
    const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCode(event.target.value);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        fetch(countryStore.apiUrl + 'countries/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                code: code,
            })
        })
            .then(response => response.json())
            .then(data => {
                //! push new country up to parent here eventually
            })
        alert('A country was submitted: ' + name + ' ' + code);
        event.preventDefault(); //! prevents page reload
    }

    return (
        <Card className="databox" title="Add New Country">
            <Form onFinish={handleSubmit}>
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input a Country Name!',
                        },
                    ]}
                    >
                    <Input  onChange={handleNameChange}/>
                </Form.Item>
                <Form.Item
                    label="Code"
                    name="code"
                    rules={[
                        {
                            required: true,
                            message: 'Please input a Country Code!',
                        },
                    ]}>
                    <Input  onChange={handleCodeChange}/>
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

export default AddNewCountry;

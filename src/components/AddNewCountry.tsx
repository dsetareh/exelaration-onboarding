import React, { useState } from 'react';
import { Card, Form, Input, Button } from 'antd';

import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { configStore } from '../stores'



const AddNewCountry = observer(() => {

    const countryStore = useContext(configStore);

    const [name, setName] = useState('');
    const [code, setCode] = useState('');

    const isCodeUnique = (code: string) => {
        console.log(`Validate ${code}`);
        let codeIndex:number = countryStore.countries.findIndex(c => c.code === code);

        if (codeIndex === -1) {
            return Promise.resolve();
        }
        else {
            return Promise.reject(`${countryStore.countries[codeIndex].name} already uses that Country Code.`);
        }
    };



    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }
    const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCode(event.target.value);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        countryStore.addCountry({ name: name, code: code });
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
                        {
                            pattern: /^[a-zA-Z\s]+$/,
                            message: 'Country Name can only include letters and whitespace.',
                        }
                    ]}
                >
                    <Input onChange={handleNameChange} />
                </Form.Item>
                <Form.Item
                    label="Code"
                    name="code"
                    rules={[
                        {
                            required: true,
                            message: 'Please input a Country Code!',
                        },
                        {
                            pattern: /^[a-zA-Z]+$/,
                            message: 'Country Code can only include letters.',
                        },
                        {
                            pattern: /^[a-zA-Z0-9]{2,3}$/,
                            message: 'Country Code must be between two to three characters.',
                        },
                        () => ({
                            validator(_, value) {
                                return isCodeUnique(value);
                            },
                        }),
                    ]}>
                    <Input onChange={handleCodeChange} />
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

import React from 'react';
import { Collapse, Switch, Select, Button, Alert, Anchor, Card } from 'antd';

const { Panel } = Collapse;
const { Option } = Select;
const { Link } = Anchor;

const TestingComponents = () => {
    function onChange(checked: any) {
        console.log(`switch to ${checked}`);
    }
    function handleChange(value: any) {
        console.log(`selected ${value}`);
    }


    return (
        <Card className="databox" title="NavAPI UI Testing">
            <Collapse style={{ width: 400 }} accordion>
                <Panel header="Versions" key="1">
                    <Anchor>
                        <Link href="#1" title="1.0" />
                        <Link href="#2" title="2.0" />
                        <Link href="#3" title="3.0">
                            <Link href="#Anchor-Props" title="Anchor Props" />
                            <Link href="#Link-Props" title="Link Props" />
                        </Link>
                    </Anchor>
                </Panel>
                <Panel header="Validation" key="2">
                    <p><Select defaultValue="Select Workspace" style={{ width: 200 }} onChange={handleChange}>
                        <Option value="w1">Workspace 1</Option>
                        <Option value="w2">Workspace 2</Option>
                        <Option value="w3">Workspace 3</Option>
                    </Select>
                        <Button type="primary">Validate</Button></p>

                    <p>
                        <Alert message="Loan Summary Not Found!" type="error" showIcon closable />
                    </p>
                    <p>
                        <Alert message="Paid off loans Not Found!" type="error" showIcon closable />
                    </p>
                    <p>
                        <Alert message="New Report: Top 50 Depositors" type="info" showIcon />
                    </p>
                    <p>
                        <Alert message="New Report: Branch Overview" type="info" showIcon />
                    </p>

                </Panel>
                <Panel header="Publishing" key="3">
                    <p>Draft Publish
                        <Switch defaultChecked onChange={onChange} />
                    </p>
                </Panel>
            </Collapse>
        </Card>
    );
};

export default TestingComponents;
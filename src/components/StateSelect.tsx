import React from 'react';

interface IStateSelectProps {
    stateData: IState[];
    onStateChange: Function;
    selectedState?: number;
}



export class StateSelect extends React.Component<IStateSelectProps, {}> {

    handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.props.onStateChange(event.target.value);
    }

    render() {
        return (
            <div>
                {
                    <select id="stateList" defaultValue={0} onChange={this.handleChange} value={this.props.selectedState}>
                        <option disabled value={0}>Select A State</option>
                        {this.props.stateData.map(state => <option key={state.id} value={state.id}>{state.name}</option>)}
                    </select>
                }
            </div>
        );
    }
}
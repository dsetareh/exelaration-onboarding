import React from 'react';
import PropTypes from 'prop-types';
export class StateSelect extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
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


StateSelect.propTypes = {
    stateData: PropTypes.array.isRequired,
    onStateChange: PropTypes.func.isRequired
};
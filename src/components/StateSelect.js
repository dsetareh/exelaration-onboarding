import React from 'react';
import PropTypes from 'prop-types';
export class StateSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedState: '' };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ selectedState: event.target.value });
    }

    render() {
        return (
            <div>
                Selected State: {this.state.selectedState}<br/>
                {
                    <select id="stateList" onChange={this.handleChange} value={this.state.selectedState}>
                        <option disabled value="">Select A State</option>
                        {this.props.stateData.map(state => <option key={state.code}>{state.name}</option>)}
                    </select>
                }
            </div>
        );
    }
}


StateSelect.propTypes = {
    stateData: PropTypes.array.isRequired
};
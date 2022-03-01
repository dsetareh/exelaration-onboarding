import React from 'react';

export class CountrySelect extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: 'something'};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('submitted: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Country:
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="something">something</option>
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }
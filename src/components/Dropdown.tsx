import React from 'react';

interface IDropDownProps<T> {
    data: T[];
    getValue: (item: T) => string | number;
    getName: (item: T) => string;
    onChange: Function;
    type: string;

    selected?: any;
}

export class DropDown<T> extends React.Component<IDropDownProps<T>, {}> {
    handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.props.onChange(event.target.value);
    }

    render() {
        return (
            <div>
               {
                    <select id='${this.props.type}List' defaultValue={0} onChange={this.handleChange} value={this.props.selected}>
                        <option disabled value={0}>Select</option>
                        {this.props.data.map(datum => <option key={this.props.getValue(datum)} value={this.props.getValue(datum)}>{this.props.getName(datum)}</option>)}
                    </select>
                }
            </div>
        );
    }
}
import React from 'react';

interface IDropDownProps extends React.HtmlHTMLAttributes<HTMLSelectElement> {
    data: any[]; // raw array of data

    valueField: string | ((item: any) => string | number);
    textField: string | ((item: any) => string);

    // getValue: (item: T) => string | number; // get value from data to use as value in dropdown
    // getName: (item: T) => string; // get name from data to use as name in dropdown

    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void; // callback function to call when dropdown is changed

    // type: string; // type of data for css purposes

    selected?: string | number; // selected value
}


export default function DropDown(props: IDropDownProps) {
    const {data, valueField, textField, onChange, selected, ...restProps} = props;

    function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        if (onChange) 
            onChange(event);
    }

    function getValue(item: any) {
        if (typeof(valueField) === 'string') {
            return item[valueField];
        } else {
            return valueField(item);
        }
    }

    function getText(item: any) {
        console.log(textField);
        if (typeof(textField) === 'string') {
            return item[textField];
        } else {
            return textField(item);
        }
    }


    return (
        <div>
            {
                <select defaultValue={0} onChange={handleChange} value={selected} {...restProps}>
                    <option disabled value={0}>Select</option>
                    {data.map(datum => <option key={getValue(datum)} value={getValue(datum)}>{getText(datum)}</option>)}
                </select>
            }
        </div>
    );
}
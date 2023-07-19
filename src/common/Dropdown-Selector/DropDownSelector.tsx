import React, { useState } from 'react'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import './DropdownSelector.css';
const DropDownSelector = (props: any) => {
    
    const [dropdownValue, setDropdownValue] = useState('');

    const selectChangeHandler = (event: SelectChangeEvent) => {
        setDropdownValue(event.target.value);
        console.log(event.target.value)
    };

    return (
        <FormControl className={`mb-3 ${props.className || ''}`} variant="standard">
            <InputLabel id={props.dropdownId}>{props.label}</InputLabel>
            <Select
                className='select-dropdown'
                labelId={props.dropdownId}
                value={dropdownValue}
                onChange={selectChangeHandler}
                label={props.label}
            >
                {
                    props.dropdownValues.map((dropdownItem:any, i: number) => <MenuItem className='dropdown-item mb-1' value={dropdownItem} key={i + Math.random()}>{dropdownItem}</MenuItem>)
                }
            </Select>
        </FormControl>
    );
}

export default DropDownSelector
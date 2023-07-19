import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DateSelector(props:any) {

    function onChangeHandler(date:any) {
        props.onChange(date);
        // console.log(date);
    }

    return (
      <LocalizationProvider  dateAdapter={AdapterDayjs}>
        <DatePicker className={props.className || ''} label={props.text}
          value={props.value}
          onChange={onChangeHandler}
          renderInput={(params) => <TextField {...params} />}
        />
        
      </LocalizationProvider>
    );

}
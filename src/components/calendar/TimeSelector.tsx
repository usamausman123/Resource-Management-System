import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export const TimeSelector = (props:any) => {
    const [value, setValue] = React.useState<Date | null>(null);

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                    className={props.className || ''}
                    label={props.label}
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
                        console.log(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </>
    );

}



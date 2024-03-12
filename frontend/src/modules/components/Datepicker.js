import * as React from 'react';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {useState} from "react";

export default function BasicDatePicker({onChange}) {
    const [value, setValue] = useState(null);

    const handleChange = (newValue) => {
        setValue(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                <DatePicker
                    fullWidth
                    label="Date"
                    value={value}
                    onChange={handleChange}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}
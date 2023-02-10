import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterJalali from '@date-io/date-fns-jalali';
import { DatePicker  } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function JalaliDatePicker({date , setDate}) {

  return (
    <LocalizationProvider  dateAdapter={AdapterJalali} >
      <DatePicker
        className='bg-white'
        mask="____/__/__"
        value={date}
        onChange={(newValue) => setDate(newValue)}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
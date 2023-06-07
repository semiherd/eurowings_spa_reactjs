import React,{useState,useEffect} from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {useSearchState,useSearchDispatch} from '../../context/SearchContext';
import dayjs from 'dayjs';

export default function RangePicker({label}) {
	const [value, setValue] = useState(new Date());
	const searchState= useSearchState()
	const searchDispatch= useSearchDispatch()

	async function dateSelected(val) {
		try{
			const value= new Date(val);
			const dateFormatted= dayjs(value).format('YYYY-MM-DD')
			const type= label.toLowerCase();
			const item={
				...searchState.date,
				[type]: dateFormatted
			}
			await searchDispatch({
				type: 'pickDate',
				data: item
			})
		}catch(e){
			searchDispatch({
				type: 'createInfo',
				data: {
					state:true,
					message:'Date can not be selected, please try again'
				}
			})
		}
	}

	useEffect(() => {
		dateSelected(value)
	},[value])

	return (
		<div className="date">
			<LocalizationProvider dateAdapter={AdapterDateFns}>
			<DatePicker
				views={["day"]}
				label={label}
				disablePast
				value={value}
				onChange={(newValue) => setValue(newValue)}
				inputFormat="DD-MM-YYYY"
				//renderInput={(params) => <TextField {...params} helperText={null} />}
			/>
			</LocalizationProvider>
		</div>
	);
}
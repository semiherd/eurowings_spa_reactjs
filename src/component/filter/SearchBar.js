import React from 'react';
import TextField from "@mui/material/TextField";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import {useSearchState,useSearchDispatch} from '../../context/SearchContext';

const SearchBar = ({label,searchQuery,setSearchQuery}) => {
	const searchState= useSearchState();
	const searchDispatch= useSearchDispatch();

	async function handleChange(param){
		try{
			setSearchQuery(param)
			// check if the component has the label of to or from
			// and it has a different value from the param of the function
			// in order not to dispatch object while it has the same value
			if(param!= searchState[label]?.value){
				await searchDispatch({
					type: label,
					data: param
				})
			}
		}catch(e){
			console.log(e)
		}
	}

	return (
		<form>
			<div>
				{label=='to' && <FlightLandIcon style={{ fill: "#A90650" }} />}
				{label=='from' && <FlightTakeoffIcon style={{ fill: "#A90650" }} />}	
			</div>	
			<TextField
				className="searchbar"
				value={searchState[label]?.airportCode || searchQuery}
				onInput={(e) => handleChange(e.target.value)}
				label={label}
				variant="outlined"
				placeholder="Search..."
				size="medium"
			/>
			
		</form>									
	)
}
export default SearchBar;
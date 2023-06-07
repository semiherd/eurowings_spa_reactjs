import React, {useEffect} from 'react';
import InputField from '../filter/InputField'
import {useSearchState,useSearchDispatch} from '../../context/SearchContext';
import fetchDestination from '../../function/FetchDestination';
import RangePicker from '../filter/RangePicker';
import '../../style/App.css';


function InputForm({handleSearch}) {
	const searchState= useSearchState();
	const searchDispatch= useSearchDispatch();
	
	async function updateContext(param){
		try{
			await searchDispatch({
				type: param.type,
				data: param.data
			})
		}catch(e){
			console.log(e)
		}
	}

	useEffect(() => {
		if(searchState?.from?.length>2) {
			fetchDestination(searchState.from).then(async (response) => {
				if(response==null) {
					searchDispatch({
						type: 'createInfo',
						data: {
							state:true,
							message:'No Airport can be found'
						}
					})
				}else updateContext({type:'fetchDepartureAirport',data:response})
			})
		}else {
			searchDispatch({
				type: 'createInfo',
				data: {
					state:false,
					message:null
				}
			})
		}
	},[searchState.from])

	useEffect(() => {
		if(searchState?.to?.length>2) {
			fetchDestination(searchState.to).then(async (response) => {
				if(response==null){
					searchDispatch({
						type: 'createInfo',
						data: {
							state:true,
							message:'No Airport can be found'
						}
					})
				}else updateContext({type:'fetchArrivalAirport',data:response})
			}
			)
		}else {
			searchDispatch({
				type: 'createInfo',
				data: {
					state:false,
					message:null
				}
			})
		}
	},[searchState.to])

	return (
		<div>    	
			<h2>Flight</h2> 			
			<div data-testid="inputDiv" className="input-container"> 
				<InputField data-testid="fromInput" label="from" />
				<InputField data-testid="toInput" label="to" />
			
				<RangePicker data-testid="departDatePicker" label="Departure" />
				<RangePicker data-testid="returnDatePicker" label="Return" />
			</div>			
			<button data-testid="searchButton" onClick={() => handleSearch()} className="buttonsearch">Search</button>
		</div>
	);
}

export default InputForm;

import React, {useEffect} from 'react';
import InputField from '../filter/InputField'
import {useSearchState,useSearchDispatch} from '../../context/SearchContext';
import fetchDestination from '../../function/FetchDestination';
import RangePicker from '../filter/RangePicker';
import '../../style/App.css';

function InputForm({handleSearch,setProgress}) {
	const searchState= useSearchState();
	const searchDispatch= useSearchDispatch();
	const falseInfoObj= {state: false, message:null}

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
	
	async function handleDestinationCall(type,contextType){
		try{
			setProgress(true)
			await fetchDestination(searchState[type]).then(async (response) => {
				let payload= {}
				if(response==null) 
					payload= {state: true, message: 'No Airport can be found'}
				else payload= response
				await updateContext({type:contextType,data:payload})
			})
		}catch(e){
			console.log(e)
		}
		finally{
			setProgress(false)
		}
	}
	useEffect(() => {
		if(searchState?.from?.length>2) handleDestinationCall('from','fetchDepartureAirport')
		else updateContext({type:'createInfo',data: falseInfoObj})
	},[searchState.from])

	useEffect(() => {
		if(searchState?.to?.length>2) handleDestinationCall('to','fetchArrivalAirport')
		else updateContext({type:'createInfo',data: falseInfoObj})
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

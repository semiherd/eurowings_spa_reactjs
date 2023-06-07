import React, {useState} from 'react';
import '../../style/App.css';
import {useSearchState,useSearchDispatch} from '../../context/SearchContext';
import List from '../flight/List';
import InputForm from './InputForm';
import NoResponse from './NoResponse';
import fetchFlight from '../../function/FetchFlight';

function Body() {
	const searchState= useSearchState();
	const searchDispatch= useSearchDispatch();
	const [progress,setProgress]=useState()
	const [noResponse,setNoResponse]= useState({state:false,message:null})

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

	async function fetchResult(){	
		try{
			setProgress(true)
			await updateContext({
				type: 'updateFlight',
				data: null
			})
			const param={
				from: searchState.from.airportCode,
				to: searchState.to.airportCode,
				departureDate: searchState.date.departure,
				returnDate: searchState.date.return
			}
			const response= await fetchFlight(param)
			console.log('fetchFlight response:',response)
			if(response!=null){
				setNoResponse({state:false,message:null})
				await updateContext({
					type: 'updateFlight',
					data: response
				})
			}else setNoResponse({state:true,message:'No Flights Found'})
		}catch(e){
			setProgress(false)
		}
		finally{
			setProgress(false)
		}
	}

	return (   	
		<div className="search">
			<InputForm progress={progress} noResponse={noResponse} handleSearch={fetchResult} />
			<NoResponse progress={progress} noResponse={noResponse} />
			{searchState.to && searchState.from && searchState?.flight?.length>0 && 
				<div className="flight-list"><List /></div>
			}				
		</div>

	);
}

export default Body;

import React, { useState,useEffect } from 'react';
import {useSearchState} from '../../context/SearchContext';
import '../../style/App.css';
import Option from './Option';
import SearchBar from './SearchBar';

const InputField= ({label}) => {
	const searchState= useSearchState();
	const [searchQuery, setSearchQuery] = useState('');
	const [optionVisible, setOptionVisible] = useState(false);
	const[data,setData]=useState(null)
	
	// update data to be displayed on div.option 
	// depending on its label of to or from
	useEffect(() => {
		if(label=='from') setData(searchState?.departureAirport);
		if(label=='to') setData(searchState?.arrivalAirport);
	},[searchQuery,searchState?.departureAirport,searchState?.arrivalAirport])
	
	useEffect(() => {
		if(searchQuery==undefined || searchQuery==null || searchQuery==''){
		 	setOptionVisible(false)
		}else setOptionVisible(true)
	},[searchQuery])
	
	return (
		<div className="inputField">
      		<SearchBar 
				label={label} 
				searchQuery={searchQuery} 
				setSearchQuery={setSearchQuery} 
			/>    		
			{optionVisible && searchQuery && data?.map((option) => (
				<div className="option" key={option.airportCode}>
					<Option setOptionVisible={setOptionVisible} type={label} item={option} />
				</div>
			))}
			
     	</div>
	)
}
export default InputField
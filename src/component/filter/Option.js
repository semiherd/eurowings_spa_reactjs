import React from 'react';
import {useSearchDispatch} from '../../context/SearchContext';

const Option= ({setOptionVisible,type,item}) => {
	const searchDispatch= useSearchDispatch();
	
	async function optionSelected() {
		try{
			setOptionVisible(false)

			await searchDispatch({
				type: type,
				data: item
			})
		}catch(e){ 
			searchDispatch({
				type: 'createInfo',
				data: {
					state:true,
					message:'No Options can be found'
				}
			})
		}
	}
	return (
		<div className="option">
			<p onClick={() => optionSelected(item)}>{item.airportCode}, {item.value} - {item.countryCode}</p>
		</div>
	)
}
export default Option;
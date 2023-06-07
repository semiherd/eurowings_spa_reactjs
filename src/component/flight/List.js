import React from 'react';
import {useSearchState} from '../../context/SearchContext';
import '../../style/App.css';
import Flight from './Flight';

const List= () => {
	const searchState= useSearchState();
	
	return (
		<>	
			<div className="list-container">
				{searchState?.flight?.map((option,index) => (
					<div className="flight-option" key={index.toString()}>
						<Flight item={option} />
					</div>
				))}
			</div>
		</>
	)
}
export default List
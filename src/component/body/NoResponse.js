import React from 'react';
import '../../style/App.css';
import {useSearchState} from '../../context/SearchContext';
import LinearProgress from '@mui/joy/LinearProgress';
import Info from '../body/Warning';

function NoResponse({progress,noResponse}) {
	const searchState= useSearchState();

	return (
		<div>  
			<div className="no-response">
				{noResponse.state && <h3>{noResponse.message}</h3>}
				{progress && <LinearProgress color="primary" />}
			</div>
			{searchState?.to && searchState?.from && !noResponse.state && !progress && searchState?.flight?.length && <h4>{searchState?.flight?.length>1? searchState?.flight?.length+' flights found':searchState?.flight?.length+' flight found'}</h4>}
			{searchState?.info?.state && <Info message={searchState.info.message} />}			
		</div>
	);
}

export default NoResponse;

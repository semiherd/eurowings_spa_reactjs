import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const Info= ({message}) => {
	return (
		<div>
			<Alert severity="info">
				<AlertTitle>Info</AlertTitle>
				{message}
			</Alert>
		</div>
	)
}
export default Info;
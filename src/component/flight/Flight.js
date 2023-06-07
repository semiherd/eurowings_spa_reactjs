import React from 'react';
import dayjs from 'dayjs';

const Option= ({item}) => {
	const {
		origin,destination,
		departureDate,returnDate,
		seatAvailability,price,
		uuid}= item;
	
	const departFlight= dayjs(departureDate).format('DD-MM-YYYY')
	const returnFlight= dayjs(returnDate).format('DD-MM-YYYY')
	return (
		<div className="flight">		
			<div className="flight-box">
				<p>Price</p>		
				<p>€{price.amount}</p>
			</div>
			<div className="flight-box">
				<p>{origin}-{destination}</p>
				<p>{departFlight}</p>
			</div>
			<div className="flight-box">
				<p>{destination}-{origin}</p>
				<p>{returnFlight}</p>
			</div>
			<div className="flight-box">
				<p>Availability</p>
				<p>{seatAvailability}</p>			
			</div>
			
		</div>
	)
}
export default Option;
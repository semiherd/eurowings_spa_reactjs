import ApiHeader from './ApiHeader';
import axios from 'axios';
import flightmockedData from '../__mock__/FlightApi';

async function fetchFlight(param){
	try{
		const baseUrl= 'https://api.lufthansa.com/v1/promotions/priceoffers/flights/ond'
		const {from,to,departureDate,returnDate}=param;
		return axios
			.get(
				baseUrl+'/{'+from+'}/{'+to+'}?departureDate='+departureDate+'&returnDate='+returnDate,
				{headers: ApiHeader}
			)
			.then(async response => {
				console.log('response api:',response)
				const data= response?.data?.ScheduleResource?.Schedule;
				return data;
			})
			.catch(error => {
				const mockedResponse= [flightmockedData]
				return mockedResponse;
			});
	}catch(e){
		//const mockedResponse= [flightmockedData]
		//return mockedResponse;
		return null;
	}
}	
export default fetchFlight;

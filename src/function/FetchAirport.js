import ApiHeader from './ApiHeader';
import axios from 'axios';

async function fetchAirport(param){
	try{			
		return axios
			.get(
				'https://api.lufthansa.com/v1/mds-references/airports/'+param+'?lang=en&limit=10&offset=0&&LHoperated=1',
				{headers: ApiHeader}
			)
			.then(async response => {
				if(response.data){
					const data= response.data.AirportResource.Airports.Airport
					const obj= {
						airportCode: data.AirportCode,
						cityCode: data.CityCode,
						countryCode: data.CountryCode,
					}
					return obj;			
				}
			})
			.catch(async (error) => {
				console.error(error);
			});
		
	}catch(e){
		console.log('fetchAirport error:',e)
		return null
	}	
}
export default fetchAirport;
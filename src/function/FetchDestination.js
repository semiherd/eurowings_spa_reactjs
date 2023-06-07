import apiHeader from './apiHeader';
import fetchAirport from './FetchAirport';
import axios from 'axios';

async function fetchDestination(param){
	try{
		const response= await axios
			.get(
				'https://api.lufthansa.com/v1/mds-references/cities/'+param+'?lang=en&limit=5&offset=0',
				{headers: apiHeader}
			)
			.then(async response => {
				const city= response.data.CityResource.Cities.City;
				const { CityCode,Names,Airports}= city
				
				let data= {
					value: Names.Name.$,
					code: CityCode
				}
				const airportList= await Promise.all(Airports.AirportCode
					.map( async (airport) => {
						const response= await fetchAirport(airport,axios)
						return response
					}))
				const filteredNull= airportList.reduce((acc,i) =>{
					if(i!=null) {
						acc.push({
							...i,
							value: data.value
						})
					}
					return acc;
				},[])
				return filteredNull;
			})
			.catch(async (error) => {
				console.log('fetchDestination error:',error)
				return null;
			});
		return response
	}catch(e){
		console.log(e)
	}
}
export default fetchDestination;
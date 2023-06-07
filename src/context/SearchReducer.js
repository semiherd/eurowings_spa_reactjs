export const searchReducer = (prevState, action) => {
   switch (action.type) {  
      case 'from':    
         return {
            ...prevState,          
            from: action.data,
      }
      case 'to':    
         return {
            ...prevState,          
            to: action.data,
      }
      case 'updateFlight':    
         return {
            ...prevState,          
            flight: action.data,
      }
      case 'fetchArrivalAirport':    
         return {
            ...prevState,          
            arrivalAirport: action.data,
      }
      case 'fetchDepartureAirport':    
         return {
            ...prevState,          
            departureAirport: action.data,
      }
      case 'pickDate':    
         return {
            ...prevState,          
            date: action.data,
      }
      case 'createInfo':    
         return {
            ...prevState,          
            info: action.data,
      }
      default:
         return prevState;
   }
};


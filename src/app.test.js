import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';
import InputForm from './component/body/InputForm';
import Body from './component/body/Body';
import Header from './component/header/Header';
import Footer from './component/footer/Footer';
import facebook from '../../asset/image/facebook.png';
import twitter from '../../asset/image/twitter.png';
import instagram from '../../asset/image/instagram.png';
import linkedin from '../../asset/image/linkedin.png';
import youtube from '../../asset/image/youtube.png';
import axios from 'axios';
import fetchDestination from './function/FetchDestination';
import citiesMockedData from './__mock__CitiesApi';
import flightMockedData from './__mock__FlightApi';

jest.mock('axios');

describe("Footer Component" ,() => {
  render(<Footer />); 
  const instagramImage = screen.getByTestId(instagram); 
  const twitterImage = screen.getByTestId(twitter); 
  const linkedinImage = screen.getByTestId(linkedin); 
  const facebookImage = screen.getByTestId(facebook); 
  const youtubeImage = screen.getByTestId(youtube); 
  
  test("Facebook Image Rendering", () => {
    expect(facebookImage).toBeInTheDocument(); 
  })
  test("Instagram Image Rendering", () => {
    expect(instagramImage).toBeInTheDocument(); 
  })
  test("Twitter Image Rendering", () => {
    expect(twitterImage).toBeInTheDocument(); 
  })
  test("LinkedIn Image Rendering", () => {
    expect(linkedinImage).toBeInTheDocument(); 
  })
  test("Youtube Image Rendering", () => {
    expect(youtubeImage).toBeInTheDocument(); 
  })
})

describe("Header Component" ,() => {
  render(<Header />); 
  const headerImg = screen.getByTestId("headerImg"); 
  test("Header Image Rendering", () => {
    expect(headerImg).toBeInTheDocument(); 
  })
})

describe("Body Component" ,() => {
  render(<Body />); 
  const button = screen.getByTestId("searchButton"); 
  const inputComp = screen.getByTestId("inputDiv"); 
  const inputTo = screen.getByTestId("fromInput"); 
  const inputFrom = screen.getByTestId("toInput"); 
  const departDatePicker = screen.getByTestId("departDatePicker"); 
  const returnDatePicker = screen.getByTestId("returnDatePicker"); 
    
  test("Input From Field Rendering", () => {
      expect(inputTo).toBeInTheDocument(); 
  })
  test("Input To Field Rendering", () => {
      expect(inputFrom).toBeInTheDocument(); 
  })
  test("DatePicker Departure Rendering", () => {
      expect(departDatePicker).toBeInTheDocument(); 
  })
  test("DatePicker Return Rendering", () => {
      expect(returnDatePicker).toBeInTheDocument(); 
  })
  test("Button Rendering", () => {
      expect(button).toBeInTheDocument(); 
  })
  test("Input Filter Component Rendering", () => {
      expect(inputComp).toBeInTheDocument(); 
  })
  test("Button Text", () => {
      expect(button).toHaveTextContent("Click Me!"); 
  })
})

describe("Search Button Click" ,() => {
  
  test("calls onclick function once", () => {
    const handleSearchClick= jest.fn();
    const {queryByTestId}= render(<InputForm handleSearch={handleSearchClick} />);
    const button= queryByTestId('searchButton');
    fireEvent.click(button);
    expect(handleSearchClick).toHaveBeenCalledTimes(1);
  })
  
})

describe('fetchData axios', () => {
  it('fetches airports successfully data from the API', async () => {
    const param = 'fra';
    const api='https://api.lufthansa.com/v1/mds-references/cities/'+param+'?lang=en&limit=5&offset=0';
    await axios.get.mockImplementationOnce(() => Promise.resolve(param));
    expect(axios.get).toHaveBeenCalledWith(api);
    expect(fetchDestination(param)).resolves.toEqual(citiesMockedData);
  });

  it('fetches flights successfully data from the API', async () => {
    const param = {
      from: 'FRA',
      to:'FCO',
      departureDate: '2017-01-13',
      returnDate: '2016-01-14'
    };
    
    const api='https://api.lufthansa.com/v1/promotions/priceoffers/flights/ond/'+'/{'+from+'}/{'+to+'}?departureDate='+departureDate+'&returnDate='+returnDate;
    await axios.get.mockImplementationOnce(() => Promise.resolve(param));
    expect(axios.get).toHaveBeenCalledWith(api);
    expect(fetchFlight(param)).resolves.toEqual(flightMockedData);
  });

  it('error on fetching data from the api', async () => {
    const errorMessage = 'Network Error';
    await axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );
  });
})
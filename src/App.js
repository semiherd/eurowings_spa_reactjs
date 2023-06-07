import React from 'react';
import './style/App.css';
import { SearchProvider } from './context/SearchContext';
import Body from './component/body/Body';
import Header from './component/header/Header';
import Footer from './component/footer/Footer';

function App() {
  return (
      <SearchProvider>
      <div className="App">    
          <header className="app-header"><Header  /></header>
          <Body className="app-body"/> 
          <footer className="app-footer" ><Footer /></footer>
      </div>
      </SearchProvider>
  );
}

export default App;

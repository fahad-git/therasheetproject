import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';

function App() {
  
  const profile_url = "https://www.unitex.com/wp-content/uploads/2018/04/Unitex-Nursing-Shortage-1.jpg"

  return (
        <BrowserRouter>
          <div>
            <Navbar />
              {/* <Header  userName="Sarah" accountType="Admin" profile_url = {profile_url} /> */}
            <Main />
          </div>
        </BrowserRouter>
  );
}

export default App;

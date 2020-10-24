import React, {useState} from 'react';
// import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';


function App() {
  
  var [headerComponent, setHeaderComponent] = useState(false);

  const profile_url = "https://www.unitex.com/wp-content/uploads/2018/04/Unitex-Nursing-Shortage-1.jpg"

  return (
        <BrowserRouter>
          <div>
            { headerComponent ?  <Navbar /> : <Header  userName="Sarah" accountType="Director" profile_url = {profile_url} />}
              {/* <Header  userName="Sarah" accountType="Admin" profile_url = {profile_url} /> */}
            <Main headerComponent={headerComponent}/>
          </div>
        </BrowserRouter>
  );
}

export default App;

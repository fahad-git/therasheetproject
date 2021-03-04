import React, {useState} from 'react';
// import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';

function App() {
  
  var [headerComponent, setHeaderComponent] = useState(false);



  var [userName, setAccountUsername] = useState("");
  var [accountType, setAccountType] = useState("");
  var [profileUrl, setAccountProfileUrl] = useState("");

  const userDetails = [setAccountUsername, setAccountType, setAccountProfileUrl];

  return (
        <BrowserRouter>
          <div>
            { headerComponent ?  <Navbar /> : <Header />}
              {/* <Header  userName="Sarah" accountType="Admin" profile_url = {profile_url} /> */}
            <Main setHeaderComponent={setHeaderComponent} userDetails= {userDetails}/>
          </div>
        </BrowserRouter>
  );
}

export default App;

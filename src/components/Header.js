import React, {useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import '../assets/bootstrap/css/bbootstrap.min.css';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/css/Header.css';

import logo from '../assets/img/therasheet_logo.png';

import {ADMIN_PASSWORD_MODAL_OPEN, ADMIN_PROFILE_INFO_MODAL_OPEN} from "../constants/modal";

import { DIRECTOR_PROFILE_INFO_MODAL_OPEN, DIRECTOR_PASSWORD_MODAL_OPEN } from "../constants/modal";

import { CLINICIAN_PROFILE_INFO_MODAL_OPEN, CLINICIAN_PASSWORD_MODAL_OPEN } from "../constants/modal";


function Header () {

    const history = useHistory();
    const dispatch = useDispatch();

    const [navLinkOpen, navLinkToggle] = useState(true);
    const [profileLinkOpen, profileLinkToggle] = useState(true);

    const settingNode = useRef();
    const settingButtonNode = useRef();
    const profileNode = useRef();
    const profileButtonNode = useRef();
    
    const { isClinicInfoOpen } = useSelector((state) => state.modalReducer);
    const { isPasswordChange } = useSelector((state) => state.modalReducer);
    const [accountType, setAccountType] = useState();
    const [accountProfileUrl, setAccountProfileUrl] = useState();
    const [userName, setUserName] = useState();

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if(user) {
            // console.log("From header");
            // console.log(user);
            setAccountType(user.accountType);
            if(user.file !== null){
                let profileURL = "data:" + user.file.type + ";base64," + user.file.data;
                setAccountProfileUrl(profileURL);
            }
            setUserName(user.name);
        }
    },[]);

    useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleClick);
        // return function to be called when unmounted
        return () => {
          document.removeEventListener("mousedown", handleClick);
        };
      }, []);

    const profileInfoHandler = () => {
        switch(accountType.toLowerCase()){
            case "admin": 
                dispatch({
                    type: ADMIN_PROFILE_INFO_MODAL_OPEN,
                    isAccountInfoOpen: true
                });
            break;

            case "director": 
                dispatch({
                    type: DIRECTOR_PROFILE_INFO_MODAL_OPEN,
                    isDirectorAccountInfoOpen: true
                    });
            break;

            case "clinician": 
                dispatch({
                    type: CLINICIAN_PROFILE_INFO_MODAL_OPEN,
                    isClinicianAccountInfoOpen: true
                });
            break;
        }
    }

    const changePasswordHandler = () => {
        switch(accountType.toLowerCase()){
            case "admin": 
                dispatch({
                    type: ADMIN_PASSWORD_MODAL_OPEN,
                    isPasswordChange: true
                });
            break;

            case "director": 
                dispatch({
                    type: DIRECTOR_PASSWORD_MODAL_OPEN,
                    isDirectorPasswordChange: true
                    });
            break;

            case "clinician":
                dispatch({
                    type: CLINICIAN_PASSWORD_MODAL_OPEN,
                    isClinicianPasswordChange: true
                });
            break;
        }


    }
    
    const logoutHandler = () =>{
        // alert("logout");
        localStorage.removeItem("user");
        // dispatch({
        //     type: "LOGOUT"
        // });
        history.push('/home');
    }

    const handleProfileLinkToggle = () => {
        profileLinkToggle(!profileLinkOpen);
        navLinkToggle(true);
    }

    const handleNavLinkToggle = () => {
        navLinkToggle(!navLinkOpen);
        profileLinkToggle(true);
    }

    const renderClasses = () => {
        let classes = 'headernavlink';

        if(navLinkOpen){
            classes += ' headeractive';
        }

        return classes;
    }

    const renderProfileClasses = () => {
        let classes = 'headerprofilelink';

        if(profileLinkOpen){
            classes += ' headerprofileactive';
        }
        return classes;
    }

    const handleClick = e => {
        if(settingButtonNode.current.contains(e.target)){
            // inside click
            return;
        }
        else if(profileButtonNode.current.contains(e.target)){
            // inside click
            return;
        }
        else if (settingNode.current.contains(e.target)) {
          // inside click
          return;
        }
        else if (profileNode.current.contains(e.target)) {
            // inside click
            return;
          }
        // outside click 
        // ... do whatever on click outside here ...
        profileLinkToggle(true);
        navLinkToggle(true);
       
      };

    return (
        <nav className="navigation_class gradient">

            {/* this is profile avatar */}
            <div onClick={handleProfileLinkToggle} className="header-profile-toggle" ref={profileButtonNode}>
            <i ><img className="rounded-circle img-fluid border d-md-flex justify-content-md-center align-items-md-center" style={{width:"20px", height:"20px"}} src = {accountProfileUrl}></img></i>
            </div>

            <ul className={renderProfileClasses()} ref={profileNode}>
                <li className="profilelink">
                    <label  className="text-center d-lg-flex  justify-content-center justify-content-lg-center">{accountType}</label>    
                </li>
                <hr/>
                <li className="profilelink" style={{padding: "20px 20px"}}>
                    <img  className="rounded-circle img-fluid border d-md-flex justify-content-md-center align-items-md-center" src = { accountProfileUrl }></img>
                </li>

                <li className="profilelink">
                    <label  className="text-center text-white d-lg-flex  justify-content-center justify-content-lg-center" style={{fontSize: "20px"}}>{userName}</label>    
                </li>

            </ul>

            <div className="headerlogo">
                <i><img src={logo} style={{width:"50px", height:"50px"}} /></i>
                <h3>Therasheet</h3>
            </div>

            {/* This is profile controls */}

            <ul className={renderClasses()} ref={settingNode}>
                <li className="headerlink settings">
                    <div> 
                        Settings                         
                    </div>  
                    <hr/> 
                </li>
                <li className="headerlink"><a className="ainheader" href={"#"} onClick={profileInfoHandler} >Profile Info</a></li>
                <li className="headerlink"><a className="ainheader" href={"#"} onClick={changePasswordHandler} >Change Password</a></li>
                <li className="headerlink"><a className="ainheader" href={"#"} onClick={logoutHandler} >Logout</a></li>

                <li className="headerlink hide"><a className="ainheader" href={"#"} ></a></li>
                <li className="headerlink hide"><a className="ainheader" href={"#"} ></a></li>
                <li className="headerlink hide"><a className="ainheader" href={"#"} ></a></li>
                <li className="headerlink hide"><a className="ainheader" href={"#"} ></a></li>
                <li className="headerlink hide"><a className="ainheader" href={"#"} ></a></li>
            </ul>
            <div onClick={handleNavLinkToggle} className="header-hamburger-toggle" ref={settingButtonNode}>
                <i className="fas fa-bars fa-lg"></i>
            </div>

        </nav>
    )
}

export default Header;
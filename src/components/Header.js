import React, {useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import '../assets/bootstrap/css/bbootstrap.min.css';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/css/Header.css';

import logo from '../assets/img/btnimg.png';


function Header (props) {

    const history = useHistory();

    const [navLinkOpen, navLinkToggle] = useState(true);
    const [profileLinkOpen, profileLinkToggle] = useState(true);

    const settingNode = useRef();
    const settingButtonNode = useRef();
    const profileNode = useRef();
    const profileButtonNode = useRef();

    // username and account type will be passed to this component.
    var [userName, setUsername] = useState(props.userName);
    var [accountType, setType] = useState(props.accountType);
    var [profileUrl, setProfileUrl] = useState(props.profile_url);


    // const profileUrl = "https://www.unitex.com/wp-content/uploads/2018/04/Unitex-Nursing-Shortage-1.jpg";
    
    const profileInfoHandler = () => {
        alert("working");
    }
    const changePasswordHandler = () => {
        alert("working");
    }
    const logoutHandler = () =>{
        // alert("logout");
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

    useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleClick);
        // return function to be called when unmounted
        return () => {
          document.removeEventListener("mousedown", handleClick);
        };
      }, []);

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
            <i ><img className="rounded-circle img-fluid border d-md-flex justify-content-md-center align-items-md-center" style={{width:"20px", height:"20px"}} src = {profileUrl}></img></i>
            </div>

            <ul className={renderProfileClasses()} ref={profileNode}>
                <li className="profilelink">
                    <label  className="text-center d-lg-flex  justify-content-center justify-content-lg-center">{accountType}</label>    
                </li>
                <hr/>
                <li className="profilelink" style={{padding: "20px 20px"}}>
                    <img  className="rounded-circle img-fluid border d-md-flex justify-content-md-center align-items-md-center" src = { profileUrl }></img>
                </li>

                <li className="profilelink">
                    <label  className="text-center text-white d-lg-flex  justify-content-center justify-content-lg-center" style={{fontSize: "20px"}}>{userName}</label>    
                </li>

            </ul>

            <div className="headerlogo">
                <i><img src={logo} /></i>
                <h4>Therasheet</h4>
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
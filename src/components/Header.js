import React, {useState} from 'react';

import '../assets/bootstrap/css/bbootstrap.min.css';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/css/Header.css';

import logo from '../assets/img/btnimg.png';


function Header (props) {

    const [navLinkOpen, navLinkToggle] = useState(true);
    const [profileLinkOpen, profileLinkToggle] = useState(true);

    // username and account type will be passed to this component.
    var [userName, setUsername] = useState(props.userName);
    var [accountType, setType] = useState(props.accountType);
    var [profileUrl, setProfileUrl] = useState(props.profile_url);


    // const profileUrl = "https://www.unitex.com/wp-content/uploads/2018/04/Unitex-Nursing-Shortage-1.jpg";

    const settinghandler = () => {
        let settings = document.getElementById('settings');

        if(settings.value === 'AccountInfo'){
            this.setState({"accountInfoPopup":true, "params":[this.state.username, this.state.clinicianName]});
        }
        else if (settings.value === 'Logout')
            this.logout()
        else if (settings.value === 'ChangePassword'){
            this.setState({"changepasswordpopup":true, "params":[this.state.username]});
        }

        settings.selectedIndex = 0;
    }
    
    const homeHandler = () => {
        alert("working")
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

    return (
        <nav className="navigation_class gradient">

            {/* this is profile avatar */}
            <div onClick={handleProfileLinkToggle} className="header-profile-toggle">
            <i ><img className="rounded-circle img-fluid border d-md-flex justify-content-md-center align-items-md-center" style={{width:"20px", height:"20px"}} src = {profileUrl}></img></i>
            </div>

            <ul className={renderProfileClasses()}>
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

            <ul className={renderClasses()}>
                <li className="headerlink settings">
                    <div> 
                        Settings 
                        
                    </div>  
                    <hr/> 
                </li>
                <li className="headerlink"><a className="ainheader" href={"#"} onClick={homeHandler} >Profile Info</a></li>
                <li className="headerlink"><a className="ainheader" href={"#"} >Change Password</a></li>
                <li className="headerlink"><a className="ainheader" href={"#"} >Logout</a></li>
                <li className="headerlink hide"><a className="ainheader" href={"#"} ></a></li>
            </ul>
            <div onClick={handleNavLinkToggle} className="header-hamburger-toggle">
                <i className="fas fa-bars fa-lg"></i>
            </div>

        </nav>
    )
}

export default Header;
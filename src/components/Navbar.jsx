import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import '../assets/css/Navbar.css';


import logo from '../assets/img/therasheet_logo.png';

const Navbar = () => {

    const [navLinkOpen, navLinkToggle] = useState(true);
    const history = useHistory();

    const handleNavLinkToggle = () => {
        navLinkToggle(!navLinkOpen);
    }

    const renderClasses = () => {
        let classes = 'navlink';

        if(navLinkOpen){
            classes += ' active';
        }

        return classes;
    }

    return <nav className="navclass">
                <div className="navlogo">
                    <i><img src={logo} style={{width:"50px", height:"50px"}} alt="Not Found!" /></i>
                    <h3>Therasheet</h3>
                </div>
                <ul className={renderClasses()}>
                    {/* <li className="linkinnav"><a className="ainnav" href={"#"} onClick={() => history.push('/home')}>Home</a></li>
                        <li className="linkinnav"><a className="ainnav" href={"#"} onClick={() => history.push('/about')}>About</a></li>
                        <li className="linkinnav"><a className="ainnav" href={"/services"} onClick={() => history.push('/services')} >Services</a></li>
                        <li className="linkinnav"><a className="ainnav" href={"/contact"} onClick={() => history.push('/contact')} >Contact Us</a></li> */}
 
                    <li className="linkinnav"><button type="button" className="link-button" onClick={() => { handleNavLinkToggle(); history.push('/home');} } >Home</button></li>
                    <li className="linkinnav"><button type="button" className="link-button" onClick={() => { handleNavLinkToggle(); history.push('/about');} } >About Us</button></li>

                    <li className="linkinnav"><button type="button" className="link-button" onClick={() => { handleNavLinkToggle(); history.push('/services'); }} >Services</button></li>
                    <li className="linkinnav"><button type="button" className="link-button" onClick={() => { handleNavLinkToggle(); history.push('/contact'); }} >Contact Us</button></li>
                    <li className="extra linkinnav"><button type="button" className="link-button" ></button></li>
                    <li className="extra linkinnav"><button type="button" className="link-button" ></button></li>

                </ul>
                <div onClick={handleNavLinkToggle} className="hamburger-toggle">
                    <i className="fas fa-bars fa-lg"></i>
                </div>
            </nav>
}

export default Navbar;
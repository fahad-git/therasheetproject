import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Home from './Home';
import About from './About';
import Services from './Services';
import Contact from './Contact';
import Admin from './Admin';
import ClicicDirector from './ClinicDirector';


function Main (props) {


    return(
        <Switch>
            <Route path='/home' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/services' component={Services} />
            <Route path='/contact' component={Contact} />
            <Route path='/admin' component={Admin} />
            <Route path='/director' component={ClicicDirector} />

            {/* <Route path='/clinician' component={ClinicianDashboard} /> */}
            {/* <Route path='/patient' component={NewPatient} /> */}
            {/* <Route path='/exercise' component={Exercise} /> */}
            <Redirect to="/home" />
        </Switch>
    )

}

export default Main;
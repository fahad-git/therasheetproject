import React, {useState} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Home from './Home';
import About from './About';
import Services from './Services';
import Contact from './Contact';
import Admin from './Admin';
import ClicicDirector from './ClinicDirector';
import Clinician from './Clinician';
import Exercise from './Exercise';
import Templates from './Templates'

function Main (props) {

    var setHeaderComponent = props.setHeaderComponent;
    var userDetails = props.userDetails;

    return(
        <Switch>
            <Route path='/home' component={() => <Home setHeaderComponent= {setHeaderComponent} />} />
            <Route path='/about' component={() => <About setHeaderComponent= {setHeaderComponent} />} />
            <Route path='/services' component={() => <Services setHeaderComponent= {setHeaderComponent} /> } />
            <Route path='/contact' component={() => <Contact setHeaderComponent= {setHeaderComponent} />} />
            <Route path='/admin' component={() => <Admin setHeaderComponent= {setHeaderComponent}/> } />
            <Route path='/director' component={() => <ClicicDirector setHeaderComponent= {setHeaderComponent } userDetails={userDetails} />} />
            <Route path='/clinician' component={() => <Clinician setHeaderComponent= {setHeaderComponent} userDetails={userDetails} /> } />
            <Route path='/templates' component={Templates} />

            <Route path="/exercise" component={Exercise}/>
            {/* <Route path='/exercise' component={Exercise} /> */}
            <Redirect to="/home" />
        </Switch>
    )

}

export default Main;
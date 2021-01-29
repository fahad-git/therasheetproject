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
import PatientsView from './PatientsView';
import AddExercises from './AddExercises';

function Main (props) {

    var setHeaderComponent = props.setHeaderComponent;
    var userDetails = props.userDetails;

    return(
        <Switch>
            <Route path='/home'><Home setHeaderComponent= {setHeaderComponent} /></Route>
            <Route path='/about'><About setHeaderComponent= {setHeaderComponent} /></Route>
            <Route path='/services'> <Services setHeaderComponent= {setHeaderComponent} /> </Route>
            <Route path='/contact'> <Contact setHeaderComponent= {setHeaderComponent} /> </Route>
            <Route path='/admin'><Admin setHeaderComponent= {setHeaderComponent}/></Route>
            <Route path='/director'><ClicicDirector setHeaderComponent= {setHeaderComponent } userDetails={userDetails} /> </Route>
            <Route path='/clinician'><Clinician setHeaderComponent= {setHeaderComponent} userDetails={userDetails} /> </Route>
            <Route path="/exercise" ><Exercise /></Route>  
            <Route path="/patients" ><PatientsView /></Route>
            <Route path='/addexercise' ><AddExercises /> </Route>
            <Route path='/templates' ><Templates /> </Route>
            <Redirect to="/home" />
        </Switch>
    )

}

export default Main;
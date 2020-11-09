import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/fonts/ionicons.min.css';
import '../assets/css/LoginForm.css';

import { USER_ACCOUNT_TYPE } from "../constants/user";


function LoginForm() {

    const history = useHistory();

    var [userName, setUserName] = useState("");
    var [password, setPassword] = useState("");

    const updateUserName = (e) => setUserName(e.target.value);
    const updatePassword = (e) => setPassword(e.target.value)


    const dispatch = useDispatch();

    const { account_username, account_type, account_profile_url } = useSelector( (state) => state.userReducer );


    const validateFormData = (event) => {
        event.preventDefault();

        setUserName(userName.trim());
        setPassword(password.trim());

        // alert("Current state " + JSON.stringify(this.state))
        if(userName === "" ){
            alert("username can not be null")
            return;
        }else if (password === "" ){
            alert("password can not be null")
            return;
        }       

        var passwordHash = require('password-hash');

        var hashedPassword = passwordHash.generate(password);

        // this hashedPassword will be used for varification.

        if(userName === "admin" && password === "admin"){

            localStorage.removeItem("user");
            localStorage.setItem("user", JSON.stringify({
                userName: "John",
                accountType: "Admin",
                accountProfileUrl: "https://thumbs.dreamstime.com/b/asian-male-doctor-man-indian-wearing-white-coat-shirt-tie-stethoscope-pictured-hospital-30888074.jpg"
            }));
        
            history.push('/admin');
        }else if(userName === "director" && password === "director"){
            // dispatch(
            //     {
            //         type: USER_ACCOUNT_TYPE,
            //         account_username: "Mike",
            //         account_type: "Director",
            //         account_profile_url: "https://img.freepik.com/free-psd/confident-young-doctor-posing_1459-5943.jpg?size=626&ext=jpg"
            //     }
            // );

            localStorage.removeItem("user");
            localStorage.setItem("user", JSON.stringify({
                userName: "Mike",
                accountType: "Director",
                accountProfileUrl: "https://img.freepik.com/free-psd/confident-young-doctor-posing_1459-5943.jpg?size=626&ext=jpg"
            }));

            history.push('/director');
        }else if(userName === "clinician1" && password === "clinician1"){
            // dispatch(
            //     {
            //         type: USER_ACCOUNT_TYPE,
            //         account_username: "Sarah",
            //         account_type: "Clinician",
            //         account_profile_url: "https://www.unitex.com/wp-content/uploads/2018/04/Unitex-Nursing-Shortage-1.jpg"
            //     }
            // );
            localStorage.removeItem("user");
            localStorage.setItem("user", JSON.stringify({
                userName: "Sarah",
                accountType: "Clinician",
                accountProfileUrl: "https://www.unitex.com/wp-content/uploads/2018/04/Unitex-Nursing-Shortage-1.jpg"
            }));
            history.push('/clinician');
        }
    }


    const registerUser = () => {
        alert("Register User Here!")
        // this.props.history.push('register');
        
    }

    const forgetPassword = () => {
        alert("Password Forgotten") 
    }

    return <div>
                <div className="login-dark">
                    <form onSubmit={validateFormData}> 
                        <h2 className="sr-only">Login Form</h2>
                        <div className="illustration"><i className="icon ion-ios-locked-outline"></i></div>
                        <div className="form-group"><input className="form-control" type="text" name="username" placeholder="Username" onChange = {updateUserName} /></div>
                        <div className="form-group"><input className="form-control" type="password" name="password" placeholder="Password" onChange = {updatePassword} /></div>
                        <div className="form-group"><button className="btn btn-primary btn-block" type="submit">Log In</button></div>
                        <a className="forgot" href="#" onClick ={forgetPassword}>Forgot username or password?</a>
                        <br/>
                        <a className="forgot" href="#" onClick ={registerUser} ><b>Register Your Clinic</b><br/><i>Try free for 30 days</i></a>
                        
                    </form>
                </div>
                <script src="assets/js/jquery.min.js"></script>
                <script src="assets/bootstrap/js/bootstrap.min.js"></script>

            </div>
}

export default LoginForm;





// class LoginForm extends React.Component{

//     constructor(props){
//         super(props)
//         this.state = {username:"", password:""};
//     }
    

//     validateFormData = (event) => {
//         event.preventDefault();
//         console.log(JSON.stringify(this.state));
//         let username = this.state.username;
//         let password = this.state.password;

//         username = username.trim();
//         password = password.trim();

//         // alert("Current state " + JSON.stringify(this.state))
//         if(username === "" ){
//             alert("username can not be null")
//             return;
//         }else if (password === "" ){
//             alert("password can not be null")
//             return;
//         }       

//         var passwordHash = require('password-hash');

//         var hashedPassword = passwordHash.generate(password);

//         console.log(hashedPassword)

//         this.setState({password:hashedPassword});
        
//         console.log(JSON.stringify(this.state));


//         if(username === "admin" && password === "admin"){
//             this.props.history.push('/admin');
//         }else if(username === "director" && password === "director"){
//             this.props.history.push('/director');
//         }else if(username === "clinician1" && password === "clinician1"){
//             this.props.history.push('/clinician');
//         }

//         return;
//     }


//     onValueChange = (event) => {
//         let name = event.target.name;
//         let val = event.target.value;
//         this.setState({[name]:val})
//     }

//     registerUser = () => {
//         // alert("Register User Here!")
//         this.props.history.push('register');
//     }

//     forgetPassword = () => {
//         alert("Password Forgotten") 
//     }

//     render (){

//         return (

//             <div>
//                 <div className="login-dark">
//                     <form onSubmit={this.validateFormData}> 
//                         <h2 className="sr-only">Login Form</h2>
//                         <div className="illustration"><i className="icon ion-ios-locked-outline"></i></div>
//                         <div className="form-group"><input className="form-control" type="text" name="username" placeholder="Username" onChange = {this.onValueChange} /></div>
//                         <div className="form-group"><input className="form-control" type="password" name="password" placeholder="Password" onChange = {this.onValueChange} /></div>
//                         <div className="form-group"><button className="btn btn-primary btn-block" type="submit">Log In</button></div>
//                         <a className="forgot" href="#" onClick ={this.forgetPassword}>Forgot username or password?</a>
//                         <br/>
//                         <a className="forgot" href="#" onClick ={this.registerUser} ><b>Register Your Clinic</b><br/><i>Try free for 30 days</i></a>
                        
//                     </form>
//                 </div>
//                 <script src="assets/js/jquery.min.js"></script>
//                 <script src="assets/bootstrap/js/bootstrap.min.js"></script>
  
//             </div>
//         );

//     }
// }

// export default LoginForm;
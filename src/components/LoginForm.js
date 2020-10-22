import React, {useState} from 'react'
import {useHistory} from 'react-router-dom';
import '../assets/bootstrap/css/bootstrap.min.css'
import '../assets/fonts/ionicons.min.css'
import '../assets/css/LoginForm.css'



function LoginForm() {

    const history = useHistory();

    var [userName, setUserName] = useState("");
    var [password, setPassword] = useState("");

    const updateUserName = (e) => setUserName(e.target.value);
    const updatePassword = (e) => setPassword(e.target.value)

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
            history.push('/admin');
        }else if(userName === "director" && password === "director"){
            history.push('/director');
        }else if(userName === "clinician1" && password === "clinician1"){
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
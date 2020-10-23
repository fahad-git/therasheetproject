import React from 'react'
import '../assets/bootstrap/css/bootstrap.min.css'
import '../assets/fonts/ionicons.min.css'

class AdminInfo extends React.Component{

    constructor(props){
        super(props)

        // Here it will request for data
        let username = this.props.params[0];


        this.state = {
            adminname:"Admin",
            username:username,
            phone:"333-21-212",
            address:"AL 35758, United States",
            email:"admin@therasheet.com",
            selectedFile:null,
            accountstatusbtn:"Edit",
            password:"",
            disablefields:true,
            status:""
        }

    }

    editFieldsHandler = (event)=>{
        event.preventDefault();

        

        if(this.state.accountstatusbtn === 'Edit')
            this.setState({"disablefields":false, "accountstatusbtn":"Update"});
        else{
             // Update All infor to the db
            let password = this.state.password;

            var passwordHash = require('password-hash');
            var hashedPassword = passwordHash.generate(password.trim());

            // Here password validation will be done through 

            this.setState({"disablefields":true, "accountstatusbtn":"Edit"});
            document.getElementById("status").style.color = "green";
            this.setState({"status":"Info Updated!"});
        }

    }
    fileHandler = (event) => {
        let file = event.target.files[0]
        alert(file.name+" "+file.size);
        this.setState({"selectedFile":file});
    }

    changeValueHandler = (event) =>{
        this.setState({[event.target.name]:event.target.value});
    }

    render(){
        return(
            <div>
                <div className="popup">
                    <div className="form-container">
                        <form onSubmit={this.editFieldsHandler}>
                            {/* <h2 className="text-center" style={{color:"#5376f4"}}><strong>Clinic Information</strong></h2>
                             */}
                            <div>
                                <div style={{float:"left"}} class="card"><label style={{padding:"10px 10px", width:"180px",  textAlign:"left", fontWeight:"bold"}} >Admin Name</label></div>
                                <div style={{float:"right"}} class="card"><input disabled={this.state.disablefields}  style={{padding:"10px 20px", width:"280px", height:"50px" }} className="form-control"  type="text" name="adminname" onChange={this.changeValueHandler} value={this.state.adminname}/></div>
                            </div>

                            <div style={{clear:"both"}}>
                                <div style={{float:"left", marginTop:"20px"}} class="card"><label style={{padding:"10px 10px", width:"180px", textAlign:"left", fontWeight:"bold"}} >Username</label></div>
                                <div style={{float:"right", marginTop:"20px"}} class="card"><input disabled={this.state.disablefields}  style={{padding:"10px 20px", width:"280px", height:"50px"}} className="form-control"  type="text" name="username" onChange={this.changeValueHandler} value={this.state.username}/></div>
                            </div>
                            

                            <div style={{clear:"both"}}>
                                <div style={{float:"left", marginTop:"20px"}} class="card"><label style={{padding:"10px 10px", width:"180px",  textAlign:"left", fontWeight:"bold"}} >Phone Number</label></div>
                                <div style={{float:"right", marginTop:"20px"}} class="card"><input disabled={this.state.disablefields}  style={{padding:"10px 20px", width:"280px", height:"50px"}} className="form-control"  type="text" name="phone" onChange={this.changeValueHandler} value={this.state.phone}/></div>
                            </div>
                                                

                            <div style={{clear:"both"}}>
                                <div style={{float:"left", marginTop:"20px"}} class="card"><label style={{padding:"10px 10px", width:"180px", textAlign:"left", fontWeight:"bold"}} >Address</label></div>
                                <div style={{float:"right", marginTop:"20px"}} class="card"><input disabled={this.state.disablefields}  style={{padding:"10px 20px", width:"280px", height:"50px"}} className="form-control"  type="text" name="address" onChange={this.changeValueHandler} value={this.state.address}/></div>
                            </div>


                            <div style={{clear:"both"}}>
                                <div style={{float:"left", marginTop:"20px"}} class="card"><label style={{padding:"10px 10px", width:"180px", textAlign:"left", fontWeight:"bold"}} >Email</label></div>
                                <div style={{float:"right", marginTop:"20px"}} class="card"><input disabled={this.state.disablefields}  style={{padding:"10px 20px", width:"280px", height:"50px"}} className="form-control"  type="text" name="email" onChange={this.changeValueHandler} value={this.state.email}/></div>
                            </div>

                            <div style={{clear:"both"}}>
                                <div style={{float:"left", marginTop:"20px"}} class="card"><label style={{padding:"10px 10px", width:"180px", textAlign:"left", fontWeight:"bold"}} >Profile Picture</label></div>
                                <div style={{float:"right", marginTop:"20px"}} class="card"><input disabled={this.state.disablefields}  style={{padding:"10px 20px", width:"280px", height:"50px"}} className="form-control"  type="file" name="profilepicture" onChange={this.fileHandler}/></div>
                            </div>

                            <div style={{clear:"both"}}>
                                <div style={{float:"left", marginTop:"20px"}} class="card"><label style={{padding:"10px 10px", width:"180px", textAlign:"left", fontWeight:"bold"}} >Password</label></div>
                                <div style={{float:"right", marginTop:"20px"}} class="card"><input disabled={this.state.disablefields}  style={{padding:"10px 20px", width:"280px", height:"50px"}} className="form-control"  type="password" name="password" value={this.state.password}/></div>
                            </div>

                            <div style={{clear:"both"}}>
                                <div style={{float:"left", marginTop:"20px"}} ><label id="status" style={{padding:"10px 10px", color:"red", width:"180px", textAlign:"left", fontWeight:"bold"}} >{this.state.status}</label></div>
                                <div style={{float:"right", marginTop:"20px"}} ><button className="btn btn-primary text-center" type="submit" style={{maxWidth: "200px", float:"right", width:"200px", marginTop:"30px", maxHeight: "50px", backgroundColor:"#5376f4"}}>{this.state.accountstatusbtn}</button></div>
                            </div>

                            {/* <button className="btn btn-primary text-center" onClick={this.editFieldsHandler} style={{maxWidth: "200px", float:"right", width:"150px", marginTop:"30px", maxHeight: "50px", backgroundColor:"#5376f4"}}>{this.state.accountstatusbtn}</button> */}
                        </form>
                    </div>
                </div>
                <script src="../assets/js/jquery.min.js"></script>
                <script src="../assets/bootstrap/js/bootstrap.min.js"></script>
            </div>
        )
    }
}

export default AdminInfo;
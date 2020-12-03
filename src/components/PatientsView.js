import React from 'react';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/css/Admin.css';



function PatientsView() {

    return  <div className="admin" >
                <div className="container">
                    <div className="row">        
                        <div className="col-12 col-md-9 col-lg-9 col-xl-10  offset-xl-2  offset-lg-3 offset-md-3 offset-0 card" style={{minHeight:"88vh"}}>
                            <div className="card-body float-left">
                                <div className="row justify-content-left">
                                    Patients View
                                </div>
                            </div>
                    </div>
                    </div>
                </div>
            </div>

}

export default PatientsView;
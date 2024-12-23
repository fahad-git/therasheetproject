import React, {useState} from 'react';

import './../assets/bootstrap/css/bootstrap.min.css';
import '../assets/fonts/ionicons.min.css';
import './../assets/css/RegistrationForm.css';

import registerClinic from "../services/auth.service";
import usernameAvailability from "../services/auth.service";
import addDefaultExerciseSuperType from "../services/director.service";
import {upper, lower, backCore} from "./../assets/content/exercises";

function RegistrationForm(){

    var [clinicName, setClinicName] = useState('');
    var [ownerName, setOwnerName] = useState('');
    var [userName, setUserName] = useState('');
    var [phoneCode, setPhoneCode] = useState('');
    var [phoneNumber, setPhoneNumber] = useState('');
    var [facilityAddress, setFacilityAddress] = useState('');
    var [emailAddress, setEmailAddress] = useState('');
    var [password, setPassword] = useState('');
    var [passwordRepeat, setPasswordRepeat] = useState('');
    var [password_eye_icon, set_password_eye_icon] = useState("ion-eye");

    const updateClinicName = (e) => setClinicName(e.target.value);
    const updateOwnerName = (e) => setOwnerName(e.target.value);
    const updatePhoneNumber = (e) => setPhoneNumber(e.target.value);
    const updateFacilityAddress = (e) => setFacilityAddress(e.target.value);
    const updateEmailAddress = (e) => setEmailAddress(e.target.value);
    const updatePassword = (e) => setPassword(e.target.value);
    const updatePasswordRepeat = (e) => setPasswordRepeat(e.target.value);


    var [registerBtnDisabled, setRegisterBtnDisabled] = useState(true);
    var [error, setError] = useState({
        "display":"none",
        "color":"red",
        "msg":"Password Mismatch"
    })

    //this method is use to validate username if available. This method is called on event change.
    const validateAndUpdateUserName = () => {
        setUserName(userName.trim())
        if(userName=== "")
            return;
        let currentStatus = document.getElementById("username-status");

        // here a call will be called to the server and response will be shown to the user.
        usernameAvailability.usernameAvailability(userName.trim())
        .then((response) => {
            // console.log(response.data)

            if(response.data === "True")
            {            
            currentStatus.innerHTML = "Available";
            currentStatus.style.color = "green";
            // alert(username)
            // setUserName(username);
            }else{
                currentStatus.innerHTML = "Not Available";
                currentStatus.style.color = "red";
                // alert(username)
                setUserName("Not Available");
            }
        }).catch((err) => {
            // console.log(err)
            
            currentStatus.innerHTML = "Not Available";
            currentStatus.style.color = "red";
            // alert(username)
            setUserName("Not Available");
        });


    }

    const updatePhoneCode = (event) => {
        
        let countryCode = document.getElementById('countrycode');

        countryCode.options[0].style.display = "none";

        setPhoneCode(countryCode.value);

        countryCode.options[1].innerHTML =  "+" + countryCode.value;

        countryCode.selectedIndex = 1;
    }

    const moveToLoginScreen = () =>{

    }

    const signupEnable = () =>{
        setRegisterBtnDisabled(!registerBtnDisabled);
    }

    const terms_and_condition_event = () => {

    }

    const togglePassword = () => {
        if(password_eye_icon === "ion-eye")
            set_password_eye_icon("ion-eye-disabled");
        else
            set_password_eye_icon("ion-eye");
    }

    const submitHandler = () =>{
        if(userName === "Not Available" || error["display"] === "block"){
            setError({
                "display":"block",
                "color":"red",
                "msg":"Username not available or empty fields"
            })
            return;
        }

        var today = new Date();
        
        let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

        today.setDate(today.getDate() + 30);

        let expiryDate =  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()


        let obj = {
            "login": {
                    "username": userName.trim(),
                    "password": password.trim(),
                    "userType": "director",
                    "status": "Blocked"
                    },
            "clinicName": clinicName.trim(),
            "ownerName": ownerName.trim(),
            "facilityAddress": facilityAddress.trim(),
            "phoneNumber": phoneCode.trim() + phoneNumber.trim(),
            "email": emailAddress.trim(),
            "imagePath": "",
            "registrationDate": date,
            "subscriptionDate": date,
            "expiryDate": expiryDate,
            "numberOfClinician": 0,
            "payments": [],
            "adminId":1
        }

        // console.log(obj);
        registerClinic.registerClinic(obj)
        .then((response) => {
            console.log(response.data);
            if(response.data){
                console.log("working")
                console.log(upper);
                addDefaultExerciseSuperType.addDefaultExerciseSuperType(upper, response.data.clinicId)
                .then((res1) => {
                    console.log(response.data)
                    addDefaultExerciseSuperType.addDefaultExerciseSuperType(lower, response.data.clinicId)
                    .then((res2) => {
                        addDefaultExerciseSuperType.addDefaultExerciseSuperType(backCore, response.data.clinicId)
                        .then((res3) => {
                            setError({
                                "display":"block",
                                "color":"green",
                                "msg":"Clinic Registered Successfully. Currently your account is disabled until Admin approve your account."
                            })
                            setRegisterBtnDisabled(true);
                        }
                        ).catch((err) => {
                            console.log('');
                            // console.log("Error: " + err);
                        });
                    }
                    ).catch((err) => {
                        console.log('');
                        // console.log("Error: " + err);
                    });
                }
                ).catch((err) => {
                    console.log('');
                    // console.log("Error: " + err);
                });
    
            }
            else
                setError({
                    "display":"block",
                    "color":"red",
                    "msg":"Registration Failed"
                })
        }).catch((err) =>{ 
            // console.log(err)
            setError({
                "display":"block",
                "color":"red",
                "msg":"Registration Failed"
            })
        });

    }

    const matchPasswordHandler = () => {
        if(password.length < 8)
            setError({
                "display":"block",
                "color":"red",
                "msg":"Password Length Too Short"
            })
        else if(password !== passwordRepeat)
            setError({
                "display":"block",
                "color":"red",
                "msg":"Password Mismatch"
            })
    }

    return <div className="registrationform">
                <div className="container">
                    <div className="row">
                        <div className="col-0 col-sm-3 offset-0">
                            <div className="image-holder"></div>
                        </div>
                        <div className="col-12 col-sm-9">
                            <div className="row">
                                <div className="col-12 form-group"><input className="form-control"  type="text" name="clinicName" placeholder="Clinic Name" onChange = {updateClinicName} required/></div>
                                <div className="col-12 form-group"><input className="form-control" type="text" name="ownerName" placeholder="Owner Name" onChange = {updateOwnerName} required/></div>

                                <div className="col-12 form-group">
                                    <input className="col-12 form-control" type="text" name="facilityaddress" placeholder="Facility Address" onChange = {updateFacilityAddress} required/>
                                </div>
                            
{/* Start */}
                                {/* this is for country code */}
                                <div className="col-5 form-group">
                                    <select id="countrycode" className="col-12 form-control" name="countrycode" onChange = {updatePhoneCode}>                
                                        <option value='default' defaultValue>Country</option>
                                        <option value='' style={{display:"none"}}></option>
                                        <option datacountrycode="US" value="1">USA (+1)</option>
                                        <option datacountrycode="GB" value="44">UK (+44)</option>
                                        <option datacountrycode="DZ" value="213">Algeria (+213)</option>
                                        <option datacountrycode="AD" value="376">Andorra (+376)</option>
                                        <option datacountrycode="AO" value="244">Angola (+244)</option>
                                        <option datacountrycode="AI" value="1264">Anguilla (+1264)</option>
                                        <option datacountrycode="AG" value="1268">Antigua &amp; Barbuda (+1268)</option>
                                        <option datacountrycode="AR" value="54">Argentina (+54)</option>
                                        <option datacountrycode="AM" value="374">Armenia (+374)</option>
                                        <option datacountrycode="AW" value="297">Aruba (+297)</option>
                                        <option datacountrycode="AU" value="61">Australia (+61)</option>
                                        <option datacountrycode="AT" value="43">Austria (+43)</option>
                                        <option datacountrycode="AZ" value="994">Azerbaijan (+994)</option>
                                        <option datacountrycode="BS" value="1242">Bahamas (+1242)</option>
                                        <option datacountrycode="BH" value="973">Bahrain (+973)</option>
                                        <option datacountrycode="BD" value="880">Bangladesh (+880)</option>
                                        <option datacountrycode="BB" value="1246">Barbados (+1246)</option>
                                        <option datacountrycode="BY" value="375">Belarus (+375)</option>
                                        <option datacountrycode="BE" value="32">Belgium (+32)</option>
                                        <option datacountrycode="BZ" value="501">Belize (+501)</option>
                                        <option datacountrycode="BJ" value="229">Benin (+229)</option>
                                        <option datacountrycode="BM" value="1441">Bermuda (+1441)</option>
                                        <option datacountrycode="BT" value="975">Bhutan (+975)</option>
                                        <option datacountrycode="BO" value="591">Bolivia (+591)</option>
                                        <option datacountrycode="BA" value="387">Bosnia Herzegovina (+387)</option>
                                        <option datacountrycode="BW" value="267">Botswana (+267)</option>
                                        <option datacountrycode="BR" value="55">Brazil (+55)</option>
                                        <option datacountrycode="BN" value="673">Brunei (+673)</option>
                                        <option datacountrycode="BG" value="359">Bulgaria (+359)</option>
                                        <option datacountrycode="BF" value="226">Burkina Faso (+226)</option>
                                        <option datacountrycode="BI" value="257">Burundi (+257)</option>
                                        <option datacountrycode="KH" value="855">Cambodia (+855)</option>
                                        <option datacountrycode="CM" value="237">Cameroon (+237)</option>
                                        <option datacountrycode="CA" value="1">Canada (+1)</option>
                                        <option datacountrycode="CV" value="238">Cape Verde Islands (+238)</option>
                                        <option datacountrycode="KY" value="1345">Cayman Islands (+1345)</option>
                                        <option datacountrycode="CF" value="236">Central African Republic (+236)</option>
                                        <option datacountrycode="CL" value="56">Chile (+56)</option>
                                        <option datacountrycode="CN" value="86">China (+86)</option>
                                        <option datacountrycode="CO" value="57">Colombia (+57)</option>
                                        <option datacountrycode="KM" value="269">Comoros (+269)</option>
                                        <option datacountrycode="CG" value="242">Congo (+242)</option>
                                        <option datacountrycode="CK" value="682">Cook Islands (+682)</option>
                                        <option datacountrycode="CR" value="506">Costa Rica (+506)</option>
                                        <option datacountrycode="HR" value="385">Croatia (+385)</option>
                                        {/* <!-- <option datacountrycode="CU" value="53">Cuba (+53)</option> --> */}
                                        <option datacountrycode="CY" value="90">Cyprus - North (+90)</option>
                                        <option datacountrycode="CY" value="357">Cyprus - South (+357)</option>
                                        <option datacountrycode="CZ" value="420">Czech Republic (+420)</option>
                                        <option datacountrycode="DK" value="45">Denmark (+45)</option>
                                        <option datacountrycode="DJ" value="253">Djibouti (+253)</option>
                                        <option datacountrycode="DM" value="1809">Dominica (+1809)</option>
                                        <option datacountrycode="DO" value="1809">Dominican Republic (+1809)</option>
                                        <option datacountrycode="EC" value="593">Ecuador (+593)</option>
                                        <option datacountrycode="EG" value="20">Egypt (+20)</option>
                                        <option datacountrycode="SV" value="503">El Salvador (+503)</option>
                                        <option datacountrycode="GQ" value="240">Equatorial Guinea (+240)</option>
                                        <option datacountrycode="ER" value="291">Eritrea (+291)</option>
                                        <option datacountrycode="EE" value="372">Estonia (+372)</option>
                                        <option datacountrycode="ET" value="251">Ethiopia (+251)</option>
                                        <option datacountrycode="FK" value="500">Falkland Islands (+500)</option>
                                        <option datacountrycode="FO" value="298">Faroe Islands (+298)</option>
                                        <option datacountrycode="FJ" value="679">Fiji (+679)</option>
                                        <option datacountrycode="FI" value="358">Finland (+358)</option>
                                        <option datacountrycode="FR" value="33">France (+33)</option>
                                        <option datacountrycode="GF" value="594">French Guiana (+594)</option>
                                        <option datacountrycode="PF" value="689">French Polynesia (+689)</option>
                                        <option datacountrycode="GA" value="241">Gabon (+241)</option>
                                        <option datacountrycode="GM" value="220">Gambia (+220)</option>
                                        <option datacountrycode="GE" value="7880">Georgia (+7880)</option>
                                        <option datacountrycode="DE" value="49">Germany (+49)</option>
                                        <option datacountrycode="GH" value="233">Ghana (+233)</option>
                                        <option datacountrycode="GI" value="350">Gibraltar (+350)</option>
                                        <option datacountrycode="GR" value="30">Greece (+30)</option>
                                        <option datacountrycode="GL" value="299">Greenland (+299)</option>
                                        <option datacountrycode="GD" value="1473">Grenada (+1473)</option>
                                        <option datacountrycode="GP" value="590">Guadeloupe (+590)</option>
                                        <option datacountrycode="GU" value="671">Guam (+671)</option>
                                        <option datacountrycode="GT" value="502">Guatemala (+502)</option>
                                        <option datacountrycode="GN" value="224">Guinea (+224)</option>
                                        <option datacountrycode="GW" value="245">Guinea - Bissau (+245)</option>
                                        <option datacountrycode="GY" value="592">Guyana (+592)</option>
                                        <option datacountrycode="HT" value="509">Haiti (+509)</option>
                                        <option datacountrycode="HN" value="504">Honduras (+504)</option>
                                        <option datacountrycode="HK" value="852">Hong Kong (+852)</option>
                                        <option datacountrycode="HU" value="36">Hungary (+36)</option>
                                        <option datacountrycode="IS" value="354">Iceland (+354)</option>
                                        <option datacountrycode="IN" value="91">India (+91)</option>
                                        <option datacountrycode="ID" value="62">Indonesia (+62)</option>
                                        <option datacountrycode="IQ" value="964">Iraq (+964)</option>
                                        {/* <!-- <option datacountrycode="IR" value="98">Iran (+98)</option> --> */}
                                        <option datacountrycode="IE" value="353">Ireland (+353)</option>
                                        <option datacountrycode="IL" value="972">Israel (+972)</option>
                                        <option datacountrycode="IT" value="39">Italy (+39)</option>
                                        <option datacountrycode="JM" value="1876">Jamaica (+1876)</option>
                                        <option datacountrycode="JP" value="81">Japan (+81)</option>
                                        <option datacountrycode="JO" value="962">Jordan (+962)</option>
                                        <option datacountrycode="KZ" value="7">Kazakhstan (+7)</option>
                                        <option datacountrycode="KE" value="254">Kenya (+254)</option>
                                        <option datacountrycode="KI" value="686">Kiribati (+686)</option>
                                        {/* <!-- <option datacountrycode="KP" value="850">Korea - North (+850)</option> --> */}
                                        <option datacountrycode="KR" value="82">Korea - South (+82)</option>
                                        <option datacountrycode="KW" value="965">Kuwait (+965)</option>
                                        <option datacountrycode="KG" value="996">Kyrgyzstan (+996)</option>
                                        <option datacountrycode="LA" value="856">Laos (+856)</option>
                                        <option datacountrycode="LV" value="371">Latvia (+371)</option>
                                        <option datacountrycode="LB" value="961">Lebanon (+961)</option>
                                        <option datacountrycode="LS" value="266">Lesotho (+266)</option>
                                        <option datacountrycode="LR" value="231">Liberia (+231)</option>
                                        <option datacountrycode="LY" value="218">Libya (+218)</option>
                                        <option datacountrycode="LI" value="417">Liechtenstein (+417)</option>
                                        <option datacountrycode="LT" value="370">Lithuania (+370)</option>
                                        <option datacountrycode="LU" value="352">Luxembourg (+352)</option>
                                        <option datacountrycode="MO" value="853">Macao (+853)</option>
                                        <option datacountrycode="MK" value="389">Macedonia (+389)</option>
                                        <option datacountrycode="MG" value="261">Madagascar (+261)</option>
                                        <option datacountrycode="MW" value="265">Malawi (+265)</option>
                                        <option datacountrycode="MY" value="60">Malaysia (+60)</option>
                                        <option datacountrycode="MV" value="960">Maldives (+960)</option>
                                        <option datacountrycode="ML" value="223">Mali (+223)</option>
                                        <option datacountrycode="MT" value="356">Malta (+356)</option>
                                        <option datacountrycode="MH" value="692">Marshall Islands (+692)</option>
                                        <option datacountrycode="MQ" value="596">Martinique (+596)</option>
                                        <option datacountrycode="MR" value="222">Mauritania (+222)</option>
                                        <option datacountrycode="YT" value="269">Mayotte (+269)</option>
                                        <option datacountrycode="MX" value="52">Mexico (+52)</option>
                                        <option datacountrycode="FM" value="691">Micronesia (+691)</option>
                                        <option datacountrycode="MD" value="373">Moldova (+373)</option>
                                        <option datacountrycode="MC" value="377">Monaco (+377)</option>
                                        <option datacountrycode="MN" value="976">Mongolia (+976)</option>
                                        <option datacountrycode="MS" value="1664">Montserrat (+1664)</option>
                                        <option datacountrycode="MA" value="212">Morocco (+212)</option>
                                        <option datacountrycode="MZ" value="258">Mozambique (+258)</option>
                                        <option datacountrycode="MN" value="95">Myanmar (+95)</option>
                                        <option datacountrycode="NA" value="264">Namibia (+264)</option>
                                        <option datacountrycode="NR" value="674">Nauru (+674)</option>
                                        <option datacountrycode="NP" value="977">Nepal (+977)</option>
                                        <option datacountrycode="NL" value="31">Netherlands (+31)</option>
                                        <option datacountrycode="NC" value="687">New Caledonia (+687)</option>
                                        <option datacountrycode="NZ" value="64">New Zealand (+64)</option>
                                        <option datacountrycode="NI" value="505">Nicaragua (+505)</option>
                                        <option datacountrycode="NE" value="227">Niger (+227)</option>
                                        <option datacountrycode="NG" value="234">Nigeria (+234)</option>
                                        <option datacountrycode="NU" value="683">Niue (+683)</option>
                                        <option datacountrycode="NF" value="672">Norfolk Islands (+672)</option>
                                        <option datacountrycode="NP" value="670">Northern Marianas (+670)</option>
                                        <option datacountrycode="NO" value="47">Norway (+47)</option>
                                        <option datacountrycode="OM" value="968">Oman (+968)</option>
                                        <option datacountrycode="PK" value="92">Pakistan (+92)</option>
                                        <option datacountrycode="PW" value="680">Palau (+680)</option>
                                        <option datacountrycode="PA" value="507">Panama (+507)</option>
                                        <option datacountrycode="PG" value="675">Papua New Guinea (+675)</option>
                                        <option datacountrycode="PY" value="595">Paraguay (+595)</option>
                                        <option datacountrycode="PE" value="51">Peru (+51)</option>
                                        <option datacountrycode="PH" value="63">Philippines (+63)</option>
                                        <option datacountrycode="PL" value="48">Poland (+48)</option>
                                        <option datacountrycode="PT" value="351">Portugal (+351)</option>
                                        <option datacountrycode="PR" value="1787">Puerto Rico (+1787)</option>
                                        <option datacountrycode="QA" value="974">Qatar (+974)</option>
                                        <option datacountrycode="RE" value="262">Reunion (+262)</option>
                                        <option datacountrycode="RO" value="40">Romania (+40)</option>
                                        <option datacountrycode="RU" value="7">Russia (+7)</option>
                                        <option datacountrycode="RW" value="250">Rwanda (+250)</option>
                                        <option datacountrycode="SM" value="378">San Marino (+378)</option>
                                        <option datacountrycode="ST" value="239">Sao Tome &amp; Principe (+239)</option>
                                        <option datacountrycode="SA" value="966">Saudi Arabia (+966)</option>
                                        <option datacountrycode="SN" value="221">Senegal (+221)</option>
                                        <option datacountrycode="CS" value="381">Serbia (+381)</option>
                                        <option datacountrycode="SC" value="248">Seychelles (+248)</option>
                                        <option datacountrycode="SL" value="232">Sierra Leone (+232)</option>
                                        <option datacountrycode="SG" value="65">Singapore (+65)</option>
                                        <option datacountrycode="SK" value="421">Slovak Republic (+421)</option>
                                        <option datacountrycode="SI" value="386">Slovenia (+386)</option>
                                        <option datacountrycode="SB" value="677">Solomon Islands (+677)</option>
                                        <option datacountrycode="SO" value="252">Somalia (+252)</option>
                                        <option datacountrycode="ZA" value="27">South Africa (+27)</option>
                                        <option datacountrycode="ES" value="34">Spain (+34)</option>
                                        <option datacountrycode="LK" value="94">Sri Lanka (+94)</option>
                                        <option datacountrycode="SH" value="290">St. Helena (+290)</option>
                                        <option datacountrycode="KN" value="1869">St. Kitts (+1869)</option>
                                        <option datacountrycode="SC" value="1758">St. Lucia (+1758)</option>
                                        <option datacountrycode="SR" value="597">Suriname (+597)</option>
                                        <option datacountrycode="SD" value="249">Sudan (+249)</option>
                                        <option datacountrycode="SZ" value="268">Swaziland (+268)</option>
                                        <option datacountrycode="SE" value="46">Sweden (+46)</option>
                                        <option datacountrycode="CH" value="41">Switzerland (+41)</option>
                                        {/* <!-- <option datacountrycode="SY" value="963">Syria (+963)</option> --> */}
                                        <option datacountrycode="TW" value="886">Taiwan (+886)</option>
                                        <option datacountrycode="TJ" value="992">Tajikistan (+992)</option>
                                        <option datacountrycode="TH" value="66">Thailand (+66)</option>
                                        <option datacountrycode="TG" value="228">Togo (+228)</option>
                                        <option datacountrycode="TO" value="676">Tonga (+676)</option>
                                        <option datacountrycode="TT" value="1868">Trinidad &amp; Tobago (+1868)</option>
                                        <option datacountrycode="TN" value="216">Tunisia (+216)</option>
                                        <option datacountrycode="TR" value="90">Turkey (+90)</option>
                                        <option datacountrycode="TM" value="993">Turkmenistan (+993)</option>
                                        <option datacountrycode="TC" value="1649">Turks &amp; Caicos Islands (+1649)</option>
                                        <option datacountrycode="TV" value="688">Tuvalu (+688)</option>
                                        <option datacountrycode="UG" value="256">Uganda (+256)</option>
                                        <option datacountrycode="UA" value="380">Ukraine (+380)</option>
                                        <option datacountrycode="AE" value="971">United Arab Emirates (+971)</option>
                                        <option datacountrycode="UY" value="598">Uruguay (+598)</option>
                                        <option datacountrycode="UZ" value="998">Uzbekistan (+998)</option>
                                        <option datacountrycode="VU" value="678">Vanuatu (+678)</option>
                                        <option datacountrycode="VA" value="379">Vatican City (+379)</option>
                                        <option datacountrycode="VE" value="58">Venezuela (+58)</option>
                                        <option datacountrycode="VN" value="84">Vietnam (+84)</option>
                                        <option datacountrycode="VG" value="1">Virgin Islands - British (+1)</option>
                                        <option datacountrycode="VI" value="1">Virgin Islands - US (+1)</option>
                                        <option datacountrycode="WF" value="681">Wallis &amp; Futuna (+681)</option>
                                        <option datacountrycode="YE" value="969">Yemen (North)(+969)</option>
                                        <option datacountrycode="YE" value="967">Yemen (South)(+967)</option>
                                        <option datacountrycode="ZM" value="260">Zambia (+260)</option>
                                        <option datacountrycode="ZW" value="263">Zimbabwe (+263)</option>
                                                                  
                                    </select>
                                    {/* <label id="phonecountrycode" className="form-control">Hello</label> */}
                                </div>

                                <div className="col-7 form-group">
                                    <input className="col-12 form-control" type="tel" id="phone" name="phone" placeholder="Phone Number" pattern="[0-9]{3,14}" onChange = {updatePhoneNumber} required/>
                                </div>

                                <div className="col-12 form-group">
                                    <input className="col-12 form-control" type="email" name="email" placeholder="Email" onChange = {updateEmailAddress} required/>
                                </div>

                                {/* this is for username validation */}
                                <div className="col-5 form-group">
                                    <label  className="form-control" style={{textAlign:"center", paddingTop:"3vmin"}}><strong id="username-status"></strong></label>
                                </div>

                                <div className="col-7 form-group">
                                    <input className="form-control" type="text" name="username" placeholder="UserName" onBlur={validateAndUpdateUserName} onChange={(e)=> setUserName(e.target.value)} required/>
                                </div>

                                <div className="col-12 form-group ">
                                    <div className="col-12 form-control" style={{padding: "20px 0px"}}>
                                        <input className="col-9 col-md-9 col-lg-10 passwordfield" type={ (password_eye_icon=== "ion-eye") ? "password" : "text"} name="password" placeholder="Password" onFocus={()=> setError({"display":"","color":"", "msg":""})} onBlur={matchPasswordHandler} onChange = {updatePassword} required/>
                                        <i className="col-3 col-md-3 col-lg-2" className={password_eye_icon} onClick={togglePassword} ></i>
                                    </div>
                                </div>
                                <div className="col-12 form-group">
                                    <input className="form-control" type="password" name="passwordrepeat" placeholder="Password confirmation" onFocus={()=> setError({"display":"none","color":"", "msg":""})} onBlur={matchPasswordHandler} onChange = {updatePasswordRepeat} required/>
                                </div>
                                <label className="col-12 already" style={{display:error["display"], color:error["color"]}}>{error["msg"]}</label>

                                <div className="col-12 form-group">
                                    <div className="col-12 form-check"><label style={{fontSize:"calc(3px + 2vmin)"}} className="form-check-label"><input className="form-check-input" type="checkbox" onClick={signupEnable} />I have read and agree to Therasheet's <a href="#" onClick={terms_and_condition_event}>terms and conditions</a></label></div>
                                </div>

                                <div className="col-12 form-group"><button id="register_btn" className="col-8 offset-2 btn btn-primary btn-block" type="submit" onClick={submitHandler} disabled={registerBtnDisabled}>Register</button></div>
                                <label className="col-12 already">You already have an account? <a href="#" onClick={moveToLoginScreen}>Login here.</a></label>
                       
                <script src="../assets/js/jquery.min.js"></script>
                <script src="../assets/bootstrap/js/bootstrap.min.js"></script>

{/* End */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

}
export default RegistrationForm;
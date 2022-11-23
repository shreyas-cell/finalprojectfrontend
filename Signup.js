import React, { useState, useRef,useEffect } from "react";
import axios from "axios";
/*import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";*/
//import styles from './styles.css';

 function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [email,setEmail]=useState("");
    const API_URL = "http://localhost:8080/api/auth/";
    useEffect(()=>{
      document.title = 'SignUp';
       

    },[]);
    const onChangeFirstname = (e) =>{
      const firstName=e.target.value;
      setFirstName(firstName);
    }
    const onChangeLastname = (e) =>{
      const lastName=e.target.value;
      setLastName(lastName);
    }

    const onChangeEmail = (e) =>{
      const email=e.target.value;
      setEmail(email);
    }

    const onChangeUsername = (e) => {
      const username = e.target.value;
      setUsername(username);
    };
  
    const onChangePassword = (e) => {
      const password = e.target.value;
      setPassword(password);
    };
  
    const handleSignup = (e) => {
      if(firstName!==null && lastName!==null && username!==null && password!==null && email!==null ){
      e.preventDefault();
      axios
      .post(API_URL + "signup", {
        firstName,
        lastName,
        username,
        password,
        email

      }).then((response) => {
        window. location. reload()
        alert("You have registered successfully")  
        });
      }
      else{
      alert("some fields are blank");
      }
  
    };
  
    return(
        <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />
  
          <form onSubmit={handleSignup}>
            <div className="form-group">
                <label htmlFor="firstName">FirstName</label>
                <input type="text" name="firstName" value={firstName} onChange={onChangeFirstname} className="form-control"/>

                <label htmlFor="lastName">LastName</label>
                <input type="text" name="lastName" value={lastName} onChange={onChangeLastname} className="form-control"/>

                <label htmlFor="email">Email</label>
                <input type="text" name="email" value={email} onChange={onChangeEmail} className="form-control"/>

              <label htmlFor="username">Username</label>
              <input type="text" className="form-control" name="username" value={username} onChange={onChangeUsername}/>
            </div>
  
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={onChangePassword}
                            />
            </div>
  
            <div className="form-group">
              <button className="btn btn-primary btn-block">
                
                <span>Register</span>
              </button>
            </div>
  
            {/* {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )} */}
            {/* <CheckButton style={{ display: "none" }} ref={checkBtn} /> */}
          </form>
        </div>
      </div>
  

    )
};
export default Signup;
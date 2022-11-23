import React, { useState, useRef,useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
/*import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";*/
//import styles from './styles.css';

 function UserName() {
    const navigate=useNavigate();
    const [email,setEmail]=useState("");
    const API_URL = "http://localhost:8080/api/test/getUsername/";
    useEffect(()=>{
      document.title = 'Forgot Username';
       

    },[]);

    const onChangeEmail = (e) =>{
      const email=e.target.value;
      setEmail(email);
    }

   
    const handleUsername = (e) => {
      if(email!==null ){
      e.preventDefault();
      const result=axios.get(API_URL + email).then((result) => {
        console.log(result)
        //window. location. reload()
        if(result.data===''){
            alert("user not registered")
            navigate("/login");
        }
        else{
        alert("Your username is: "+result.data.username) 
        navigate("/login");
        } 
        });
      }
      else{
      alert(" field is blank");
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
  
          <form onSubmit={handleUsername}>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" value={email} onChange={onChangeEmail} className="form-control"/>

              </div>
  
            <div className="form-group">
              <button className="btn btn-primary btn-block">
                
                <span>Get UserName</span>
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
export default UserName;
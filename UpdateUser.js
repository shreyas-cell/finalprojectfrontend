import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function UpdateUser() {
  let navigate = useNavigate();

  const {id}=useParams();

  
  const [user, setUser] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        roles: ""
  });

  const {username,firstName,lastName,email,password,roles} = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(()=>{
    document.title = 'Update User';
    loadUser();
   // document.getElementById("create-course-form").reset();
  },[])

  const onSubmit = async (e) => {
    e.preventDefault();
    if(firstName===null||lastName===null||email===null){
      alert("enter data format not valid")
    }
    else{
      alert("data updated...")
      console.log(user);
      await axios.put(`http://localhost:8080/api/test/${id}`, user);
      navigate("/Users");
    }
    
  };

  const loadUser=async()=>{
    const result=await axios.get(`http://localhost:8080/api/test/${id}`)
    setUser(result.data)
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit User</h2>

          <form onSubmit={(e) => onSubmit(e)} id="create-course-form">
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
              First Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter first name"
                name="firstName"
                value={firstName}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
              Last Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter last name"
                name="lastName"
                value={lastName}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
              Email 
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
            </div>
                    
            <button type="submit" className="btn btn-outline-primary">
              Update
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/" >
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
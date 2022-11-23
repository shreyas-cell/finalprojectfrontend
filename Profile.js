import React, { useEffect,useState } from "react";
import AuthService from "../Services/auth-service";
import {Link,useNavigate} from "react-router-dom"
import axios from "axios";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const [users,setUsers]=useState([]);
  const [trains,setTrain]=useState([]);
  let navigate=useNavigate();
  useEffect(()=>{
    document.title = 'User Profile';
    
    console.log(typeof(currentUser))
    loadBooking();
  },[]);
  const loadBooking=async()=>{
    const result=await axios.get(`http://localhost:8080/api/test/booking/${currentUser.id}`)
    setTrain(result.data)
  
  }
  const deleteJourney=async(id)=>{
    await axios.delete(`http://localhost:8080/api/test/booking/${id}`);
    loadBooking();
  }
  return (
    
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>Welcome, {currentUser.firstName}, Book your ticket today</strong> 
        </h3>
      </header>
      <p>
        <strong>User Id:</strong> {currentUser.id}
        </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <Link class="btn btn-outline-primary" to={`/`}>Book Now</Link>
      <div className='container'>
            <div className='py-4'>
            <table className="table table-hover table-dark" style={{marginLeft:"-70px",whiteSpace:"nowrap"}}>
  <thead>
    <tr>
      <th scope="col">Journey_ID</th>
      <th scope="col">FirstName</th>
      <th scope="col">LastName</th>
      <th scope="col">TrainId</th>
      <th scope="col">TrainName</th>
      <th scope="col">Class</th>
      <th scope="col">Arrival</th>
      <th scope="col">Departure</th>
      <th scope="col">Source</th>
      <th scope="col">Destination</th>
      <th scope="col">DOJ</th>
      <th>Delete Journey</th>
    </tr>
  </thead>
  <tbody>
    { 
    trains.map((train,index)=>{
     return(   <tr>
      <td>{train.id}</td>
      <td>{train.firstName}</td>
      <td>{train.lastName}</td>
      <td>{train.trainId}</td>
      <td>{train.trainName}</td>
      <td>{train.journeyClass}</td>
      <td>{train.arrival}</td>
      <td>{train.departure}</td>
      <td>{train.source}</td>
      <td>{train.destination}</td>
      <td>{train.doj.substring(0,10)}</td>
      <td>
      <button className='btn btn-danger mx-2' onClick={()=>deleteJourney(train.id)}>Delete Journey</button>
        </td>
    </tr>)
  })}
  </tbody>
  </table>
            </div>
            
        </div>
      
           </div>
  );
  
};

export default Profile;
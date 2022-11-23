import React, { useEffect,useState } from "react";
import AuthService from "../Services/auth-service";

import axios from "axios";

const AdminProfile = () => {
  const currentUser = AuthService.getCurrentUser();
  const [trains,setTrain]=useState([]);
  useEffect(()=>{
    document.title = 'Admin Profile';
      loadTrain();

  },[]);
  const loadTrain=async()=>{
    const result=await axios.get(`http://localhost:8080/api/test/booking`)
    setTrain(result.data)
    console.log(result)
  }
  const deleteJourney=async(id)=>{
    await axios.delete(`http://localhost:8080/api/test/booking/${id}`);
    loadTrain();
  }
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>Welcome, {currentUser.firstName} </strong> 
        </h3>
      </header>
      
      <p>
        <strong>Id:</strong> {currentUser.id}
        </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
      <div className='container' >
            <div className='py-4'>
            <table className="table table-hover table-dark" style={{marginLeft:"-70px",whiteSpace:"nowrap"}}>
  <thead>
    <tr>
      <th scope="col">Journey_ID</th>
      <th scope="col">Train_ID</th>
      <th scope="col">TrainName</th>
      <th scope="col">User_ID</th>
      <th scope="col">Arrival</th>
      <th scope="col">Departure</th>
      <th scope="col">Source</th>
      <th scope="col">Destination</th>
      <th scope="col">Name</th>
      <th scope="col">DOJ</th>
      <th scope="col">Class</th>
      <th scope="col">Age</th>
      <th>Delete Now</th>
    </tr>
  </thead>
  <tbody>
    { 
    trains.map((train,index)=>{
     return(   <tr>
      <td>{train.id}</td>
      <td>{train.trainId}</td>
      <td>{train.trainName}</td>
      <td>{train.userId}</td>
      <td>{train.arrival}</td>
      <td>{train.departure}</td>
      <td>{train.source}</td>
      <td>{train.destination}</td>
      <td>{train.firstName}&nbsp;&nbsp;&nbsp;{train.lastName}</td>
      <td>{train.doj.substring(0,10)}</td>
      <td>{train.journeyClass}</td>
      <td>{train.age}</td>
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

export default AdminProfile;
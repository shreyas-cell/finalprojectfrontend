import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import UserService from "../Services/user-service";
import axios from "axios"
const AdminBoard = () => {
  const [trains,setTrains]=useState([]);

  const deleteTrain=async(id)=>{
    await axios.delete(`http://localhost:8080/api/train/${id}`);
    loadTrains();
  }

 

  const loadTrains=async ()=>{
    UserService.getTrains().then(
        (res)=>{
          setTrains(res.data);
          //console.log(res)
        },
        (err)=>{
          const _con=(err.response && err.response.data &&err.response.data.message)|| 
          (err.message)||(err.toString());
          setTrains(_con);
        }
      );
  
  }
  useEffect(() => {
    document.title = 'Admin Board';
    loadTrains();
  }, []);


  return (
    <div className="container">
    <header className="jumbotron">
      <h1>Trains</h1>
      <Link className="btn btn btn-success" to="/AddTrain" >
              Add Train
            </Link>
    </header>
    <div className='container'>
          <div className='py-4'>
          <table className="table table-hover table-dark" style={{marginLeft:"-10px"}}>
<thead>
  <tr>
    <th scope="col">TrainId</th>
    <th scope="col">TrainName</th>
    <th scope="col">Arrival</th>
    <th scope="col">Departure</th>
    <th scope="col">Source</th>
    <th scope="col">Destination</th>
    <th scope="col">AC 1 Fare</th>
    <th scope="col">AC 2 Fare</th>
    <th scope="col">AC 3 Fare</th>
    <th scope="col">SL Fare</th>
  </tr>
</thead>
<tbody>
  { 
  trains.map((train,index)=>{
   return(   <tr>
    <td>{train.id}</td>
    <td>{train.trainName}</td>
    <td>{train.arrival}</td>
    <td>{train.departure}</td>
    <td>{train.source}</td>
    <td>{train.destination}</td>
    <td>{train.ac1Fare}</td>
    <td>{train.ac2Fare}</td>
    <td>{train.ac3Fare}</td>
    <td>{train.slFare}</td>
    <td>
    <Link className='btn btn-outline-primary mx-2' to={`/updateTrain/${train.id}`}>Update</Link>
      </td>
    <td>
        <button className='btn btn-danger mx-2' onClick={()=>deleteTrain(train.id)}>Delete</button>
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

export default AdminBoard;
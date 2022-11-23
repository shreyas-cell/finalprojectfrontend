import React, { useContext,useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import SampleContext from './Home';

export default function ShowAvailability() {
    
    const {source,destination}=useParams();
    const [trains,setTrain]=useState([]);
    useEffect(()=>{
      document.title = 'Show Availability';
        loadTrain();

    },[]);
    const loadTrain=async()=>{
      const result=await axios.get(`http://localhost:8080/api/train/${source}/${destination}`)
      setTrain(result.data)
      console.log(result)
    }

    return (
      
      <div className='container'>
            <div className='py-4'>
            <table className="table table-hover table-dark">
  <thead>
    <tr>
      <th scope="col">Sr No.</th>
      <th scope="col">TrainId</th>
      <th scope="col">TrainName</th>
      <th scope="col">Arrival</th>
      <th scope="col">Departure</th>
      <th scope="col">Source</th>
      <th scope="col">Destination</th>
      <th scope="col">AC 1 Availability</th>
      <th scope="col">AC 2 Availability</th>
      <th scope="col">AC 3 Availability</th>
      <th scope="col">SL Availability</th>
      <th>Book Now</th>
    </tr>
  </thead>
  <tbody>
    { 
    trains.map((train,index)=>{
     return(   <tr>
      <th scope="row" key={index}>{index+1}</th>
      <td>{train.id}</td>
      <td>{train.trainName}</td>
      <td>{train.arrival}</td>
      <td>{train.departure}</td>
      <td>{train.source}</td>
      <td>{train.destination}</td>
      <td>{train.ac1Available}<br/>{train.ac1Fare}Rs</td>
      <td>{train.ac2Available}<br/>{train.ac2Fare}Rs</td>
      <td>{train.ac3Available}<br/>{train.ac3Fare}Rs</td>
      <td>{train.slAvailable}<br/>{train.slFare}Rs</td>
      <td>
      <Link className='btn btn-outline-primary mx-2' to={`/bookTicket/${train.id}`}>Book</Link>
        </td>
    </tr>)
  })}
  </tbody>
  </table>
            </div>
            
        </div>

    )
}
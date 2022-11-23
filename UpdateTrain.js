import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function UpdateTrain() {
  let navigate = useNavigate();

  const {id}=useParams();

  
  const [train, setTrain] = useState({
    trainName:"",
    departure: "",
    arrival: "",
    trainDuration:"",
    ac1: "",
    ac2: "",
    ac3: "",
    sl: "",
    source: "",
    destination: "",
    ac1Fare:"",
    ac2Fare:"",
    ac3Fare:"",
    slFare:"",
    ac1Available:"",
    ac2Available:"",
    ac3Available:"",
    slAvailable:""
  });

  const {trainName,departure,arrival,trainDuration,ac1,ac2,ac3,sl,source,destination,ac1Fare,ac2Fare,ac3Fare,slFare,ac1Available,ac2Available,ac3Available,slAvailable} = train;

  const onInputChange = (e) => {
    setTrain({ ...train, [e.target.name]: e.target.value });
  };

  useEffect(()=>{
    document.title = 'Update Train';
    loadTrain();
   // document.getElementById("create-course-form").reset();
  },[])

  const onSubmit = async (e) => {
    e.preventDefault();
    if(arrival<0.0||departure<0.0||trainDuration<0.0||trainDuration<0.1||ac1Fare<1||ac2Fare<1||ac3Fare<1||slFare<1){
      alert("enter data format not valid")
    }
    else{
      alert("data updated...")
      console.log(train);
      await axios.put(`http://localhost:8080/api/train/${id}`, train);
      navigate("/");
    }
    
  };

  const loadTrain=async()=>{
    const result=await axios.get(`http://localhost:8080/api/train/${id}`)
    setTrain(result.data)
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Train</h2>

          <form onSubmit={(e) => onSubmit(e)} id="create-course-form">
            <div className="mb-3">
              <label htmlFor="trainName" className="form-label">
              Train Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter train name"
                name="trainName"
                value={trainName}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="departure" className="form-label">
              Departure
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter departure"
                name="departure"
                value={departure}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="arrival" className="form-label">
              Arrival 
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter arrival"
                name="arrival"
                value={arrival}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="trainDuration" className="form-label">
              Train Duration 
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter train Duration"
                name="trainDuration"
                value={trainDuration}
                onChange={(e) => onInputChange(e)}
              />
            </div>
             
            <div className="mb-3">
              <label htmlFor="ac1Fare" className="form-label">
              AC 1 Fare
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Fare"
                name="ac1Fare"
                value={ac1Fare}
                onChange={(e) => onInputChange(e)}
              />
              </div>
              <div className="mb-3">
              <label htmlFor="ac2Fare" className="form-label">
              AC 2 Fare
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Fare"
                name="ac2Fare"
                value={ac2Fare}
                onChange={(e) => onInputChange(e)}
              />
            </div>
              <div className="mb-3">
              <label htmlFor="ac3Fare" className="form-label">
              AC 3 Fare 
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Fare"
                name="ac3Fare"
                value={ac3Fare}
                onChange={(e) => onInputChange(e)}
              />
              </div>
              <div className="mb-3">
              <label htmlFor="slFare" className="form-label">
              SL Fare 
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Fare"
                name="slFare"
                value={slFare}
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
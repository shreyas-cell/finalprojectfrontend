import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthService from "../Services/auth-service";

export default function UpdateTrain() {
  const date=new Date();
  var tdate;
  var tmonth;
  var tyear=date.getFullYear();
  if(date.getDate()<10){
    tdate="0"+date.getDate()
  }
  else{
    tdate=date.getDate()
  }
  if(date.getMonth()<10){
    tmonth="0"+(date.getMonth()+1)
  }
  else{
    tmonth=date.getMonth()+1
  }

  const currdate=tyear+"-"+tmonth+"-"+tdate
  useEffect(() => {
    document.title = 'Book Ticket';
  }, []);
  let navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();
  const userId=currentUser.id;
  const {id}=useParams();
  const trainId=id;
 const [firstName, setFirstName] = useState("");
 const [lastName, setLastName] = useState("");
 const [age, setAge] = useState("");
 const [doj, setDoj] = useState("");
 const [journeyClass, setJourneyClass] = useState("");
 
var [ac1Available,setac1Available]=useState("");
var [ac2Available,setac2Available]=useState("");
var [ac3Available,setac3Available]=useState("");
var [slAvailable,setslAvailable]=useState("");
var [train1,setTrain1]= useState({
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
})
 var [train, setTrain] = useState({
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
    slFare:""
});
 const onChangeFirstName = (e) => {
  const firstName = e.target.value;
  setFirstName(firstName);
};
const onChangeLastName = (e) => {
  const lastName = e.target.value;
  setLastName(lastName);
};

const onChangeAge = (e) => {
  const age = e.target.value;
  setAge(age);
};

const onChangeDoj = (e) => {
  const doj = e.target.value;
  setDoj(doj);
};

const onChangeJourneyClass = (e) => {
  const journeyClass = e.target.value;
  setJourneyClass(journeyClass);
};


  useEffect(()=>{
    loadTrain();
    //document.getElementById("create-course-form").reset();
  },[])
  var {trainName,departure,arrival,trainDuration,ac1,ac2,ac3,sl,source,destination,ac1Fare,ac2Fare,ac3Fare,slFare,ac1Available,ac2Available,ac3Available,slAvailable} = train1;
  var {trainName,departure,arrival,trainDuration,ac1,ac2,ac3,sl,source,destination,ac1Fare,ac2Fare,ac3Fare,slFare} = train;
  

  const loadTrain=async()=>{
    const result=await axios.get(`http://localhost:8080/api/train/${trainId}`)
    const res=await axios.get(`http://localhost:8080/api/train/${trainId}`)
    setTrain(result.data)
    setTrain1(res.data)
  }
  const bookTicket=async(e)=>{
    e.preventDefault();
    console.log(typeof(doj))
   /* var month=doj.getMonth()
    var date=doj.getDate()
    var year=doj.getFullYear()*/
    setDoj(doj.substring(0,10))
    console.log(doj)
    if(firstName!==null&&lastName!==null&&age>5&&doj!==null&&journeyClass!==null&&age<100){
      await axios.post(`http://localhost:8080/api/test`,{
      trainName,
      departure,
      arrival,
      source,
      destination,
       trainId,
       userId,
       firstName,
       lastName,
       age,
       doj,
       journeyClass
    })
    updateBooking();
    alert("ticket booked successfully...")
    navigate("/")
  }
  else{
    alert("enter valid data")
  }
  }
  const updateBooking =() =>{
    if("AC 2"===journeyClass){
      setac2Available((train1.ac2Available)-1);
      setac1Available(train1.ac1Available);
      setac3Available(train1.ac3Available);
      setslAvailable(train1.slAvailable);
      alert(ac2Available)
      axios.put(`http://localhost:8080/api/train/${id}`,{
      train,ac1Available,ac2Available,ac3Available,slAvailable
    })
    }
    else if("AC 3"===journeyClass){
      setac3Available(train1.ac3Available-1);
      setac2Available(train1.ac2Available);
      setac1Available(train1.ac1Available);
      setslAvailable(train1.slAvailable);
      axios.put(`http://localhost:8080/api/train/${id}`,{
        train,ac1Available,ac2Available,ac3Available,slAvailable
    })
    }
    else if("AC 1"===journeyClass){
      setac1Available(train1.ac3Available-1);
      setac3Available(train1.ac3Available);
      setac2Available(train1.ac2Available);
      setslAvailable(train.slAvailable);
      axios.put(`http://localhost:8080/api/train/${id}`,{
        train,ac1Available,ac2Available,ac3Available,slAvailable
      })
    }
    else if("SL"===journeyClass){
      setslAvailable(train1.slAvailable-1);
      setac1Available(train1.ac3Available);
      setac3Available(train1.ac3Available);
      setac2Available(train1.ac2Available);
      axios.put(`http://localhost:8080/api/train/${id}`,{
      train,ac1Available,ac2Available,ac3Available,slAvailable
      })
    }

  }

  return (
    <form onSubmit={(e) => bookTicket(e)}>
  <div class="form-column">
    <div class="form-group col-md-6">
      <label for="firstName"><b>FirstName</b></label>
      <input type="text" class="form-control" id="firstName" value={firstName} onChange={onChangeFirstName}  placeholder="firstName"/>
    </div>
    <div class="form-group col-md-6">
      <label for="lastName"><b>LastName</b></label>
      <input type="text" class="form-control" id="lastName" value={lastName} onChange={onChangeLastName}  placeholder="LastName"/>
    </div>
    <div class="form-group col-md-6">
      <label for="age"><b>Age</b></label>
      <input type="number" class="form-control" id="age" value={age} onChange={onChangeAge} placeholder="age"/>
    </div>
  </div>
  <div class="form-column">
    <div class="form-group col-md-6">
      <label for="DOJ"><b>Date Of Journey</b></label>
      <input type="date" class="form-control" min={currdate} value={doj} onChange={onChangeDoj} id="DOJ"/>
    </div>
    <div class="form-group col-md-4">
      <label for="journeyClass"><b>Choose Class</b></label>
      <select id="journeyClass" class="form-control" value={journeyClass} onChange={onChangeJourneyClass}>
        <option >Choose a Class</option>      
        <option >AC 1</option>
        <option>AC 2</option>
        <option>AC 3</option>
        <option>SL</option>
      </select>
    </div>
  </div>
<br/>
    <div class="form-column">
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button className='btn btn-success mx-2' >Book</button>

 </div>
</form>
  );
}
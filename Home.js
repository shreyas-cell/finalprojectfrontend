import axios from "axios";
import React, { createContext,useState, useEffect } from "react";
import {Link,useNavigate} from "react-router-dom"
import UserService from "../Services/user-service";
import ShowAvailability from "./ShowAvailabilty";
import DatePicker from "react-datepicker";
import AuthService from "../Services/auth-service";
import App from "../App.css"; 
const Home = () => {
  
  const [content, setContent] = useState("");
  const[content1,setContent1]=useState("");
  const [currentUser,setCurrentUser]=useState("");
  const navigate = useNavigate();
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
    const user = AuthService.getCurrentUser();
    setCurrentUser(user);
    document.title = 'Home';
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  const onChangeSource = (e) => {
    const source = e.target.value;
    setSource(source);
  };

  const onChangeDestination = (e) => {
    const destination = e.target.value;
    setDestination(destination);
  };

  const pnrStatus = (e) => {
    e.preventDefault();
    navigate("/pnrStatus");
  }
  
  const handleLoadTrain = (e)  => {
    e.preventDefault();
    if(source!==null&&destination!==null){
      ShowAvailability.loadTrain(source, destination).then(
        () => {
          navigate("/ShowAvailability");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
  
        }
      );
    }
    
         
  };
 
  return (
    <body style={{backgroundColor:"#ADD8E6"}}>
      <div class="text-end">
    <h1 >
                Hello,Welcome to  <span>Railway Reservation Center.</span> 
            </h1>
            <p>
                Have you not found the right one?
Find a service suitable for you here.
            </p>
            </div>
            <div >
            <img align="right" src="https://images.pexels.com/photos/3058928/pexels-photo-3058928.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt=""
            width={"50%"}
            height={"100%"}/>
              </div>    
    <form onSubmit={handleLoadTrain}>
  <div class="form-column">
    <div class="form-group col-md-6">
      <label for="source"><b>Source</b></label>
      <input type="text" class="form-control" id="source" value={source} onChange={onChangeSource} placeholder="source"/>
    </div>
    <div class="form-group col-md-6">
      <label for="destination"><b>Destination</b></label>
      <input type="text" class="form-control" id="destination" value={destination} onChange={onChangeDestination} placeholder="destination"/>
    </div>
  </div>
  
  <div class="form-column">
    <div class="form-group col-md-6">
      <label for="DOJ"><b>Date</b></label>
      <input type="date" class="form-control" min={currdate} id="DOJ"/>
    </div>
    <div class="form-group col-md-4">
      <label for="class"><b>Choose Class</b></label>
      <select id="class" class="form-control">
        <option selected>All Class</option>
        <option>AC 1</option>
        <option>AC 2</option>
        <option>AC 3</option>
        <option>SL</option>
      </select>
    </div>
  </div>
<br/>
    <div class="form-column">
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link class="btn btn-outline-primary" to={`/showAvailability/${source}/${destination}`}>Search</Link>
 </div>
</form>
   </body> 
  );
};

export default Home;
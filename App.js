import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./Services/auth-service";
import AddTrain from "./Components/AddTrain";
import Login from "./Components/Login";
//import Register from "./components/Register";
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import BoardUser from "./Components/BoardUser";
//import BoardModerator from "./components/BoardModerator";
import UpdateTrain from "./Components/UpdateTrain";
import AdminBoard from "./Components/AdminBoard";
import ShowAvailability from "./Components/ShowAvailabilty";
import Users from "./Components/Users";
import Signup from "./Components/Signup";
import pnrStatus from "./Components/pnrStatus";
import BookTicket from "./Components/BookTicket";
import AdminProfile from "./Components/AdminProfile";
import UserName from "./Components/UserName";
import UpdateUser from "./Components/UpdateUser";
import railways from "./Components/railways.png"
import Protected from "./Components/Protected";
import ProtectedUser  from "./Components/ProtectedUser";
import AboutUs from "./Components/AboutUs";
import ContactUs from "./Components/ContactUs";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark position-sticky sticky-top"style={{marginRight:"-185px"}}>
      <Link to="/">
          <img src={railways} style={{borderRadius: "50%"}} alt="example"/>
        </Link>
        <div className="navbar-nav mr-auto">
          {/* {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}*/}
          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Train Board
              </Link>
            </li>
          )} 

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/users"} className="nav-link">
                User
              </Link>
            </li>
          )}
          </div>
          
        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
            {currentUser.username==="skr"? (<Link to={"/AdminProfile"} className="nav-link"> <h7>Hello,</h7> {currentUser.firstName}</Link>) 
            : (<Link to={"/profile"} className="nav-link"> <h7>Hello,</h7> {currentUser.firstName}</Link>)}
              
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

          </div>
        )}
      
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Protected Component={Login}/>} />
          <Route path="/profile" element={<ProtectedUser Component={Profile}/>} />
          <Route path="/user" element={<BoardUser/>} />
          <Route path="/admin" element={<ProtectedUser Component={AdminBoard}/>} />
          <Route path="/users" element={<ProtectedUser Component={Users}/>} />
          <Route path="/ShowAvailability" element={<ProtectedUser Component={ShowAvailability}/>}/>
          <Route path="/Signup" element={<Protected Component={Signup}/>}/>
          <Route path="/pnrStatus" element={<pnrStatus/>}/>
          <Route exact path="/UpdateTrain/:id" element={<ProtectedUser Component={UpdateTrain}/>}/>
          <Route exact path="/AddTrain" element={<ProtectedUser Component={AddTrain}/>}/>
          <Route exact path="/ShowAvailability/:source/:destination" element={<ProtectedUser Component={ShowAvailability}/>}/>
          <Route exact path="/BookTicket/:id" element={<ProtectedUser Component={BookTicket}/>}/>
          <Route exact path="/AdminProfile" element={<ProtectedUser Component={AdminProfile}/>}/>
          <Route exact path="/UserName" element={<Protected Component={UserName}/>}/>
          <Route exact path="/UpdateUser/:id" element={<ProtectedUser Component={UpdateUser}/>}/>
          <Route path="/AdminProfile" element={<ProtectedUser Component={AdminProfile}/>} />
          <Route path="/AboutUs" element={<AboutUs/>} />
          <Route path="/ContactUs" element={<ContactUs/>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import UserService from "../Services/user-service";
import axios from "axios"
const Users = () => {
  useEffect(()=>{
    document.title = 'Active Users';
  },[]);
  const [users,setUsers]=useState([]);
  const [query, setQuery] = useState("");
  const deleteUser=async(id)=>{
    await axios.delete("http://localhost:8080/api/test/"+id);
    loadUsers();
  }
  const loadUsers=async ()=>{
    UserService.getUsers().then(
        (res)=>{
          setUsers(res.data);
          console.log(res)
        },
        (err)=>{
          const _con=(err.response && err.response.data &&err.response.data.message)|| 
          (err.message)||(err.toString());
          setUsers(_con);
        }
      );
  
  }
  useEffect(() => {
       loadUsers();
  }, []);

  return (
    <div className="container">
      <header >
        <h1>Users</h1>
       
      </header>
      <div className='container'>
            <div className='py-4'>
            <table className="table table-hover table-dark">
  <thead>
    <tr>
      <th scope="col">Sr No.</th>
      <th scope="col">userid</th>
      <th scope="col">FirstName</th>
      <th scope="col">LastName</th>
      <th scope="col">Username</th>
      <th scope="col">Email</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    { 
    users.map((user,index)=>{
     return(   <tr>
      <th scope="row" key={index}>{index+1}</th>
      <td>{user.id}</td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>
    <Link className='btn btn-outline-primary mx-2' to={`/updateUser/${user.id}`}>Update</Link>
      </td>
      <td>
      {user.username==="skr"? 
      (<button className='btn btn-danger mx-2' disabled={true} onClick={()=>deleteUser(user.id)}>Delete</button>)
        :(<button className='btn btn-danger mx-2' onClick={()=>deleteUser(user.id)}>Delete</button>)
      
       }  </td>
    </tr>)
})}
  </tbody>
</table>
            </div>
            
        </div>
    </div>
    
  );
};

export default Users;
import logo from './logo.svg';
import './App.css';

import axios from "axios";
import React,{useState} from "react"



function App() {

  let [trains,setTrains]=useState([]);
  let [employees,setEmployees] = useState([]);

  let getTrains = async()=>{
    let response= await axios.get("/trainsOfIndia");
  
    setTrains(response.data)
    console.log(response)
    };


    
  let getUsersoneFromAtlas = async()=>{
    let response = await axios.get ("/getUsers");
    setEmployees(response.data);
    console.log(response);
  };


  return (
    <div className="App">

     <button onClick={()=>{
        getUsersoneFromAtlas();
      }}>Get Users</button>
      <button onClick={()=>{
      getTrains();
     }}>Get Trains</button>
     {trains.map((train)=>{
      return<h2>{train}</h2>;
     })}
       {employees.map((employee)=>{
      return<h2>{employee.name}</h2>
     })}
    </div>
  );
}

export default App;

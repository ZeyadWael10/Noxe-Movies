import './App.css';
import Layout from './component/layout/Layout';
import {createBrowserRouter,Navigate,RouterProvider } from "react-router-dom"
import Notfound from './component/notfound/Notfound';
import People from './component/people/People';
import Movies from './component/movies/Movies';
import Register from './component/register/Register';
import Login from './component/login/Login';
import Home from './component/home/Home';
import jwtDecode from 'jwt-decode';
import { useState , useEffect } from 'react';
import Details from './component/details/Details';
import ActorDetails from './component/actor/ActorDetails';
import Search from './component/Search/Search';
import Profile from './component/Profile/Profile';

function App() {
  useEffect(()=>{
    if(localStorage.getItem("token") !== null)
    saveCurrentUser()
  },[])
  function logOut(){
    localStorage.removeItem("token")
    setUser(null)
  }
  function Protect(props){
    if(localStorage.getItem("token") === null)
    return <Navigate to="/login"/>
    else 
    return props.children
  }
  let[user,setUser]=useState(null)
  function saveCurrentUser(){
    let encoded = localStorage.getItem("token")
    let decoded = jwtDecode(encoded)
    setUser(decoded)
  }
const routes = createBrowserRouter([{path:"/",element:<Layout data={user} logOut={logOut}/>,children:[
  {index:true,element:<Login saveCurrentUser={saveCurrentUser}/>},
  {path:"/login",element:<Login saveCurrentUser={saveCurrentUser}/>},
  {path:"/people",element:<Protect><People/></Protect>},
  {path:"/home",element:<Protect><Home/></Protect>},
  {path:"/movies",element:<Protect><Movies/></Protect>},
  {path:"/search",element:<Protect><Search/></Protect>},
  {path:"/profile",element:<Protect><Profile data={user}/></Protect>},
  {path:"/register",element:<Register/>},
  {path:"/details/:mediaType/:id",element:<Protect><Details/></Protect>},
  {path:"/details/people/:id",element:<Protect><ActorDetails/></Protect>},
  {path:"*",element:<Notfound/>}]},])
  return (
    <div>
      <RouterProvider router={routes}></RouterProvider>
    </div>
  );
}

export default App;

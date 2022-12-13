import React from 'react'
import Footer from '../footer/Footer'
import Navbar from '../navbar/Navbar'
import {Outlet} from "react-router-dom"
export default function layout(props) {
  return (<div>
    <Navbar logOut={props.logOut} data={props.data}/>
    <Outlet/>
    <Footer/>
  </div>)
}

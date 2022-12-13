import React, { useState } from 'react'
import Axios from "axios"
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';
export default function Register() {
  let Navigate = useNavigate();
  let [errormsg, setErrorMsg] = useState("")//api errors
  let [errorList, setErrorList] = useState([])//joi errors 
  let [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: "",
    email: "",
    password: ""
  });
  function getDataFromUser(e) {
    let copy = { ...user };
    copy[e.target.id] = e.target.value
    setUser(copy)
  }
  function submitUser(e) {
    e.preventDefault()
    let resValid = validation();
    if (resValid.error) {
      setErrorList(resValid.error.details)
    }
    else {
      setErrorList([])
      getUserInfoFromApi(user)
    }
  }
  function validation() {
    const schema = Joi.object({
      first_name: Joi.string().min(3).max(30).required(),
      last_name: Joi.string().min(3).max(30).required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
      email: Joi.string().email({
        minDomainSegments: 2, tlds: { allow: ["com", "net"] },
      }),
      age: Joi.number().min(16).max(60).required(),
    })
    return schema.validate(user, { abortEarly: false });
  }

  async function getUserInfoFromApi(res) {
    let { data } = await Axios.post(`https://route-movies-api.vercel.app/signup`, res)
    if (data.message === "success") {
      setErrorMsg('')
      Navigate("/login")
    }
    else {
      setErrorMsg(data.message)
    }
  }
  return (
    <div className='my-4 py-4'>
      <h2 className='text-center text-white my-4'>Registration Form</h2>
      <div className="row gy-4">
        <div className="container">
        <div className="col-sm-12">
          {errormsg ? <span className='py-2 mb-5 alert alert-danger'>{errormsg}</span> : ""}
        </div>
        </div>
        <div className="col-sm-12">
          {errorList.map((errItem, index) => <span className='py-2 mx-1 alert alert-danger' key={index}>{errItem.message}</span>)}
        </div>
      </div>
      <div className="container">
        <form className='my-3' onSubmit={submitUser}>
          <label className='my-1' htmlFor="first_name">First Name:</label>
          <input type="text" className='form-control py-2' placeholder='First Name' onChange={getDataFromUser} id='first_name' />
          <label className='my-1' htmlFor="last_name">Last Name:</label>
          <input type="text" className='form-control py-2' placeholder='Last Name' onChange={getDataFromUser} id='last_name' />
          <label className='my-1' htmlFor="age">Age:</label>
          <input type="text" className='form-control py-2' placeholder='Age' onChange={getDataFromUser} id='age' />
          <label className='my-1' htmlFor="email">Email:</label>
          <input type="email" className='form-control py-2' placeholder='Email' onChange={getDataFromUser} id='email' />
          <label className='my-1' htmlFor="password">Password:</label>
          <input type="password" className='form-control py-2' placeholder='Password' onChange={getDataFromUser} id='password' />
          <button type='submit' className='btn btn-primary my-2 float-end'>Register</button>
        </form>
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import Axios from "axios"
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';
export default function Login(props) {
  let Navigate = useNavigate();
  let [errormsg, setErrorMsg] = useState("")//api errors
  let [errorList, setErrorList] = useState([])//joi errors 
  let [user, setUser] = useState({
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
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
      email: Joi.string().email({
        minDomainSegments: 2, tlds: { allow: ["com", "net"] },
      }),
    })
    return schema.validate(user, { abortEarly: false });
  }

  async function getUserInfoFromApi(res) {
    let { data } = await Axios.post(`https://route-movies-api.vercel.app/signin`, res)
    if (data.message === "success") {
      setErrorMsg('')
      localStorage.setItem("token",data.token)
      props.saveCurrentUser()
      Navigate("/home")
    }
    else {
      setErrorMsg(data.message)
    }
  }
  return (
    <div className='my-5 py-5'>
      <h2 className='text-center text-white my-5'>Login</h2>
      <div className="row my-5 justify-content-center gy-4">
        <div className="container">
        <div className="col-sm-12 d-flex justify-content-center w-75">
          {errormsg ? <span className='py-2 mb-5 alert alert-danger'>{errormsg}</span> : ""}
        </div>
        </div>
        <div className="col-sm-12 d-flex justify-content-center w-75">
          {errorList.map((errItem, index) => <p className='py-2 mx-1 alert alert-danger' key={index}>{errItem.message}</p>)}
        </div> 
      </div>
      <div className="container py-1">
        <form className='my-3' onSubmit={submitUser}>
          <label className='my-1' htmlFor="email">Email:</label>
          <input type="email" className='form-control py-2' placeholder='Email' onChange={getDataFromUser} id='email' />
          <label className='my-1' htmlFor="password">Password:</label>
          <input type="password" className='form-control py-2' placeholder='Password' onChange={getDataFromUser} id='password' />
          <button type='submit' className='btn btn-primary my-2 float-end'>Login</button>
        </form>
      </div>
    </div>
  )
}

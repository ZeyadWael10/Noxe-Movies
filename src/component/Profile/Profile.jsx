import React from 'react'

export default function Profile(props) {
  return (
    <div className='container text-white py-5 my-5'>
      <div className="row my-5 py-5">
    <div className="col-sm-12 my-4 text-center">
          <h2 className="fs-1">Profile</h2>
    </div>
        <div className="col-sm-12 my-4 text-center">
          <h2>Name: {props.data.first_name} {props.data.last_name}</h2>
          <h2>Email: {props.data.email}</h2>
          <h2>Age: {props.data.age}</h2>
        </div>
      </div>
    </div>
  )
}

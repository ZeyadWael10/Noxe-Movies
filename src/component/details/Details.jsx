import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
export default function Details() {
  let [object, setObject] = useState({})
  let [genres, setGenres] = useState([])
  let params = useParams()
  const imgSrc = "https://image.tmdb.org/t/p/w500";
  async function getDetails() {
    let { data } = await axios.get(`https://api.themoviedb.org/3/${params.mediaType}/${params.id}?api_key=ad6a99d4a561224de85963f48507fb49`)
    setObject(data)
    setGenres(data.genres)
  }
  useEffect(() => {
    getDetails()
  }, [])
  return (
    <div className="py-2">
      <div className="container">
        <div className="row py-5">
          <div className="col-md-4">
            {object.poster_path ? <img src={imgSrc+object.poster_path} className="w-100 rounded" alt="" /> : ''}
            {object.profile_path ? <img src={imgSrc+object.profile_path} className="w-100 rounded" alt="" /> : ""}
            {!object.profile_path && !object.poster_path ? <img src="" className='w-100 rounded' /> : ""}
          </div>
          <div className="col-md-8 text-white">
            {object.title?<h2 className='fw-bolder'>Name: {object.title}</h2>:<h2 className='fw-bolder'>Name: {object.name}</h2>}
            {object.biography? <blockquote>Biography: {object.biography}</blockquote>: <blockquote>Overview: {object.overview}</blockquote>}
            {object.place_of_birth?<p className='fs-6'>Place Of Birth: {object.place_of_birth}</p>:""}
            {object.known_for_department?<h5>Department: {object.known_for_department}</h5>:""}
           {object.genres? <p>{genres.map((genres, index) => <span key={index} className='bg-info p-2 mx-1 rounded-2'>{genres.name}</span>)}</p>:""}
           {object.original_language? <h5>Language: {object.original_language}</h5>:""}
            {object.vote_average?<p className='fs-6'>Rating: {object.vote_average.toFixed(1)} %</p>:""}
           {object.release_date? <p className='text-muted'>Relases Date: {object.release_date}</p>:""}
           {object.first_air_date? <p className='text-muted'>Relases Date: {object.first_air_date}</p>:""}

           
          </div>
        </div>
      </div>
    </div>
  )
}

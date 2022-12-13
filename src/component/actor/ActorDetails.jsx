import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
export default function ActorDetails() {
    let [object, setObject] = useState({})
    let { id } = useParams()
    const imgSrc = "https://image.tmdb.org/t/p/w500";
    async function getActorDetails(id) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=ad6a99d4a561224de85963f48507fb49&language=en-US`)
        setObject(data)
    }
    useEffect(() => {
        getActorDetails(id)
    }, [])
    return (

        <div className="container">
            <div className="row py-5">
                <div className="col-md-4">
                    <img src={imgSrc + object.profile_path} className="w-100 rounded" alt="" />
                </div>
                <div className="col-md-8 text-white">
                    <h2 className='fw-bolder'>{object.name}</h2>
                    <blockquote>Biography: {object.biography}</blockquote>
                    <h5>Department: {object.known_for_department}</h5>
                    <p className='fs-6'>Place Of Birth: {object.place_of_birth}</p>
                </div>
            </div>
        </div>

    )
}


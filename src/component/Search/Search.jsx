import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import avatar from "../../image.webp";

export default function Search() {
    const imgSrc = "https://image.tmdb.org/t/p/w500";
    let [userInput, setUserInput] = useState("")
    let [result, setResult] = useState([])
    function submitInputs(e) {
        e.preventDefault()
    }
    async function getSearchData() {
        let { data } = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=ad6a99d4a561224de85963f48507fb49&query=${userInput}&language=en-US&page=1&include_adult=false`)
        setResult(data.results)
    }
    useEffect(() => {
        getSearchData();
    }, [])
    return (<>
      <h2 className='fs-1 text-white my-5 py-4 text-center'>Search</h2>
        <div className='container my-5 py-5'>
            <form className="d-flex justify-content-between" role="search" onSubmit={submitInputs}>
                <input className="form-control my-1" type="search" placeholder="Search Movies, TV Shows, People" onChange={(e) => { getSearchData(setUserInput(e.target.value)) }} aria-label="Search" />
            </form>
            <div className="row my-5 py-5">
                {result.map((item, index) => <div key={index} className="col-md-2">
                    <Link to={`/details/${item.media_type.toString()}/${item.id}`} className="text-white text-decoration-none">
                        {item.poster_path ? <img src={imgSrc + item.poster_path} className="w-100 rounded" alt="" /> : ""}
                        {item.profile_path ? <img src={imgSrc + item.profile_path} className="w-100 rounded" alt="" /> : ""}
                        {!item.profile_path && !item.poster_path ?  <img src={avatar} className="w-100 rounded"/> : ""}
                        {item.title?<h2>{item.title}</h2>:<h2>{item.name}</h2>}
                    </Link>
                </div>)}
            </div>
        </div>
        </>
    )
}

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import avatar from "../../image.webp";

export default function People() {
  let pages = [1, 2, 3, 4, 5]
  let [peopleArr, setPeopleArr] = useState([])
  let [globalPage, setGlobalPage] = useState(0)
  const imgSrc = "https://image.tmdb.org/t/p/w500";
  async function getPeople(pageNumber) {
    setGlobalPage = (pageNumber)
    let { data } = await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=ad6a99d4a561224de85963f48507fb49&language=en-US&page=${pageNumber}`)
    setPeopleArr(data.results)
  }
  useEffect(() => {
    getPeople(1)
  }, [])
  function nextPage() {
    if (globalPage === 1000)
      globalPage = 1000
    else
      globalPage++;
    getPeople(globalPage)
  }
  function previousPage() {
    if (globalPage === 1)
      globalPage = 1
    else
      globalPage--;
    getPeople(globalPage)
  }
    return (<>
      <h2 className='fs-1 text-white mt-4 text-center'>Trending People</h2>
    <div className="container py-5 my-5">
        <div className="row align-items-center">
          {peopleArr.map((item, index) => 
          <div key={index} className="col-md-2">
            <Link to={`/details/people/${item.id}`} className="text-white text-decoration-none">
            {item.profile_path ?  <img src={imgSrc + item.profile_path} className="w-100" alt="" />:<img src={avatar} className="w-100 rounded"/>}
            <h3 className='text-white'>{item.name}</h3>
            </Link>
            </div>)}
        </div>
      </div>
      <nav className='py-3' aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          {/* <li className="page-item" onClick={previousPage}>
            <a className="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li> */}
          {pages.map((num, index) => <li key={index} onClick={() => { getPeople(num) }} className="page-item"><a className="page-link">{num}</a></li>)}
          {/* <li className="page-item" onClick={nextPage}>
            <a className="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li> */}
        </ul>
      </nav>
    </>
  )
}


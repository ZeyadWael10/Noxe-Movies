import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Movies() {
  let pages = [1, 2, 3, 4, 5]
  let [moviesArr, setMoviesArr] = useState([])
  let [globalPage, setGlobalPage] = useState(0)
  const imgSrc = "https://image.tmdb.org/t/p/w500";
  async function getMovies(pageNumber) {
    setGlobalPage = (pageNumber)
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=ad6a99d4a561224de85963f48507fb49&page=${pageNumber}`)
    setMoviesArr(data.results)
  }
  useEffect(() => {
    getMovies(1)
  }, [])
  function nextPage() {
    if (globalPage === 1000)
      globalPage = 1000
    else
      globalPage++;
    getMovies(globalPage)
  }
  function previousPage() {
    if (globalPage === 1)
      globalPage = 1
    else
      globalPage--;
    getMovies(globalPage)
  }
  return (
    <>
      <h2 className='fs-1 text-white mt-4 text-center'>Trending Movies</h2>
      <div className="container my-5 py-5">
        <div className="row align-items-center">
          {moviesArr.map((item, index) => 
          <div key={index} className="col-md-2">
            <Link to={`/details/${item.media_type.toString()}/${item.id}`} className="text-white text-decoration-none">
            <img src={imgSrc + item.poster_path} className="w-100" alt="" />
            <h3 className='text-white'>{item.title}</h3>
            </Link>
            </div>)}
        </div>
      </div>
      <nav className='' aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          {/* <li className="page-item" onClick={previousPage}>
            <a className="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li> */}
          {pages.map((num, index) => <li key={index} onClick={() => { getMovies(num) }} className="page-item"><a className="page-link">{num}</a></li>)}
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

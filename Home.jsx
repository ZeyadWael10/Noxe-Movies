import axios from 'axios'
import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import style from "./home.module.css"
import avatar from "../../image.webp";

export default function Home() {
  let [moviesArr,setMoviesArr] = useState([])
  let [tvsArr,setTvsArr] = useState([])
  let [peopleArr,setPeopleArr] = useState([])
  const imgSrc = "https://image.tmdb.org/t/p/w500";
  async function getApi(mediatype,callback){
    let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${mediatype}/day?api_key=ad6a99d4a561224de85963f48507fb49`)
    callback(data.results.slice(0,10))
  }
  useEffect(()=>{
    getApi("movie",setMoviesArr)
    getApi("tv",setTvsArr)
    getApi("person",setPeopleArr)
  },[])
  return (
    <div className={style.bgColor}>
      <div className="container py-5 mb-5">
      <div className="row align-items-center">
        <div className="col-md-4 py-4">
          <div className={`mb-3 ${style.bordertop} rounded`}></div>
          <h2 className='text-white'>
            Trending <br/> Movies <br/>To Watch <br/>Now
          </h2>
          <p className="text-muted">Lorem ipsum dolor sit.</p>
          <div className={`mt-3 ${style.borderbottom} rounded`}></div>
        </div>
      {moviesArr.map((item,index)=> <div key={index} className="col-md-2 p-2"><Link to={`/details/${item.media_type.toString()}/${item.id}`} className="text-white text-decoration-none">
      {item.poster_path ?  <img src={imgSrc + item.poster_path} className="w-100" alt="" />:<img src={avatar} className="w-100 rounded"/>}
            <h3 className='text-white fs-5'>{item.title}</h3>
            </Link></div>)}
      <div className="col-md-4 gy-2">
      <div className={`mb-3 ${style.bordertop} rounded`}></div>
          <h2 className='text-white'>
            Trending <br/> Tv Shows <br/>To Watch <br/>Now
          </h2>
          <p className="text-muted">Lorem ipsum dolor sit.</p>
          <div className={`mt-3 ${style.borderbottom} rounded`}></div>
        </div>
      {tvsArr.map((item,index)=> <div key={index} className="col-md-2 p-2"><Link to={`/details/${item.media_type.toString()}/${item.id}`} className="text-white text-decoration-none">
      {item.poster_path ?  <img src={imgSrc + item.poster_path} className="w-100" alt="" />:<img src={avatar} className="w-100 rounded"/>}
            <h3 className='text-white fs-5'>{item.name}</h3>
            </Link></div>)}
      <div className="col-md-4 gy-2">
      <div className={`mb-3 ${style.bordertop} rounded`}></div>
          <h2 className='text-white'>
            Trending <br/> Celebrites <br/>To Watch <br/>Now
          </h2>
          <p className="text-muted">Lorem ipsum dolor sit.</p>
          <div className={`mt-3 ${style.borderbottom} rounded`}></div>
        </div>
      {peopleArr.map((item,index)=> <div key={index} className="col-md-2 p-2"><Link to={`/details/${item.media_type.toString()}/${item.id}`} className="text-white text-decoration-none">
      {item.profile_path ?  <img src={imgSrc + item.profile_path} className="w-100" alt="" />:<img src={avatar} className="w-100 rounded"/>}
            <h3 className='text-white fs-5'>{item.name}</h3>
            </Link></div>)}
      </div>
      </div>
    </div>
  )
}

import React from 'react'
import { Link } from "react-router-dom"
export default function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-lg bg-dark shadow-lg">
            <div className="container-fluid">
                <Link className="navbar-brand text-white" to="home">Noxe</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {props.data ? <ul className="navbar-nav me-auto mb-lg-0 ">
                        <li className="nav-item">
                            <Link className="nav-link text-white active" aria-current="page" to="home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="movies">Movies</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="people">People</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="search">Search</Link>
                        </li>
                    </ul> : ""}
                    <ul className="navbar-nav d-flex align-items-center ms-auto mb-lg-0">
                        {props.data ? <>
                            <li className='nav-item text-white my-2 mx-3'><Link ><i className='fa-brands text-white fa-facebook'></i></Link></li>
                            <li className='nav-item text-white my-2 mx-2'><Link ><i className='fa-brands text-white fa-twitter'></i></Link></li>
                            <li className='nav-item text-white my-2 mx-2'><Link ><i className='fa-brands text-white fa-google'></i></Link></li>
                            <li className="nav-item"><Link onClick={props.logOut} className="nav-link text-white my-auto cursor-pointer">Logout</Link></li>
                            <li className="nav-item"><Link onClick={props.data} className="nav-link text-white my-auto cursor-pointer" to="profile">Welcome {props.data.first_name}</Link></li></> : <>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="register">Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="">Login</Link>
                            </li></>}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

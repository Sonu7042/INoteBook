import React from 'react'
import { Link,useNavigate, useLocation } from 'react-router-dom'

const Navbar = () => {
    const navigate=useNavigate()
    const location=useLocation()

    const HandleLogout=(e)=>{
        e.preventDefault()
        localStorage.removeItem('token')
        navigate('/login')

    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Inotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==='/'?"active":""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link  ${location.pathname==='/about'?"active":""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token')?<form className="d-flex" >
                            <Link to="/signup"><button className="btn btn-primary mx-2" type="submit">SignUp</button></Link>
                            <Link to="/login"><button className="btn btn-primary mx-2" type="submit">Login</button></Link>
                            
                        </form>: <button className='btn btn-primary' onClick={HandleLogout}>Logout</button>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
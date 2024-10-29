import React, { useContext } from 'react'
import {Navbar , Container}  from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { tokenAuthContext } from '../contexts/Authcontext';

const Header = ({insideDashboard}) => {
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)
  const navigate = useNavigate()

  const handleLogout = ()=>{
    sessionStorage.clear()
    setIsAuthorised(false)
    navigate('/')
  }
  
  return (
    <Navbar style={{zIndex:'10'}} className='position-fixed w-100 top-0 border rounded ' >
       <Container>
        <Navbar.Brand>
          <Link className='fw-bolder' style={{textDecoration:'none',color:'white'}} to={'/'}><i className='fa-brands fa-docker'></i> Project Fair </Link>
        </Navbar.Brand>
        {
          insideDashboard &&
          <div className='ms-auto'>
            <button onClick={handleLogout} className='btn btn-link fw-bolder'>Logout <i className="fa-solid fa-right-from-bracket"></i></button>
          </div>
        }
       </Container>
    </Navbar>

   
  )
}

export default Header
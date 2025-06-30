import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { isUserLoggedIn, logout } from '../services/AuthService'

const HeaderComponent = () => {

  const isAuth = isUserLoggedIn();
  const navigator = useNavigate();

  function handleLogout(){
    logout();
    // navigator('/login');
  }

  return (
    <div>
        <header>
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                <h3 className='text-white bg-dark' style={{marginLeft: '10px'}}>TaskHive</h3>
                <div className="collapse navbar-collapse" id="navbarNav">
                {
                  isAuth &&
                    <ul className="navbar-nav">
                      <li className="nav-item" style={{marginLeft: '20px'}}>
                        <NavLink className='nav-link' to='/todos'>Todos</NavLink>
                      </li>
                    </ul>
                }
                </div>
                <ul className="navbar-nav">
                {
                  !isAuth &&
                    <li className="nav-item" style={{marginLeft: '20px'}}>
                      <NavLink className='nav-link' to='/register'>Register</NavLink>
                    </li>
                }
                {   
                    !isAuth &&
                    <li className="nav-item" style={{marginLeft: '10px', marginRight: '10px'}}>
                      <NavLink className='nav-link' to='/login'>Login</NavLink>
                    </li>
                }
                {   
                    isAuth &&
                    <li className="nav-item" style={{marginRight: '10px'}}>
                      <NavLink className='nav-link' to='/login' onClick={handleLogout}>Logout</NavLink>
                    </li>
                }
                </ul>
            </nav>
        </header>
    </div>
  )
}

export default HeaderComponent
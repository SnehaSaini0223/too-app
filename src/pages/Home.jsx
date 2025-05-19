
import React from 'react'
import illustration from '../assets/illustration.png'
import { NavLink, Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div className='container-fluid h-100'>
      <div className='row h-100'>
        <div className='col-lg-6 d-flex align-items-center 
                justify-content-center h-100 flex-column bg-primary text-white'>
          <h1 className='text-center mb-3 text-uppercase display-6'>
            An App to<br />
            make your life<br />
            <span className='display-2'>Organized</span>
          </h1>

          <img src={illustration} />

        </div>

        <div className='col-lg-6 d-flex align-items-center justify-content-center h-g-100 flex-column'>

          <div className='card rounded-0 w-50'>
            <div className='card-header d-flex align-items-center p-0 text-center'>
              <NavLink to="/login" className={`w - 50 p-2 align-items-center bg-primary text-white`}>Login</NavLink>
              <NavLink to="/register" className={`w - 50 p-2 align-items-center bg-primary text-white`}>Register</NavLink>

            </div>
            <div className='card-body'>
              <Outlet />
            </div>

          </div>


        </div>
      </div >


    </div >

  )
}

export default Home;
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { removeUser } from '../utils/userSlice'
import { removeFeed } from '../utils/feedSlice'

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user)

  const handleLogout = async() => {
    try{
      await axios.post(BASE_URL + '/logout', {}, {
        withCredentials: true
      })
      dispatch(removeUser())
      dispatch(removeFeed())
      return navigate('/login')
    }
    catch(err){
      console.log("Error: " + err.message);      
    }
  }

  return (
    <div className="navbar bg-base-300">
    <div className="flex-1">
      <Link to='/' className="btn btn-ghost text-xl">DevFinder</Link>
    </div>
    {user && <div className="flex-none gap-2">
        <p>Welcome, {user.firstName}</p>
      <div className="dropdown dropdown-end mx-4">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src={user.photoUrl}
              // src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" 
              />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li>
            <Link to='/profile' className="justify-between">
              Profile
              <span className="badge"></span>
            </Link>
          </li>
          <li><Link to='/feed' className='cursor-pointer'>Feed</Link></li>
          <li><Link to='/connections' className='cursor-pointer'>My Connections</Link></li>
          <li><Link to='/requests' className='cursor-pointer'>Received Requests</Link></li>
          <li><a className='cursor-pointer' onClick={handleLogout}>Logout</a></li>
        </ul>
      </div>
    </div>
    }
  </div>
  )
}

export default NavBar
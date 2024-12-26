import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import {BASE_URL} from '../utils/constants'

const Login = () => {

  const [emailId, setEmailId] = useState('akshit@gmail.com')
  const [password, setPassword] = useState('Akshit@123')
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleLogin = async() => {
    try{
      const res = await axios.post(BASE_URL + '/login',{
          emailId, password
        }, {withCredentials: true});

        dispatch(addUser(res.data.data));

        navigate('/feed');
    } 
    catch(err){
        console.error(err);
    } 
  }

  return (
    <div className='flex justify-center my-24'>
      <div className="card bg-base-300 w-[420px] shadow-xl">
        <div className="card-body">
          <h2 className="card-title mx-auto">Login</h2>
          <div className='m-2 p-2 flex flex-col'>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email ID</span>
              </div>
              <input type="email" 
              value={emailId}
              onChange={(e)=>setEmailId(e.target.value)}
              placeholder="Email" className="input input-bordered w-full max-w-xs" />
            </label>

            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input type="password" 
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="input input-bordered w-full max-w-xs" />              
            </label>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary w-24 text-md" onClick={handleLogin}>Login</button>
          </div>
        </div>
    </div>
    </div>
  )
}

export default Login
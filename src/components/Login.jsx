import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import {BASE_URL} from '../utils/constants'

const Login = () => {

  const [isLoginForm, setIsLoginForm] = useState(true)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')   
  const [emailId, setEmailId] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignUp = async () => {
    try{
      const res = await axios.post(BASE_URL + '/signup' , {
        firstName,
        lastName,
        emailId,
        password
      }, {
        withCredentials: true
      })

      dispatch(addUser(res.data.data));

      return navigate('/profile');
    }
    catch(err){
      setError(err?.response?.data?.data || "Something went wrong")
    }
  }


  const handleLogin = async() => {
    try{
      const res = await axios.post(BASE_URL + '/login',{
          emailId, password
        }, {withCredentials: true});

        dispatch(addUser(res.data.data));

        return navigate('/feed');
    } 
    catch(err){
      setError(err?.response?.data?.data || "Something went wrong")
      // console.log(err?.response?.data?.data);    
    } 
  }

  return (
    <div className='flex justify-center my-20'>
      <div className="card bg-base-300 w-[420px] shadow-xl">
        <div className="card-body">
          <h2 className="card-title mx-auto">{isLoginForm ? "Login" : "SignUp"}</h2>
          <div className='m-2 p-2 flex flex-col'>

          {!isLoginForm && <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input type="text" 
              value={firstName}
              onChange={(e)=>setFirstName(e.target.value)}
              placeholder="" className="input input-bordered w-full max-w-xs" />
            </label>}

            {!isLoginForm && <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input type="text" 
              value={lastName}
              onChange={(e)=>setLastName(e.target.value)}
              placeholder="" className="input input-bordered w-full max-w-xs" />
            </label>}


            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email ID</span>
              </div>
              <input type="email" 
              value={emailId}
              onChange={(e)=>setEmailId(e.target.value)}
              placeholder="" className="input input-bordered w-full max-w-xs" />
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

          <p className='px-6 pb-1 text-red-500'>{error}</p>
          
          <div className="card-actions justify-center">
            <button className="btn btn-primary w-24 text-md" 
              onClick={isLoginForm ? handleLogin : handleSignUp}>
              {isLoginForm ? "Login" : "SignUp"}
            </button>
          </div>

          <p className='m-auto py-2 cursor-pointer underline'
            onClick={() => setIsLoginForm(value => !value)}>
            {isLoginForm ? "New User ? SignUp" : "Existing User ? Login"}
          </p>
        </div>
    </div>
    </div>
  )
}

export default Login
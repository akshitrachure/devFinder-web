import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UserCard from './UserCard'
import axios from 'axios'
import {BASE_URL} from '../utils/constants'
import {addUser, removeUser} from '../utils/userSlice'

const EditProfile = ({user}) => {
    const [firstName, setFirstName] = useState(user.firstName || "")
    const [lastName, setLastName] = useState(user.lastName || "")
    const [age, setAge] = useState(user.age || "")
    const [gender, setGender] = useState(user.gender || "")
    const [about, setAbout] = useState(user.about || "")
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "")
    const [skills, setSkills] = useState(user.skills)

    const [error, setError] = useState('')
    const [showToast, setShowToast] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleEditSave = async () => {
        setError('');

        try{
            const res = axios.patch(BASE_URL + '/profile/edit', {
                firstName, lastName, age, gender, photoUrl, about, skills
            },
            {
                withCredentials: true
            })

            dispatch(addUser((await res).data.data))

            setShowToast(true)
            
            const timer = setTimeout(()=>{
                setShowToast(false);
            },3000)
            return () => clearTimeout(timer)
        }
        catch(err){
            setError(err?.response?.data)
        }
    }
  
  
    return (
        <>
            {showToast && <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Your profile has been updated successfully!!</span>
                </div>
            </div>}
            <div className='flex justify-center my-10 gap-12'>        
                <div className='flex justify-center my-10'>
                    <div className="card bg-base-300 w-[420px] shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title mx-auto">Edit Profile</h2>
                        <div className='m-2 p-2 flex flex-col'>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                            <span className="label-text">First Name</span>
                            </div>
                            <input type="text"
                            value={firstName}
                            onChange={(e)=>setFirstName(e.target.value)}
                            placeholder="" className="input input-bordered w-full max-w-xs" />
                        </label>
            
                        <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                            <span className="label-text">Last Name</span>
                            </div>
                            <input type="text" 
                            value={lastName}
                            onChange={(e)=>setLastName(e.target.value)}
                            className="input input-bordered w-full max-w-xs" />              
                        </label>

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                            <span className="label-text">Photo URL</span>
                            </div>
                            <input type="text" 
                            value={photoUrl}
                            onChange={(e)=>setPhotoUrl(e.target.value)}
                            placeholder="" className="input input-bordered w-full max-w-xs" />
                        </label>

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                            <span className="label-text">Age</span>
                            </div>
                            <input type="number" 
                            value={age}
                            onChange={(e)=>setAge(e.target.value)}
                            placeholder="" className="input input-bordered w-full max-w-xs" />
                        </label>

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                            <span className="label-text">Gender</span>
                            </div>
                            <select value={gender} 
                            onChange={(e)=>setGender(e.target.value)}
                            className="input input-bordered w-full max-w-xs">
                                <option value=''>--None--</option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                                <option value='Others'>Others</option>
                            </select>
                            
                        </label>

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                            <span className="label-text">About</span>
                            </div>
                            <textarea className="textarea textarea-bordered" 
                            value={about}
                            onChange={(e)=>setAbout(e.target.value)}
                            ></textarea>
                            {/* <input type="text" 
                            placeholder="" className="input input-bordered w-full max-w-xs" /> */}
                        </label>


                        </div>
                        <div className="card-actions justify-center">
                        <button className="btn btn-primary w-24 text-md" onClick={handleEditSave} >Save Profile</button>
                        </div>
                    </div>
                </div>
                </div>
                <UserCard user = {{firstName, lastName, age, gender, photoUrl, about, skills}}/>
            </div>
        </>
       
    )
}

export default EditProfile
import React from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {removeUserFromFeed} from '../utils/feedSlice'
import {BASE_URL} from '../utils/constants'

const UserCard = ({user}) => {
  const dispatch = useDispatch()
  const {_id, firstName, lastName, age, gender, photoUrl, about, skills} = user


  const handleSendRequest = async(status, id) => {
    try{
      const res = await axios.post(BASE_URL + '/request/send/' + status + '/' + id, {}, {withCredentials: true})
      dispatch(removeUserFromFeed(id));
    }
    catch(err){
      console.log(err.message);      
    }
  }
    
  return (
    <div>
        <div className="card bg-base-300 w-80 shadow-xl my-10 mx-auto ">
        <figure>
            <img
            src={photoUrl}
            alt={firstName} />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{firstName + " " + lastName}</h2>
            <p className='py-2'>{age + " "  + gender}</p>
            <p className='py-2'>{about}</p>
            <div className='flex gap-x-4 flex-wrap py-2'>
                {skills?.map(skill => <p className='' key={skill}>{skill}</p>)}
            </div>
            <div className="card-actions justify-between my-4">
            <button className="btn btn-primary" onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
            <button className="btn btn-secondary" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default UserCard
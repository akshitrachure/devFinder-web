import React, { useEffect } from 'react'
import axios from 'axios'
import {BASE_URL} from '../utils/constants'
import {useDispatch, useSelector} from 'react-redux'
import {addRequests, removeRequest} from '../utils/requestSlice'
// import {useNavigate} from 'react-router-dom'


const Requests = () => {
  const dispatch = useDispatch();
  // const navigate= useNavigate();

  const requests = useSelector(store => store.requests)
  
  const getRequests = async () => {
    try{
      const res = await axios.get(BASE_URL + '/user/requests/received', {
        withCredentials: true,
      })
      // console.log(res?.data?.data);
      
      dispatch(addRequests(res?.data?.data));
    }
    catch(err){
      console.log(err.message);      
    }
  }

  useEffect(()=>{
    getRequests();
  },[])


  const reviewRequests = async (status, id) => {
    try{
        const res = await axios.post(BASE_URL + "/request/review/"+status+"/"+id, {}, {withCredentials:true});
        dispatch(removeRequest(id));
    }
    catch(err){
      console.log(err.message)
    }
  }



  if(!requests) return;

  if(requests.length === 0){
    return <h1 className='text-xl flex justify-center my-10'>No Requests found!!</h1>
  }

  return (
    <div className='item-center my-10'>
        <h1 className='text-center text-2xl font-bold'>Requests Received</h1>
        {requests.map((request) => {
            const {_id, firstName, lastName, age, gender, photoUrl, about} = request.fromUserId

            return (
                <div key={_id} className='flex justify-between items-center m-4 p-4 bg-base-300 rounded-lg w-2/3 mx-auto'>
                    <div className='flex justify-between items-center'>
                      <div className=''>
                          <img className='w-16 h-16 rounded-full' alt={firstName} src={photoUrl}/>  
                      </div>
                      <div className='text-left mx-8'>
                          <h1 className='text-md font-bold'>{firstName + " " + lastName}</h1>
                          <p className='text-sm'>{age + " " + gender}</p>
                          <p className='text-sm'>{about}</p>
                      </div>                    
                    </div>
                    <div className='flex gap-4 '>
                      <button 
                      className="btn btn-outline bth-primary" 
                      onClick={() => reviewRequests("rejected", request._id)}>
                        Reject
                      </button>
                      <button 
                      className="btn btn-outline btn-secondary"
                      onClick={() => reviewRequests("accepted", request._id)}>
                        Accept
                      </button>
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default Requests
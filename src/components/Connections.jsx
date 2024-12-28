import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants';
import {useDispatch, useSelector} from 'react-redux'
import {addConnections} from '../utils/connectionSlice'

const Connections = () => {
  const dispatch = useDispatch()
  const connections = useSelector(store => store.connections)

  const getConnections = async()=> {
    try{
        const res = await axios.get(BASE_URL + '/user/connections', {
            withCredentials: true
        })
        // console.log(res?.data?.data);
        dispatch(addConnections(res?.data?.data))
        
    }   
    catch(err){
        console.log(err.message);        
    }
  }

  useEffect(()=>{
    getConnections()
  },[])
     

  if(!connections){
    // console.log("undefined")  
    return;
  }

  if(connections.length === 0){
    // console.log("lenght = 0");    
    return <h1 className='text-xl flex justify-center my-10'>No Connections found!!</h1>
  }


  return (
    <div className='item-center my-10'>
        <h1 className='text-center text-2xl font-bold'>My Connections</h1>
        {connections.map((connection) => {
            const {firstName, lastName, age, gender, photoUrl, about} = connection

            return (
                <div key={connection._id} className='flex gap-4 items-center m-4 p-4 bg-base-300 rounded-lg w-1/2 mx-auto'>
                    <div className=''>
                        <img className='w-16 h-16 rounded-full' alt={firstName} src={photoUrl}/>  
                    </div>
                    <div className='text-left mx-8'>
                        <h1 className='text-md font-bold'>{firstName + " " + lastName}</h1>
                        <p className='text-sm'>{age + " " + gender}</p>
                        <p className='text-sm'>{about}</p>
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default Connections
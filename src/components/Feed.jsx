import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector(store => store.feed);

  const getFeed = async()=>{
    if(feed) return;

    try{
      const res = await axios.get(BASE_URL + '/user/feed', {
        withCredentials: true
      })

      dispatch(addFeed(res?.data?.data));
    }
    catch(err){
      console.log(err.message);      
    }
  }

  useEffect(()=>{
    getFeed();
  },[])


  return (
    <div className='flex flex-col justify-center'>
      {feed && feed.map(user => <UserCard key={user._id} user={user}/>)}
    </div>
  )
}

export default Feed
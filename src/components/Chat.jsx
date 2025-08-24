import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector(store => store.user)
  const userId = user?._id;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");


  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
    })

    const chatMessages = chat?.data?.messages?.map(msg => {
        return {
            firstName: msg?.senderId?.firstName, 
            lastName: msg?.senderId?.lastName,
            text: msg?.text,
            timestamp: msg?.createdAt,
        }
    });

    setMessages(chatMessages);
  }


  useEffect(() => {
    fetchChatMessages();
  }, []);

  
  useEffect(() => {
    if(!userId)
        return;
    const socket = createSocketConnection();
    // As sson as the page loads, the socket connection is made and joinChat event is emitted.
    socket.emit("joinChat", { firstName: user.firstName, userId, targetUserId})

    socket.on("messageReceived", ({firstName, lastName, text, timestamp}) => {
        setMessages(prev => [...prev, { firstName, lastName, text, timestamp }])     
    })

    return () => socket.disconnect();
  },[userId, targetUserId]);


  const sendMessageHandler = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", { firstName: user.firstName, lastName: user.lastName, userId, targetUserId, text: newMessage, timestamp: new Date() })
    setNewMessage("")
  }

  return (
    <div className='w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col rounded-lg'>
        <h1 className='text-2xl font-bold pt-5 pl-5 text-center'>Chat</h1>
        {/* <div className="tooltip tooltip-open tooltip-primary" data-tip="primary">
            <button className="btn btn-primary">Please login with 2 users simultaneously in different broswer windows to see real-time chat between both of them.</button>
        </div> */}
        <p className='p-5 pb-1 pt-1 border-b border-gray-600'>
            Please login with 2 users simultaneously in different broswer windows to see real-time chat between both of them.
        </p>
        <div className='flex-1 overflow-scroll p-5'>
            {messages.map((msg,index) => {
                return(
                    <div key={index} className={"chat " + (user.firstName === msg.firstName ? "chat-end" : "chat-start")}>
                        <div className="chat-header">
                            {msg.firstName + " " + msg.lastName}
                            <time className="text-xs opacity-50 p-1">{msg.timestamp}</time>
                        </div>
                        <div className="chat-bubble">{msg.text}</div>
                        <div className="chat-footer opacity-50">Seen</div>
                    </div>
                )
            })}
        </div>
        <div className='p-5 border-t border-gray-600 flex items-center gap-2'>
            <input 
                className='flex-1 border border-gray-500 text-white rounded p-2'
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={sendMessageHandler} className='btn btn-primary'>Send</button>
        </div>
    </div>
  )
}

export default Chat
import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from './components/Body'
import Login from './components/Login'
import Profile from './components/Profile'
import appStore from './utils/appStore'
import {Provider} from 'react-redux'
import Feed from './components/Feed'
import Connections from './components/Connections'
import Requests from './components/Requests'



function App() {

  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename='/'> 
        <Routes>
          <Route path='/' element={<Body/>}>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/profile' element={<Profile/>}></Route>
            <Route path='/feed' element={<Feed/>}></Route>
            <Route path='/connections' element={<Connections/>}></Route>
            <Route path='/requests' element={<Requests/>}></Route>
          </Route>          
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App

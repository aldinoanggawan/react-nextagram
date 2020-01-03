import React, { useState } from 'react';
import { Route, Switch} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import HomePage from './pages/HomePage'
import UserProfilePage from './pages/UserProfilePage'
import Navbar from './components/Navbar'
import MyProfilePage from './pages/MyProfilePage';
import UploadPage from './pages/UploadPage';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('jwt') !== null
  )
  const newLine = null

  return (
    <>
      <ToastContainer />
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/users/:id">
          <UserProfilePage />
        </Route>
        <Route exact path="/profile">
          <MyProfilePage loggedIn={loggedIn}/>
        </Route>
        <Route exact path="/upload">
          <UploadPage />
        </Route>
      </Switch>
    </>
  )
}

export default App
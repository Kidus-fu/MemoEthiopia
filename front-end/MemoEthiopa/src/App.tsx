// import { useState } from 'react'

import { useEffect } from 'react'
import './App.css'
import { useSelector } from 'react-redux'
import { RootState } from './store/store'

import { Spin } from 'antd'
import LandingPage from './Pages/Landing/LandingPage'

function App() {
  const loggedIn = useSelector((state: RootState) => state.userinfo.loggedIn)

  useEffect(() => {
    document.title = "Memo Ethiopa | Checking .."
    if (loggedIn) {
      window.location.href = "/feed"
    }
  })

  return (

    <>
      {
        loggedIn ? <Spin fullscreen={true} size='large' /> : <LandingPage />
      }
    </>
  )
}

export default App

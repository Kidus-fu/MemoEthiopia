// import { useState } from 'react'

import { useEffect } from 'react'
import './App.css'
import { useSelector } from 'react-redux'
import { RootState } from './store/store'
import LandingPage from './components/LandingPage'
import "./components/LadingNavBer.css";

function App() {
  const loggedIn = useSelector((state: RootState) => state.userinfo.loggedIn)
  useEffect(() => {
    document.title = "Memo Ethiopa"
  })

  return (
    <>
      {loggedIn ?
        (
          <>
          {/* userpage */}
          </>
        )
          :
          (
            <>
            <LandingPage />
            </>
          )
     }
    </>
  )
}

export default App

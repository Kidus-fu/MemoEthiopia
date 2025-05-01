// import { useState } from 'react'

import { useEffect } from 'react'
import './App.css'
import { useSelector } from 'react-redux'
import { RootState } from './store/store'
import LandingPage from './components/Landing/LandingPage'

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
          <p className="text-lime-400">Home</p>
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
